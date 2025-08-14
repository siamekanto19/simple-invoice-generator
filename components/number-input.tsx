'use client'

import { cn } from '@/lib/utils'
import { MinusIcon, PlusIcon } from 'lucide-react'
import { Button, Group, Input, Label, NumberField } from 'react-aria-components'

type Props = {
  defaultValue?: number
  minValue?: number
  maxValue?: number
  value?: number
  onValueChange: (value: number) => void
  className?: string
  step?: number
}

export default function NumberInput({
  defaultValue,
  minValue,
  maxValue,
  value,
  onValueChange,
  className,
  step,
}: Props) {
  return (
    <NumberField
      step={step}
      defaultValue={defaultValue}
      minValue={minValue}
      maxValue={maxValue}
      value={value}
      onChange={onValueChange}
      className={cn(className)}
    >
      <Group className='border-input data-focus-within:border-ring data-focus-within:ring-ring/50 data-focus-within:has-aria-invalid:ring-destructive/20 dark:data-focus-within:has-aria-invalid:ring-destructive/40 data-focus-within:has-aria-invalid:border-destructive relative inline-flex h-9 w-full items-center overflow-hidden rounded-md border text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none data-disabled:opacity-50 data-focus-within:ring-[3px]'>
        <Button
          type='button'
          slot='decrement'
          className='border-input bg-background text-muted-foreground/80 hover:bg-accent hover:text-foreground -ms-px flex aspect-square h-[inherit] items-center justify-center rounded-s-md border text-sm transition-[color,box-shadow] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50'
        >
          <MinusIcon size={16} aria-hidden='true' />
        </Button>
        <Input className='bg-background text-foreground w-full grow px-3 py-2 text-center tabular-nums' />
        <Button
          type='button'
          slot='increment'
          className='border-input bg-background text-muted-foreground/80 hover:bg-accent hover:text-foreground -me-px flex aspect-square h-[inherit] items-center justify-center rounded-e-md border text-sm transition-[color,box-shadow] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50'
        >
          <PlusIcon size={16} aria-hidden='true' />
        </Button>
      </Group>
    </NumberField>
  )
}
