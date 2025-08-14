import React from 'react'
import AnimatedContainer from '../ui/AnimatedContainer'
import { Controller, useFieldArray, useFormContext } from 'react-hook-form'
import { Invoice } from '@/types'
import CompactAnimatedContainer from '../ui/CompactAnimatedContainer'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import NumberInput from '../number-input'
import CurrencyInput from '../currency-input'
import { Button } from '../ui/button'
import { X } from 'lucide-react'
import { useAutoAnimate } from '@formkit/auto-animate/react'

const ProductSection = () => {
  const [child] = useAutoAnimate<HTMLDivElement>()
  const form = useFormContext<Invoice>()
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'items',
  })

  const addProduct = () => {
    const randomId = crypto.randomUUID()
    append({
      id: randomId,
      description: '',
      quantity: 1,
      rate: 0,
    })
  }

  return (
    <AnimatedContainer className='w-full' title='Product Details'>
      <div ref={child} className='md:col-span-2 py-2 px-2 flex flex-col gap-3'>
        {fields.map((field, index) => (
          <div key={field.id} className='w-full rounded-md border'>
            <div className='flex items-center justify-between w-full border-b'>
              <h4 className='text-sm font-semibold p-3'>Product {index + 1}</h4>
              {fields.length > 1 && (
                <button
                  type='button'
                  className='hover:text-muted-foreground p-2'
                  onClick={() => remove(index)}
                >
                  <X size={16} />
                </button>
              )}
            </div>
            <div className='p-3 grid grid-flow-row md:grid-cols-2 gap-3'>
              <div className='md:col-span-2'>
                <Label className='text-sm mb-1.5 text-muted-foreground'>
                  Description
                </Label>
                <Input
                  className='h-9 text-sm'
                  {...form.register(`items.${index}.description` as const)}
                />
              </div>
              <div>
                <Label className='text-sm mb-1.5 text-muted-foreground'>
                  QTY
                </Label>
                <Controller
                  control={form.control}
                  name={`items.${index}.quantity` as const}
                  render={({ field }) => (
                    <NumberInput
                      minValue={1}
                      value={field.value}
                      onValueChange={field.onChange}
                      className='h-9 text-sm'
                    />
                  )}
                />
              </div>
              <div>
                <Label className='text-sm mb-1.5 text-muted-foreground'>
                  Rate
                </Label>
                <Controller
                  control={form.control}
                  name={`items.${index}.rate` as const}
                  render={({ field }) => (
                    <NumberInput
                      minValue={1}
                      value={field.value}
                      onValueChange={field.onChange}
                      className='h-9 text-sm'
                    />
                  )}
                />
              </div>
            </div>
          </div>
        ))}
        <div className='w-full flex justify-end mt-2'>
          <Button onClick={addProduct} className='ml-auto' type='button'>
            Add Product
          </Button>
        </div>
      </div>
    </AnimatedContainer>
  )
}

export default ProductSection
