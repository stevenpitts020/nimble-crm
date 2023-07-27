// @ts-ignore
import { FilePondOptions } from 'filepond'

declare module 'filepond' {
  export interface FilePondOptions {
    /** Set type convertor. */
    pdfConvertType?: string
    /** Margin betwen pages. */
    pdfConvertMarginHeight?: number
  }
}
