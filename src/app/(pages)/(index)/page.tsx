/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import styles from "./Index.module.scss";
import H1 from "@/components/atoms/h1/H1";
import Label from "@/components/atoms/label/Label";
import IconButton from "@/components/atoms/iconButton/IconButton";
import Promo from "@/components/atoms/promo/Promo";
import giftIcon from "@/assets/icons/gift.svg";
import starIcon from "@/assets/icons/black-sparkle.svg";
import stackIcon from "@/assets/icons/stack.svg";
import Separator from "@/components/atoms/separator/Separator";
import H3 from "@/components/atoms/h3/H3";
import Image from "next/image";
import completedWalletsImage from "@/assets/images/illustrations/completed-wallets.png";
import monitoringActivityImage from "@/assets/images/illustrations/monitoring-activity.png";
import foundStatisticsImage from "@/assets/images/illustrations/found-statistics.png";
import blockchainsImage from "@/assets/images/illustrations/blockchains.png";
import supportChatImage from "@/assets/images/illustrations/support-chat.png";
import whiteLogoImage from "@/assets/images/logos/logo-white-56.png";
import discountImage from "@/assets/images/discount-50.png";
import favouritesImage from "@/assets/images/favourites.png";
import Feature from "@/components/atoms/feature/Feature";
import Tag from "@/components/atoms/tag/Tag";
import InlineFeature from "@/components/atoms/inlineFeature/InlineFeature";
import Info from "@/components/atoms/info/Info";
import Footer from "@/components/organisms/footer/Footer";
import Header from "@/components/organisms/header/Header";
import { setupStore } from "@/store/store";
import { Provider } from "react-redux";
import DisplayModal from "@/components/organisms/displayModal/DisplayModal";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { IFeature } from "@/components/atoms/feature/Feature";
import { IInlineFeature } from "@/components/atoms/inlineFeature/InlineFeature";
import lightningImage from "@/assets/images/lightning.png";
import billImage from "@/assets/images/bill.png";
import shieldImage from "@/assets/images/shield.png";
import globeImage from "@/assets/images/globe.png";
import desktopMobileIcon from "@/assets/icons/features/desktop-mobile.svg";
import radarIcon from "@/assets/icons/features/radar.svg";
import leafIcon from "@/assets/icons/features/leaf.svg";
import packageIcon from "@/assets/icons/features/package.svg";
import supportIcon from "@/assets/icons/features/support.svg";

export default function Page() {
  const store = setupStore();
  const router = useRouter();
  const t = useTranslations("index");

  const handleOnPurchase = () => {
    router.push("/subscription");
  };

  const handleOnViewHowItWorks = () => {
    router.push("/faq");
  };

  const handleOnGetDiscountRefferal = () => {
    router.push("/referrals");
  };

  const handleOnOpenChat = () => {
    const adminUsername =
      process.env.NEXT_PUBLIC_ADMIN_USERNAME || "admin_username_not_specified";
    const adminTelegram = `https://t.me/${adminUsername}`;

    router.push(adminTelegram);
  };

  const handleOnViewPlans = () => {
    router.push("/subscription");
  };

  const INLINE_FEATURES: IInlineFeature[] = [
    {
      media: desktopMobileIcon.src,
      text: t("features.inline.f1"),
    },
    {
      media: radarIcon.src,
      text: t("features.inline.f2"),
    },
    {
      media: leafIcon.src,
      text: t("features.inline.f3"),
    },
    {
      media: packageIcon.src,
      text: t("features.inline.f4"),
    },
    {
      media: supportIcon.src,
      text: t("features.inline.f5"),
    },
  ];

  const FEATURES: IFeature[] = [
    {
      media: lightningImage.src,
      title: t("features.f1.title"),
      description: t("features.f1.desc"),
    },
    {
      media: billImage.src,
      title: t("features.f2.title"),
      description: t("features.f2.desc"),
    },
    {
      media: shieldImage.src,
      title: t("features.f3.title"),
      description: t("features.f3.desc"),
    },
    {
      media: globeImage.src,
      title: t("features.f4.title"),
      description: t("features.f4.desc"),
    },
  ];

  return (
    <Provider store={store}>
      <div className={styles.index}>
        <Header />
        <div className={styles.index__about}>
          <div className={styles.about__heading}>
            <H1 text={t("about.heading.title")} color="white" />
            <Label
              text={t("about.heading.desc")}
              variant="default"
              color="gray"
            />
          </div>
          <IconButton
            label={t("about.heading.button")}
            arrow="up-right"
            variant="primary"
            handleOnClick={handleOnPurchase}
          />
          <Promo text={t("about.heading.promo")} media={giftIcon.src} />
        </div>
        <Separator />
        <div className={styles.index__usage}>
          <div className={styles.usage__heading}>
            <H3 text={t("usage.heading.sub")} color="dark-gray" />
            <H1 text={t("usage.heading.title")} color="white" />
          </div>
          <Image
            src={completedWalletsImage}
            alt="Completed Wallets"
            width={350}
            height={184}
            unoptimized
          />
          <Label
            color="gray"
            variant="default"
            text={t("usage.heading.desc")}
          />
          <IconButton
            label={t("usage.heading.button")}
            arrow="white-up-right"
            variant="secondary"
            handleOnClick={handleOnViewHowItWorks}
          />
        </div>
        <Separator />
        <div className={styles.index__features}>
          <div className={styles.features__heading}>
            <Tag text={t("features.heading.sub")} />
            <H1 text={t("features.heading.title")} color="white" />
          </div>
          <div className={styles.features__list}>
            {FEATURES.map((feature, index) => (
              <Feature key={index} {...feature} />
            ))}
          </div>
        </div>
        <Separator />
        <div className={styles.index__functionality}>
          <div className={styles.functionality__heading}>
            <Tag text={t("functionality.heading.sub")} />
            <H1 text={t("functionality.heading.title")} color="white" />
          </div>
          <div className={styles.functionality__illustrations}>
            <Image
              src={monitoringActivityImage}
              alt="Monitoring"
              width={350}
              height={318}
              unoptimized
            />
            <Image
              src={foundStatisticsImage}
              alt="Statistics"
              width={350}
              height={318}
              unoptimized
            />
          </div>
          <div className={styles.functionality__features}>
            <Label
              text={t("functionality.features.desc")}
              variant="default"
              color="gray"
            />
            <div className={styles.features__list}>
              {INLINE_FEATURES.map((item, index) => (
                <InlineFeature key={index} {...item} />
              ))}
            </div>
          </div>
        </div>
        <Separator />
        <div className={styles.index__blockchains}>
          <div className={styles.blockchains__heading}>
            <Image
              src={blockchainsImage}
              alt="Blockchains"
              width={168}
              height={108}
              unoptimized
            />
            <H1 text={t("blockchains.heading.title")} color="white" />
          </div>
          <Info text={t("blockchains.heading.desc")} />
        </div>
        <Separator />
        <div className={styles.index__referral}>
          <div className={styles.referral__heading}>
            <H3 text={t("referral.heading.sub")} color="dark-gray" />
            <div className={styles.heading__illustrations}>
              <Image
                src={discountImage}
                alt="Discount"
                width={76}
                height={41}
                unoptimized
              />
              <Image
                src={favouritesImage}
                alt="Favourites"
                width={48}
                height={40}
                unoptimized
              />
            </div>
            <H1 text={t("referral.heading.title")} color="white" />
          </div>
          <IconButton
            label="More info"
            variant="primary"
            media={starIcon.src}
            handleOnClick={handleOnGetDiscountRefferal}
            width={16}
            height={16}
          />
        </div>
        <Separator />
        <div className={styles.index__support}>
          <H3 text={t("support.sub")} color="dark-gray" />
          <Image
            src={supportChatImage}
            alt="Support chat"
            width={350}
            height={298}
            unoptimized
          />
          <Label variant="default" color="gray" text={t("support.desc")} />
          <IconButton
            label={t("support.button")}
            arrow="white-up-right"
            variant="secondary"
            handleOnClick={handleOnOpenChat}
          />
        </div>
        <Separator />
        <div className={styles.index__join}>
          <div className={styles.join__heading}>
            <Image
              src={whiteLogoImage}
              alt="Logo"
              width={56}
              height={56}
              unoptimized
            />
            <H1 text={t("join.heading.title")} color="white" />
          </div>
          <Label text={t("join.heading.desc")} variant="default" color="gray" />
          <IconButton
            label={t("join.heading.button")}
            media={stackIcon}
            variant="primary"
            handleOnClick={handleOnViewPlans}
          />
        </div>
        <Separator />
        <Footer />
        <DisplayModal />
      </div>
    </Provider>
  );
}
