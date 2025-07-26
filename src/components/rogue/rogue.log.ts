/**
 * 3. The log will add additional content after each action in the format [HH:mm] - [context] - {message}. 
 *  eg. 
 *    [03:13] - CharacterName Lvl 2 [7/17 HP] - Took a hit from goblin for 3 damage.
 *    [03:13] - Goblin Lvl 1 [8/13 HP] - Hit CharacterName for 3 damage.
 *    [03:14] - CharacterName Lvl 2 [4/17 HP] - Took a hit from goblin for 3 damage.
 *    [03:14] - CharacterName Lvl 2 [4/17 HP] - Critically hit goblin for 12.5 damage.
 *    [03:16] - CharacterName [4/17 HP] - Defeated goblin. +50XP
 * 
 */

import { BaseEntity } from '../../entity/base.entity';

export function getLogLine(entity: BaseEntity, message: string): string {
  return `[${new Date().toTimeString()}] - ${entity.name} Lvl ${entity.level} [${entity.health}/${entity.maxHealth}] - ${message}`
}
