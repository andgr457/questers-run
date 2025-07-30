import { DateTime } from 'luxon'
import { IQuest, QuestEventCallback, QuestEventType } from '../interfaces/entities/IQuest'
import { LoggerService } from './LoggerService'
import { Service } from './Service'
import { ILoot } from '../interfaces/entities/ILoot'
import { IMob } from '../interfaces/entities/IMob'
import { LootResourceRepository } from '../repositories/loot/LootResourceRepository'
import { MobRepository } from '../repositories/MobRepository'
import { ICharacter } from '../interfaces/entities/character/ICharacter'
import { CharacterService } from './CharacterService'

type OnTickCallback = (timeLeft: number, isComplete: boolean) => void
type OnCompleteCallback = () => void

export class QuestService extends Service {
  quest: IQuest
  characterService: CharacterService
  timeLeft: number
  private interval: NodeJS.Timeout | null = null
  private onTickCallback: OnTickCallback | null = null
  private onCompleteCallback: OnCompleteCallback | null = null
  private eventListeners: QuestEventCallback[] = []
  private potentialLoot: ILoot[]
  private potentialMobs: IMob[]

  private resourceRepo: LootResourceRepository
  private mobRepo: MobRepository

  constructor(
    loggerService: LoggerService,
    quest: IQuest,
    characterService: CharacterService,
    onTick?: OnTickCallback,
    onComplete?: OnCompleteCallback
  ) {
    super(loggerService)
    this.quest = quest
    this.characterService = characterService
    this.timeLeft = quest.time
    this.onTickCallback = onTick ?? null
    this.onCompleteCallback = onComplete ?? null
    this.mobRepo = new MobRepository(loggerService)
    this.resourceRepo = new LootResourceRepository(this.loggerService)
    this.potentialLoot = [
      ...this.resourceRepo.list().filter(resource => this.quest.possibleLootIds.includes(resource.id)) //TODO: fix params
    ]
    this.potentialMobs = [
      ...this.mobRepo.list().filter(mob => this.quest.possibleMobIds.includes(mob.id))
    ]
  }

  /** Add UI listener for quest events */
  onEvent(callback: QuestEventCallback) {
    this.eventListeners.push(callback);
  }

  offEvent(callback: QuestEventCallback) {
    this.eventListeners = this.eventListeners.filter(cb => cb !== callback);
  }

  /** Emit event to all listeners */
  private emitEvent(event: QuestEventType) {
    this.eventListeners.forEach(cb => cb(event))
  }

  startQuest(): void {
    this.emitEvent({ type: "quest-start", questName: this.quest.title })
    this.quest.startDate = DateTime.utc().toISO()
    this.interval = setInterval(() => this.tick(), 1000)
  }

  private calculateEffectiveDamage(attackDps: number, defense: number): number {
    // Classic diminishing returns formula for defense reducing damage
    const damageReduction = defense / (defense + attackDps);
    const cappedReduction = Math.min(damageReduction, 0.8); // max 80% reduction

    return attackDps * (1 - cappedReduction);
  }

  private tick(): void {
    this.timeLeft--
    this.loggerService.log(`Quest tick: ${this.timeLeft}`)

    for (const mob of this.potentialMobs) {
      if (Math.random() < mob.chance) {
        const characterEffectiveDps = this.calculateEffectiveDamage(this.characterService.getDps(), mob.defense);
        const mobEffectiveDps = this.calculateEffectiveDamage(mob.dps, this.characterService.getDefense());

        if (mobEffectiveDps > characterEffectiveDps) {
          this.emitEvent({ type: "damage-taken", damage: mobEffectiveDps.toFixed(2) });

          // Check if character died after taking damage
          if (this.characterService.character.health <= 0) {
            this.failQuest();
            break; // Stop processing further since quest failed
          }
        } else {
          this.emitEvent({ type: "mob-kill", mobName: mob.name });
        }

        // No break here, so all mobs can be processed each tick
      }
    }

    // Loot drops independently every tick
    for (const loot of this.potentialLoot) {
      if (Math.random() < loot.chance) {
        this.emitEvent({ type: 'loot-drop', itemName: loot.title });
      }
    }

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
    this.emitEvent({ type: "quest-complete", questName: this.quest.title });


    // Instead of one combined "rewards" event, do this:
    this.emitEvent({ type: "gain-gold", amount: 15 });
    this.emitEvent({ type: "gain-xp", amount: 25 });
    this.emitEvent({ type: "loot-drop", itemName: "Iron Sword", icon: "/icons/sword.png" });
  }

  failQuest(): void {
    if (this.interval) {
      clearInterval(this.interval)
      this.interval = null
    }
    this.loggerService.log(`Quest failed!`)
    this.emitEvent({ type: "quest-failed", questName: this.quest.title })
  }

  getQuestTimeLeft(): string {
    return `${this.timeLeft} seconds`
  }
}
