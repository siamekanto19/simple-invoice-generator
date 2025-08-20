import { Invoice } from '@/types'
import React, { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'

type Props = {
  title: string
  children: React.ReactNode | React.ReactNode[]
  className?: string
  contentClassName?: string
  icon?: React.ReactNode
  description?: string
  defaultExpanded?: boolean
}

const AnimatedContainer = ({
  title,
  children,
  className,
  contentClassName,
  icon,
  description,
  defaultExpanded = false,
}: Props) => {
  const [parent] = useAutoAnimate<HTMLDivElement>({ duration: 300 })
  const [expanded, setExpanded] = useState(defaultExpanded)

  return (
    <div
      className={cn(
        'w-full rounded-xl border border-border/60 bg-card/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300',
        className
      )}
      ref={parent}
    >
      <button
        type='button'
        className='flex items-center justify-between w-full cursor-pointer p-4 hover:bg-muted/30 transition-colors duration-200 rounded-t-xl'
        onClick={() => setExpanded(!expanded)}
      >
        <div className='flex items-center gap-3'>
          {/* Icon Container */}
          {icon && (
            <div className='p-2 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg'>
              <div className='text-primary'>{icon}</div>
            </div>
          )}

          {/* Title and Description */}
          <div className='text-left'>
            <h2 className='text-base font-semibold text-foreground'>{title}</h2>
            {description && (
              <p className='text-sm text-muted-foreground mt-0.5'>
                {description}
              </p>
            )}
          </div>
        </div>

        {/* Chevron Icon */}
        <div className='flex-shrink-0'>
          <ChevronDown
            size={20}
            className='text-muted-foreground transition-colors duration-200'
          />
        </div>
      </button>

      {expanded && (
        <div className='overflow-hidden'>
          <div className='border-t border-border/40' />
          <div className={cn('p-4 w-full', contentClassName)}>{children}</div>
        </div>
      )}

      {/* Progress indicator */}
      {!expanded && (
        <div className='h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent' />
      )}
    </div>
  )
}

export default AnimatedContainer
