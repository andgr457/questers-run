import { useEffect, useRef } from "react";
import FloatingNotify from './FloatingNotify';

export default function NotificationList({ notifications }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [notifications]);

  return (
<div
  ref={containerRef}
  className="
    absolute bottom left-1/2 -translate-x-1/2
    w-full max-h-40
    flex flex-col items-center gap-2
    pointer-events-none
    px-4 py-2
    z-50
  "
>
  {notifications.map((n) => (
    <FloatingNotify key={n.id} text={n.text} icon={n.icon} />
  ))}
</div>

  );
}
