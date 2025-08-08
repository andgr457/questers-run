// CharacterRepository.ts
import { CharacterSave } from '../interfaces/entities/saves/CharacterSave';

export class CharacterRepository {
  private readonly storageKey = 'characterDataArray';

  /** Get all characters */
  getAll(): CharacterSave[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) as CharacterSave[] : [];
  }

  /** Get a character by playerKey (id, name, etc.) */
  get(playerKey: string): CharacterSave | undefined {
    return this.getAll().find(c => c.character?.id === playerKey);
  }

  /** Add or update a character */
  store(save: CharacterSave): void {
    const all = this.getAll();
    const index = all.findIndex(c => c.character?.id === save.character?.id);

    if (index >= 0) {
      all[index] = save; // Update existing
    } else {
      all.push(save); // Add new
    }

    localStorage.setItem(this.storageKey, JSON.stringify(all));
  }

  /** Remove a character by playerKey */
  remove(playerKey: string): void {
    const all = this.getAll().filter(c => c.character?.id !== playerKey);
    localStorage.setItem(this.storageKey, JSON.stringify(all));
  }

  /** Remove all characters */
  clear(): void {
    localStorage.removeItem(this.storageKey);
  }
}
