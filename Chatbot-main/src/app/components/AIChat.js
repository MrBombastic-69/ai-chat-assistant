import ReactMarkdown from "react-markdown";

export default function AIChat({ text }) {
  return (
    <div className="flex items-start space-x-2 px-2 sm:px-0">
      <div className="w-8 h-8 rounded-full bg-purple-600/80 flex items-center justify-center text-white font-bold flex-shrink-0">
        AI
      </div>
      <div className="flex-1 bg-gray-700/80 rounded-lg p-3 text-gray-100 max-w-[85%] sm:max-w-[75%]">
        <ReactMarkdown className="prose prose-invert max-w-none prose-sm sm:prose-base">
          {text}
        </ReactMarkdown>
      </div>
    </div>
  );
}
