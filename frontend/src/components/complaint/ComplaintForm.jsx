import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import Card from '../common/Card';
import ComplaintField from './ComplaintField';
import TextAreaField from './TextAreaField';
import SaveButtons from './SaveButtons';
import { useComplaint } from '../../hooks/useComplaint';
import { updateComplaintData } from '../../store/slices/complaintSlice';

// Helper to convert backend DD-MM-YYYY to HTML expected YYYY-MM-DD
const formatDateForInput = (dateStr) => {
  if (!dateStr) return '';
  if (dateStr.match(/^\d{4}-\d{2}-\d{2}$/)) return dateStr;
  
  const parts = dateStr.split('-');
  if (parts.length === 3 && parts[0].length === 2) {
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  }
  return dateStr;
};

export default function ComplaintForm() {
  const { complaintData } = useComplaint();
  const dispatch = useDispatch();
  const { register, reset, watch } = useForm({ defaultValues: complaintData });

  useEffect(() => {
    const formattedData = { ...complaintData };
    
    if (formattedData.manufacturing_date) {
      formattedData.manufacturing_date = formatDateForInput(formattedData.manufacturing_date);
    }
    if (formattedData.expiry_date) {
      formattedData.expiry_date = formatDateForInput(formattedData.expiry_date);
    }
    if (formattedData.complaint_date) {
      formattedData.complaint_date = formatDateForInput(formattedData.complaint_date);
    }

    reset(formattedData);
  }, [complaintData, reset]);

  useEffect(() => {
    const subscription = watch((value, { type }) => {
      if (type) {
        dispatch(updateComplaintData(value));
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, dispatch]);

  return (
    <Card className="h-full flex flex-col">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-800">Customer Complaint</h2>
        <p className="text-sm text-slate-500">Auto-filled by AI Copilot. Edit manually if needed.</p>
      </div>
      
      <form className="space-y-4 flex-1 overflow-y-auto pr-2 scrollbar-hide">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ComplaintField register={register} name="customer_name" label="Customer Name" />
          <ComplaintField register={register} name="complaint_source" label="Complaint Source" />
          <ComplaintField register={register} name="product_name" label="Product Name" />
          
          {/* FIXED FIELD NAMES BELOW */}
          <ComplaintField register={register} name="product_strength_grade" label="Product Strength / Grade" />
          <ComplaintField register={register} name="batch_lot_number" label="Batch / Lot Number" />
          
          <ComplaintField register={register} name="quantity_affected" label="Quantity Affected" type="text" />
          <ComplaintField register={register} name="manufacturing_date" label="Manufacturing Date" type="date" />
          <ComplaintField register={register} name="expiry_date" label="Expiry Date" type="date" />
          <ComplaintField register={register} name="complaint_type" label="Complaint Type" />
          <ComplaintField register={register} name="complaint_date" label="Complaint Date" type="date" />
          <ComplaintField register={register} name="initial_severity" label="Initial Severity" />
          <ComplaintField register={register} name="priority" label="Priority" />
        </div>
        <TextAreaField {...register("complaint_description")} label="Complaint Description" />
      </form>

      <SaveButtons />
    </Card>
  );
}