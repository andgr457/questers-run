import { LoggerService } from '../services/LoggerService';

export class Repository {
  loggerService: LoggerService

  constructor(loggerService: LoggerService){
    this.loggerService = loggerService
  }
}