export default function SummaryCard({ summary }) {
  if (!summary) return null;
  return (
    <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 mb-4 text-sm text-blue-900 leading-relaxed">
      <span className="font-semibold block mb-1">AI Summary</span>
      {summary}
    </div>
  );
}