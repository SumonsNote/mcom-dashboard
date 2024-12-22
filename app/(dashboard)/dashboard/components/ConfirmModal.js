import React from "react";
import { X, Check, AlertTriangle } from "lucide-react";

const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Action",
  message = "Are you sure you want to proceed?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "default",
}) => {
  if (!isOpen) return null;

  const variantStyles = {
    default: {
      bg: "bg-white dark:bg-gray-900 ",
      border: "border-gray-300",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      confirmBtn: "bg-blue-600 hover:bg-blue-700",
      cancelBtn: "bg-gray-100 text-gray-700 hover:bg-gray-200",
    },
    danger: {
      bg: "bg-white dark:bg-gray-900 ",
      border: "border-red-300",
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
      confirmBtn: "bg-red-600 hover:bg-red-700",
      cancelBtn: "bg-gray-100 text-gray-700 hover:bg-gray-200",
    },
    warning: {
      bg: "bg-white dark:bg-gray-900 ",
      border: "border-yellow-300",
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
      confirmBtn: "bg-yellow-600 hover:bg-yellow-700",
      cancelBtn: "bg-gray-100 text-gray-700 hover:bg-gray-200",
    },
  };

  const styles = variantStyles[variant] || variantStyles.default;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className={`relative w-full max-w-md p-6 mx-auto rounded-lg shadow-xl ${styles.bg} ${styles.border} border`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>

        {/* Icon */}
        <div
          className={`mx-auto mb-4 w-16 h-16 rounded-full flex items-center justify-center ${styles.iconBg}`}
        >
          {variant === "danger" ? (
            <AlertTriangle size={32} className={`${styles.iconColor}`} />
          ) : (
            <Check size={32} className={`${styles.iconColor}`} />
          )}
        </div>

        {/* Content */}
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-400 mb-2">
            {title}
          </h2>
          <p className="text-gray-600 dark:text-gray-500  mb-6">{message}</p>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4">
            <button
              onClick={onClose}
              className={`px-4 py-2 rounded-md text-base font-medium transition-colors ${styles.cancelBtn}`}
            >
              {cancelText}
            </button>
            <button
              onClick={onConfirm}
              className={`px-4 py-2 rounded-md text-base font-medium text-white transition-colors ${styles.confirmBtn}`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
