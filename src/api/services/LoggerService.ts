export class LoggerService {
  private logTitle: string

  constructor(logTitle: string){
    this.logTitle = logTitle
  }

  log(description: string, error?: any){
    if(error){
      console.error(`${Date.now()} | ${this.logTitle} | ${description} | ${JSON.stringify(error)}`)
    } else {
      console.log(`${Date.now()} | ${this.logTitle} | ${description}`)
    }
  }
}