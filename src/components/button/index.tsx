import { BUTTON_TYPES } from "@/configs/themes";
import { MouseEvent } from "react";

const Button = ({
  type,
  children,
  onClick,
  style,
  disabled = false,
}: {
  type: BUTTON_TYPES;
  children: React.ReactNode;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  style?: React.CSSProperties;
  disabled?: boolean;
}) => {
  const varibleName = `--btn-${type.toLowerCase()}`;
  return (
    <button
      disabled={disabled}
      onClick={(e) => onClick(e)}
      style={style}
      className={`text-[${varibleName}-color] bg-[${varibleName}-bg]`}
    >
      {children}
    </button>
  );
};

export default Button;
