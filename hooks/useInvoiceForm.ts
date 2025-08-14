import { useForm } from 'react-hook-form'
import { useRef, useEffect, useId } from 'react'
import dayjs from 'dayjs'
import { Invoice } from '@/types'

export function useInvoiceForm() {
  const randomId = useId()

  // Load initial values from localStorage if available
  const getInitialValues = () => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('invoiceForm')
      if (stored) {
        try {
          const parsed = JSON.parse(stored)
          // Convert date strings back to Date objects
          return {
            ...parsed,
            date: parsed.date ? dayjs(parsed.date).toDate() : dayjs().toDate(),
            dueDate: parsed.dueDate
              ? dayjs(parsed.dueDate).toDate()
              : dayjs().add(7, 'day').toDate(),
            items:
              Array.isArray(parsed.items) && parsed.items.length > 0
                ? parsed.items
                : [
                    {
                      id: randomId,
                      description: 'First line item (Edit this)',
                      quantity: 1,
                      rate: 0,
                    },
                  ],
          }
        } catch {
          // fallback to default
        }
      }
    }
    return {
      currency: 'USD',
      date: dayjs().toDate(),
      dueDate: dayjs().add(7, 'day').toDate(),
      items: [
        {
          id: randomId,
          description: 'First line item (Edit this)',
          quantity: 1,
          rate: 0,
        },
      ],
    }
  }

  const form = useForm<Invoice>({
    defaultValues: getInitialValues(),
  })

  // Sync form data to localStorage on change, debounced by 500ms
  const debounceRef = useRef<NodeJS.Timeout | null>(null)
  useEffect(() => {
    const subscription = form.watch((data) => {
      if (typeof window !== 'undefined') {
        if (debounceRef.current) clearTimeout(debounceRef.current)
        debounceRef.current = setTimeout(() => {
          // Convert Date objects to ISO strings for storage
          const toStore = {
            ...data,
            date:
              data.date instanceof Date ? data.date.toISOString() : data.date,
            dueDate:
              data.dueDate instanceof Date
                ? data.dueDate.toISOString()
                : data.dueDate,
          }
          localStorage.setItem('invoiceForm', JSON.stringify(toStore))
        }, 500)
      }
    })
    return () => {
      subscription.unsubscribe()
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [form])

  return form
}
