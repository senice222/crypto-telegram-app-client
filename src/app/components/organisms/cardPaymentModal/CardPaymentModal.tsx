import React, { useState } from "react";
import Box from "@/components/atoms/box/Box";
import ModalHeader from "@/components/molecules/modalHeader/ModalHeader";
import { modalSlice } from "@/store/slices/modalSlice";
import { useAppDispatch } from "@/store/hooks/redux";
import whiteCreditCardIcon from "@/assets/icons/white-credit-card.svg";
import Information from "@/components/molecules/information/Information";
import { INumberedText } from "@/components/molecules/numberedText/NumberedText";
import Label from "@/components/atoms/label/Label";
import CopyInput from "@/components/atoms/copyInput/CopyInput";
import IconButton from "@/components/atoms/iconButton/IconButton";
import { useRouter } from "next/navigation";
import { PURCHASE_CRYPTO_CARD_CRYPTOCLOUD_GUIDE_URL } from "@/constants/payment";

const informationItems: INumberedText[] = [
  {
    number: 1,
    text: `Copy the address and click "Continue"`,
  },
  {
    number: 2,
    text: `Specify the amount of the package you wish to purchase (be sure to add a $15 fee)`,
  },
  {
    number: 3,
    text: `Click "Continue"`,
  },
  {
    number: 4,
    text: `Insert the crypto address that you copied earlier.`,
  },
  {
    number: 5,
    text: `Follow the instructions provided by the exchange, then purchase cryptocurrency using your bank card and wait.`,
  },
];

const boxStyles: React.CSSProperties = {
  boxShadow:
    "0px 4px 8px 0px rgba(12, 13, 14, 0.25), 0px 16px 32px 0px rgba(12, 13, 14, 0.15)",
};

export default function CardPaymentModal() {
  const [isCopied, setIsCopied] = useState(false);
  const { setModal } = modalSlice.actions;
  const dispatch = useAppDispatch();
  const router = useRouter();

  const BTC_WALLET = process.env.NEXT_PUBLIC_BTC_WALLET || "";

  const handleOnCloseModal = () => {
    dispatch(setModal(null));
  };

  const handleOnCopyWallet = (value: string) => {
    try {
      window.navigator.clipboard.writeText(value);
    } catch (error) {
      console.error(error);
      return;
    }

    setIsCopied(true);
  };

  const handleOnContinue = () => {
    router.push(PURCHASE_CRYPTO_CARD_CRYPTOCLOUD_GUIDE_URL);
  };

  return (
    <Box
      variant="dark-gray"
      borderRadius={20}
      padding="8px"
      direction="flex-column"
      gap={2}
      customStyles={boxStyles}
    >
      <ModalHeader
        icon={whiteCreditCardIcon.src}
        title="Choose a payment method"
        handleOnClose={handleOnCloseModal}
      />
      <Information items={informationItems} />
      <Box padding="12px" direction="flex-column" gap={8}>
        <Label text="Wallet Address" variant="small" color="gray" />
        <CopyInput text={BTC_WALLET} handleOnCopy={handleOnCopyWallet} />
        <Label
          text="Copy this address to continue"
          variant="x-small"
          color="dark-gray"
        />
      </Box>
      <Box padding="12px">
        <IconButton
          label="Continue"
          arrow="right"
          variant="primary"
          handleOnClick={handleOnContinue}
          disabled={!isCopied}
        />
      </Box>
    </Box>
  );
}
