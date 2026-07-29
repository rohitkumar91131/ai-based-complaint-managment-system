import { useSelector } from 'react-redux';
import Button from "../common/Button";
import Tooltip from '../common/Tooltip';
import Loader from '../common/Loader';
import { Save, RefreshCcw } from "lucide-react";
import { useComplaint } from "../../hooks/useComplaint";

export default function SaveButtons() {
  const { handleSave, handleReset, saveStatus } = useComplaint();
  const isOffline = useSelector(state => state.connection.status === 'disconnected');
  
  const isSaving = saveStatus === 'loading';

  return (
    <div className="flex items-center gap-3 mt-6 border-t border-slate-100 pt-6">
      <Tooltip content="Backend is offline. Please start the FastAPI server." disabled={!isOffline}>
        <div>
          <Button 
            variant="primary" 
            onClick={handleSave} 
            disabled={isOffline || isSaving}
            className={isSaving ? "opacity-75 cursor-not-allowed" : ""}
          >
            {isSaving ? <Loader className="w-4 h-4 text-white" /> : <Save className="w-4 h-4" />}
            {isSaving ? 'Saving...' : 'Save Complaint'}
          </Button>
        </div>
      </Tooltip>
      
      <Button variant="outline" onClick={handleReset} type="button" disabled={isSaving}>
        <RefreshCcw className="w-4 h-4" />
        Reset Form
      </Button>
    </div>
  );
}