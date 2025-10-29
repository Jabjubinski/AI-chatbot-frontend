import { FolderIcon, Trash2 } from "lucide-react";
import type { SafeConversation } from "../../types";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { useDeleteModal } from "../../hooks/useDeleteModal";

interface ConversationProps {
  conversation: SafeConversation;
  key: number | string;
  id: number | string;
}

export default function Conversation({ conversation }: ConversationProps) {
  const { onOpen } = useDeleteModal();

  return (
    <>
      <div>
        <div className="relative group transition-opacity duration-300 ease-in-out">
          <Link
            to={`/c/${conversation.id}`}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-neutral-800 transition-colors text-left 
          
        `}
          >
            <FolderIcon className="w-5 h-5 text-neutral-400" />
            <div className="flex-1 min-w-0">
              <div className="text-sm text-neutral-200 truncate">
                {conversation.title}
              </div>
              <div className="text-xs text-neutral-500">
                {conversation.created_at
                  ? format(new Date(conversation.created_at), "yyyy-MM-dd")
                  : ""}
              </div>
            </div>
          </Link>

          <div className="absolute hidden group-hover:flex right-2 top-1/2 -translate-y-1/2 items-center gap-1 bg-neutral-800 rounded-lg p-1">
            <button
              className="p-1.5 hover:bg-neutral-700 rounded transition-colors"
              aria-label="Delete chat"
              onClick={() => onOpen(conversation.id)}
            >
              <Trash2 className="w-3.5 h-3.5 text-neutral-400" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
