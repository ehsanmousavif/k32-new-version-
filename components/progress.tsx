interface PropsData {
  value: number;
  bgColor: string;
}

export default function ProgressBar({ value, bgColor }: PropsData) {
  return (
    <div className={`w-${value} h-4  border-1 border-gray-800 rounded-full `}>
      <div className="w-1/3 h-full bg-blue-500 rounded-full "></div>
    </div>
  );
}
