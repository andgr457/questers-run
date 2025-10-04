import { DateTime } from 'luxon'
import { IQuest, QuestEventCallback, QuestEventType } from '../interfaces/entities/IQuest'
import { LoggerService } from './LoggerService'
import { Service } from './Service'
import { IMob } from '../interfaces/entities/IMob'
import { MobRepository } from '../repositories/MobRepository'
import { CharacterService } from './CharacterService'
import { AllLoot, LootRepository } from '../repositories/LootRepository'

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
  private potentialLoot: Partial<AllLoot>[]
  private potentialMobs: IMob[]

  private lootRepo: LootRepository
  private mobRepo: MobRepository

  constructor(
    loggerService: LoggerService,
    quest: IQuest,
    characterService: CharacterService,
    onTick?: OnTickCallback,
    onComplete?: OnCompleteCallback,
    timeLeft?: number
  ) {
    super(loggerService)
    this.quest = quest
    this.characterService = characterService
    this.timeLeft = timeLeft ?? quest.time
    this.onTickCallback = onTick ?? null
    this.onCompleteCallback = onComplete ?? null
    this.mobRepo = new MobRepository(loggerService)
    this.lootRepo = new LootRepository(this.loggerService)

    this.potentialLoot = []
    for(const id of this.quest.possibleLootIds){
      this.potentialLoot.push(this.lootRepo.getById(id))
    }

    this.potentialMobs = []
    for(const id of this.quest.possibleMobIds){
      this.potentialMobs.push(this.mobRepo.getById(id))
    }
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

  private getHitChance(attackerAgility: number, defenderAgility: number): number {
    const agilityDiff = attackerAgility - defenderAgility;
    const baseChance = 0.8 + agilityDiff * 0.02; // 80% base, adjust by agility difference
    return Math.max(0.5, Math.min(0.95, baseChance)); // clamp between 50% and 95%
  }

  private tick(): void {
    this.timeLeft--
    this.emitEvent({ type: 'gain-xp', experience: this.quest.experience * .5 }); //half quest xp per tick
    for (const mob of this.potentialMobs) {
      if (Math.random() < mob.chance) {
        // Roll for each side to hit
        const charHits = Math.random() < this.getHitChance(this.characterService.character.agility, mob.agility ?? 2);
        const mobHits = Math.random() < this.getHitChance(mob.agility ?? 2, this.characterService.character.agility);

        const characterEffectiveDps = charHits
          ? this.calculateEffectiveDamage(this.characterService.getDps(), mob.defense)
          : 0;

        const mobEffectiveDps = mobHits
          ? this.calculateEffectiveDamage(mob.dps, this.characterService.getDefense())
          : 0;

        console.log(`Mob DPS: ${mobEffectiveDps} | Character DPS: ${characterEffectiveDps}`);

        if (mobEffectiveDps > characterEffectiveDps) {
          this.characterService.character.health -= mobEffectiveDps;
          // Make sure it doesn't go below zero
          if (this.characterService.character.health < 0) {
            this.characterService.character.health = 0;
          }
          this.emitEvent({ type: "damage-taken", damage: mobEffectiveDps });
          // Check if character died after taking damage
          if (this.characterService.character.health <= 0) {
            this.failQuest();
            break
          }
        } else if (characterEffectiveDps > 0) {
          this.emitEvent({ type: "mob-kill", mobName: mob.name, experience: mob.experience, gold: mob.gold });
        }
      }
    }


    // Loot drops independently every tick
    for (const loot of this.potentialLoot) {
      if (Math.random() < loot.chance) {
        this.emitEvent({ type: 'loot-drop', itemName: loot.title, loot: loot });
      }
    }

    this.onTickCallback?.(this.timeLeft, this.timeLeft <= 0)
    
    if (this.timeLeft <= 0 && this.characterService.character.health > 0) {
      this.completeQuest()
    }
  }

  private completeQuest(): void {
    if (this.interval) {
      clearInterval(this.interval)
      this.interval = null
    }
    this.emitEvent({ type: "quest-complete", questName: this.quest.title, experience: this.quest.experience * 10, gold: this.quest.gold }); // 10 times xp on quest complete?
  }

  failQuest(): void {
    if (this.interval) {
      clearInterval(this.interval)
      this.interval = null
    }
    this.timeLeft = 0
    this.emitEvent({ type: "quest-failed", questName: this.quest.title })
  }

  getQuestTimeLeft(): string {
    return `${this.timeLeft} seconds`
  }
}
