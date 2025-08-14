import React from 'react'
import { Font } from '@react-pdf/renderer'
// Register Outfit font
Font.register({
  family: 'Outfit',
  fonts: [
    { src: '/fonts/Outfit-Thin.ttf', fontWeight: 100 },
    { src: '/fonts/Outfit-ExtraLight.ttf', fontWeight: 200 },
    { src: '/fonts/Outfit-Light.ttf', fontWeight: 300 },
    { src: '/fonts/Outfit-Regular.ttf', fontWeight: 400 },
    { src: '/fonts/Outfit-Medium.ttf', fontWeight: 500 },
    { src: '/fonts/Outfit-SemiBold.ttf', fontWeight: 600 },
    { src: '/fonts/Outfit-Bold.ttf', fontWeight: 700 },
    { src: '/fonts/Outfit-ExtraBold.ttf', fontWeight: 800 },
    { src: '/fonts/Outfit-Black.ttf', fontWeight: 900 },
  ],
})
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  PDFViewer,
  PDFViewer as PDFPreview,
} from '@react-pdf/renderer'
import { ScrollArea } from '../ui/scroll-area'
import { useFormContext } from 'react-hook-form'
import { Invoice } from '@/types'
import { ArrowLeft } from 'lucide-react'
import { User } from 'lucide-react'
import { getCurrencySymbol } from '@/lib/utils'
import dayjs from 'dayjs'

type Props = {
  onBack: () => void
}

const InvoicePreview = ({ onBack }: Props) => {
  const form = useFormContext<Invoice>()
  const values = form.watch()
  // PDF styles
  const styles = StyleSheet.create({
    dateRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
    },
    dateText: {
      fontSize: 15,
      fontWeight: 'bold',
    },
    userIcon: {
      width: 15,
      height: 15,
      marginRight: 4,
    },
    topLine: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 4,
      backgroundColor: '#2563eb', // Tailwind blue-600
    },
    page: { padding: 40, fontSize: 13, fontFamily: 'Outfit' },
    section: { marginBottom: 24 },
    heading: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
    label: { fontWeight: 'bold', marginBottom: 5, fontSize: 15 },
    table: {
      display: 'flex',
      flexDirection: 'column',
      width: 'auto',
      borderStyle: 'solid',
      borderWidth: 1,
      borderRightWidth: 0,
      borderBottomWidth: 0,
      marginTop: 10,
    },
    tableRow: { flexDirection: 'row' },
    tableColHeader: {
      width: '20%',
      borderStyle: 'solid',
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
      backgroundColor: '#f3f4f6',
      padding: 6,
      fontSize: 13,
    },
    tableColHeaderDescription: {
      width: '40%',
      borderStyle: 'solid',
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
      backgroundColor: '#f3f4f6',
      padding: 6,
      fontSize: 13,
    },
    tableColDescription: {
      width: '40%',
      borderStyle: 'solid',
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
      padding: 6,
      fontSize: 13,
    },
    tableColData: {
      width: '20%',
      borderStyle: 'solid',
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
      padding: 6,
      fontSize: 13,
    },
    tableCellHeader: { fontWeight: 'bold' },
    tableCell: {},
    total: {
      fontSize: 15,
      fontWeight: 'bold',
      textAlign: 'right',
    },
    totalTableCol: {
      width: '20%',
      padding: 6,
      fontSize: 13,
      borderStyle: 'solid',
      borderWidth: 0,
      borderLeftWidth: 0,
      borderTopWidth: 0,
    },
    totalTableColDescription: {
      width: '40%',
      padding: 6,
      fontSize: 13,
      borderStyle: 'solid',
      borderWidth: 0,
      borderLeftWidth: 0,
      borderTopWidth: 0,
    },
  })

  // PDF Document
  const InvoicePDF = (
    <Document>
      <Page size='A4' style={styles.page}>
        {/* Blue line at the very top edge */}
        <View style={styles.topLine} fixed />
        <View
          style={[
            styles.section,
            {
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            },
          ]}
        >
          <Text style={styles.heading}>{values.contractName}</Text>
          <Text style={{ fontSize: 16, fontWeight: 600 }}>
            Invoice #{values.invoiceNumber}
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Billed by</Text>
          <Text>{values.issuer?.name}</Text>
          <Text style={{ textDecoration: 'underline', color: '#2563eb' }}>
            {values.issuer?.email}
          </Text>
          <Text>{values.issuer?.address}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Billed to</Text>
          <Text>{values.client?.name}</Text>
          <Text style={{ textDecoration: 'underline', color: '#2563eb' }}>
            {values.client?.email}
          </Text>
          <Text>{values.client?.address}</Text>
        </View>
        <View style={styles.section}>
          <View style={styles.dateRow}>
            <View>
              <Text style={styles.dateText}>Issue Date</Text>
              <Text style={{ marginTop: 4 }}>
                {values.date ? dayjs(values.date).format('DD MMM, YYYY') : ''}
              </Text>
            </View>
            <View>
              <Text style={styles.dateText}>Due Date</Text>
              <Text style={{ marginTop: 4 }}>
                {values.dueDate
                  ? dayjs(values.dueDate).format('DD MMM, YYYY')
                  : ''}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Items</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableColHeaderDescription}>
                <Text style={styles.tableCellHeader}>Description</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Quantity</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Rate</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Amount</Text>
              </View>
            </View>
            {Array.isArray(values.items) &&
              values.items.map((item, idx) => (
                <View style={styles.tableRow} key={item.id || idx}>
                  <View style={styles.tableColDescription}>
                    <Text style={styles.tableCell}>{item.description}</Text>
                  </View>
                  <View style={styles.tableColData}>
                    <Text style={styles.tableCell}>{item.quantity}</Text>
                  </View>
                  <View style={styles.tableColData}>
                    <Text style={styles.tableCell}>
                      {getCurrencySymbol(values.currency)}
                      {item.rate.toFixed(2)}
                    </Text>
                  </View>
                  <View style={styles.tableColData}>
                    <Text style={styles.tableCell}>
                      {getCurrencySymbol(values.currency)}
                      {(item.quantity * item.rate).toFixed(2)}
                    </Text>
                  </View>
                </View>
              ))}
          </View>
          {/* End of table. Total below. */}
        </View>
        <Text style={styles.total}>
          Total: {getCurrencySymbol(values.currency)}
          {values.items
            ? values.items
                .reduce((sum, item) => sum + item.quantity * item.rate, 0)
                .toFixed(2)
            : '0.00'}
        </Text>
        {values.additionalNotes?.title || values.additionalNotes?.content ? (
          <View
            style={{
              position: 'absolute',
              left: 40,
              bottom: 40,
              maxWidth: 300,
            }}
          >
            {values.additionalNotes?.title && (
              <Text
                style={{ fontWeight: 'bold', fontSize: 14, marginBottom: 4 }}
              >
                {values.additionalNotes.title}
              </Text>
            )}
            {values.additionalNotes?.content && (
              <Text style={{ fontSize: 13, color: '#444' }}>
                {values.additionalNotes.content}
              </Text>
            )}
          </View>
        ) : null}
      </Page>
    </Document>
  )

  return (
    <div className='w-full h-screen border-x'>
      <div className='h-14 w-full border-b flex items-center px-4 gap-3'>
        <button onClick={onBack} className='hover:text-muted-foreground'>
          <ArrowLeft size={20} strokeWidth={1.75} />
        </button>
        <h2 className='text-lg font-bold'>Invoice Preview</h2>
      </div>
      <ScrollArea className='h-[calc(100vh-3.5rem)] w-full'>
        <div>
          <PDFPreview
            style={{
              width: '100%',
              height: 'calc(100vh - 3.5rem)',
              border: 'none',
            }}
          >
            {InvoicePDF}
          </PDFPreview>
        </div>
      </ScrollArea>
    </div>
  )
}

export default InvoicePreview
