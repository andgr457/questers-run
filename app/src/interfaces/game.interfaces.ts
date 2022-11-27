import { DateTime } from "luxon"
import { Character, CharacterSkill } from "./character.interfaces"
import { Mob } from "./mob.interfaces"
import { QuestLine } from "./quest.interfaces"
import { Zone } from "./zone.interfaces"

export interface Game {
  characters: Character[]
  skills: CharacterSkill[]
  questLines: QuestLine[]
  mobs: Mob[]
  zones: Zone[]
}

export interface Save {
  saveName: string
  lastSave: string
  charactersFile: string
  skillsFile: string
  questLinesFile: string
  mobsFile: string
  zonesFile: string
}