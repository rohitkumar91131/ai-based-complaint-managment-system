import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Send, X, Paperclip } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import Button from '../common/Button';
import Tooltip from '../common/Tooltip';

export default function ChatInput({ onSend, isLoading }) {
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);
  
  // Connect to Redux to check if backend is down
  const isOffline = useSelector(state => state.connection.status === 'disconnected');

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'application/pdf': ['.pdf'] },
    maxFiles: 1,
    onDrop: (accepted) => setFile(accepted[0])
  });

  const handleSend = () => {
    if (!text.trim() && !file) return;
    onSend(text, file);
    setText('');
    setFile(null);
  };

  return (
    <div className="mt-4 border border-slate-200 rounded-2xl bg-white focus-within:ring-2 ring-accent-500/20 focus-within:border-accent-500 transition-all">
      {file && (
        <div className="flex items-center justify-between p-2 px-4 border-b border-slate-100 bg-slate-50 rounded-t-2xl">
          <span className="text-xs font-medium text-slate-600 truncate">{file.name}</span>
          <button onClick={() => setFile(null)} className="text-slate-400 hover:text-red-500">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
      <div className="flex items-end p-2" {...getRootProps({ onClick: e => e.stopPropagation() })}>
        <input {...getInputProps()} disabled={isOffline} />
        
        <Tooltip content="Backend is offline." disabled={!isOffline}>
          <button 
            type="button"
            disabled={isOffline}
            onClick={(e) => {
              e.stopPropagation();
              document.querySelector('input[type="file"]').click();
            }}
            className={`p-2 rounded-xl shrink-0 transition-colors ${isDragActive ? 'text-accent-500 bg-accent-50' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'} disabled:opacity-50`}
          >
            <Paperclip className="w-5 h-5" />
          </button>
        </Tooltip>

        <textarea
          value={text}
          disabled={isOffline}
          onChange={(e) => setText(e.target.value)}
          placeholder={isOffline ? "Backend is offline..." : "Describe the complaint or upload a PDF..."}
          className="flex-1 max-h-32 min-h-[44px] bg-transparent border-none outline-none resize-none px-2 py-2.5 text-sm scrollbar-hide placeholder:text-slate-400 disabled:opacity-50"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />

        <Tooltip content="Backend is offline." disabled={!isOffline}>
          <div>
            <Button 
              variant="primary" 
              onClick={handleSend}
              disabled={isLoading || (!text.trim() && !file) || isOffline}
              className="rounded-xl h-10 w-10 p-0 ml-2 shrink-0 disabled:opacity-50"
            >
              <Send className="w-4 h-4 ml-0.5" />
            </Button>
          </div>
        </Tooltip>
      </div>
    </div>
  );
}