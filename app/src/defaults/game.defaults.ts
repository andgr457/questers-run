import { DateTime } from 'luxon'
import { Save } from '../interfaces/game.interfaces'

export const TutorialSave: Save = {
  id: 'tutorial_0',
  lastSave: DateTime.now().toISO(),
  saveName: 'tutorial'
}
