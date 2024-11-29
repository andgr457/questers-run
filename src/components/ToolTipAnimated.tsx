import { Tooltip, Button } from "@material-tailwind/react";
import { color } from '@material-tailwind/react/types/components/button';

export interface TooltipCustomAnimationProps {
  content: string
  color: color
  text: string
}

export default function TooltipCustomAnimation(props: TooltipCustomAnimationProps) {
  return (
    <Tooltip
      content={props.content}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0, y: 25 },
      }}
    >
      <Button placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} color={props.color}>{props.text}</Button>
    </Tooltip>
  );
}