import React, { useState, useEffect, useCallback } from 'react'
import { ICharacterClass } from '../../../../api/interfaces/entities/character/ICharacterClass';
import { CharacterClassRepository } from '../../../../api/repositories/CharacterClassRepository';

interface ClickerNewCharacterParams {
  isOpen: boolean
  onCreate: (character: { name: string; classId: string }) => void
  onCancel: () => void
  characterClassRepo: CharacterClassRepository
}

export function ClickerNewCharacter({
  isOpen,
  onCreate,
  onCancel,
  characterClassRepo,
}: ClickerNewCharacterParams) {
  const [name, setName] = useState('')
  const [classId, setClassId] = useState('')
  const [classes, setClasses] = useState<ICharacterClass[]>([])

  useEffect(() => {
    if (isOpen) {
      const classList = characterClassRepo.list()
      setClasses(classList)
      if (classList.length > 0) setClassId(classList[0].id)
    } else {
      setName('')
      setClassId('')
      setClasses([])
    }
  }, [isOpen, characterClassRepo])

  const handleNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value),
    []
  )

  const handleClassChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => setClassId(e.target.value),
    []
  )

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      if (!name.trim()) {
        alert('Please enter a name.')
        return
      }
      onCreate({ name: name.trim(), classId })
    },
    [name, classId, onCreate]
  )

  const handleCancel = useCallback(() => onCancel(), [onCancel])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-8 mx-4">
        <h2
          id="modal-title"
          className="text-2xl font-semibold text-gray-900 mb-6 text-center"
        >
          Create New Character
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={handleNameChange}
              className="block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter character name"
              required
              autoFocus
            />
          </div>

          <div>
            <label
              htmlFor="classId"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Class
            </label>
            <select
              id="classId"
              value={classId}
              onChange={handleClassChange}
              className="block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {classes.map((cls) => (
                <option key={cls.id} value={cls.id}>
                  {cls.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="px-5 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
