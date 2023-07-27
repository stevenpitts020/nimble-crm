import { useQuery } from 'react-query'
import { InstitutionBranchesService } from '../services'
import { IInstitutionBranch } from '../store'

export const useInstitutionBranches = (institutionId: string) => {
  return useQuery<IInstitutionBranch[], Error>(
    ['institutionBranchesResults', institutionId],
    async () => {
      if (institutionId !== undefined) {
        return await InstitutionBranchesService.getInstitutionBranches(
          institutionId
        )
      }
    },
    { retry: false, refetchOnWindowFocus: false }
  )
}
