import * as React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="w-full space-y-2">
        {label && (
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {label}
          </label>
        )}
        <input
          className={cn(
            "flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            error ? "border-red-500" : "border-slate-200",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && <p className="text-red-500 text-xs mt-1 font-medium">{error}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", ...props }, ref) => {
    const variants = {
      primary: "bg-slate-900 text-slate-50 hover:bg-slate-900/90 shadow-sm",
      secondary: "bg-slate-100 text-slate-900 hover:bg-slate-100/80",
      outline: "border border-slate-200 bg-white hover:bg-slate-100 hover:text-slate-900 shadow-sm",
      ghost: "hover:bg-slate-100 hover:text-slate-900",
    };
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 px-4 py-2",
          variants[variant],
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export const Card = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn("rounded-lg border border-slate-200 bg-white text-slate-950 shadow-sm", className)}>
    {children}
  </div>
);
