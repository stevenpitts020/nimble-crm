import debug from 'debug'

const BASE = 'nimble'

interface IColours {
  [key: string]: string
}

class Log {
  public generateMessage(level: any, message: string, source: string) {
    // Set the prefix which will cause debug to enable the message
    const namespace = `${BASE}:${level}`
    const createDebug = debug(namespace)

    // Set the colour of the message based on the level
    createDebug.color = this.colour(level)

    if (source) {
      createDebug(source, message)
    } else {
      createDebug(message)
    }
  }

  public trace(message: string | any, source: string) {
    return this.generateMessage('trace', message, source)
  }

  public info(message: string | any, source: string) {
    return this.generateMessage('info', message, source)
  }

  public warn(message: string | any, source: string) {
    return this.generateMessage('warn', message, source)
  }

  public error(message: string | any, source: string) {
    return this.generateMessage('error', message, source)
  }

  private colour(level: string) {
    const COLOURS: IColours = {
      trace: 'green',
      info: 'blue',
      warn: 'pink',
      error: 'red',
    } // choose better colours :)
    const key: keyof IColours = level
    const colour: string = COLOURS[key]
    return colour
  }
}

export default new Log()
