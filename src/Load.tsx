import React, { useCallback } from 'react'
import JSZip from 'jszip'
import { Button } from '@material-tailwind/react'
import { Character } from './entity/entity.interface'

interface CharacterLoaderProps {
  onLoad: (characters: Character[]) => void;
}

const CharacterLoader: React.FC<CharacterLoaderProps> = ({ onLoad }) => {
  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = async (e) => {
      if (e.target?.result) {
        const zip = await JSZip.loadAsync(e.target.result as any);
        const charactersJson = await zip.file('characters.json')?.async('string');

        if (charactersJson) {
          const characters = JSON.parse(charactersJson) as Character[];
          onLoad(characters);
        }
      }
    };

    reader.readAsArrayBuffer(file);
  }, [onLoad]);

  return (
    <button
        className="select-none rounded-lg bg-blue-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        type="button"
      >
        <label className="cursor-pointer">
        Load Characters
        <input
          type="file"
          className="hidden"
          accept=".zip"
          onChange={handleFileChange}
        />
      </label>
      </button>
  );
};

export default CharacterLoader;
