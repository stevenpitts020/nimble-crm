class CompletionStatusService {
  public readonly possibleStates: string[]

  constructor() {
    this.possibleStates = [
      'IMAGES_UPLOADED',
      'PERSONAL_INFO',
      'CHOOSE_PRODUCTS',
      'DOCUMENT_SENT',
    ]
  }

  public optionByStatus = (status: string) => {
    switch (status) {
      case 'IMAGES_UPLOADED':
        return 1
      case 'PERSONAL_INFO':
        return 2
      case 'CHOOSE_PRODUCTS':
        return 3
      case 'DOCUMENT_SENT':
        return 4
      default:
        return 0
    }
  }

  public labelForStep = (signerStep: string, stepToCompare: string) => {
    const didFinish =
      this.optionByStatus(stepToCompare) <= this.optionByStatus(signerStep)
    const completed = didFinish ? '- Completed' : '- Not completed'

    switch (stepToCompare) {
      case 'IMAGES_UPLOADED':
        return `ID & Selfie ${completed}`
      case 'PERSONAL_INFO':
        return `Personal Information ${completed}`
      case 'CHOOSE_PRODUCTS':
        return `Product Selection ${completed}`
      case 'DOCUMENT_SENT':
        return `Documents sent to Client ${completed}`
      default:
        return 0
    }
  }

  public colorForStep = (signerStep: string, stepToCompare: string) => {
    const didFinish =
      this.optionByStatus(stepToCompare) <= this.optionByStatus(signerStep)
    return didFinish ? '#4BBFEC' : '#E5E9F2'
  }
}

export default new CompletionStatusService()
