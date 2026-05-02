import { cn } from '@/lib/utils/cn'

interface CardProps {
  children: React.ReactNode
  className?: string
}

export function Card({ children, className }: CardProps) {
  return (
    <div className={cn('rounded-sm border border-[#E8E2DA] bg-white', className)}>
      {children}
    </div>
  )
}

export function CardHeader({ children, className }: CardProps) {
  return <div className={cn('px-6 py-5 border-b border-[#E8E2DA]', className)}>{children}</div>
}

export function CardBody({ children, className }: CardProps) {
  return <div className={cn('px-6 py-5', className)}>{children}</div>
}

export function CardFooter({ children, className }: CardProps) {
  return (
    <div className={cn('px-6 py-4 border-t border-[#E8E2DA] bg-[#FAFAF8]', className)}>
      {children}
    </div>
  )
}
