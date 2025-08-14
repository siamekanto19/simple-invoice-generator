'use client'

import dayjs from 'dayjs'
import { CalendarIcon } from 'lucide-react'
import { useId } from 'react'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

type Props = {
  date?: Date
  onDateChange?: (date: Date | undefined) => void
}

export default function CalendarInput({ date, onDateChange }: Props) {
  const id = useId()

  return (
    <div className='w-full'>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant={'outline'}
            className='group rounded-sm bg-background hover:bg-background border-input w-full justify-between px-3 font-normal outline-offset-0 outline-none focus-visible:outline-[3px] h-10'
          >
            <span className={cn('truncate', !date && 'text-muted-foreground')}>
              {date instanceof Date && !isNaN(date.getTime())
                ? dayjs(date).format('MMM D, YYYY')
                : 'Pick a date'}
            </span>
            <CalendarIcon
              size={16}
              className='text-muted-foreground/80 group-hover:text-foreground shrink-0 transition-colors'
              aria-hidden='true'
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-2' align='start'>
          <Calendar mode='single' selected={date} onSelect={onDateChange} />
        </PopoverContent>
      </Popover>
    </div>
  )
}
