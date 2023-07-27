import {
  IGroupedComplianceEntries,
  ISignerComplianceVerificationListEntry,
} from '../store'

/**
 * This file contains basic format helpers to be reused in views or components related to compliance
 *
 * Use it to DRY your code. Peace.
 * ex: Helpers.dateFormat(20);
 */
const ComplianceHelper = {
  groupItemsBySourceAndDate: (
    listEntries: ISignerComplianceVerificationListEntry[]
  ): {
    active: IGroupedComplianceEntries
    inactive: IGroupedComplianceEntries
  } => {
    const groupedEntries = listEntries?.reduce(
      (groups: any, item: ISignerComplianceVerificationListEntry) => {
        const state = !item.deletedDate ? 'active' : 'inactive'
        const source = groups[state][item.source] || []
        source.push(item)
        groups[state][item.source] = source
        return groups
      },
      { active: {}, inactive: {} }
    )
    return groupedEntries
  },
  itemSizeBySourceAndDate: (groupedItem: {
    active: IGroupedComplianceEntries
    inactive: IGroupedComplianceEntries
  }): number => {
    return (
      Object.keys(groupedItem.active).length +
      Object.keys(groupedItem.inactive).length
    )
  },
  parseSubtype: (subtype: string) => {
    switch (subtype) {
      // single word
      case 'warning':
      case 'sanction':
        return subtype.toUpperCase()
      // multipe words
      case 'adverse-media-terrorism':
      case 'adverse-media-fraud':
      case 'adverse-media-narcotics':
      case 'adverse-media-general':
      case 'adverse-media-sexual-crime':
      case 'adverse-media-violent-crime':
      case 'adverse-media-financial-crime':
      case 'adverse-media':
      case 'fitnesse-probity':
        return subtype
          .replaceAll('-', ' ')
          .split(' ')
          .map(s => s.charAt(0).toUpperCase() + s.slice(1))
          .join(' ')
    }

    // or else:
    const types = subtype.split(',')
    if (types.includes('pep-class-1')) {
      return 'PEP Class 1'
    }

    if (types.includes('pep-class-2')) {
      return 'PEP Class 2'
    }

    if (types.includes('pep-class-3')) {
      return 'PEP Class 3'
    }

    if (types.includes('pep-class-4')) {
      return 'PEP Class 3'
    }

    if (types.includes('pep')) {
      return 'PEP'
    }

    return ''
  },
}
export default ComplianceHelper
