import React, { useCallback, useEffect, useState } from "react";
import ModalHeader from "@/components/molecules/modalHeader/ModalHeader";
import whiteCreditCardIcon from "@/assets/icons/white-credit-card.svg";
import { modalSlice } from "@/store/slices/modalSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks/redux";
import Guarantee from "@/components/atoms/guarantee/Guarantee";
import Box from "@/components/atoms/box/Box";
import Label from "@/components/atoms/label/Label";
import Input from "@/components/atoms/input/Input";
import InlineStat from "@/components/atoms/inlineStat/InlineStat";
import IconButton from "@/components/atoms/iconButton/IconButton";
import RadioButton from "@/components/atoms/radioButton/RadioButton";
import coinIcon from "@/assets/icons/gray-coin.svg";
import creditCardIcon from "@/assets/icons/gray-credit-card.svg";
import referralService from "@/services/api/ReferralService";
import subscriptionService, {
  IPurchaseSubscription,
  TBlockchainsLowercase,
} from "@/services/api/SubscriptionService";
import { useRouter } from "next/navigation";
import { useTelegramUserData } from "@/hooks/useTelegramUserData";

const boxStyles: React.CSSProperties = {
  boxShadow:
    "0px 4px 8px 0px rgba(12, 13, 14, 0.25), 0px 16px 32px 0px rgba(12, 13, 14, 0.15)",
};

export type TPaymentMethod = "crypto" | "card";

export default function PaymentMethodModal() {
  const userData = useTelegramUserData();
  const router = useRouter();

  const { selectedTariff } = useAppSelector((item) => item.purchaseSlice);
  const { setModal } = modalSlice.actions;
  const dispatch = useAppDispatch();

  const [promocode, setPromocode] = useState<string>("");
  const [promocodeDiscount, setPromocodeDiscount] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<TPaymentMethod>("crypto");

  const discountAmount = `${selectedTariff?.discount || 0}% + ${
    promocodeDiscount || 0
  }%`;

  const handleOnCloseModal = useCallback(() => {
    dispatch(setModal(null));
  }, [dispatch, setModal]);

  const handleOnProceed = useCallback(async () => {
    if (paymentMethod === "card") {
      dispatch(modalSlice.actions.setModal("card-payment"));
      return;
    }

    if (
      userData?.id &&
      selectedTariff?.subscriptionId !== -1 &&
      (selectedTariff?.subscriptionType === "platinum" ||
        selectedTariff?.blockchains?.length)
    ) {
      try {
        const dataToSend: IPurchaseSubscription = {
          userId: userData.id,
          subscriptionId: selectedTariff.subscriptionId,
          promocode: promocode || "",
          blockchains: [],
        };

        if (selectedTariff.subscriptionType !== "platinum") {
          const formattedBlockchains = selectedTariff.blockchains?.map((item) =>
            item.toLowerCase()
          ) as TBlockchainsLowercase[];

          dataToSend.blockchains = formattedBlockchains || [];
        } else {
          dataToSend.blockchains = ["bnb", "btc", "eth", "ltc", "sol", "usdt"];
        }

        const response = await subscriptionService.purchaseSubscription(
          dataToSend
        );

        if (response) {
          router.push(response.link);
        } else {
          console.error("Error creating invoice");
        }
      } catch (error) {
        console.error("Error purchasing subscription:", error);
      }
    } else {
      console.error("Missing required data to proceed with purchase");
    }
  }, [
    paymentMethod,
    userData?.id,
    selectedTariff,
    promocode,
    router,
    dispatch,
  ]);

  const handleOnChangePromocode = useCallback((value: string) => {
    setPromocode(value);
  }, []);

  const handleOnSelectPaymentMethod = useCallback((method: TPaymentMethod) => {
    setPaymentMethod(method);
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (promocode) {
        try {
          const response = await referralService.checkPromocode(promocode);
          if (!response) throw new Error("Error. Cannot check promocode");

          setPromocodeDiscount(response.discount);
        } catch (error) {
          console.error(error);
        }
      }
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [promocode]);

  useEffect(() => {
    if (userData && userData.id) {
      const fetchUserPresetPromocode = async () => {
        if (userData && userData.id) {
          const response = await referralService.getPresetPromocode(
            userData.id
          );

          console.log({ response });

          setPromocode(response.presetPromocode || "");
        }
      };

      fetchUserPresetPromocode();
    }
  }, [userData]);

  return (
    <Box
      variant="dark-gray"
      borderRadius={20}
      padding="2px"
      direction="flex-column"
      gap={2}
      customStyles={boxStyles}
    >
      <ModalHeader
        icon={whiteCreditCardIcon.src}
        title="Choose a payment method"
        handleOnClose={handleOnCloseModal}
      />
      <Guarantee
        text="Money-Back Guarantee"
        description="If you don’t find wallets or recoup your investment, get an immediate refund to any payment system*"
      />
      <Box padding="12px" direction="flex-column" gap={8}>
        <Label text="Promocode" variant="small" color="gray" />
        <Input
          value={promocode}
          handleOnChange={handleOnChangePromocode}
          placeholder="CODE"
        />
        <InlineStat label="Discount" value={discountAmount} />
      </Box>
      <Box padding="12px" direction="flex-column" gap={8}>
        <Label text="Payment Method" variant="small" color="gray" />
        <Box direction="flex-center" gap={10}>
          <RadioButton
            media={coinIcon.src}
            label="Crypto"
            selected={paymentMethod === "crypto"}
            handleOnClick={() => handleOnSelectPaymentMethod("crypto")}
          />
          <RadioButton
            media={creditCardIcon.src}
            label="Card"
            selected={paymentMethod === "card"}
            handleOnClick={() => handleOnSelectPaymentMethod("card")}
          />
        </Box>
      </Box>
      <Box padding="12px">
        <IconButton
          label="Continue"
          arrow="right"
          variant="primary"
          handleOnClick={handleOnProceed}
        />
      </Box>
      <Box padding="12px">
        <Label
          variant="x-small"
          color="dark-gray"
          text="* - This guarantee applies to all 3-month subscriptions as well as lifetime subscriptions."
        />
      </Box>
    </Box>
  );
}
