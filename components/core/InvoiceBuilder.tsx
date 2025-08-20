import { getCurrencySymbol } from '@/lib/utils'
import { Invoice } from '@/types'
import {
  IconEye,
  IconNote,
  IconReceiptDollar,
  IconSparkles,
  IconUser,
} from '@tabler/icons-react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import CalendarInput from '../calendar-input'
import AnimatedContainer from '../ui/AnimatedContainer'
import { Button } from '../ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import { ScrollArea } from '../ui/scroll-area'
import { Textarea } from '../ui/textarea'
import ProductSection from './ProductSection'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'

type Props = {
  onPreview: () => void
}

const InvoiceBuilder = ({ onPreview }: Props) => {
  const form = useFormContext<Invoice>()

  const totalAmountDue = form.watch('items').reduce((total, item) => {
    return total + (item.quantity || 0) * (item.rate || 0)
  }, 0)

  // Animated number state with improved animation
  const [animatedTotal, setAnimatedTotal] = useState(totalAmountDue)
  const [isAnimating, setIsAnimating] = useState(false)
  const prevTotalRef = useRef(totalAmountDue)

  useEffect(() => {
    if (prevTotalRef.current !== totalAmountDue) {
      setIsAnimating(true)
      const start = prevTotalRef.current
      const end = totalAmountDue
      const duration = 800 // Reduced duration for snappier feel
      const frameRate = 1000 / 60
      const totalFrames = Math.round(duration / frameRate)
      let frame = 0

      const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

      const animate = () => {
        frame++
        const progress = Math.min(frame / totalFrames, 1)
        const easedProgress = easeOutCubic(progress)
        const value = start + (end - start) * easedProgress
        setAnimatedTotal(value)

        if (progress < 1) {
          requestAnimationFrame(animate)
        } else {
          prevTotalRef.current = end
          setIsAnimating(false)
        }
      }
      animate()
    }
  }, [totalAmountDue])

  return (
    <div className='h-screen w-full bg-gradient-to-br from-background via-background to-muted/20'>
      {/* Enhanced Header */}
      <motion.div
        className='h-16 w-full flex items-center justify-between px-6'
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className='flex items-center gap-3'>
          <div className='relative'>
            <Image
              src='/logo.png'
              width={32}
              height={32}
              alt='Logo'
              className='rounded-lg'
            />
            <div className='absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse' />
          </div>
          <div>
            <h2 className='text-xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent'>
              Create Invoice
            </h2>
            <p className='text-xs text-muted-foreground'>
              Build your professional invoice
            </p>
          </div>
        </div>
        <Button onClick={onPreview} className='bg-primary'>
          Preview
        </Button>
      </motion.div>

      {/* Enhanced Scroll Area */}
      <ScrollArea className='h-[calc(100%-4rem-4rem)] w-full'>
        <div className='p-6 flex flex-col gap-6 max-w-4xl mx-auto'>
          {/* Your Details Section */}
          <AnimatedContainer
            title='Your Details'
            icon={<IconReceiptDollar className='w-5 h-5' />}
            description='Your business information'
          >
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <FormField
                control={form.control}
                name='issuer.name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-sm font-medium text-foreground/90'>
                      Business Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        className='w-full border-border/60 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200'
                        placeholder='Enter your business name'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='issuer.email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-sm font-medium text-foreground/90'>
                      Email Address
                    </FormLabel>
                    <FormControl>
                      <Input
                        type='email'
                        required
                        className='w-full border-border/60 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200'
                        placeholder='your@email.com'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='issuer.address'
                render={({ field }) => (
                  <FormItem className='md:col-span-2'>
                    <FormLabel className='text-sm font-medium text-foreground/90'>
                      Business Address
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        className='w-full h-[100px] border-border/60 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 resize-none'
                        placeholder='Enter your complete business address'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </AnimatedContainer>

          {/* Client Details Section */}
          <AnimatedContainer
            icon={<IconUser className='w-5 h-5' />}
            title='Client Details'
            description="Your client's information"
          >
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <FormField
                control={form.control}
                name='client.name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-sm font-medium text-foreground/90'>
                      Client Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        className='w-full border-border/60 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200'
                        placeholder='Enter client name'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='client.email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-sm font-medium text-foreground/90'>
                      Client Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        type='email'
                        className='w-full border-border/60 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200'
                        placeholder='client@email.com'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='client.address'
                render={({ field }) => (
                  <FormItem className='md:col-span-2'>
                    <FormLabel className='text-sm font-medium text-foreground/90'>
                      Client Address
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        className='w-full h-[100px] border-border/60 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 resize-none'
                        placeholder="Enter client's complete address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </AnimatedContainer>

          {/* Invoice Details Section */}
          <AnimatedContainer
            icon={<IconSparkles className='w-5 h-5' />}
            title='Invoice Details'
            description='Invoice specifics and dates'
          >
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <FormField
                control={form.control}
                name='contractName'
                render={({ field }) => (
                  <FormItem className='md:col-span-2'>
                    <FormLabel className='text-sm font-medium text-foreground/90'>
                      Project Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        className='w-full border-border/60 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200'
                        placeholder='Enter project name'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='invoiceNumber'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-sm font-medium text-foreground/90'>
                      Invoice Number
                    </FormLabel>
                    <FormControl>
                      <Input
                        className='w-full border-border/60 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200'
                        placeholder='INV-001'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='currency'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel className='text-sm font-medium text-foreground/90'>
                      Currency
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className='w-full'>
                        <SelectTrigger className='w-full'>
                          <SelectValue
                            className='w-full'
                            placeholder='Select currency'
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='USD'>USD ($)</SelectItem>
                        <SelectItem value='EUR'>EUR (€)</SelectItem>
                        <SelectItem value='GBP'>GBP (£)</SelectItem>
                        <SelectItem value='CAD'>CAD (C$)</SelectItem>
                        <SelectItem value='AUD'>AUD (A$)</SelectItem>
                        <SelectItem value='JPY'>JPY (¥)</SelectItem>
                        <SelectItem value='INR'>INR (₹)</SelectItem>
                        <SelectItem value='BDT'>BDT (৳)</SelectItem>
                        <SelectItem value='CNY'>CNY (¥)</SelectItem>
                        <SelectItem value='HKD'>HKD (HK$)</SelectItem>
                        <SelectItem value='SGD'>SGD (S$)</SelectItem>
                        <SelectItem value='NZD'>NZD (NZ$)</SelectItem>
                        <SelectItem value='CHF'>CHF (CHF)</SelectItem>
                        <SelectItem value='SEK'>SEK (kr)</SelectItem>
                        <SelectItem value='NOK'>NOK (kr)</SelectItem>
                        <SelectItem value='DKK'>DKK (kr)</SelectItem>
                        <SelectItem value='ZAR'>ZAR (R)</SelectItem>
                        <SelectItem value='BRL'>BRL (R$)</SelectItem>
                        <SelectItem value='MXN'>MXN ($)</SelectItem>
                        <SelectItem value='RUB'>RUB (₽)</SelectItem>
                        <SelectItem value='TRY'>TRY (₺)</SelectItem>
                        <SelectItem value='AED'>AED (د.إ)</SelectItem>
                        <SelectItem value='SAR'>SAR (﷼)</SelectItem>
                        <SelectItem value='KRW'>KRW (₩)</SelectItem>
                        <SelectItem value='PLN'>PLN (zł)</SelectItem>
                        <SelectItem value='ILS'>ILS (₪)</SelectItem>
                        <SelectItem value='HUF'>HUF (Ft)</SelectItem>
                        <SelectItem value='CZK'>CZK (Kč)</SelectItem>
                        <SelectItem value='IDR'>IDR (Rp)</SelectItem>
                        <SelectItem value='THB'>THB (฿)</SelectItem>
                        <SelectItem value='VND'>VND (₫)</SelectItem>
                        <SelectItem value='PKR'>PKR (₨)</SelectItem>
                        <SelectItem value='NGN'>NGN (₦)</SelectItem>
                        <SelectItem value='EGP'>EGP (E£)</SelectItem>
                        <SelectItem value='ARS'>ARS ($)</SelectItem>
                        <SelectItem value='COP'>COP ($)</SelectItem>
                        <SelectItem value='CLP'>CLP ($)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='date'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-sm font-medium text-foreground/90'>
                      Invoice Date
                    </FormLabel>
                    <FormControl>
                      <CalendarInput
                        date={field.value}
                        onDateChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='dueDate'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-sm font-medium text-foreground/90'>
                      Due Date
                    </FormLabel>
                    <FormControl>
                      <CalendarInput
                        date={field.value}
                        onDateChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </AnimatedContainer>

          <ProductSection />

          {/* Additional Notes Section */}
          <AnimatedContainer
            icon={<IconNote className='w-5 h-5' />}
            title='Additional Notes'
            description='Optional notes and terms'
          >
            <div className='grid grid-cols-1 gap-4'>
              <FormField
                control={form.control}
                name='additionalNotes.title'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-sm font-medium text-foreground/90'>
                      Notes Title
                    </FormLabel>
                    <FormControl>
                      <Input
                        className='w-full border-border/60 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200'
                        placeholder='e.g., Payment Terms, Additional Information'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='additionalNotes.content'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-sm font-medium text-foreground/90'>
                      Notes Content
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        className='w-full h-[120px] border-border/60 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 resize-none'
                        placeholder='Add any additional notes, payment terms, or special instructions here...'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </AnimatedContainer>
        </div>
      </ScrollArea>

      {/* Enhanced Footer with Total */}
      <motion.div
        className='h-[4.5rem] w-full flex items-center justify-between px-6'
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div className='flex items-center gap-3'>
          <div className='p-2 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg'>
            <IconReceiptDollar className='w-5 h-5 text-primary' />
          </div>
          <div>
            <h3 className='text-sm font-medium text-muted-foreground'>
              Total Amount
            </h3>
            <h2 className='text-lg font-bold text-foreground'>Payment Due</h2>
          </div>
        </div>

        <div className='text-right'>
          <motion.h2
            className={`text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent ${
              isAnimating ? 'animate-pulse' : ''
            }`}
            key={animatedTotal}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            {getCurrencySymbol(form.watch('currency'))}
            {animatedTotal.toFixed(2)}
          </motion.h2>
          <p className='text-xs text-muted-foreground mt-1'>
            {totalAmountDue === 0
              ? 'Add items to calculate'
              : 'Calculated automatically'}
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default InvoiceBuilder
