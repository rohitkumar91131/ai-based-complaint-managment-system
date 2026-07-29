import Card from '../common/Card';
import ChatWindow from './ChatWindow';
import ChatInput from './ChatInput';
import SummaryCard from './SummaryCard';
import RiskCard from './RiskCard';
import { useCopilot } from '../../hooks/useCopilot';
import { Sparkles } from 'lucide-react';

export default function CopilotPanel() {
  const { messages, isLoading, summary, risk, sendMessage } = useCopilot();

  return (
    <Card className="h-full flex flex-col bg-slate-50/50">
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="bg-accent-100 p-1.5 rounded-lg text-accent-600">
            <Sparkles className="w-4 h-4" />
          </div>
          <h2 className="text-lg font-semibold text-slate-800">AI Copilot</h2>
        </div>
        <span className="text-xs font-medium bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full border border-emerald-200">
          Groq Connected
        </span>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide flex flex-col">
        <SummaryCard summary={summary} />
        <RiskCard risk={risk} />
        <ChatWindow messages={messages} isLoading={isLoading} />
      </div>

      <ChatInput onSend={sendMessage} isLoading={isLoading} />
    </Card>
  );
}