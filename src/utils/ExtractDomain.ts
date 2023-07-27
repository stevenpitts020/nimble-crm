/**
 * extractDomain
 * Note we should use something like tld-extract but this lib was returning a error on the console
 *
 * @param url - string for url or email
 */
export const extractDomain = (url: string) => {
  if (!url) {
    return ''
  }
  if (url.split('@').length === 1) {
    return ''
  }

  return url.split('@').pop() || ''
}
