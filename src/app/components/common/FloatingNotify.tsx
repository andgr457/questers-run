import { useEffect, useState } from "react";

interface FloatingNotifyProps {
  text: string;
  icon?: string;
  onDone?: () => void; // notify parent when fade-out finishes
}

export default function FloatingNotify({ text, icon, onDone }: FloatingNotifyProps) {
  const [visible, setVisible] = useState(false);

  // Background color is derived from text
  const bgColor = text?.toLowerCase().includes("you took")
    ? "rgba(153, 1, 1, 0.5)"
    : text?.toLowerCase().includes("killed") || text?.toLowerCase().includes('completed')
    ? "rgba(50, 175, 1, 0.5)"
    : "rgba(48, 48, 48, 0.7)";

  useEffect(() => {
    const showTimer = setTimeout(() => setVisible(true), 20);
    const hideTimer = setTimeout(() => setVisible(false), 2500);
    const removeTimer = setTimeout(() => onDone?.(), 3000); // remove after fade-out

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
      clearTimeout(removeTimer);
    };
  }, [onDone]);

  return (
    <div
      className={`notify${visible ? " visible" : ""}`}
      style={{ background: bgColor }}
    >
      {icon && <img src={icon} alt="" />}
      <span>{text}</span>

      <style>{`
        .notify {
          opacity: 0;
          transform: translateY(10px);
          min-width: 180px;
          max-width: 240px;
          text-align: center;
          padding: 6px 12px;
          color: white;
          border-radius: 10px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.5);
          font-size: 0.7rem;
          display: flex;
          align-items: center;
          gap: 6px;
          pointer-events: none;
          transition: opacity 0.4s ease, transform 0.4s ease;
          margin-top: 6px;
          word-wrap: break-word;
          white-space: normal;
        }
        .notify.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .notify img {
          width: 12px;
          height: 12px;
        }
      `}</style>
    </div>
  );
}
