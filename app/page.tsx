'use client'
import InvoiceBuilder from '@/components/core/InvoiceBuilder'
import InvoicePreview from '@/components/core/InvoicePreview'
import { Form } from '@/components/ui/form'
import { Invoice } from '@/types'
import React, { useState } from 'react'
import { useInvoiceForm } from '@/hooks/useInvoiceForm'

const Homepage = () => {
  const [isPreview, setIsPreview] = useState(false)
  const form = useInvoiceForm()

  return (
    <Form {...form}>
      <form className='w-full'>
        <div className='h-screen w-full max-w-3xl mx-auto'>
          {isPreview ? (
            <InvoicePreview onBack={() => setIsPreview(false)} />
          ) : (
            <InvoiceBuilder onPreview={() => setIsPreview(true)} />
          )}
        </div>
      </form>
    </Form>
  )
}

export default Homepage
