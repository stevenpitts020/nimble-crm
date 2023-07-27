/* Form specific components, text inputs, messages, Full Forms, etc */
export * from './Forms/NewProspectForm/NewProspectForm'
export * from './Forms/FormLogin/FormLogin'
export * from './Forms/FormRequestPassword/FormRequestPassword'
export * from './Forms/FormSetPassword/FormSetPassword'
export * from './Forms/FormChangePassword/FormChangePassword'
export * from './Forms/FormRequestPhone/FormRequestPhone'

/* Common elements, used through all the app */
export * from './Common/Icon/Icon'
export * from './Common/SectionHeader/SectionTitle'
export * from './Common/SectionHeader/SectionHeader'
export * from './Common/Stack/Stack'
export * from './Common/Divider/Divider'
export * from './Common/EmptyTable/EmptyTable'
export * from './Common/NotFound/NotFound'
export * from './Common/AlertMessage/AlertMessage'
export * from './Common/ModalWindow/ModalWindow'
export * from './Common/Hero/Hero'
export * from './Common/SearchInput/SearchInput'
export * from './Common/Box/Box'
export * from './Common/PillDropdown/PillDropdown'

/* Related to navigation (header, sidebar) */
export * from './Navigation/HeaderNavigation/HeaderNavigation'
export * from './Navigation/LogoutButton/LogoutButton'
export * from './Navigation/UserGreeting/UserGreeting'
export * from './Navigation/Sidebar/Sidebar'
export * from './Navigation/NotificationBadge/NotificationBadge'

/* Related to Account Requests */
export * from './AccountRequest/AccountRequestTable/AccountRequestTable'
export * from './AccountRequest/AccountRequestFilters/AccountRequestFilters'
export * from './AccountRequest/AccountAprovalForm/AccountAprovalForm'
export * from './AccountRequest/AccountChangeStatus/AccountChangeStatus'
export * from './AccountRequest/AccountHeader/AccountHeader'
export * from './AccountRequest/AccountDeclineForm/AccountDeclineForm'

/* Related to Account Requests > Signers */
export * from './Signer/SignerRole/SignerRole'
export * from './Signer/SignerStatus/SignerStatus'
export * from './Signer/SignerPersonalInfo/SignerPersonalInfo'
export * from './Signer/SignerDocuments/SignerDocuments'
export * from './Signer/SignerTextLabel/SignerTextLabel'
export * from './Signer/SignerVerification/SignerVerification'
export * from './Signer/SignerDetailCard/SignerDetailCard'
export * from './Signer/SignerInvitedDetailCard/SignerInvitedDetailCard'
export * from './Signer/SignerIdProofImages/SignerIdProofImages'
export * from './Signer/SignerCreditScore/SignerCreditScore'
export * from './Signer/SignerEmailVerification/SignerEmailVerification'

export * from './Signer/SignerModalMenu/SignerModalMenu'

/* All of these below were created for the CRM static pages. If you maker them full-fledged components, please:
 * 1. Add tests
 * 2. Move them to a more appropriate folder if needed
 */

export * from './Dashboard/FilterDropdownMenu/FilterDropdownMenu'
export * from './Dashboard/SearchBar/SearchBar'
export * from './Dashboard/FilterDateMenu/FilterDateMenu'
export * from './Dashboard/Map/Map'
export * from './Dashboard/SidebarNotifications/SidebarNotifications'

/* Create charts and statistics */
export * from './Statistics/Chart/PieChart'
export * from './Statistics/Chart/LineChart'
export * from './Statistics/Chart/PieSlice'
export * from './Statistics/Chart/AquisitionChart'
export * from './Statistics/Chart/CardLineChart'
export * from './Statistics/Chart/MiniPieChart'
export * from './Statistics/StatList/StatList'
export * from './Statistics/StatCard/StatCard'
export * from './Statistics/StatNumber/StatNumber'
export * from './Statistics/CircularProgress/CircularProgress'

/* Used to generate dummy data and tables */
export * from './Customer/CustomerCard/CustomerCard'
export * from './Customer/CustomerTable/CustomerTable'
export * from './DataTable/DataTable'

export * from './User/UserTable/UserTable'
export * from './User/UserListActions/UserListActions'
export * from './User/AddUserForm/AddUserForm'

export * from './Institution/InstitutionTable/InstitutionTable'

export * from './InstitutionBranch/InstitutionBranchTable/InstitutionBranchTable'
export * from './InstitutionLogo/InstitutionLogo'
export * from './InstitutionSettings/InstitutionSettings'
export * from './InstitutionTemplates/InstitutionTemplates'

export * from './Product/ProductTable/ProductTable'

/* Nimble Data Service */
export * from './GMap/GMap'
export * from './Enrichment/GeoEnrichment/GeoEnrichment'
export * from './Analysis/Analysis'
export * from './Analysis/Statements/Canonical'
export * from './Analysis/Statements/LineItems'
