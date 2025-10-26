import { Trash } from "lucide-react";
import { useDeleteModal } from "../../hooks/useDeleteModal";
import { useConversationsStore } from "../../stores/conversationsStore";

export default function DeleteWarningModal() {
  const { deleteConversation } = useConversationsStore();
  const { onClose, id } = useDeleteModal();

  function handleDeleteConversation(id: any) {
    onClose();
    deleteConversation(id);
  }

  return (
    <div>
      <div className="absolute inset-0 flex items-center justify-center bg-black/30 bg-opacity-50 z-50">
        <div className="bg-[#181818] rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mx-auto mb-4">
            <Trash color="red" />
          </div>

          <h3 className="text-lg font-semibold text-gray-500 text-center mb-2">
            Delete Conversation
          </h3>

          <p className="text-gray-300 text-center mb-6">
            Are you sure you want to delete this conversation? This action
            cannot be undone.
          </p>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-200 text-gray-500 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={() => handleDeleteConversation(id)}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
