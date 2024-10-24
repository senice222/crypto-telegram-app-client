"use client";

import React from "react";
import styles from "./Faq.module.scss";
import { setupStore } from "@/store/store";
import { Provider } from "react-redux";
import Header from "@/components/organisms/header/Header";
import Separator from "@/components/atoms/separator/Separator";
import H3 from "@/components/atoms/h3/H3";
import H1 from "@/components/atoms/h1/H1";
import Accordion from "@/components/molecules/accordion/Accordion";
import { useTranslations } from "next-intl";

import { IAccordionItem } from "@/components/molecules/accordion/accordionItem/AccordionItem";

export default function Page() {
  const store = setupStore();

  const t = useTranslations("faq");

  const FAQ: Omit<IAccordionItem, "id">[] = [
    {
      label: t("q1.label"),
      body: t("q1.body"),
    },
    {
      label: t("q2.label"),
      body: t("q2.body"),
    },
    {
      label: t("q3.label"),
      body: t("q3.body"),
    },
    {
      label: t("q4.label"),
      body: t("q4.body"),
    },
    {
      label: t("q5.label"),
      body: t("q5.body"),
    },
    {
      label: t("q6.label"),
      body: t("q6.body"),
    },
    {
      label: t("q7.label"),
      body: t("q7.body"),
    },
    {
      label: t("q8.label"),
      body: t("q8.body"),
    },
    {
      label: t("q9.label"),
      body: t("q9.body"),
    },
  ];

  return (
    <Provider store={store}>
      <div className={styles.faq}>
        <Header />
        <div className={styles.faq__heading}>
          <div className={styles.heading__title}>
            <H3 text={t("heading.sub")} color="dark-gray" />
            <H1 text={t("heading.title")} color="white" />
          </div>
          {/* input */}
        </div>
        <Separator padding="8px" />
        <div className={styles.faq__list}>
          <Accordion items={FAQ} />
        </div>
      </div>
    </Provider>
  );
}
