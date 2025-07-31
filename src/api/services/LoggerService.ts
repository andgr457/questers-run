export class LoggerService {
  private logTitle: string

  constructor(logTitle: string){
    this.logTitle = logTitle
  }

  log(description: string){
    console.log(`${Date.now()} | ${this.logTitle} | ${description}`)
  }
}