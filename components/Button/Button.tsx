import { ReactNode, useState } from "react";
import clsx from "clsx";
import styles from "./Button.module.scss";

export type Size = "sm" | "md" | "lg" | "xl";
export type Variant =
  | "contained"
  | "contained-outlined"
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
  disabled?: boolean;
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
    disabled,
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
      data-disabled={disabled}
      data-selected={selected}
      onClick={handleClick}
    >
      {startIcon}
      {children}
      {endIcon}
    </button>
  );
}
