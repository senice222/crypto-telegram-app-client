"use client";

import React, { useEffect, useState } from "react";
import styles from "./Referrals.module.scss";
import { setupStore } from "@/store/store";
import { Provider } from "react-redux";
import Header from "@/components/organisms/header/Header";
import InlineFeature from "@/components/atoms/inlineFeature/InlineFeature";
import Label from "@/components/atoms/label/Label";
import Separator from "@/components/atoms/separator/Separator";
import IconButton from "@/components/atoms/iconButton/IconButton";
import H3 from "@/components/atoms/h3/H3";
import Image from "next/image";
import whiteReferralsIcon from "@/assets/icons/white-referrals.svg";
import whiteGiftIcon from "@/assets/icons/white-gift.svg";
import whiteStarIcon from "@/assets/icons/white-star.svg";
import ReferralCard from "@/components/organisms/referralCard/ReferralCard";
import OlList from "@/components/atoms/olList/OlList";
import { IOlListItem } from "@/components/atoms/olList/OlList";
import SmallStat from "@/components/atoms/smallStat/SmallStat";
import referralService from "@/services/api/ReferralService";
import { formatToUSD } from "@/utils/formatCurrencies";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useTelegramUserData } from "@/hooks/useTelegramUserData";

export default function Page() {
  const store = setupStore();
  const router = useRouter();
  const userData = useTelegramUserData();

  const [referralData, setReferralData] = useState({
    promocode: "",
    activations: 0,
    revenue: 0,
    referralActivationAmount: 0,
  });

  const handleOnOpenChatSupport = () => {
    const adminUsername =
      process.env.NEXT_PUBLIC_ADMIN_USERNAME || "admin_username_not_specified";
    const adminTelegram = `https://t.me/${adminUsername}`;

    router.push(adminTelegram);
  };

  const formattedRevenue = formatToUSD(referralData.revenue);

  useEffect(() => {
    const fetchReferralData = async () => {
      if (userData?.id) {
        try {
          const response = await referralService.getReferralStats(userData.id);

          if (!response) {
            console.error("Error");
            return;
          }

          setReferralData(response);
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchReferralData();
  }, [userData?.id]);

  const t = useTranslations("referrals");

  const MARKETING: IOlListItem[] = [
    {
      text: t("marketing.1"),
    },
    {
      text: t("marketing.2"),
    },
    {
      text: t("marketing.3"),
    },
    {
      text: t("marketing.4"),
    },
    {
      text: t("marketing.5"),
    },
    {
      text: t("marketing.6"),
    },
    {
      text: t("marketing.desc"),
    },
  ];

  return (
    <Provider store={store}>
      <div className={styles.referrals}>
        <Header />
        <div className={styles.referrals__statistics}>
          <div className={styles.statistics__heading}>
            <InlineFeature
              media={whiteReferralsIcon.src}
              text={t("heading.title")}
              padding="0"
            />
            <Label
              text={String(referralData.activations)}
              variant="default"
              color="dark-gray"
            />
          </div>
          <ReferralCard
            referralActivationAmount={referralData.referralActivationAmount}
            promocode={referralData.promocode}
          />
        </div>
        <Separator padding="8px 32px" />
        <div className={styles.referrals__rewards}>
          <div className={styles.rewards__data}>
            <InlineFeature
              media={whiteGiftIcon.src}
              text={t("rewards.title")}
              padding="0"
            />
            <Label color="gray" variant="default" text={t("rewards.desc")} />
            <div className={styles.data__statistics}>
              <SmallStat
                title={t("statistics.bal")}
                value={formattedRevenue}
                variant="green"
              />
              <Separator variant="vertical" padding="0" height={32} />
              <SmallStat
                title={t("statistics.act")}
                value={String(referralData.activations)}
                variant="gray"
              />
            </div>
            <Label
              color="dark-gray"
              variant="x-small"
              text={t("statistics.desc")}
            />
          </div>
          <IconButton
            label={t("statistics.button")}
            variant="secondary"
            arrow="white-up-right"
            handleOnClick={handleOnOpenChatSupport}
          />
        </div>
        <Separator padding="8px 32px" />
        <div className={styles.referrals__marketing}>
          <div className={styles.marketing__info}>
            <H3 text={t("marketing.sub")} color="exclusive" />
            <div className={styles.marketing__heading}>
              <Image
                src={whiteStarIcon.src}
                alt="Star"
                width={20}
                height={20}
                unoptimized
              />
              <Label
                text={t("marketing.title")}
                color="white"
                variant="default"
              />
            </div>
            <OlList items={MARKETING} padding="0 0 0 24px" />
            <Label
              variant="default"
              color="dark-gray"
              text={t("marketing.desc")}
            />
          </div>
          <IconButton
            label={t("marketing.button")}
            arrow="up-right"
            variant="primary"
            handleOnClick={handleOnOpenChatSupport}
          />
        </div>
      </div>
    </Provider>
  );
}
