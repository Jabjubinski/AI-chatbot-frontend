import { useEffect, useRef, useState } from "react";
import { useSearchModal } from "../../hooks/useSearchModal";
import { useConversationsStore } from "../../stores/conversationsStore";
import { MessageCircle, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SearchModal() {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const { isOpen, onClose } = useSearchModal();
  const { conversations, fetch: fetchConversations } = useConversationsStore();
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) fetchConversations();
  }, [isOpen, fetchConversations]);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    if (isOpen) document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen, onClose]);

  function handleNavigate(id: any) {
    onClose();
    navigate(`/c/${id}`);
  }

  if (!isOpen) return null;

  const filteredConversations = conversations.filter((conv: any) =>
    conv.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        ref={modalRef}
        className="bg-white dark:bg-[#1e1e1e] rounded-2xl shadow-2xl p-6 w-full max-w-md mx-4"
      >
        <div className="flex justify-between w-full items-center mb-4">
          <h2 className="text-xl font-semibold  text-neutral-800 dark:text-neutral-100">
            Search Conversations...
          </h2>
          <button onClick={onClose}>
            <X color="white" className="cursor-pointer"></X>
          </button>
        </div>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type to search..."
          className="w-full px-4 py-2 mb-4 rounded-lg border border-neutral-300 dark:border-neutral-700 
                     bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="max-h-64 overflow-y-auto space-y-2  min-w-full">
          {filteredConversations.length > 0 ? (
            filteredConversations.map((conv: any) => (
              <button
                key={conv.id}
                className="p-3 flex gap-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer transition"
                onClick={() => handleNavigate(conv.id)}
              >
                <MessageCircle color="white" className="w-5 h-5" />
                <p className="text-neutral-800 dark:text-neutral-100 font-medium">
                  {conv.title}
                </p>
              </button>
            ))
          ) : (
            <p className="text-neutral-500 dark:text-neutral-400 text-center py-4">
              No conversations found
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
