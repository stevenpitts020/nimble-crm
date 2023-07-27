import service from './CompletionStatusService'

// this makes actual api call
describe('CompletionStatusService', () => {
  describe('colorForStep', () => {
    it('should blue if step is equal or after', async () => {
      const result = service.colorForStep('CHOOSE_PRODUCTS', 'PERSONAL_INFO')
      expect(result).toEqual('#4BBFEC')
    })

    it('should white if step is before', async () => {
      const result = service.colorForStep('IMAGES_UPLOADED', 'CHOOSE_PRODUCTS')
      expect(result).toEqual('#E5E9F2')
    })
  })

  describe('labelForStep', () => {
    it('should return label and complete', async () => {
      const result = service.labelForStep('PERSONAL_INFO', 'IMAGES_UPLOADED')
      expect(result).toEqual('ID & Selfie - Completed')
    })

    it('should return label and incomplete', async () => {
      const result = service.labelForStep('PERSONAL_INFO', 'DOCUMENT_SENT')
      expect(result).toEqual('Documents sent to Client - Not completed')
    })
  })

  describe('optionByStatus', () => {
    it('should return number for step 2', async () => {
      const result = service.optionByStatus('PERSONAL_INFO')
      expect(result).toEqual(2)
    })

    it('should return number for step 1', async () => {
      const result = service.optionByStatus('IMAGES_UPLOADED')
      expect(result).toEqual(1)
    })

    it('should return number for step 3', async () => {
      const result = service.optionByStatus('CHOOSE_PRODUCTS')
      expect(result).toEqual(3)
    })

    it('should return number for step 4', async () => {
      const result = service.optionByStatus('DOCUMENT_SENT')
      expect(result).toEqual(4)
    })
  })
})
