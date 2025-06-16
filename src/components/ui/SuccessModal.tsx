
import React from 'react';
import { X, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  actionButtonText?: string;
  onActionClick?: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
  title,
  message,
  actionButtonText,
  onActionClick
}) => {
  if (!isOpen) return null;

  const handleActionClick = () => {
    if (onActionClick) {
      onActionClick();
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-40"
        onClick={onClose}
      />
      
      {/* Modal Card */}
      <div className="relative bg-white rounded-lg shadow-lg max-w-[80%] w-full max-w-sm mx-4 p-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center hover:opacity-80 transition-opacity"
        >
          <X size={24} color="#3a210c" />
        </button>

        {/* Content Container */}
        <div className="flex flex-col items-center text-center pt-2">
          {/* Check Icon */}
          <div className="mb-4">
            <Check size={48} color="#ac815d" strokeWidth={3} />
          </div>

          {/* Title */}
          <h2 className="text-xl font-bold text-[#3a210c] mb-3">
            {title}
          </h2>

          {/* Message */}
          <p className="text-base text-[#3a210c] mb-6">
            {message}
          </p>

          {/* Action Button */}
          {actionButtonText && (
            <Button
              onClick={handleActionClick}
              className="w-4/5 h-11 bg-[#ac815d] hover:bg-[#9a7354] text-white rounded-lg text-base font-medium"
            >
              {actionButtonText}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
