import React from "react";
import styles from "./TariffCard.module.scss";
import H2 from "../h2/H2";
import Label from "../label/Label";
import Separator from "../separator/Separator";
import { formatToUSD } from "@/utils/formatCurrencies";
import {
  TPaymentType,
  TSubscriptionType,
} from "@/services/api/SubscriptionService";
import { variantToClassname } from "@/utils";
import Image from "next/image";
import { blockchainIcons } from "@/constants/blockchains";

function formatBlockchainCount(count: number): string {
  const word = count === 1 ? "blockchain" : "blockchains";
  return `${count} ${word}`;
}

function formatTarif(tariff: TPaymentType) {
  switch (tariff) {
    case "quarter":
      return "Quarterly payment";

    case "lifetime":
      return "One-time payment";

    default:
      return "Quarterly payment";
  }
}

export interface ITariffCard {
  readonly price: number;
  readonly discount: number;
  readonly blockchains: number;
  readonly paymentType: TPaymentType;
  readonly subscriptionType: TSubscriptionType;
  readonly selectedBlockchains?: number;
}

export default function TariffCard({
  price,
  discount,
  blockchains,
  paymentType,
  subscriptionType,
  selectedBlockchains,
}: ITariffCard) {
  const formattedPrice = selectedBlockchains
    ? formatToUSD(parseFloat(String(price)) + 100 * (selectedBlockchains - 1))
    : formatToUSD(price);
  const calculatedDiscount =
    parseFloat(String(price)) + (parseFloat(String(price)) * discount) / 100;
  const formattedDiscount = formatToUSD(calculatedDiscount);
  const formattedTariff = formatTarif(paymentType);
  const subscriptionTypeClass = variantToClassname(subscriptionType, styles);
  const tariffCardClass = `${styles.tariff_card} ${subscriptionTypeClass}`;
  const areAllBlockchainsVisible = subscriptionType === "platinum";
  const priceAmountColor =
    subscriptionType === "regular" ? "white" : "exclusive";
  const formattedBlockchainCount =
    subscriptionType === "platinum"
      ? "for all blockchains"
      : `for ${formatBlockchainCount(blockchains)}`;

  return (
    <div className={tariffCardClass}>
      <div className={styles.tariff_card__price}>
        <div className={styles.price__main}>
          <H2 text={formattedPrice} color="white" />
          <Label
            text={formattedDiscount}
            color="dark-gray"
            variant="b-large"
            customStyles={{ textDecoration: "line-through" }}
          />
        </div>
        {subscriptionType !== "platinum" && (
          <Label
            text={`${selectedBlockchains} of ${
              subscriptionType === "regular" ? 6 : 3
            }`}
            variant="b-large"
            color={priceAmountColor}
          />
        )}
      </div>
      <Label
        text={formattedBlockchainCount}
        color="dark-gray"
        variant="default"
      />
      {areAllBlockchainsVisible && (
        <div className={styles.tariff_card__all_blockchains}>
          {Object.values(blockchainIcons).map((item, index) => (
            <Image
              key={index}
              src={item}
              alt="Blockchain icon"
              width={24}
              height={24}
              unoptimized
            />
          ))}
        </div>
      )}
      <Separator padding="12px 8px" />
      <Label text={formattedTariff} color="dark-gray" variant="default" />
    </div>
  );
}
