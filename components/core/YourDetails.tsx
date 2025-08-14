import { Invoice } from '@/types'
import React, { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { ChevronDown } from 'lucide-react'

const YourDetails = () => {
  const form = useFormContext<Invoice>()
  const [parent] = useAutoAnimate<HTMLDivElement>()
  const [expanded, setExpanded] = useState(false)

  return (
    <div className='w-full border rounded-md p-4' ref={parent}>
      <div className='flex items-center justify-between'>
        <h2 className='text-base font-semibold'>Your Details</h2>
        <button onClick={() => setExpanded(!expanded)}>
          <ChevronDown
            size={20}
            className={`${expanded ? 'rotate-180' : ''}`}
          />
        </button>
      </div>
    </div>
  )
}

export default YourDetails
