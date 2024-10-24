"use client";

import React, { useEffect, useMemo, useState } from "react";
import styles from "./Subscription.module.scss";
import Header from "@/components/organisms/header/Header";
import InlineFeature from "@/components/atoms/inlineFeature/InlineFeature";
import whiteStackIcon from "@/assets/icons/white-stack.svg";
import whiteDownloadIcon from "@/assets/icons/white-download.svg";
import Label from "@/components/atoms/label/Label";
import Separator from "@/components/atoms/separator/Separator";
import Switch, { ISwitchItem } from "@/components/atoms/switch/Switch";
import Guarantee from "@/components/atoms/guarantee/Guarantee";
import Subscription from "@/components/molecules/subscription/Subscription";
import DefaultAPWrapper from "@/components/molecules/defaultAPWrapper/DefaultAPWrapper";
import subscriptionService, {
  UserSubscriptionWithDetails,
} from "@/services/api/SubscriptionService";
import { subscriptionSlice } from "@/store/slices/subscriptionSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks/redux";
import DisplayModal from "@/components/organisms/displayModal/DisplayModal";
import PurchasedTariffCard from "@/components/organisms/purchaseTariffCard/PurchasedTariffCard";
import { useTranslations } from "next-intl";
import { useTelegramUserData } from "@/hooks/useTelegramUserData";
import IconButton from "@/components/atoms/iconButton/IconButton";
import { useRouter } from "next/navigation";

const windowsIcon = (): React.ReactElement<SVGElement> => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="16"
      viewBox="0 0 17 16"
      fill="none"
    >
      <path
        d="M2.5 2H8.16667V7.66667H2.5V2ZM8.83333 7.66667H14.5V2H8.83333V7.66667ZM2.5 14H8.16667V8.33333H2.5V14ZM8.83333 14H14.5V8.33333H8.83333V14Z"
        fill="black"
      />
    </svg>
  );
};

const appleIcon = (): React.ReactElement<SVGElement> => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="16"
      viewBox="0 0 17 16"
      fill="none"
    >
      <path
        d="M11.5267 8.00669C11.5267 8.06003 11.4333 9.64669 13.1667 10.4667C12.84 11.4534 11.7333 13.6467 10.44 13.66C9.69334 13.66 9.25333 13.18 8.41333 13.18C7.57333 13.18 7.06667 13.6467 6.4 13.66C5.12 13.7 3.89332 11.2867 3.55332 10.3067C3.29999 9.56001 3.17334 8.83336 3.17334 8.13336C3.17334 5.76003 4.74667 4.58669 6.23334 4.56669C6.95334 4.56669 7.86668 5.09336 8.26001 5.09336C8.64001 5.09336 9.66668 4.46669 10.6133 4.54002C11.6067 4.62002 12.3667 5.01336 12.8667 5.73336C11.9733 6.28002 11.5333 7.02003 11.54 8.00669H11.5267ZM10.04 3.60669C10.7733 2.74002 10.7067 1.94669 10.68 1.66669C10.0333 1.70669 9.28667 2.10668 8.86001 2.60002C8.39334 3.13335 8.11334 3.78669 8.17334 4.52669C8.87334 4.58003 9.51333 4.22002 10.0333 3.60669H10.04Z"
        fill="white"
      />
    </svg>
  );
};

const androidIcon = (): React.ReactElement<SVGElement> => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M11.2134 6.46003L12.1467 4.83336C12.24 4.67336 12.18 4.47337 12.0267 4.38003C11.8667 4.2867 11.6667 4.34003 11.5733 4.50003L10.62 6.15337C9.00001 5.44004 7.01336 5.43337 5.38002 6.15337L4.42669 4.50003C4.33336 4.34003 4.1267 4.2867 3.97336 4.38003C3.81336 4.47337 3.76004 4.67336 3.85337 4.83336L4.78668 6.46003C3.04668 7.4667 1.88002 9.26004 1.67336 11.3C1.66669 11.3934 1.69336 11.4867 1.76003 11.56C1.82669 11.6334 1.91336 11.6734 2.00669 11.6734H14.0067C14.1 11.6734 14.1934 11.6334 14.2534 11.56C14.3134 11.4867 14.3467 11.3934 14.34 11.3C14.1334 9.2667 12.9667 7.47336 11.2267 6.46003H11.2134ZM5.24668 9.71337C4.96668 9.71337 4.74001 9.48669 4.74001 9.20669C4.74001 8.92669 4.96668 8.70669 5.24668 8.70669C5.52668 8.70669 5.74668 8.93336 5.74668 9.20669C5.74668 9.48003 5.52001 9.71337 5.24668 9.71337ZM10.7534 9.71337C10.4734 9.71337 10.2534 9.48669 10.2534 9.20669C10.2534 8.92669 10.48 8.70669 10.7534 8.70669C11.0267 8.70669 11.26 8.93336 11.26 9.20669C11.26 9.48003 11.0334 9.71337 10.7534 9.71337Z"
        fill="white"
      />
    </svg>
  );
};

const availableListStyles: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 24,
};

const SWITCH_ITEMS: ISwitchItem[] = [
  {
    id: 0,
    text: "Quarterly",
  },
  {
    id: 1,
    text: "Lifetime",
  },
];

export default function Page() {
  const dispatch = useAppDispatch();
  const availableSubscriptions = useAppSelector(
    (state) => state.subscriptionSlice.availableSubscriptions
  );
  const { settings } = useAppSelector((item) => item.settingsSlice);
  const userData = useTelegramUserData();
  const [activeItem, setActiveItem] = useState<number>(0);
  const [userSubscriptions, setUserSubscriptions] = useState<
    UserSubscriptionWithDetails[]
  >([]);
  const router = useRouter();

  const subscriptions = useMemo(() => {
    return availableSubscriptions.filter((item) =>
      activeItem === 0
        ? item.paymentType === "quarter"
        : item.paymentType === "lifetime"
    );
  }, [availableSubscriptions, activeItem]);

  const handleOnSetSwitchItem = (id: number) => {
    setActiveItem(id);
  };

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await subscriptionService.getSubscriptions();
        if (response) {
          dispatch(
            subscriptionSlice.actions.setAvailableSubscriptions(response)
          );
        } else {
          console.error("Unable to load subscriptions");
        }
      } catch (error) {
        console.error("Error fetching subscriptions:", error);
      }
    };
    fetchSubscriptions();
  }, [dispatch]);

  useEffect(() => {
    const fetchUserSubscriptions = async () => {
      if (userData?.id) {
        try {
          const response = await subscriptionService.getUserSubscriptions(
            userData.id
          );
          if (response) {
            setUserSubscriptions(response);
          } else {
            console.error("Unable to load user subscriptions");
          }
        } catch (error) {
          console.error("Error fetching user subscriptions:", error);
        }
      }
    };
    fetchUserSubscriptions();
  }, [userData?.id]);

  const handleOnDownloadWindowsApp = () => {
    if (!settings?.windowsDownloadLink) return;
    router.push(settings?.windowsDownloadLink);
  };

  const handleOnDownloadAppleApp = () => {
    if (!settings?.iosDownloadLink) return;
    router.push(settings?.iosDownloadLink);
  };

  const handleOnDownloadAndroidApp = () => {
    if (!settings?.androidDownloadLink) return;
    router.push(settings?.androidDownloadLink);
  };

  const subscriptionsAnimationKey = `subscriptions-${activeItem}`;
  const isDownloadSectionVisible = userSubscriptions?.length && settings;
  const t = useTranslations("subscription");

  return (
    <div className={styles.subscription}>
      <Header />
      <div className={styles.subscription__my_subscriptions}>
        <InlineFeature
          media={whiteStackIcon.src}
          text={t("my.title")}
          padding="0"
        />
        {userSubscriptions?.length ? (
          userSubscriptions?.map((item, index) => (
            <PurchasedTariffCard key={index} {...item} />
          ))
        ) : (
          <Label text={t("my.desc")} variant="default" color="gray" />
        )}
      </div>
      <Separator padding="8px 32px" />
      {isDownloadSectionVisible && (
        <React.Fragment>
          <div className={styles.subscription__download}>
            <div className={styles.download__heading}>
              <InlineFeature
                media={whiteDownloadIcon.src}
                text={"Download app"}
                padding="0"
              />
              <Label
                text={String(settings.windowsAppVersion)}
                color="dark-gray"
                variant="default"
              />
            </div>
            <Label text="Recommended" color="gray" variant="default" />
            <IconButton
              label="Download for Windows"
              media={windowsIcon()}
              variant="primary"
              handleOnClick={handleOnDownloadWindowsApp}
            />
            <div className={styles.download__description}>
              <Label
                text="Supported version"
                color="dark-gray"
                variant="x-small"
              />
              <Label text="Windows 7+" color="gray" variant="x-small" />
            </div>
          </div>
          <Separator padding="8px 32px" />
          <div className={styles.subscription__download}>
            <Label text="Other OS" color="gray" variant="default" />
            <div className={styles.download__platforms}>
              <IconButton
                label="Download for iOS"
                media={appleIcon()}
                variant="secondary"
                handleOnClick={handleOnDownloadAppleApp}
              />
              <IconButton
                label="Download for Android"
                media={androidIcon()}
                variant="secondary"
                handleOnClick={handleOnDownloadAndroidApp}
              />
            </div>
          </div>
        </React.Fragment>
      )}

      <div className={styles.subscription__available}>
        <Label text={t("available.title")} variant="default" color="gray" />
        <Switch
          items={SWITCH_ITEMS}
          handleOnClick={handleOnSetSwitchItem}
          activeItem={activeItem}
        />
        <Guarantee text={t("available.promo")} />
        <DefaultAPWrapper
          animationKey={subscriptionsAnimationKey}
          animationPreset="height"
          customStyles={availableListStyles}
        >
          {subscriptions.map((item, index) => (
            <Subscription key={index} {...item} />
          ))}
        </DefaultAPWrapper>
      </div>
      <DisplayModal />
    </div>
  );
}
