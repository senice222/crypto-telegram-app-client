import React from "react";
import styles from "./Brand.module.scss";
import Image from "next/image";
import logoImage from "@/assets/images/logos/logo-36.png";
import Label from "@/components/atoms/label/Label";
import Link from "next/link";

export default function Brand() {
  return (
    <Link href="/" className={styles.brand}>
      <Image src={logoImage.src} alt="" width={36} height={36} unoptimized />
      <Label text="Crypto App" color="white" variant="default" />
    </Link>
  );
}
