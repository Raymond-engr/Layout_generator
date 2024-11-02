import React from 'react';
import { cn } from "../lib/utils";

// Base button interface
interface ActionButtonBaseProps {
  label?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

// Main action button interface
interface ActionButtonProps extends ActionButtonBaseProps {
  variant?: 'primary' | 'secondary' | 'circular';
  position?: 'top' | 'bottom';
}

// Size adjust button interface
interface SizeAdjustButtonProps extends ActionButtonBaseProps {
  color: 'increase' | 'decrease';
}

// Action Button Component
const ActionButton = ({ 
  label, 
  onClick, 
  icon, 
  disabled = false,
  variant = 'primary',
  position = 'bottom',
  className
}: ActionButtonProps) => {
  const baseStyles = "inline-flex items-center justify-center gap-2.5 transition-all";
  
  const variantStyles = {
    primary: "h-10 px-[18px] py-2.5 bg-white rounded-[47px] border border-[#f6e2c4]",
    secondary: "h-10 px-[18px] py-2.5 bg-white rounded-[47px] border border-[#f6e2c4]",
    circular: "w-12 h-12 rounded-full flex items-center justify-center"
  };
  
  const positionStyles = {
    top: "md:order-first",
    bottom: "md:order-last"
  };
  
  const textStyles = cn(
    "text-base font-nohemi",
    variant === 'primary' ? disabled ? "font-light" : "font-normal" : "font-light",
    disabled ? "text-gray-400" : "text-black"
  );

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        baseStyles,
        variantStyles[variant],
        positionStyles[position],
        disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50",
        className
      )}
    >
      {icon && <div className="w-6 h-6">{icon}</div>}
      {label && <span className={textStyles}>{label}</span>}
    </button>
  );
};

// Size Adjust Button Component
const SizeAdjustButton = ({
  color,
  onClick,
  icon,
  disabled
}: SizeAdjustButtonProps) => {
  const colorStyles = {
    increase: "bg-[#ffe2b7]",
    decrease: "bg-[#fdebd0]"
  };

  return (
    <ActionButton
      onClick={onClick}
      icon={icon}
      disabled={disabled}
      variant="circular"
      className={colorStyles[color]}
    />
  );
};

// AddToCartWithTotal Component
const AddToCartWithTotal = ({
  total,
  onAddToCart,
  disabled
}: {
  total: string;
  onAddToCart?: () => void;
  disabled?: boolean;
}) => {
  return (
    <div className="flex flex-col items-start gap-2">
      <ActionButton
        label="Add to Cart"
        onClick={onAddToCart}
        disabled={disabled}
        variant="primary"
      />
      <div className="flex items-center gap-1">
        <span className="text-black text-base font-medium font-nohemi">TOTAL:</span>
        <span className="text-black text-base font-medium font-nohemi">{total}</span>
      </div>
    </div>
  );
};

// Container component for action buttons
const ActionButtonContainer = ({
  children,
  position = 'bottom'
}: {
  children: React.ReactNode;
  position?: 'top' | 'bottom';
}) => {
  return (
    <div className={cn(
      "flex flex-wrap gap-4",
      position === 'top' ? 
        "justify-between md:justify-start" : 
        "justify-center md:justify-between",
      "w-full"
    )}>
      {children}
    </div>
  );
};

// Main Layout Container
const ActionLayout = ({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn(
      "w-full flex flex-col gap-4",
      "md:flex-row md:justify-between md:items-center",
      className
    )}>
      {children}
    </div>
  );
};

export {
  ActionButton,
  SizeAdjustButton,
  AddToCartWithTotal,
  ActionButtonContainer,
  ActionLayout
};