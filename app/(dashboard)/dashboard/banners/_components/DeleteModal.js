const DeleteConfirmationModal = ({ onClose, onDelete, item, type }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg w-1/3 max-w-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Confirm Delete
        </h2>
        <p className="text-blue-500 dark:text-gray-400 text-center">
          Are you sure you want to delete this {type}
          <span className="font-bold text-gray-800 text-xl dark:text-gray-200 pl-2">
            <br />
            {item.name}
          </span>
          ?
          <br />
          This action cannot be undone.
        </p>
        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400 text-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={onDelete}
            className="px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white dark:bg-red-700 dark:hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
