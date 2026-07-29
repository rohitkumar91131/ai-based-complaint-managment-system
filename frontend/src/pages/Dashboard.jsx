import ComplaintForm from '../components/complaint/ComplaintForm';
import CopilotPanel from '../components/copilot/CopilotPanel';

export default function Dashboard() {
  return (
    <div className="h-[calc(100vh-6rem)] w-full flex flex-col lg:flex-row gap-6">
      <div className="w-full lg:w-[65%] h-full">
        <ComplaintForm />
      </div>
      <div className="w-full lg:w-[35%] h-full flex-shrink-0">
        <CopilotPanel />
      </div>
    </div>
  );
}