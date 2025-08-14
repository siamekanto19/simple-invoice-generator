export type Invoice = {
  id: string
  date: Date
  dueDate: Date
  client: InvoiceClient
  total: number
  items: InvoiceItem[]
  additionalNotes: InvoiceAdditionalNote
  currency: string
  invoiceNumber: number
  contractName?: string
  totalValue: number
  issuer: InvoiceIssuer
  discount?: number
  tax?: number
  amountDue: number
}

export type InvoiceItem = {
  id: string
  description: string
  quantity: number
  rate: number
}

export type InvoiceClient = {
  name: string
  email: string
  address?: string
}

export type InvoiceIssuer = {
  name: string
  email: string
  address?: string
}

type InvoiceAdditionalNote = {
  title: string
  content: string
}
