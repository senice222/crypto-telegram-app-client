import React from "react";
import styles from "./Navigation.module.scss";
import MediaDropdown from "@/components/molecules/mediaDropdown/MediaDropdown";
import { TMediaDropdownItem } from "@/components/molecules/mediaDropdown/item/Item";
import { burgerSlice } from "@/store/slices/burgerSlice";
import { useAppDispatch } from "@/store/hooks/redux";
import {
  globeEarthIcon,
  grayGiftIcon,
  helpCenterIcon,
  referralsIcon,
  toolIcon,
} from "./Icons";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { LANGUAGES } from "@/constants/languages";

interface ICategory {
  items: Omit<TMediaDropdownItem, "selected">[];
}

export default function Navigation() {
  const { setBurgerState } = burgerSlice.actions;
  const dispatch = useAppDispatch();
  const router = useRouter();
  const locale = useLocale();
  const currentLanguage =
    LANGUAGES.find((item) => item.code === locale)?.language || "English";

  const handleOnSelectLanguage = () => {
    dispatch(setBurgerState("select-language"));
  };

  const handleOnViewPage = (url: string) => {
    router.push(url);
  };

  const navigation: ICategory[] = [
    {
      items: [
        {
          id: 0,
          text: "Subscription",
          icon: toolIcon(),
          handleOnClick: () => handleOnViewPage("/subscription"),
        },
        {
          id: 1,
          text: "Referrals",
          icon: referralsIcon(),
          handleOnClick: () => handleOnViewPage("/referrals"),
        },
        {
          id: 2,
          text: "Help Center",
          icon: helpCenterIcon(),
          handleOnClick: () => handleOnViewPage("/faq"),
        },
      ],
    },
    {
      items: [
        {
          id: 3,
          text: "Recieve Discount",
          icon: grayGiftIcon(),
          handleOnClick: () => handleOnViewPage("/referrals"),
        },
      ],
    },
    {
      items: [
        {
          id: 4,
          text: currentLanguage,
          icon: globeEarthIcon(),
          isArrow: true,
          handleOnClick: handleOnSelectLanguage,
        },
      ],
    },
  ];

  return (
    <div className={styles.navigation}>
      <MediaDropdown categories={navigation} />
    </div>
  );
}
