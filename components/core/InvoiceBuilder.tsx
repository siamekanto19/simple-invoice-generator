import { Invoice } from '@/types'
import { IconReceiptDollar } from '@tabler/icons-react'
import { useFormContext } from 'react-hook-form'
import CalendarInput from '../calendar-input'
import AnimatedContainer from '../ui/AnimatedContainer'
import { Button } from '../ui/button'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import { ScrollArea } from '../ui/scroll-area'
import { Textarea } from '../ui/textarea'
import Image from 'next/image'
import ProductSection from './ProductSection'
import { useMemo, useEffect, useRef, useState } from 'react'
import { getCurrencySymbol } from '@/lib/utils'

type Props = {
  onPreview: () => void
}

const InvoiceBuilder = ({ onPreview }: Props) => {
  const form = useFormContext<Invoice>()

  const totalAmountDue = form.watch('items').reduce((total, item) => {
    return total + (item.quantity || 0) * (item.rate || 0)
  }, 0)

  // Animated number state
  const [animatedTotal, setAnimatedTotal] = useState(totalAmountDue)
  const prevTotalRef = useRef(totalAmountDue)

  useEffect(() => {
    if (prevTotalRef.current !== totalAmountDue) {
      const start = prevTotalRef.current
      const end = totalAmountDue
      const duration = 1200 // ms
      const frameRate = 1000 / 60 // 30fps
      const totalFrames = Math.round(duration / frameRate)
      let frame = 0
      const animate = () => {
        frame++
        const progress = Math.min(frame / totalFrames, 1)
        const value = start + (end - start) * progress
        setAnimatedTotal(value)
        if (progress < 1) {
          requestAnimationFrame(animate)
        } else {
          prevTotalRef.current = end
        }
      }
      animate()
    }
  }, [totalAmountDue])

  return (
    <div className='h-screen w-full border-x'>
      <div className='h-14 w-full border-b flex items-center justify-between px-4'>
        <div className='flex items-center gap-2'>
          <Image src='/logo.png' width={28} height={28} alt='Logo' />
          <h2 className='text-lg font-bold'>Create Invoice</h2>
        </div>
        <Button onClick={onPreview}>Preview</Button>
      </div>
      <ScrollArea className='h-[calc(100%-3.5rem-3.5rem)] w-full'>
        <div className='p-4 md:p-6 flex flex-col gap-4'>
          <AnimatedContainer title='Your Details'>
            <FormField
              control={form.control}
              name='issuer.name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input className='w-full' {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='issuer.email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input
                      type='email'
                      required
                      className='w-full'
                      {...field}
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='issuer.address'
              render={({ field }) => (
                <FormItem className='md:col-span-2'>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Textarea className='w-full h-[100px]' {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
          </AnimatedContainer>
          <AnimatedContainer title='Client Details'>
            <FormField
              control={form.control}
              name='client.name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input className='w-full' {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='client.email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input type='email' className='w-full' {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='client.address'
              render={({ field }) => (
                <FormItem className='md:col-span-2'>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Textarea className='w-full h-[100px]' {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
          </AnimatedContainer>
          <AnimatedContainer title='Invoice Details'>
            <FormField
              control={form.control}
              name='invoiceNumber'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Invoice Number</FormLabel>
                  <FormControl>
                    <Input className='w-full' {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='contractName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Name</FormLabel>
                  <FormControl>
                    <Input className='w-full' {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='date'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Invoice Date</FormLabel>
                  <FormControl>
                    <CalendarInput
                      date={field.value}
                      onDateChange={field.onChange}
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='dueDate'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Due Date</FormLabel>
                  <FormControl>
                    <CalendarInput
                      date={field.value}
                      onDateChange={field.onChange}
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
          </AnimatedContainer>
          <ProductSection />
          <AnimatedContainer title='Additional Notes'>
            <FormField
              control={form.control}
              name='additionalNotes.title'
              render={({ field }) => (
                <FormItem className='md:col-span-2'>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input className='w-full' {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='additionalNotes.content'
              render={({ field }) => (
                <FormItem className='md:col-span-2'>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea className='w-full h-[100px]' {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
          </AnimatedContainer>
        </div>
      </ScrollArea>
      <div className='h-14 w-full border-t flex items-center justify-between px-4'>
        <div className='w-full flex items-center justify-between gap-2'>
          <h2 className='text-2xl font-bold'>Payment Due</h2>
          <h2 className='text-2xl font-bold'>
            {getCurrencySymbol(form.watch('currency'))}
            {animatedTotal.toFixed(2)}
          </h2>
        </div>
      </div>
    </div>
  )
}

export default InvoiceBuilder
