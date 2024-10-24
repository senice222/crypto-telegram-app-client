import React from "react";
import styles from "./PurchasedTariffCard.module.scss";
import { UserSubscriptionWithDetails } from "@/services/api/SubscriptionService";
import { variantToClassname } from "@/utils";
import H3 from "@/components/atoms/h3/H3";
import Label from "@/components/atoms/label/Label";
import Image from "next/image";
import Separator from "@/components/atoms/separator/Separator";
import { formatToUSD } from "@/utils/formatCurrencies";
import { blockchainIcons } from "@/constants/blockchains";
import { addOneMonth } from "@/utils/date";
import { TBlockchains } from "@/types/common";

export default function PurchasedTariffCard({
  blockchains,
  subscription,
}: UserSubscriptionWithDetails) {
  const subscriptionTypeClass = variantToClassname(
    subscription.subscriptionType,
    styles
  );
  const tariffCardClass = `${styles.purchased_tariff_card} ${subscriptionTypeClass}`;
  const formattedDate = addOneMonth(new Date(subscription.createdAt));

  return (
    <div className={tariffCardClass}>
      <H3 text={subscription.name} color={"white"} />
      <div className={styles.purchase_tariff_card__blockchains}>
        <Label text="Blockchains" variant="default" color="gray" />
        <div className={styles.blockchains__list}>
          {blockchains.map((item, index) => {
            const blockchainIcon = item.toUpperCase() as TBlockchains;

            if (blockchainIcon in blockchainIcons) {
              return (
                <Image
                  key={index}
                  src={blockchainIcons[blockchainIcon]}
                  alt=""
                  width={24}
                  height={24}
                  unoptimized
                />
              );
            }
          })}
        </div>
      </div>
      <Separator padding="12px 8px" />
      <div className={styles.purchase_tariff__amount}>
        <span className={styles.amount__value}>
          {formatToUSD(Number(subscription.price))}
        </span>
        <span className={styles.amount__description}>/month</span>
      </div>
      <div className={styles.purchase_tariff__next}>
        <Label text="Next payment" color="dark-gray" variant="x-small" />
        <Label text={formattedDate} variant="x-small" color="gray" />
      </div>
    </div>
  );
}
