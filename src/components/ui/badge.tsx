import { cn } from '@/lib/utils/cn'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'gold' | 'green' | 'red' | 'outline'
  className?: string
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        {
          'bg-[#F0EBE3] text-[#8B6B4A]': variant === 'default',
          'bg-[#8B6B4A] text-white': variant === 'gold',
          'bg-emerald-50 text-emerald-700': variant === 'green',
          'bg-red-50 text-red-700': variant === 'red',
          'border border-[#E8E2DA] text-[#6B6B6B] bg-transparent': variant === 'outline',
        },
        className
      )}
    >
      {children}
    </span>
  )
}
