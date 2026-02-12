import React from 'react';
import { useStateContext } from '../../contexts/ContextProvider';
import PricingForm from './PricingForm';

const DialogLoading = () => (
  <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-10">
    <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-blue-500" />
  </div>
);

const EditPricingTemplate = ({ pricingData, branches, packages }) => {
  const { pricingLoading } = useStateContext();

  return (
    <div className="relative min-h-[300px]">
      {pricingLoading && <DialogLoading />}
      <PricingForm
        pricingValues={pricingData}
        branches={branches}
        packages={packages}
      />
    </div>
  );
};

export default EditPricingTemplate;
