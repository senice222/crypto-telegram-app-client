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

export const FEATURES: IFeature[] = [
  {
    media: lightningImage.src,
    title: "Experience and Reliability",
    description:
      "The app has been developed and tested over four years. Since 2020, both its creators and clients have been using it without issues.",
  },
  {
    media: billImage.src,
    title: "Money-Back Guarantee",
    description:
      "If you don't find any wallets within a week, we will refund your money. This is our commitment to you.",
  },
  {
    media: shieldImage.src,
    title: "Legality",
    description:
      "Finding forgotten crypto wallets is like searching for lost jewelry on the beach with a metal detector. Neither we nor our clients have encountered legal issues in the past four years.",
  },
  {
    media: globeImage.src,
    title: "Worldwide Accessibility",
    description:
      "Work from anywhere in the world — the app has no country restrictions and works on all devices: iPhone, Mac, Windows, and Android.",
  },
];

export const INLINE_FEATURES: IInlineFeature[] = [
  {
    media: desktopMobileIcon.src,
    text: "Device Compatibility",
  },
  {
    media: radarIcon.src,
    text: "Transparent Earnings",
  },
  {
    media: leafIcon.src,
    text: "No Hardware Requirements",
  },
  {
    media: packageIcon.src,
    text: "Fair Terms",
  },
  {
    media: supportIcon.src,
    text: "Support",
  },
];
