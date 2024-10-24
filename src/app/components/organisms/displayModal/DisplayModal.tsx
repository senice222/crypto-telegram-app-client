import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks/redux";
import { modalSlice, TModals } from "@/store/slices/modalSlice";
import SelectLanguage from "../selectLanguage/SelectLanguage";
import DefaultAPWrapper from "@/components/molecules/defaultAPWrapper/DefaultAPWrapper";
import PaymentMethodModal from "../paymentMethodModal/PaymentMethodModal";
import CardPaymentModal from "../cardPaymentModal/CardPaymentModal";
import localeService from "@/services/api/LocaleService";
import specialOfferService from "@/services/SpecialOffersService";
import SpecialOfferModal from "../specialOfferModal/SpecialOfferModal";
import { settingsSlice } from "@/store/slices/settingsSlice";
import settingsService from "@/services/api/SettingsService";

const customModalStyles: React.CSSProperties = {
  position: "fixed",
  bottom: "15px",
  width: 374,
  left: "calc(50% - 187px)",
  zIndex: 1000,
  touchAction: "none",
};

interface IModalMapperReturn {
  component: React.JSX.Element;
  componentStyles: React.CSSProperties;
}

const modalMapper: Record<TModals, IModalMapperReturn> = {
  "select-language": {
    component: <SelectLanguage />,
    componentStyles: {
      height: 497,
    },
  },
  "choose-payment-method": {
    component: <PaymentMethodModal />,
    componentStyles: {
      height: 565,
    },
  },
  "card-payment": {
    component: <CardPaymentModal />,
    componentStyles: {
      height: 621,
    },
  },
  "special-offer": {
    component: <SpecialOfferModal />,
    componentStyles: {
      height: 476,
    },
  },
};

const getModal = (modal: TModals | null) => {
  if (!modal) return null;

  return modalMapper[modal] || null;
};

export default function DisplayModal() {
  const dispatch = useAppDispatch();
  const { setSettings } = settingsSlice.actions;
  const { settings } = useAppSelector((item) => item.settingsSlice);
  const { setModal } = modalSlice.actions;
  const { modal } = useAppSelector((item) => item.modalSlice);
  const [isFetched, setIsFetched] = useState(false);
  const currentModalData = getModal(modal) ?? {
    component: null,
    componentStyles: {},
  };

  const currentModal = isFetched
    ? modal === "special-offer"
      ? settings?.specialOfferTime
        ? currentModalData?.component
        : null
      : currentModalData?.component
    : null;

  const currentModalStyles = {
    ...currentModalData?.componentStyles,
    ...customModalStyles,
  };

  useEffect(() => {
    const isSpecialOfferSeen = specialOfferService.isSeen();
    const isLocaleSet = localeService.isLocaleSet();

    if (!isLocaleSet) {
      dispatch(setModal("select-language"));
    }

    if (isLocaleSet && !isSpecialOfferSeen) {
      dispatch(setModal("special-offer"));
    }
  }, [dispatch, setModal]);

  useEffect(() => {
    const getSettings = async () => {
      try {
        const response = await settingsService.getSettings();

        if (!response)
          throw new Error("Network error. Did not receive settings");

        dispatch(setSettings(response));
        setIsFetched(true);
      } catch (error) {
        console.log(error);
        setIsFetched(true);
      }
    };

    getSettings();
  }, [dispatch, setSettings]);

  const modalAnimationKey = `modal-${modal}`;
  return (
    <DefaultAPWrapper
      animationKey={modalAnimationKey}
      animationPreset="up"
      customStyles={currentModalStyles}
      conditionSatisfied={Boolean(currentModal)}
      isBottomSheet
    >
      {currentModal}
    </DefaultAPWrapper>
  );
}
