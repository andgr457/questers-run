import React, { useCallback } from 'react'
import JSZip from 'jszip'
import { Button } from '@material-tailwind/react';
import { Character } from '../entity/character';
import { Player } from '../entity/player';

interface LoaderProps {
  onLoad: (characters: Character[], player: Player) => void
}

const Loader: React.FC<LoaderProps> = ({ onLoad }) => {
  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()

    reader.onload = async (e) => {
      if (e.target?.result) {
        const zip = await JSZip.loadAsync(e.target.result as any)
        const saveData = await zip.file('questers-run.json')?.async('string')

        if (saveData) {
          console.log(saveData)
          const data = JSON.parse(saveData) as {characters: Character[], player: Player}
          onLoad(data.characters, data.player);
        }
      }
    };

    reader.readAsArrayBuffer(file)
  }, [onLoad]);

  return (
    <Button 

    placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
    <label className="cursor-pointer">
            Load
            <input
              type="file"
              className="hidden"
              accept=".zip"
              onChange={handleFileChange}
            />
          </label>
  </Button>
  );
};

export default Loader;
