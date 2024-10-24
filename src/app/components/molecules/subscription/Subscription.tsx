import React, { useState } from "react";
import styles from "./Subscription.module.scss";
import Property from "@/components/atoms/property/Property";
import TariffCard, {
  ITariffCard,
} from "@/components/atoms/tariffCard/TariffCard";
import IconButton from "@/components/atoms/iconButton/IconButton";
import H3 from "@/components/atoms/h3/H3";
import RadioButton from "@/components/atoms/radioButton/RadioButton";
import { TBlockchains } from "@/types/common";
import { TSubscriptionType } from "@/services/api/SubscriptionService";
import { TH3Colors } from "@/types/ui";
import { modalSlice } from "@/store/slices/modalSlice";
import { useAppDispatch } from "@/store/hooks/redux";
import { purchaseSlice, TSelectedTariff } from "@/store/slices/purchaseSlice";
import { blockchainIcons } from "@/constants/blockchains";

const creditCardIcon = (): React.ReactElement<SVGElement> => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="13"
      height="10"
      viewBox="0 0 13 10"
      fill="none"
    >
      <path
        d="M12.5 2.33337V3.16671H0.5V2.33337C0.5 1.00004 1.16667 0.333374 2.5 0.333374H10.5C11.8333 0.333374 12.5 1.00004 12.5 2.33337ZM12.5 4.16671V7.66671C12.5 9.00004 11.8333 9.66671 10.5 9.66671H2.5C1.16667 9.66671 0.5 9.00004 0.5 7.66671V4.16671H12.5ZM5.66667 7.00004C5.66667 6.72404 5.44267 6.50004 5.16667 6.50004H3.16667C2.89067 6.50004 2.66667 6.72404 2.66667 7.00004C2.66667 7.27604 2.89067 7.50004 3.16667 7.50004H5.16667C5.44267 7.50004 5.66667 7.27604 5.66667 7.00004Z"
        fill="black"
      />
    </svg>
  );
};

export interface ISubscription extends ITariffCard {
  readonly id: number;
  readonly name: string;
  readonly properties: string[];
}

interface ISelectedBlockchains {
  readonly blockchain: TBlockchains;
  readonly selected: boolean;
}

const initialSelectedBlockchainsStateRegular: ISelectedBlockchains[] = [
  { blockchain: "BTC", selected: true },
  { blockchain: "ETH", selected: false },
  { blockchain: "USDT", selected: false },
  { blockchain: "LTC", selected: false },
  { blockchain: "SOL", selected: false },
  { blockchain: "BNB", selected: false },
];

const initialSelectedBlockchainsStateExclusive: ISelectedBlockchains[] = [
  { blockchain: "BTC", selected: true },
  { blockchain: "ETH", selected: true },
  { blockchain: "USDT", selected: true },
  { blockchain: "LTC", selected: false },
  { blockchain: "SOL", selected: false },
  { blockchain: "BNB", selected: false },
];

const subscriptionTypeToH3ColorMapper: Record<TSubscriptionType, TH3Colors> = {
  regular: "gray",
  exclusive: "exclusive",
  platinum: "platinum",
};

const getHeadingColor = (subscriptionType: TSubscriptionType): TH3Colors => {
  return subscriptionTypeToH3ColorMapper[subscriptionType] || "gray";
};

export default function Subscription({
  name,
  properties,
  price,
  discount,
  paymentType,
  blockchains,
  subscriptionType,
  id,
}: ISubscription) {
  const { setSelectedTariffData } = purchaseSlice.actions;
  const { setModal } = modalSlice.actions;
  const dispatch = useAppDispatch();
  const subscriptionHeadingColor = getHeadingColor(subscriptionType);
  const canSelectBlockchains = subscriptionType !== "platinum";
  const selectedBlockchainsInitialState =
    subscriptionType === "regular"
      ? initialSelectedBlockchainsStateRegular
      : subscriptionType === "exclusive"
      ? initialSelectedBlockchainsStateExclusive
      : [];

  const [selectedBlockchains, setSelectedBlockchains] = useState<
    ISelectedBlockchains[]
  >(selectedBlockchainsInitialState);

  const countSelectedBlockchains = (): number => {
    return selectedBlockchains.filter((item) => item.selected).length;
  };

  const isButtonDisabled =
    subscriptionType === "exclusive" && countSelectedBlockchains() !== 3
      ? true
      : false;

  const handleOnPurchase = () => {
    const selectBlockChainsData = selectedBlockchains
      .map((item) => (item.selected ? item.blockchain : undefined))
      .filter((item): item is TBlockchains => item !== undefined);

    const payload: Partial<TSelectedTariff> = {
      subscriptionType,
      promocode: "",
      discount,
      subscriptionId: id,
    };

    if (canSelectBlockchains) {
      payload.blockchains = selectBlockChainsData;
    }

    dispatch(setSelectedTariffData(payload));
    dispatch(setModal("choose-payment-method"));
  };

  const handleOnSelectBlockchain = (blockchain: TBlockchains) => {
    setSelectedBlockchains((prev) =>
      prev.map((item) => {
        if (item.blockchain === blockchain) {
          const currentlySelected = item.selected;
          const selectedCount = countSelectedBlockchains();

          if (
            subscriptionType === "regular" &&
            selectedCount === 1 &&
            currentlySelected
          ) {
            return item;
          }

          return { ...item, selected: !currentlySelected };
        }
        return item;
      })
    );
  };

  return (
    <div className={styles.subscription}>
      <div className={styles.subscription__heading}>
        <H3 text={name} color={subscriptionHeadingColor} padding="12px" />
      </div>
      <TariffCard
        price={price}
        discount={discount}
        paymentType={paymentType}
        blockchains={blockchains}
        subscriptionType={subscriptionType}
        selectedBlockchains={countSelectedBlockchains() || 0}
      />
      <div className={styles.subscription__properties}>
        {properties.map((item, index) => (
          <Property key={index} text={item} />
        ))}
      </div>
      {canSelectBlockchains && (
        <div className={styles.subscription__blockchains}>
          {selectedBlockchains.map((blockchainItem) => (
            <RadioButton
              key={blockchainItem.blockchain}
              label={blockchainItem.blockchain}
              media={blockchainIcons[blockchainItem.blockchain]}
              selected={blockchainItem.selected}
              handleOnClick={() =>
                handleOnSelectBlockchain(blockchainItem.blockchain)
              }
            />
          ))}
        </div>
      )}
      <IconButton
        label="Purchase"
        variant="primary"
        media={creditCardIcon()}
        handleOnClick={handleOnPurchase}
        width={16}
        height={16}
        disabled={isButtonDisabled}
      />
    </div>
  );
}
