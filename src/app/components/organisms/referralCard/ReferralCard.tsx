import React from "react";
import styles from "./ReferralCard.module.scss";
import Box from "@/components/atoms/box/Box";
import CopyLink from "@/components/atoms/copyLink/CopyLink";
import Label from "@/components/atoms/label/Label";
import H1 from "@/components/atoms/h1/H1";
import Copy from "@/components/atoms/copy/Copy";
import Separator from "@/components/atoms/separator/Separator";
import InlineStat from "@/components/atoms/inlineStat/InlineStat";
import { IBoxObj } from "@/types/ui";
import { formatToUSD } from "@/utils/formatCurrencies";

const outerBoxStyles: IBoxObj = {
  variant: "dark-gray",
  padding: "4px",
  borderRadius: 16,
  gap: 4,
  direction: "flex-column",
};

const innerBoxStyles: IBoxObj = {
  variant: "gray",
  padding: "16px 20px",
  borderRadius: 12,
  gap: 6,
  direction: "flex-column",
  border: "b-gray",
};

export default function ReferralCard({
  promocode,
  referralActivationAmount,
}: {
  promocode: string;
  referralActivationAmount: number;
}) {
  const handleOnCopyLink = () => {
    const telegramBotUrl = process.env.NEXT_PUBLIC_BOT_URL;
    if (!telegramBotUrl) return;
    const promocodeBotStartUrl = `${telegramBotUrl}?start=${promocode}`;

    navigator.clipboard.writeText(promocodeBotStartUrl);
  };

  const formattedReferralActivationAmount = formatToUSD(
    referralActivationAmount
  );

  return (
    <Box {...outerBoxStyles}>
      <Box {...innerBoxStyles}>
        <Label text="Your referral code" color="gray" variant="default" />
        <div className={styles.referral_card__code}>
          <H1 text={promocode} color="white" />
          <Copy handleOnClick={handleOnCopyLink} />
        </div>
        <Separator padding="12px 8px" />
        <InlineStat
          label="Your indibidual percentage of sales:"
          value={formattedReferralActivationAmount}
        />
        <InlineStat label="You'll earn from each purchase:" value="200$" />
      </Box>
      <CopyLink padding="11.5px" handleOnClick={handleOnCopyLink} />
    </Box>
  );
}
