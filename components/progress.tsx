interface PropsData {
  value: number;
  progressPercent: string;
}

export default function ProgressBar({ value, progressPercent }: PropsData) {
  return (
    <div
      className={`w-${value} h-4  border-1 border-gray-900/10 rounded-full `}
    >
      <div
        style={{ width: `${progressPercent}%` }}
        className={` h-full bg-blue-500 rounded-full `}
      ></div>
    </div>
  );
}
