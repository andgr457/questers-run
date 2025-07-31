const colors = {
  green: "bg-green-500",
  red: "bg-red-500",
  blue: "bg-blue-500",
  yellow: "bg-yellow-500",
  purple: "bg-purple-500",
  orange: "bg-orange-500",
};

export default function ClickerProgress({
  total,
  left,
  color = "green",
  type = "depletion", // "depletion" or "addition"
}) {
  if (!total || total <= 0) return null;

  // Clamp left between 0 and total
  const clampedLeft = Math.min(Math.max(left, 0), total);

  // Calculate progress percent depending on type
  let progressPercent;
  if (type === "addition") {
    // Fill up from 0% to 100% as left goes from 0 to total
    progressPercent = (clampedLeft / total) * 100;
  } else {
    // Depletion: full bar at left=total, empty bar at left=0
    progressPercent = (clampedLeft / total) * 100;
  }

  // Always render, even if 0% filled
  return (
    <div className="w-full h-3 bg-gray-300 rounded-full overflow-hidden">
      <div
        className={`${colors[color] ?? colors.green} h-3 transition-all duration-300 ease-linear`}
        style={{ width: `${progressPercent}%` }}
      />
    </div>
  );
}
