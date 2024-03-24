import React from 'react';
import JSZip from 'jszip';
import { Character } from './Characters';
import { Button } from '@material-tailwind/react';

interface CharacterSaverProps {
  characters: Character[];
}

const CharacterSaver: React.FC<CharacterSaverProps> = ({ characters }) => {
  const handleDownload = () => {
    if(characters.length === 0) return
    const zip = new JSZip();
    const charactersJson = JSON.stringify(characters);
    const timestamp = new Date().toISOString().replace(/[-:.]/g, '_').replace('T', '_').replace('Z', '').replace(/\s/g, '_');
    const filename = `characters_${timestamp}.zip`;
    zip.file('characters.json', charactersJson);

    zip.generateAsync({ type: 'blob' }).then((content) => {
      const url = URL.createObjectURL(content);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
    });
  };

  return (
    <Button color={'green'} onClick={handleDownload} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
      Save Characters
    </Button>
  );
};

export default CharacterSaver;
