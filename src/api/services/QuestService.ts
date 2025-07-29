import { DateTime } from 'luxon'
import { IQuest } from '../interfaces/entities/IQuest'
import { LoggerService } from './LoggerService'
import { Service } from './Service'

type OnTickCallback = (timeLeft: number, isComplete: boolean) => void
type OnCompleteCallback = () => void

export class QuestService extends Service {
  quest: IQuest
  timeLeft: number
  private interval: NodeJS.Timeout | null = null
  private onTickCallback: OnTickCallback | null = null
  private onCompleteCallback: OnCompleteCallback | null = null

  constructor(
    logger: LoggerService,
    quest: IQuest,
    private characterId: string,
    onTick?: OnTickCallback,
    onComplete?: OnCompleteCallback
  ) {
    super(logger)
    this.quest = quest
    this.timeLeft = quest.time
    this.onTickCallback = onTick ?? null
    this.onCompleteCallback = onComplete ?? null
  }

  startQuest(): void {
    this.quest.startDate = DateTime.utc().toISO()
    this.interval = setInterval(() => this.tick(), 1000)
  }

  private tick(): void {
    this.timeLeft--
    this.loggerService.log(`Quest tick: ${this.timeLeft}`)

    this.onTickCallback?.(this.timeLeft, this.timeLeft <= 0)

    if (this.timeLeft <= 0) {
      this.completeQuest()
    }
  }

  private completeQuest(): void {
    if (this.interval) {
      clearInterval(this.interval)
      this.interval = null
    }

    this.loggerService.log(`Quest completed!`)
    this.onCompleteCallback?.()
  }

  getQuestTimeLeft(): string {
    return `${this.timeLeft} seconds`
  }
}
