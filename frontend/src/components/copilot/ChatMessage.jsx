import ReactMarkdown from 'react-markdown';
import { Bot, User, FileText } from 'lucide-react';
import { cn } from '../../utils/helpers';

export default function ChatMessage({ message }) {
  const isUser = message.role === 'user';

  return (
    <div className={cn("flex w-full gap-3 mb-4", isUser ? "flex-row-reverse" : "flex-row")}>
      <div className={cn(
        "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
        isUser ? "bg-slate-200 text-slate-600" : "bg-accent-100 text-accent-600"
      )}>
        {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
      </div>
      <div className={cn(
        "px-4 py-3 rounded-2xl max-w-[85%] text-sm",
        isUser ? "bg-accent-600 text-white rounded-tr-sm" : "bg-slate-100 text-slate-800 rounded-tl-sm",
        message.isError && "bg-red-50 text-red-600 border border-red-100"
      )}>
        {message.file && (
          <div className="flex items-center gap-2 mb-2 text-xs bg-black/10 px-2 py-1 rounded-md w-fit">
            <FileText className="w-3 h-3" /> {message.file}
          </div>
        )}
        <div className="prose prose-sm prose-p:leading-relaxed max-w-none dark:prose-invert">
          <ReactMarkdown>{message.content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}