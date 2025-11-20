import { RingLoader } from "react-spinners";

export const Modal = ({
  onclose,
  onConfirme,
  title = "Confirmation",
  message = "Are you sure?",
  isOpen,
  error,
  isLoading,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  isDeleting,
}) => {
  if (!onclose) return null;

  return (
    <div
      onClick={onclose}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm  flex items-center justify-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-lg p-6 shadow-lg max-w-sm w-full transform transition-all duration-300 scale-95 opacity-0 animate-fade-in"
      >
        {isLoading ? (
          <div className="flex flex-col items-center justify-center">
            <RingLoader color="#E53E3E" />
            <p className="mt-4 text-sm text-gray-600">Processing...</p>
          </div>
        ) : (
          <>
            <h2 className="text-lg font-semibold mb-4">{title}</h2>
            <p className="text-gray-600 mb-6">{message}</p>
            {error && (
              <p className="text-sm text-red-500 mb-4 text-center">
                ⚠️ {error}
              </p>
            )}
            <div className="flex justify-center items-center gap-3">
              <button
                onClick={onclose}
                className="px-4 py-2 rounded bg-gray-200 shadow-md hover:bg-gray-300"
              >
                {cancelLabel}
              </button>
              <button
                onClick={onConfirme}
                className="px-4 py-2 rounded bg-red-500 shadow-sm shadow-red-300 text-white hover:bg-red-600"
              >
                {confirmLabel}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
