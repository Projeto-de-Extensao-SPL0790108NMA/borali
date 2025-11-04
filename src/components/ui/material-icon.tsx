import React from "react";

import { cn } from "@/lib/utils";

interface MaterialIconProps {
  icon: string;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  onClick?: () => void;
  style?: React.CSSProperties;
  sizePx?: number; // controla font-size diretamente, útil para sobrescrever CSS do Google
}

const sizeClasses = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
};

export function MaterialIcon({
  icon,
  className,
  size = "md",
  onClick,
  style,
  sizePx,
}: MaterialIconProps) {
  return (
    <span
      className={cn(
        "material-icons",
        sizeClasses[size],
        "select-none",
        onClick && "cursor-pointer",
        className
      )}
      style={{ fontSize: sizePx, lineHeight: sizePx ? 1 : undefined, ...style }}
      onClick={onClick}
    >
      {icon}
    </span>
  );
}

// Componente para ícones com texto (Material Icons Outlined)
export function MaterialIconOutlined({
  icon,
  className,
  size = "md",
  onClick,
  style,
  sizePx,
}: MaterialIconProps) {
  return (
    <span
      className={cn(
        "material-icons-outlined",
        sizeClasses[size],
        "select-none",
        onClick && "cursor-pointer",
        className
      )}
      style={{ fontSize: sizePx, lineHeight: sizePx ? 1 : undefined, ...style }}
      onClick={onClick}
    >
      {icon}
    </span>
  );
}

// Componente para ícones preenchidos (Material Icons Filled)
export function MaterialIconFilled({
  icon,
  className,
  size = "md",
  onClick,
  style,
  sizePx,
}: MaterialIconProps) {
  return (
    <span
      className={cn(
        "material-icons",
        sizeClasses[size],
        "select-none",
        onClick && "cursor-pointer",
        className
      )}
      style={{ fontSize: sizePx, lineHeight: sizePx ? 1 : undefined, ...style }}
      onClick={onClick}
    >
      {icon}
    </span>
  );
}

// Componente para ícones com bordas (Material Icons Round)
export function MaterialIconRound({
  icon,
  className,
  size = "md",
  onClick,
  style,
  sizePx,
}: MaterialIconProps) {
  return (
    <span
      className={cn(
        "material-icons-round",
        sizeClasses[size],
        "select-none",
        onClick && "cursor-pointer",
        className
      )}
      style={{ fontSize: sizePx, lineHeight: sizePx ? 1 : undefined, ...style }}
      onClick={onClick}
    >
      {icon}
    </span>
  );
}

// Componente para ícones Sharp
export function MaterialIconSharp({
  icon,
  className,
  size = "md",
  onClick,
  style,
  sizePx,
}: MaterialIconProps) {
  return (
    <span
      className={cn(
        "material-icons-sharp",
        sizeClasses[size],
        "select-none",
        onClick && "cursor-pointer",
        className
      )}
      style={{ fontSize: sizePx, lineHeight: sizePx ? 1 : undefined, ...style }}
      onClick={onClick}
    >
      {icon}
    </span>
  );
}

// Componente para ícones Two Tone
export function MaterialIconTwoTone({
  icon,
  className,
  size = "md",
  onClick,
  style,
  sizePx,
}: MaterialIconProps) {
  return (
    <span
      className={cn(
        "material-icons-two-tone",
        sizeClasses[size],
        "select-none",
        onClick && "cursor-pointer",
        className
      )}
      style={{ fontSize: sizePx, lineHeight: sizePx ? 1 : undefined, ...style }}
      onClick={onClick}
    >
      {icon}
    </span>
  );
}
