import { ReactNode, useState } from "react";
import clsx from "clsx";
import styles from "./Button.module.scss";

export type Size = "sm" | "md" | "lg" | "xl";
export type Variant =
  | "contained"
  | "outlined"
  | "text-outlined"
  | "text-color"
  | "text";

interface ButtonProps {
  children: string | JSX.Element | ReactNode;
  variant?: Variant;
  size?: Size;
  startIcon?: JSX.Element;
  endIcon?: JSX.Element;
  onClick?: () => void;
  className?: string;
}

export default function Button(props: ButtonProps) {
  const {
    children,
    variant = "text",
    size = "md",
    startIcon,
    endIcon,
    onClick,
    className,
  } = props;
  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    setSelected(!selected);
    onClick?.();
  };

  return (
    <button
      className={clsx(
        className,
        styles.button,
        styles[`${variant}`],
        styles[`${size}`]
      )}
      data-selected={selected}
      onClick={handleClick}
    >
      {startIcon}
      {children}
      {endIcon}
    </button>
  );
}
