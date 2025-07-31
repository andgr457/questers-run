import { LoggerService } from './LoggerService'

export class Service {
  loggerService: LoggerService
  constructor(loggerService: LoggerService){
    this.loggerService = loggerService
  }
}