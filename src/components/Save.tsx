import React from 'react'
import JSZip from 'jszip'
import { Button } from '@material-tailwind/react'
import { Character, Player } from '../entity/entity.interface'

interface CharacterSaverProps {
  characters: Character[]
  player: Player
}

const CharacterSaver: React.FC<CharacterSaverProps> = ({ characters, player }) => {
  const handleDownload = () => {
    if(characters.length === 0) return
    const zip = new JSZip();
    const saveData = JSON.stringify({characters, player});
    const filename = `questers-run.zip`
    zip.file('questers-run.json', saveData)

    zip.generateAsync({ type: 'blob' }).then((content) => {
      const url = URL.createObjectURL(content)
      const a = document.createElement('a')
      a.href = url
      a.download = filename
      a.click()
      URL.revokeObjectURL(url)
    });
  };

  return (
    <Button color={'green'} onClick={handleDownload} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
      Save
    </Button>
  );
};

export default CharacterSaver;
