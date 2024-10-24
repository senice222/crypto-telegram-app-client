import React from "react";
import styles from "./ModalHeader.module.scss";
import Image from "next/image";
import Label from "@/components/atoms/label/Label";
import MediaContainer from "@/components/atoms/mediaContainer/MediaContainer";

const crossIcon = (): React.ReactElement<SVGElement> => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M15.4417 14.5583C15.6859 14.8025 15.6859 15.1984 15.4417 15.4425C15.32 15.5642 15.16 15.6258 15 15.6258C14.84 15.6258 14.68 15.565 14.5584 15.4425L10 10.8842L5.4417 15.4425C5.32003 15.5642 5.16003 15.6258 5.00003 15.6258C4.84003 15.6258 4.68004 15.565 4.55837 15.4425C4.3142 15.1984 4.3142 14.8025 4.55837 14.5583L9.1167 10L4.55837 5.44171C4.3142 5.19754 4.3142 4.80168 4.55837 4.55751C4.80254 4.31335 5.19837 4.31335 5.44254 4.55751L10.0009 9.11587L14.5592 4.55751C14.8034 4.31335 15.1992 4.31335 15.4434 4.55751C15.6875 4.80168 15.6875 5.19754 15.4434 5.44171L10.885 10L15.4417 14.5583Z"
        fill="#ECF3FF"
        fillOpacity="0.5"
      />
    </svg>
  );
};

export interface IModalHeader {
  readonly icon: string;
  readonly title: string;
  readonly handleOnClose: () => void;
}

export default function ModalHeader({
  icon,
  title,
  handleOnClose,
}: IModalHeader) {
  return (
    <div className={styles.modal_header}>
      <div className={styles.modal_header__info}>
        <Image src={icon} alt="" width={20} height={20} unoptimized />
        <Label text={title} color="white" variant="default" />
      </div>
      <MediaContainer
        dimensions={20}
        hoverPreset="hover-rotate"
        handleOnClick={handleOnClose}
      >
        {crossIcon()}
      </MediaContainer>
    </div>
  );
}
