'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface Props {
  as?: 'section' | 'div'
  style?: React.CSSProperties
  children: React.ReactNode
}

export function AnimateSection({ as = 'section', children, style }: Props) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  if (!mounted) {
    const Tag = as
    return <Tag style={style}>{children}</Tag>
  }

  const MotionTag = as === 'div' ? motion.div : motion.section
  return (
    <MotionTag
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      style={style}
    >
      {children}
    </MotionTag>
  )
}
