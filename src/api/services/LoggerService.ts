export class LoggerService {
  private title: string

  constructor(title: string, ){
    this.title = title
  }

  log(description: string){
    console.log(`${this.title} - ${Date.now()} - ${description}`)
  }
}