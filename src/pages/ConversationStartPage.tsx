import DeleteWarningModal from "../components/modals/DeleteWarningModal";
import { useDeleteModal } from "../hooks/useDeleteModal";
import { useConversationsStore } from "../stores/conversationsStore";
import { useNavigate } from "react-router-dom";

// interface Props {}

function ConversationCreate() {
  const { create } = useConversationsStore();
  const navigate = useNavigate();
  const { isOpen } = useDeleteModal();

  const handleStartConversation = async () => {
    const success = await create();
    if (!success) return alert("Something went wrong");
    navigate(`/c/${success}`);
  };

  return (
    <div className="flex flex-col items-center justify-between p-6 w-full h-full line-clamp-1">
      {/* Center Content */}
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center max-w-md">
          <h1 className="text-5xl font-bold text-gray-100 mb-4">
            Start a New Conversation 2
          </h1>
          <p className="text-lg text-slate-500/60">
            Begin your conversation journey. Connect, share, and engage in
            meaningful dialogue.
          </p>
        </div>
      </div>

      {/* Bottom Button */}
      <button
        onClick={handleStartConversation}
        className="w-full max-w-md cursor-pointer bg-[#33363D] hover:scale-103 hover:bg-[#3d4149] text-indigo-50 font-semibold py-4 px-6 rounded-lg transition-all duration-200 shadow-lg"
      >
        Start Conversation
      </button>
      {isOpen && <DeleteWarningModal />}
    </div>
  );
}

export default ConversationCreate;
