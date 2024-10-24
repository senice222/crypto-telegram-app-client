import React from "react";
import styles from "./Footer.module.scss";
import Label from "@/components/atoms/label/Label";
import DefaultLink from "@/components/atoms/defaultLink/DefaultLink";

export default function Footer() {
  const adminUsername =
    process.env.NEXT_PUBLIC_ADMIN_USERNAME || "admin_username_not_specified";
  const adminTelegram = `https://t.me/${adminUsername}`;

  return (
    <div className={styles.footer}>
      <Label text="© 2024 Crypto App" color="dark-gray" variant="x-small" />
      <DefaultLink
        text="Terms of Use"
        href={adminTelegram} //TODO: To centralized storage
        color="gray"
        variant="x-small"
      />
    </div>
  );
}
