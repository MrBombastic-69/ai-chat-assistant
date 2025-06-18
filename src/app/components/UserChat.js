export default function UserChat({ text }) {
  return (
    <div className="flex items-start space-x-2 justify-end px-2 sm:px-0">
      <div className="flex-1 bg-indigo-600/80 rounded-lg p-3 text-white max-w-[85%] sm:max-w-[75%]">
        {text}
      </div>
      <div className="w-8 h-8 rounded-full bg-indigo-500/80 flex items-center justify-center text-white font-bold flex-shrink-0">
        U
      </div>
    </div>
  );
}
