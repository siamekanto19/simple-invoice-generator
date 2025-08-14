import React, { useState } from 'react'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

// Props for the compact version
type CompactAnimatedContainerProps = {
  title: string
  children: React.ReactNode | React.ReactNode[]
  className?: string
}

const CompactAnimatedContainer = ({
  title,
  children,
  className,
}: CompactAnimatedContainerProps) => {
  const [parent] = useAutoAnimate<HTMLDivElement>()
  const [expanded, setExpanded] = useState(false)

  return (
    <div className={cn('w-full rounded-sm border', className)} ref={parent}>
      <button
        type='button'
        className='flex items-center justify-between w-full cursor-pointer p-3'
        onClick={() => setExpanded(!expanded)}
      >
        <h2 className='text-sm font-medium'>{title}</h2>
        <div>
          <ChevronDown
            size={16}
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
        <div className='pt-4 px-4 pb-4 w-full border-t grid grid-flow-row grid-cols-1 md:grid-cols-2 gap-3'>
          {children}
        </div>
      )}
    </div>
  )
}

export default CompactAnimatedContainer
