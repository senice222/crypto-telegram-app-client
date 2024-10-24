import React, { useEffect, useRef, useState } from "react";
import styles from "./DefaultAPWrapper.module.scss";
import {
  AnimatePresence,
  AnimationProps,
  motion,
  MotionProps,
  PanInfo,
} from "framer-motion";

const presetDirections: Record<TAPWrapperDirectionPresets, string> = {
  default: "",
  spaceBetween: styles.space_between,
  verticalCenter: styles.vertical_center,
  horizontalCenter: styles.horizontal_center,
  center: styles.center,
};

const getDirectionPreset = (preset: TAPWrapperDirectionPresets): string => {
  return presetDirections[preset] || styles.default;
};

const presetAnimation: Record<TAPWrapperAnimationPreset, AnimationProps> = {
  default: {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
    },
    exit: {
      opacity: 0,
    },
  },
  height: {
    initial: {
      opacity: 0,
      height: 0,
    },
    animate: {
      opacity: 1,
      height: "auto",
    },
    exit: {
      opacity: 0,
      height: 0,
    },
  },
  width: {
    initial: {
      opacity: 0,
      width: 0,
    },
    animate: {
      opacity: 1,
      width: "auto",
    },
    exit: {
      opacity: 0,
      width: 0,
    },
  },
  up: {
    initial: {
      opacity: 0,
      y: 30,
    },
    animate: {
      opacity: 1,
      y: 0,
    },
    exit: {
      opacity: 0,
      y: 30,
    },
  },
  down: {
    initial: {
      opacity: 0,
      y: -30,
    },
    animate: {
      opacity: 1,
      y: 0,
    },
    exit: {
      opacity: 0,
      y: -30,
    },
  },
  scale: {
    initial: {
      opacity: 0,
      scale: 0.96,
    },
    animate: {
      opacity: 1,
      scale: 1,
    },
    exit: {
      opacity: 0,
      scale: 0.96,
    },
  },
  right: {
    initial: {
      opacity: 0,
      x: 200,
    },
    animate: {
      opacity: 1,
      x: 0,
    },
    exit: {
      opacity: 0,
      x: 200,
    },
  },
  left: {
    initial: {
      opacity: 0,
      x: -200,
    },
    animate: {
      opacity: 1,
      x: 0,
    },
    exit: {
      opacity: 0,
      x: -200,
    },
  },
};

const getAnimationPreset = (
  preset: TAPWrapperAnimationPreset
): AnimationProps => {
  return presetAnimation[preset] || presetAnimation.default;
};

export type TAPWrapperPropAnimationPreset = "right" | "left";

export type TAPWrapperAnimationPreset =
  | "default"
  | "height"
  | "width"
  | "up"
  | "down"
  | "scale"
  | "right"
  | "left";

type TAPWrapperDirectionPresets =
  | "default"
  | "spaceBetween"
  | "verticalCenter"
  | "horizontalCenter"
  | "center";

const bottomSheetProperties: MotionProps = {
  drag: "y",
  dragConstraints: { top: 0, bottom: 0 },
  dragElastic: 0.05,
  inherit: false,
};

export interface IDefaultAPWrapper {
  readonly children: React.ReactNode;
  readonly animationKey: React.Key;
  readonly duration?: number;
  readonly directionPreset?: TAPWrapperDirectionPresets;
  readonly conditionSatisfied?: boolean;
  readonly customStyles?: React.CSSProperties;
  readonly animationPreset?: TAPWrapperAnimationPreset;
  readonly propAnimationPreset?: TAPWrapperPropAnimationPreset;
  readonly fallBack?: React.JSX.Element;
  readonly clickOutside?: boolean;
  readonly onClose?: () => void;
  readonly isBottomSheet?: boolean;
}

export default function DefaultAPWrapper({
  children,
  animationKey,
  duration = 0.15,
  directionPreset = "default",
  conditionSatisfied = true,
  customStyles,
  animationPreset = "default",
  fallBack,
  clickOutside = false,
  onClose,
  isBottomSheet,
}: IDefaultAPWrapper) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const directionPresetClass = getDirectionPreset(directionPreset);
  const animationPresetProps = getAnimationPreset(animationPreset);
  const bottomSheetProps = isBottomSheet ? bottomSheetProperties : {};
  const bottomSheetCustomStyles: React.CSSProperties = isBottomSheet
    ? isCollapsed
      ? { top: "94%" }
      : {}
    : {};

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!clickOutside) return;

    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        onClose?.();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [clickOutside, onClose]);

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (isBottomSheet) {
      if (!isCollapsed) {
        if (info.offset.y >= 200) {
          setIsCollapsed(true);
        }
      } else {
        if (info.offset.y <= -200) {
          setIsCollapsed(false);
        }
      }
    }
  };

  const formattedCustomStyles: React.CSSProperties = {
    ...customStyles,
    ...bottomSheetCustomStyles,
  };

  const transitionProps = {
    duration,
    type: "tween",
    ease: "linear",
  };

  const motionProps = isBottomSheet ? {} : { layout: true };

  return (
    <AnimatePresence mode="wait">
      {conditionSatisfied ? (
        <motion.div
          layout
          ref={wrapperRef}
          {...animationPresetProps}
          transition={{
            transitionProps,
          }}
          className={`${styles.default_ap_wrapper} ${directionPresetClass}`}
          key={animationKey}
          style={formattedCustomStyles}
          onClick={(e) => e.stopPropagation()}
          {...bottomSheetProps}
          {...motionProps}
          onDragEnd={handleDragEnd}
        >
          {children}
        </motion.div>
      ) : !conditionSatisfied && fallBack ? (
        <motion.div
          layout
          {...animationPresetProps}
          transition={{ duration }}
          className={`${styles.default_ap_wrapper} ${directionPresetClass}`}
          key={animationKey}
          style={customStyles}
          onClick={(e) => e.stopPropagation()}
          dragElastic={0.2}
        >
          {fallBack}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
