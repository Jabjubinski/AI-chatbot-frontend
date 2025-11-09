import type { SafeConversation } from "../../types";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { useDeleteModal } from "../../hooks/useDeleteModal";
import CustomButton from "../UI/CustomButton";
import icons from "../UI/icons";

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
            <img
              src={icons.folder.src}
              alt={icons.folder.alt}
              className="w-5 h-5 opacity-75"
            />
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
            <CustomButton
              className="p-1.5 hover:bg-neutral-700  cursor-pointer rounded transition-colors"
              aria-label="Delete chat"
              onClick={() => onOpen(conversation.id)}
            >
              <img
                src={icons.trash.src}
                alt={icons.trash.alt}
                className="w-3.5 h-3.5 opacity-75"
              />
            </CustomButton>
          </div>
        </div>
      </div>
    </>
  );
}
