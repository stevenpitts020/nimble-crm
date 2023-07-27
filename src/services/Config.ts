class Config {
  public readonly coreAPI: string
  public readonly env: string
  public readonly local: boolean
  public readonly mockAPI: boolean
  public readonly gtmID: string | undefined
  public readonly gtmAuth: string | undefined
  public readonly gtmPreview: string | undefined
  public readonly sentryDSN: string | undefined
  public readonly releaseVersion: string | undefined
  public readonly context: string
  public readonly allowPassword: boolean
  public readonly mapboxAccessToken: string | undefined

  constructor() {
    this.coreAPI =
      process.env.REACT_APP_API_URL || 'https://api-dev.nimblefi.com/v1'
    this.env =
      process.env.REACT_APP_ENV || process.env.NODE_ENV || 'development'
    // mock response from api calls
    this.mockAPI = process.env.REACT_APP_MOCK_API_CALLS === 'true' || false

    // google tag manager var's
    this.gtmID = process.env.REACT_APP_GTM_ID
    this.gtmAuth = process.env.REACT_APP_GTM_AUTH
    this.gtmPreview = process.env.REACT_APP_GTM_PREVIEW

    this.sentryDSN = process.env.REACT_APP_SENTRY_DSN || undefined
    this.releaseVersion = `NimbleCRM@${process.env.REACT_APP_VERSION || '1'}`
    this.context = this.getContext()
    this.allowPassword = !!process.env.REACT_APP_ALLOW_PASSWORD
    this.local =
      this.env === 'development' &&
      (this.coreAPI.includes('localhost') || this.coreAPI.includes('127.0.0.1'))
    this.mapboxAccessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN
  }

  public getContext() {
    const subdomain = this.coreAPI.split('.')[1]
      ? this.coreAPI.split('.')[1]
      : false

    switch (subdomain) {
      case 'dev':
        return 'dev'
      case 'app':
        return 'production'
      case 'demo':
        return 'demo'
      case 'qa':
        return 'qa'
      default:
        return 'localhost'
    }
  }
}

export default new Config()
