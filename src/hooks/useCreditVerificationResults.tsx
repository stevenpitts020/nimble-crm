import { useQuery } from 'react-query'
import { SignerCreditVerificationService } from '../services'
import { ISignerCreditVerification } from '../store'

export const useCreditVerification = (signerId: string) => {
  return useQuery<ISignerCreditVerification[], Error>(
    ['signerCreditVerificationResults', signerId],
    async () => {
      return await SignerCreditVerificationService.getCreditVerification(
        signerId
      )
    },
    { retry: false, refetchOnWindowFocus: false }
  )
}
