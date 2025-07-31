import { useEffect, useState } from "react";

interface FloatingNotifyProps {
  text: string;
  icon?: string;
}

export default function FloatingNotify({ text, icon }: FloatingNotifyProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Fade in
    const showTimer = setTimeout(() => setVisible(true), 20);
    // Fade out before removal
    const hideTimer = setTimeout(() => setVisible(false), 2500);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <>
      <style>{`
        .notify {
          opacity: 0;
          transform: translateY(10px);
          min-width: 180px;
          max-width: 240px;
          text-align: center;
          padding: 6px 12px;
          background: rgba(0,0,0,0.7);
          color: white;
          border-radius: 10px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.5);
          font-size: 0.6rem; /* smaller text */
          display: flex;
          align-items: center;
          gap: 6px;
          pointer-events: none;
          transition: opacity 0.4s ease, transform 0.4s ease;
          word-wrap: break-word;
          white-space: normal;
        }
        .notify.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .notify img {
          width: 10px;
          height: 10px;
        }
      `}</style>

      <div className={`notify${visible ? " visible" : ""}`}>
        {icon && <img src={icon} alt="" />}
        <span>{text}</span>
      </div>
    </>
  );
}
