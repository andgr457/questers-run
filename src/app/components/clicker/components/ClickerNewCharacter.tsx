import React, { useState, useEffect, useCallback } from 'react'
import { ICharacterClass } from '../../../../api/interfaces/entities/character/ICharacterClass'
import { CharacterClassRepository } from '../../../../api/repositories/CharacterClassRepository'

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
  const [classId, setClassId] = useState<string | null>(null)
  const [classes, setClasses] = useState<ICharacterClass[]>([])

  useEffect(() => {
    if (isOpen) {
      const classList = characterClassRepo.list()
      setClasses(classList)
      setClassId(classList.length > 0 ? classList[0].id : null)
    } else {
      setName('')
      setClassId(null)
      setClasses([])
    }
  }, [isOpen])

  const handleNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value),
    []
  )

  const handleClassSelect = useCallback((id: string) => setClassId(id), [])

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      if (!name.trim()) {
        alert('Please enter a name.')
        return
      }
      if (!classId) {
        alert('Please select a class.')
        return
      }
      onCreate({ name: name.trim(), classId })
    },
    [name, classId, onCreate]
  )

  const handleCancel = useCallback(() => onCancel(), [onCancel])

  if (!isOpen) return null

  const selectedClass = classes.find((c) => c.id === classId)

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full p-8 mx-4 flex flex-col md:flex-row gap-8">
        {/* Left: Class selection */}
        <div className="md:w-1/3 max-h-[400px] overflow-y-auto border-r border-gray-300 pr-4">
          <h3 className="text-xl font-semibold mb-4">CLASS</h3>
          <div className="space-y-2">
            {classes.map((cls) => (
              <button
                key={cls.id}
                onClick={() => handleClassSelect(cls.id)}
                className={`w-full text-left px-4 py-2 rounded-md border ${
                  cls.id === classId
                    ? 'bg-gray-600 text-white border-blue-600'
                    : 'bg-gray-100 text-gray-800 border-transparent hover:bg-gray-200'
                }`}
                type="button"
              >
                {cls.name}
              </button>
            ))}
          </div>
        </div>

        {/* Right: Name input + class details */}
        <div className="md:w-2/3">
          <h2 id="modal-title" className="text-2xl font-semibold text-gray-900 mb-6">
            CHARACTER
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

            {selectedClass && (
              <div className="bg-gray-100 p-4 rounded shadow max-w-full">
                <div className="flex justify-between border-b border-gray-300 py-1">
                  <span className="font-semibold text-gray-700">NAME</span>
                  <span className="text-gray-900">{selectedClass.name}</span>
                </div>

                <div className="mt-4 font-semibold text-gray-700">
                  STAT MODIFIERS PER LEVEL:
                </div>
                <div className="ml-4 space-y-1">
                  {Object.entries(selectedClass.statModifiersPerLevel).map(([stat, val]) => (
                    <div key={stat} className="flex justify-between">
                      <span className="capitalize">{stat}</span>
                      <span>{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

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
    </div>
  )
}
