'use client'

import { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils/cn'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
  {
    variants: {
      variant: {
        primary:
          'bg-[#1C1C1C] text-white hover:bg-[#8B6B4A] focus-visible:ring-[#8B6B4A]',
        gold:
          'bg-[#8B6B4A] text-white hover:bg-[#7A5C3B] focus-visible:ring-[#8B6B4A]',
        outline:
          'border border-[#1C1C1C] text-[#1C1C1C] bg-transparent hover:bg-[#1C1C1C] hover:text-white',
        ghost:
          'bg-transparent text-[#1C1C1C] hover:bg-[#F0EBE3]',
        destructive:
          'bg-red-600 text-white hover:bg-red-700',
        white:
          'bg-white text-[#1C1C1C] hover:bg-[#F8F4EF] shadow-sm',
      },
      size: {
        sm: 'h-9 px-4 text-sm',
        md: 'h-11 px-6 text-sm',
        lg: 'h-13 px-8 text-base tracking-wide',
        xl: 'h-14 px-10 text-base tracking-wider uppercase',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
        )}
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
