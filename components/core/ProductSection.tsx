import React, { useState } from 'react'
import AnimatedContainer from '../ui/AnimatedContainer'
import { Controller, useFieldArray, useFormContext } from 'react-hook-form'
import { Invoice } from '@/types'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import NumberInput from '../number-input'
import { Button } from '../ui/button'
import { X, Plus, Package, Calculator, DollarSign, Hash } from 'lucide-react'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

const ProductSection = () => {
  const [child] = useAutoAnimate<HTMLDivElement>({ duration: 400 })
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
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

  // Calculate total for each item
  const getItemTotal = (index: number) => {
    const quantity = form.watch(`items.${index}.quantity`) || 0
    const rate = form.watch(`items.${index}.rate`) || 0
    return quantity * rate
  }

  return (
    <AnimatedContainer
      className='w-full'
      title='Products & Services'
      description='Add items, quantities, and rates'
      icon={<Package className='w-5 h-5' />}
      defaultExpanded={true}
    >
      <div className='w-full space-y-4'>
        <div ref={child} className='space-y-4'>
          <AnimatePresence mode='popLayout'>
            {fields.map((field, index) => (
              <motion.div
                key={field.id}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.05,
                  ease: 'easeOut',
                }}
                className={cn(
                  'w-full rounded-xl border border-border/60 bg-card/30 backdrop-blur-sm transition-all duration-200',
                  hoveredIndex === index &&
                    'border-border/80 shadow-md bg-card/50'
                )}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
              >
                {/* Product Header */}
                <div className='flex items-center justify-between p-4 border-b border-border/40'>
                  <div className='flex items-center gap-3'>
                    <motion.div
                      className='p-2 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg'
                      animate={{
                        scale: hoveredIndex === index ? 1.05 : 1,
                        rotate: hoveredIndex === index ? 3 : 0,
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <Package className='w-4 h-4 text-primary' />
                    </motion.div>
                    <div>
                      <h4 className='text-sm font-semibold text-foreground'>
                        Item #{index + 1}
                      </h4>
                      <p className='text-xs text-muted-foreground'>
                        Product or service details
                      </p>
                    </div>
                  </div>

                  <div className='flex items-center gap-3'>
                    {/* Item Total Display */}
                    <motion.div
                      className='text-right'
                      animate={{
                        scale: getItemTotal(index) > 0 ? 1 : 0.9,
                        opacity: getItemTotal(index) > 0 ? 1 : 0.6,
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <p className='text-xs text-muted-foreground'>Subtotal</p>
                      <p className='text-sm font-semibold text-primary'>
                        ${getItemTotal(index).toFixed(2)}
                      </p>
                    </motion.div>

                    {/* Remove Button */}
                    {fields.length > 1 && (
                      <motion.button
                        type='button'
                        className='p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors duration-200'
                        onClick={() => remove(index)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <X size={16} />
                      </motion.button>
                    )}
                  </div>
                </div>

                {/* Product Fields */}
                <div className='p-4 space-y-4'>
                  {/* Description Field */}
                  <div className='space-y-2'>
                    <Label className='text-sm font-medium text-foreground/90 flex items-center gap-2'>
                      <Package className='w-3.5 h-3.5 text-muted-foreground' />
                      Description
                    </Label>
                    <Input
                      className='w-full border-border/60 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200'
                      placeholder='Describe your product or service...'
                      {...form.register(`items.${index}.description` as const)}
                    />
                  </div>

                  {/* Quantity and Rate Grid */}
                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    <div className='space-y-2'>
                      <Label className='text-sm font-medium text-foreground/90 flex items-center gap-2'>
                        <Hash className='w-3.5 h-3.5 text-muted-foreground' />
                        Quantity
                      </Label>
                      <Controller
                        control={form.control}
                        name={`items.${index}.quantity` as const}
                        render={({ field }) => (
                          <div className='relative'>
                            <NumberInput
                              minValue={1}
                              value={field.value}
                              onValueChange={field.onChange}
                              className='w-full border-border/60 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200'
                            />
                          </div>
                        )}
                      />
                    </div>

                    <div className='space-y-2'>
                      <Label className='text-sm font-medium text-foreground/90 flex items-center gap-2'>
                        <DollarSign className='w-3.5 h-3.5 text-muted-foreground' />
                        Rate
                      </Label>
                      <Controller
                        control={form.control}
                        name={`items.${index}.rate` as const}
                        render={({ field }) => (
                          <div className='relative'>
                            <NumberInput
                              minValue={0}
                              value={field.value}
                              onValueChange={field.onChange}
                              className='w-full border-border/60 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200'
                            />
                          </div>
                        )}
                      />
                    </div>
                  </div>

                  {/* Calculation Preview */}
                  {getItemTotal(index) > 0 && (
                    <motion.div
                      className='p-3 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg border border-primary/20'
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className='flex items-center justify-between text-sm'>
                        <div className='flex items-center gap-2 text-muted-foreground'>
                          <Calculator className='w-4 h-4' />
                          <span>
                            {form.watch(`items.${index}.quantity`) || 0} × $
                            {(form.watch(`items.${index}.rate`) || 0).toFixed(
                              2
                            )}
                          </span>
                        </div>
                        <div className='font-semibold text-primary'>
                          = ${getItemTotal(index).toFixed(2)}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Add Product Button */}
        <motion.div
          className='w-full flex justify-center pt-4'
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Button
            onClick={addProduct}
            type='button'
            variant='outline'
            className='group border-dashed border-2 border-border/60 hover:border-primary/60 bg-card/50 hover:bg-primary/5 transition-all duration-200 px-6 py-3'
          >
            <motion.div
              className='flex items-center gap-2'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus className='w-4 h-4 group-hover:rotate-90 transition-transform duration-200' />
              <span>Add Another Item</span>
            </motion.div>
          </Button>
        </motion.div>

        {/* Summary Section */}
        {fields.length > 0 && (
          <motion.div
            className='mt-6 p-4 bg-gradient-to-r from-muted/30 to-muted/20 rounded-xl border border-border/40'
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <Calculator className='w-4 h-4 text-muted-foreground' />
                <span className='text-sm font-medium text-foreground'>
                  {fields.length} item{fields.length !== 1 ? 's' : ''} added
                </span>
              </div>
              <div className='text-sm text-muted-foreground'>
                Total calculated in footer
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </AnimatedContainer>
  )
}

export default ProductSection
