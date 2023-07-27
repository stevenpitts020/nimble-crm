import axios, { AxiosError } from 'axios'
import Config from './Config'

/* Logic for accessing CoreAPI */
class CoreAPI {
  /**
   * Sets auth in header for next api calls
   * @param token - string
   */
  public setAuthenticationHeader(token: string) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`
  }

  /**
   * Return a single error message
   *
   * @param error - axios error
   */
  public errorMessage(error: AxiosError) {
    if (error.response) {
      // Request made and server responded
      return error.response.data.message
    } else if (error.request) {
      // The request was made but no response was received
      return 'Cannot connect to Server. Please check your connection.'
    } else {
      // Something happened in setting up the request that triggered an Error
      return error.message
    }
  }

  private url(path: string) {
    return `${Config.coreAPI}${path}`
  }

  /**
   * API Request handler
   * @param path - api endpoint
   * @param body - the body to patch into path
   * @param bodyParams - body parameters of request
   */
  public async patch(path: string, body: any, bodyParams?: any): Promise<any> {
    return (
      await axios.patch(this.url(path), body, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        params: bodyParams,
      })
    ).data
  }

  /**
   * API Request handler
   * @param url - api endpoint
   * @param method - http method
   * @param bodyParams - body parameters of request
   */
  public async putRequest(
    url: string,
    body: any,
    bodyParams?: any
  ): Promise<any> {
    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
    const requestURL = `${Config.coreAPI}${url}`
    const response = await axios.put(requestURL, body, {
      ...config,
      params: bodyParams,
    })
    return await response.data
  }

  public async deleteRequest(url: string): Promise<any> {
    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
    const requestURL = `${Config.coreAPI}${url}`
    const response = await axios.delete(requestURL, { ...config })
    return response.status >= 200 && response.status < 300
  }

  /**
   * API Request handler
   * @param url - api endpoint
   * @param method - http method
   * @param bodyParams - body parameters of request
   */
  public async postRequest(
    url: string,
    body: any,
    bodyParams?: any
  ): Promise<any> {
    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
    const requestURL = `${Config.coreAPI}${url}`
    const response = await axios.post(requestURL, body, {
      ...config,
      params: bodyParams,
    })
    return await response.data
  }

  public async postRequestMicro(
    name: string,
    body: any,
    bodyParams?: any
  ): Promise<any> {
    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }

    const instance = axios.create()
    delete instance.defaults.headers.common.Authorization
    body.bearer = axios.defaults.headers.common.Authorization.split(' ')[1]
    body.route = name
    body.env = Config.env

    const requestURL =
      'https://uu9803frva.execute-api.us-east-2.amazonaws.com/Public'
    const response = await instance.post(requestURL, body, {
      ...config,
      params: bodyParams,
    })
    return await response.data
  }

  /**
   * API Request handler
   * @param url - api endpoint
   * @param method - http method
   * @param bodyParams - body parameters of request
   */
  public async getRequest(url: string, bodyParams?: any): Promise<any> {
    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
    const requestURL = `${Config.coreAPI}${url}`

    const response = await axios.get(requestURL, {
      ...config,
      params: bodyParams,
    })
    return await response.data
  }

  public async getExternal(url: string, bodyParams?: any): Promise<any> {
    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }

    const response = await axios.get(url, {
      ...config,
      params: bodyParams,
    })
    return await response.data
  }
}

export default CoreAPI
