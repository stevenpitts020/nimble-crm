import { useQuery } from 'react-query'
import { accountRequestService } from '../services'
import { IBSARiskResult } from '../store'

export const useBSARiskResults = (accountRequestId: string) => {
  return useQuery<IBSARiskResult[], Error>(
    ['bsaRiskResults', accountRequestId],
    async () => {
      return await accountRequestService.getBSARiskResults(accountRequestId)
    },
    { retry: false, refetchOnWindowFocus: false }
  )
}
