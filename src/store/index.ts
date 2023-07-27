// generic provider
export interface IProvider {
  children: React.ReactNode
}

// generic state machine type. you can create your own and extend if needed
export interface IStateMachine {
  status: string
  error?: string | null
}

// generic type and payload for reducer
export interface IReducerAction {
  type: string
  payload?: string
}

// pagination options for list requests
export interface IPaginationOptions {
  limit?: number
  offset?: number
  sort?: string
  search?: string
  branch?: string
}

// search options for list account requests
export interface ISearchOptions extends IPaginationOptions {
  status?: string | null
}

/* Institution */
export interface IInstitution {
  id: string
  name: string
  domain: string
  templateApprove: string
  templateDecline: string
  routingNumber: string
  branchesCount: number
  backgroundImageUri: {
    default?: string
  }
  logoUri: {
    default?: string
  }
  disclosures?: IDisclosures
  agreements?: object
  workbook?: object
  questions?: IComplianceQuestions
}

export interface IInstitutionUpdate {
  id: string
  name?: string
  domain?: string
  routingNumber?: string
  publicMetadata?: object
  disclosures?: IDisclosures
  agreements?: object
  workbook?: object
  questions?: IComplianceQuestions
}

export interface IDisclosures {
  count?: number
  data?: IDisclosure[]
}

export interface IDisclosure {
  name: string
  body: string
}

export interface IComplianceQuestions {
  count?: number
  data?: IComplianceQuestion[]
  thresholds?: IComplianceThreshold[]
}

export interface ISetComplianceQuestions {
  count: number
  data: IComplianceQuestion[]
  thresholds: IComplianceThreshold[]
}

export interface IComplianceQuestion {
  id?: string
  text: string
  type: 'string' | 'number' | 'boolean' | 'date' | 'array'
  subtype: 'enum' | 'text' | 'country'
  enum?: string[]
  default?: any
  score?: object
  dependsOn?: any
  required?: boolean
}

export interface IComplianceThreshold {
  op: '=' | '>' | '>=' | '<' | '<='
  val: number
  risk: 'Low' | 'Moderate' | 'High'
}

export interface IInstitutionBranch {
  id: string
  name: string
  externalId: string
  institution?: IInstitution
  routingNumber: string
  street: string
  street2: string
  city: string
  state: string
  zip: string
  active: boolean
  note: string
}

/* User for backoffice */
export interface IUser {
  id: string
  _refLink?: string
  firstName: string
  lastName: string
  gender: string
  email: string
  accounts: any
  createdAt: string
  lastLoginAt?: string
  institution?: IInstitution
  branch?: IInstitutionBranch
  roles: string[]
  status: string
  phone?: string
}

export interface IUserCreate {
  firstName: string
  lastName: string
  email: string
  institutionId?: string
  branchId?: string
  roles?: string[]
}

export interface IUserUpdate {
  id: string
  firstName?: string
  lastName?: string
  email?: string
  institutionId?: string
  branchId?: string
  roles?: string[]
  status?: string
  phone?: string
}

export interface IInstitutionBranchUpdate {
  id: string
  name?: string
  externalId?: string
  routingNumber?: string
  street?: string
  street2?: string
  city?: string
  state?: string
  zip?: string
  active?: boolean
  note?: string
}

export interface INotificationRecipient {
  name?: string
  email?: string
  mobile?: string
}

export interface INotificationCreate {
  method: 'email' | 'sms' | 'push'
  recipient: INotificationRecipient
  cc?: string
  title?: string
  message: string
  html?: string
  product?: string
  my?: any
}

// Result from identity verification
export interface IdentityVerificationResultSchema {
  face: 1 | 0
  address: {
    partial_address_match_with_id_and_utility_bill: 1 | 0
    full_address: 1 | 0
    address_document_visibility: 1 | 0
    address_document_must_not_be_expired: 1 | 0
    address_document: 1 | 0
    address_document_country: 1 | 0
    selected_type: 1 | 0
  }
  document: {
    issue_date: 1 | 0
    document_visibility: 1 | 0
    document_must_not_be_expired: 1 | 0
    document: 1 | 0
    document_country: 1 | 0
    selected_type: 1 | 0
    name: 1 | 0
    document_proof: 1 | 0
    face_on_document_matched: 1 | 0
  }
}

export interface SignerVerificationStatusSchema {
  faceStatus: 'VALID' | 'PENDING' | 'NOMATCH'
  faceUpdatedAt: string
  documentStatus: 'VALID' | 'PENDING' | 'NOMATCH'
  documentUpdatedAt: string
  addressStatus: 'VALID' | 'PENDING' | 'NOMATCH'
  addressUpdatedAt: string
  sanctionsStatus: 'VALID' | 'PENDING' | 'NOMATCH'
  sanctionsUpdatedAt: string
  mediaStatus: 'VALID' | 'PENDING' | 'NOMATCH'
  mediaUpdatedAt: string
  politicalExposure: 'VALID' | 'PENDING' | 'NOMATCH'
  politicalExposureUpdatedAt: string
}

// Signer
export interface SignerSchema {
  id: string
  invitedAt: string
  firstName: string | null
  middleName: string | null
  lastName: string | null
  status?: 'INVITED' | 'PENDING' | 'SIGNED'
  branchId?: string
  role: string
  address: string | null
  city: string | null
  state: string | null
  zipCode: string | null
  employer: string | null
  phoneNumber: string | null
  step: string
  ssn: string | null
  email: string | null
  dateOfBirth: string
  emailVerified: boolean
  emailVerifiedAt: string
  consent: boolean | null
  idProofDocument: {
    type: string | null
    number: string | null
    expirationDate: string
    issuer: string
    issuedDate: string
    frontIdProof: { default?: string }
    backIdProof: { default?: string }
  }
  selfie: {
    default?: string
  }
  checkSanction: boolean | null // null if checks didn't run
  sanctionVerifiedAt: Date | null
  checkPoliticalExposure: boolean | null
  politicalExposureVerifiedAt: Date | null
  checkAdverseMedia: boolean | null
  adverseMediaVerifiedAt: Date | null
  checkAntiMoneyLaundering: boolean | null
  antiMoneyLaunderingVerifiedAt: Date | null
  contractDocumentSignerStatus: string | null
  contractDocumentSignerStatusUpdatedAt: Date | null
  verificationStatus: SignerVerificationStatusSchema
  identityVerificationResult: IdentityVerificationResultSchema | null // deprecated
  identityVerificationStatus: string | null
  identityVerified: boolean | null
}

interface AccountRequestStatusUpdatedBy {
  createdAt: string
  email: string
  firstName: string
  lastName: string
}

export interface IAccountRequest {
  id: string
  deleted?: boolean
  status: string
  branchId: string
  statusUpdatedAt: string
  statusUpdatedBy: AccountRequestStatusUpdatedBy
  statusEmailBody?: string
  statusEmailSubject?: string
  signers: [SignerSchema]
  createdAt: string
  contractDocumentEnvelopeStatus: string | null
  contractDocumentCreatedAt: Date | null
  contractDocumentEnvelopeStatusUpdatedAt: Date | null
  contract: {
    uri: string
  }
  referredBy: IUser
  referrers: IReferrer[]
  productConfigurations: IProductConfiguration[]
  verificationStatus: {
    faceStatus: 'VALID' | 'INVALID' | 'PENDING' | 'NOMATCH' | 'MATCH'
    documentStatus: 'VALID' | 'INVALID' | 'PENDING' | 'NOMATCH' | 'MATCH'
    addressStatus: 'VALID' | 'INVALID' | 'PENDING' | 'NOMATCH' | 'MATCH'
    sanctionsStatus: 'VALID' | 'INVALID' | 'PENDING' | 'NOMATCH' | 'MATCH'
    mediaStatus: 'VALID' | 'INVALID' | 'PENDING' | 'NOMATCH' | 'MATCH'
    politicalExposure: 'VALID' | 'INVALID' | 'PENDING' | 'NOMATCH' | 'MATCH'
  }
  bsa: {
    score: number
    risk: string
  }
}

export interface IBSARiskResult {
  questionId: string
  position: number
  answer: string | null
  text?: string
  type?: string
  subtype?: string
}

export interface IAccountRequestUpdate {
  status: string
  statusEmailSubject: string
  statusEmailBody: string
  branchId?: string
}

export interface IReferrer {
  id: string
  name: string
  email: string
}

export interface IAccountRequestPatchData {
  deleted?: boolean
  status?: string
  branchId?: string
  referredById?: string
}

export interface IAccountRequestPatch extends IAccountRequestPatchData {
  id: string
}

/* CustomerOpportunity and CustomerSchema used in CRM static pages */
export interface CustomerOpportunity {
  key: string
  name: string
  description: string
  color: string
  class: string
}

export interface CustomerSchema {
  id: string
  firstName: string
  lastName: string
  generation?: string
  rating?: string
  status?: string
  opportunity?: CustomerOpportunity
  opportunities?: CustomerOpportunity[]
  companyName?: string
  ssn?: string
  email?: string
  company?: string
  avatar?: string
  creationDate: string
  accountStatus?: string
  streetAddress?: string
  secondaryAddress?: string
  city?: string
  state?: string
  postalCode?: string
  d_volume?: number
  l_volume?: number
  p_count?: number
  habitat?: string
}

export interface IProductConfiguration {
  initialDeposit: number
  productId: string
  createdAt: string
  product: IProduct
}

export interface IProduct {
  id: string
  name: string
  category: string
  sku: string
  summary: string
  content: string
  createdAt: string
  options: IProductOptionsConfiguration[]
}

export interface IProductOptionsConfiguration {
  id: string
  key: string
  value: string
  category: string
  title: string
  parentId: string
}

export interface IProductOptionsConfigurationUpdate {
  id: string
  key?: string
  value?: string
  category?: string
  title?: string
  parentId: string
}

export interface ISignerCreditVerification {
  completionCode: string
  createdAt: string
  id: string
  reference: string
  report: { uri: string | null }
  reportDate: string | null
  score: number | null | undefined
  signerId: string
  updatedAt: string
}

export interface ISignerIdentityVerification {
  verification: string
  category: string
  date: string
  status: string
}

// a object like this { groceries: [ listEntry1, listEntry2 ] }
export interface IGroupedComplianceEntries {
  [key: string]: ISignerComplianceVerificationListEntry[]
}

export interface ISignerComplianceVerificationListEntry {
  id: string
  name: string
  date: string
  countryCodes: [string]
  type: string
  source: string
  url: string
  value: string
  deletedDate: string
  createdAt: string
  updatedAt: string
  subtype: string
}

export interface ISignerComplianceVerificationItem {
  id: string
  fullName: string
  nameAka: [string]
  dateOfBirth: string
  dateOfDeath: string
  countries: [string]
  associates: [string]
  matchTypes: [string]
  adverseMedia: [ISignerComplianceVerificationListEntry]
  warnings: [ISignerComplianceVerificationListEntry]
  sanctions: [ISignerComplianceVerificationListEntry]
  politicalExposure: [ISignerComplianceVerificationListEntry]
  createdAt: string
  updatedAt: string
}

export interface ISignerComplianceVerification {
  id: string
  status: string
  searchObject: string
  reference: string
  signer_id: string
  report: {
    uri: string | null
  }
  createdAt: string
  updatedAt: string
  results: [ISignerComplianceVerificationItem]
}

export interface ISelectOptions {
  value: string
  label: string
}

export interface IBaseRate {
  id: number
  name: string
  summary: string
  value: number
}

export interface ISearchData {
  id?: string
  name: string
  description?: string
  query: any
  filters: any[]
}

export interface IDocumentRequestActor {
  name: string
  email: string
}

export interface IDocumentRequestEntity {
  type: string
  subtype?: string
  name: string
}

export interface IDocumentRequest {
  product: IDocumentRequestEntity
  document: IDocumentRequestEntity
  sender: IDocumentRequestActor
  recipient: IDocumentRequestActor
}