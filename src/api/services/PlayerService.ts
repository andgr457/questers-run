import { IPlayer } from '../interfaces/entities/IPlayer'
import { LoggerService } from './LoggerService'
import { Service } from './Service'

export class PlayerService extends Service {
  player: IPlayer

  constructor(loggerService: LoggerService, player: IPlayer){
    super(loggerService)
    this.player = player
  }

  setName(name: string){
    this.player.name = name
  }

  setLevel(level: number){
    this.player.level = level
  }
}