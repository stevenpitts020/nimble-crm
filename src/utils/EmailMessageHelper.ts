/**
 * This file contains helpers for the accept/Decline modals
 *
 * Use it to DRY your code. Peace.
 */
const EmailMessageHelper = {
  buildDeclineEmailMessage: (messageFields: {
    template: string | undefined
    bankName: string | undefined
    fullName: string | undefined
    productName: string | undefined
    employeeName: string | undefined
    bankSlug: string | undefined
  }) => {
    let text = '' + messageFields.template
    text = text.replace(/\{bankName\}/g, messageFields.bankName || '')
    text = text.replace(/\{name\}/g, messageFields.fullName || '')
    text = text.replace(/\{product\}/g, messageFields.productName || '')
    text = text.replace(/\{employee\}/g, messageFields.employeeName || '')
    text = text.replace(/\{domain\}/g, messageFields.bankSlug || '')
    return text
  },
  buildAproveEmailMessage: (messageFields: {
    template: string | undefined
    routingNumber: string | undefined
    bankName: string | undefined
    amount: number | undefined
    accountNumber: string | undefined
    fullName: string | undefined
    productName: string | undefined
    employeeName: string | undefined
    bankSlug: string | undefined
  }) => {
    let text = '' + messageFields.template
    text = text.replace(/\{accountNumber\}/g, messageFields.accountNumber || '')
    text = text.replace(/\{routingNumber\}/g, messageFields.routingNumber || '')
    text = text.replace(/\{bankName\}/g, messageFields.bankName || '')
    text = text.replace(/\{amount\}/g, messageFields.amount?.toString(10) || '')
    text = text.replace(/\{name\}/g, messageFields.fullName || '')
    text = text.replace(/\{product\}/g, messageFields.productName || '')
    text = text.replace(/\{employee\}/g, messageFields.employeeName || '')
    text = text.replace(/\{domain\}/g, messageFields.bankSlug || '')
    return text
  },
}
export default EmailMessageHelper
