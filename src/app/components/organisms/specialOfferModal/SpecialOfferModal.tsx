import React, { useCallback } from "react";
import styles from "./SpecialOfferModal.module.scss";
import Box from "@/components/atoms/box/Box";
import ModalHeader from "@/components/molecules/modalHeader/ModalHeader";
import { modalSlice } from "@/store/slices/modalSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks/redux";
import whiteGiftIcon from "@/assets/icons/white-gift.svg";
import H3 from "@/components/atoms/h3/H3";
import H2 from "@/components/atoms/h2/H2";
import Label from "@/components/atoms/label/Label";
import { blockchainIcons } from "@/constants/blockchains";
import Image from "next/image";
import Separator from "@/components/atoms/separator/Separator";
import Timer from "@/components/atoms/timer/Timer";
import IconButton from "@/components/atoms/iconButton/IconButton";
import specialOfferService from "@/services/SpecialOffersService";

const boxStyles: React.CSSProperties = {
  boxShadow:
    "0px 4px 8px 0px rgba(12, 13, 14, 0.25), 0px 16px 32px 0px rgba(12, 13, 14, 0.15)",
};

const discountStyles: React.CSSProperties = {
  textDecoration: "line-through",
};

export default function SpecialOfferModal() {
  const dispatch = useAppDispatch();
  const { settings } = useAppSelector((item) => item.settingsSlice);
  const { setModal } = modalSlice.actions;

  const handleOnCloseModal = useCallback(() => {
    dispatch(setModal(null));
    specialOfferService.setSeen(true);
  }, [dispatch, setModal]);

  const handleOnPurchase = () => {};

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
        icon={whiteGiftIcon.src}
        title="Special Offer"
        handleOnClose={handleOnCloseModal}
      />
      <div className={styles.special_offer_modal__content}>
        <H3 color="exclusive" text="Exclusive Limited Time Offer 50%" />
        <div className={styles.content__prices}>
          <H2 color="white" text="$399.00" />
          <Label
            text="$899.00"
            color="dark-gray"
            variant="b-large"
            customStyles={discountStyles}
          />
        </div>
        <div className={styles.content__blockchains}>
          <Label
            text="Only for first purchase"
            color="gray"
            variant="default"
          />
          <div className={styles.blockchains__list}>
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
        </div>
        <Separator padding="12px 0" />
        {settings && settings.specialOfferTime && (
          <Timer hours={settings.specialOfferTime} />
        )}
        <Separator padding="12px 0" />
        <Label text="Quarterly payment" variant="default" color="dark-gray" />
      </div>
      <div className={styles.special_offer_modal__purchase}>
        <IconButton
          label="Purchase Now"
          arrow="right"
          variant="primary"
          handleOnClick={handleOnPurchase}
        />
      </div>
    </Box>
  );
}
