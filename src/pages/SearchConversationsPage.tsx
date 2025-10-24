import { useEffect, useRef, useState } from "react";
import { useConversationsStore } from "../stores/conversationsStore";
import { MessageCircle } from "lucide-react";
import type { SafeConversation } from "../types";
import { Link } from "react-router-dom";

export default function SearchConversationsPage() {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const { fetch: fetchConversations } = useConversationsStore();
  const [ conversations, setConversations ] = useState<SafeConversation[] | []>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetchConversations({
      search: query
    }).then((data) => {
      setConversations(data)
    });
  }, [fetchConversations, query]);

  return (
    <div
      ref={modalRef}
      className="bg-transparent h-full p-6 w-full mx-4"
    >
      <div className="flex justify-between w-full items-center mb-4">
        <h2 className="text-xl font-semibold  text-neutral-800 dark:text-neutral-100">
          Search Conversations...
        </h2>
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

      <div className="max-h-64 overflow-y-auto space-y-2 w-full min-w-full">
        {conversations.length > 0 ? (
          conversations.map((conv: any) => (
            <Link
              to={`/c/${conv.id}`}
              key={conv.id}
              className="p-3 flex gap-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer transition"
            >
              <MessageCircle color="white" className="w-5 h-5" />
              <p className="text-neutral-800 dark:text-neutral-100 font-medium">
                {conv.title}
              </p>
            </Link>
          ))
        ) : (
          <p className="text-neutral-500 dark:text-neutral-400 text-center py-4">
            No conversations found
          </p>
        )}
      </div>
    </div>
  );
}
