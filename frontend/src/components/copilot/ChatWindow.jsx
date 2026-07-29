import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot } from 'lucide-react';
import ChatMessage from './ChatMessage';
import Loader from '../common/Loader';

export default function ChatWindow({ messages, isLoading }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="flex-1 overflow-y-auto pr-2 scrollbar-hide flex flex-col">
      {messages.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center text-slate-400 p-6 space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-accent-50 flex items-center justify-center text-accent-500">
            <Bot className="w-8 h-8" />
          </div>
          <p className="text-sm">Hi! Paste a customer email, describe an issue, or drop a PDF report. I'll extract the details.</p>
        </div>
      ) : (
        <div className="flex-1 pb-4">
          <AnimatePresence>
            {messages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChatMessage message={msg} />
              </motion.div>
            ))}
          </AnimatePresence>
          {isLoading && (
            <div className="flex gap-3 mb-4">
               <div className="w-8 h-8 rounded-full bg-accent-100 flex items-center justify-center text-accent-600">
                <Loader className="w-4 h-4" />
              </div>
              <div className="bg-slate-100 px-4 py-3 rounded-2xl rounded-tl-sm text-sm text-slate-500 animate-pulse">
                Analyzing...
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      )}
    </div>
  );
}