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
  // Professional PDF Document optimized for single page
  const InvoicePDF = (
    <Document>
      <Page size='A4' style={styles.page}>
        {/* Compact Header */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 16,
            paddingBottom: 8,
            borderBottomWidth: 1,
            borderBottomColor: '#000000',
            borderBottomStyle: 'solid',
          }}
        >
          <View>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                marginBottom: 2,
              }}
            >
              INVOICE
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: '#666666',
              }}
            >
              {values.contractName}
            </Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: 'bold',
              }}
            >
              #{values.invoiceNumber}
            </Text>
          </View>
        </View>

        {/* Billing Information */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 16,
          }}
        >
          <View style={{ width: '48%' }}>
            <Text
              style={{
                fontSize: 10,
                fontWeight: 'bold',
                marginBottom: 4,
              }}
            >
              BILL FROM
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: 'bold',
                marginBottom: 2,
              }}
            >
              {values.issuer?.name}
            </Text>
            <Text
              style={{
                fontSize: 11,
                marginBottom: 2,
              }}
            >
              {values.issuer?.email}
            </Text>
            <Text
              style={{
                fontSize: 11,
                color: '#666666',
              }}
            >
              {values.issuer?.address}
            </Text>
          </View>

          <View style={{ width: '48%' }}>
            <Text
              style={{
                fontSize: 10,
                fontWeight: 'bold',
                marginBottom: 4,
              }}
            >
              BILL TO
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: 'bold',
                marginBottom: 2,
              }}
            >
              {values.client?.name}
            </Text>
            <Text
              style={{
                fontSize: 11,
                marginBottom: 2,
              }}
            >
              {values.client?.email}
            </Text>
            <Text
              style={{
                fontSize: 11,
                color: '#666666',
              }}
            >
              {values.client?.address}
            </Text>
          </View>
        </View>

        {/* Date Information */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 16,
            paddingVertical: 8,
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderColor: '#e5e7eb',
            borderStyle: 'solid',
          }}
        >
          <View>
            <Text
              style={{
                fontSize: 10,
                fontWeight: 'bold',
                marginBottom: 2,
              }}
            >
              ISSUE DATE
            </Text>
            <Text
              style={{
                fontSize: 12,
              }}
            >
              {values.date ? dayjs(values.date).format('DD MMM, YYYY') : '—'}
            </Text>
          </View>
          <View>
            <Text
              style={{
                fontSize: 10,
                fontWeight: 'bold',
                marginBottom: 2,
              }}
            >
              DUE DATE
            </Text>
            <Text
              style={{
                fontSize: 12,
              }}
            >
              {values.dueDate
                ? dayjs(values.dueDate).format('DD MMM, YYYY')
                : '—'}
            </Text>
          </View>
        </View>

        {/* Items Table */}
        <View style={{ marginBottom: 12 }}>
          <Text
            style={{
              fontSize: 12,
              fontWeight: 'bold',
              marginBottom: 8,
            }}
          >
            ITEMS
          </Text>

          <View
            style={{
              borderWidth: 1,
              borderColor: '#000000',
              borderStyle: 'solid',
            }}
          >
            {/* Table Header */}
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: '#f5f5f5',
              }}
            >
              <View
                style={{
                  width: '40%',
                  padding: 6,
                  borderRightWidth: 1,
                  borderRightColor: '#000000',
                  borderRightStyle: 'solid',
                }}
              >
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: 'bold',
                  }}
                >
                  Description
                </Text>
              </View>
              <View
                style={{
                  width: '20%',
                  padding: 6,
                  borderRightWidth: 1,
                  borderRightColor: '#000000',
                  borderRightStyle: 'solid',
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: 'bold',
                  }}
                >
                  Qty
                </Text>
              </View>
              <View
                style={{
                  width: '20%',
                  padding: 6,
                  borderRightWidth: 1,
                  borderRightColor: '#000000',
                  borderRightStyle: 'solid',
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: 'bold',
                  }}
                >
                  Rate
                </Text>
              </View>
              <View
                style={{
                  width: '20%',
                  padding: 6,
                  alignItems: 'flex-end',
                }}
              >
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: 'bold',
                  }}
                >
                  Amount
                </Text>
              </View>
            </View>

            {/* Table Rows */}
            {Array.isArray(values.items) &&
              values.items.map((item, idx) => (
                <View
                  style={{
                    flexDirection: 'row',
                    borderTopWidth: 1,
                    borderTopColor: 'black',
                    borderTopStyle: 'solid',
                  }}
                  key={item.id || idx}
                >
                  <View
                    style={{
                      width: '40%',
                      padding: 6,
                      borderRightWidth: 1,
                      borderRightColor: 'black',
                      borderRightStyle: 'solid',
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 11,
                      }}
                    >
                      {item.description}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: '20%',
                      padding: 6,
                      borderRightWidth: 1,
                      borderRightColor: 'black',
                      borderRightStyle: 'solid',
                      alignItems: 'center',
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 11,
                      }}
                    >
                      {item.quantity}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: '20%',
                      padding: 6,
                      borderRightWidth: 1,
                      borderRightColor: 'black',
                      borderRightStyle: 'solid',
                      alignItems: 'center',
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 11,
                      }}
                    >
                      {getCurrencySymbol(values.currency)}
                      {item.rate.toFixed(2)}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: '20%',
                      padding: 6,
                      alignItems: 'flex-end',
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 11,
                        fontWeight: 'bold',
                      }}
                    >
                      {getCurrencySymbol(values.currency)}
                      {(item.quantity * item.rate).toFixed(2)}
                    </Text>
                  </View>
                </View>
              ))}
          </View>
        </View>

        {/* Total Section */}
        <View
          style={{
            alignItems: 'flex-end',
            marginBottom: 16,
          }}
        >
          <View
            style={{
              borderWidth: 1,
              borderColor: '#000000',
              borderStyle: 'solid',
              padding: 12,
              minWidth: 150,
            }}
          >
            <Text
              style={{
                fontSize: 11,
                marginBottom: 2,
                textAlign: 'center',
              }}
            >
              TOTAL AMOUNT
            </Text>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                textAlign: 'center',
              }}
            >
              {getCurrencySymbol(values.currency)}
              {values.items
                ? values.items
                    .reduce((sum, item) => sum + item.quantity * item.rate, 0)
                    .toFixed(2)
                : '0.00'}
            </Text>
          </View>
        </View>

        {/* Additional Notes */}
        {values.additionalNotes?.title || values.additionalNotes?.content ? (
          <View
            style={{
              position: 'absolute',
              left: 40,
              bottom: 40,
              right: 40,
              borderTopWidth: 1,
              borderTopColor: '#000000',
              borderTopStyle: 'solid',
              paddingTop: 8,
            }}
          >
            {values.additionalNotes?.title && (
              <Text
                style={{
                  fontSize: 11,
                  fontWeight: 'bold',
                  marginBottom: 4,
                }}
              >
                {values.additionalNotes.title}
              </Text>
            )}
            {values.additionalNotes?.content && (
              <Text
                style={{
                  fontSize: 10,
                  color: '#666666',
                }}
              >
                {values.additionalNotes.content}
              </Text>
            )}
          </View>
        ) : null}
      </Page>
    </Document>
  )

  return (
    <div className='w-full h-screen'>
      <div className='h-14 w-full border-b flex items-center gap-3'>
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
