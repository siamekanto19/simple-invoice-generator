import { Invoice } from '@/types'
import React, { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

type Props = {
  title: string
  children: React.ReactNode | React.ReactNode[]
  className?: string
  contentClassName?: string
}

const AnimatedContainer = ({
  title,
  children,
  className,
  contentClassName,
}: Props) => {
  const [parent] = useAutoAnimate<HTMLDivElement>()
  const [expanded, setExpanded] = useState(false)

  return (
    <div className={cn('w-full rounded-md border', className)} ref={parent}>
      <button
        type='button'
        className='flex items-center justify-between w-full cursor-pointer p-3'
        onClick={() => setExpanded(!expanded)}
      >
        <h2 className='text-base font-semibold'>{title}</h2>
        <div>
          <ChevronDown
            size={20}
            className={cn(
              'transition-transform duration-200 text-muted-foreground',
              {
                'rotate-180': expanded,
              }
            )}
          />
        </div>
      </button>
      {expanded && (
        <div
          className={cn(
            'pt-4 px-3 pb-3 w-full border-t grid grid-flow-row grid-cols-1 md:grid-cols-2 gap-4',
            contentClassName
          )}
        >
          {children}
        </div>
      )}
    </div>
  )
}

export default AnimatedContainer
