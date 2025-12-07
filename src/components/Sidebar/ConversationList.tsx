// ConversationList.tsx
import { useEffect } from "react";
import { useConversationsStore } from "../../stores/conversationsStore";
import Conversation from "./Conversation";

// ... (fetch and websocket logic remains unchanged)

export default function ConversationList() {
  const { conversations, fetch, update } = useConversationsStore();

  useEffect(() => {
    fetch({
      limit: 10,
    });
  }, [fetch]);

  useEffect(() => {
    const ws = new WebSocket("wss://api.mmai.space/ws/conversation/update/");
    ws.onopen = () => {
      console.log("✅ Connected to WebSocket");
    };
    ws.onmessage = (event) => {
      const { data } = JSON.parse(event.data);
      update(data);
    };
    ws.onclose = () => {
      console.log("WebSocket disconnected");
    };
    ws.onerror = (err) => {
      console.error("WebSocket error:", err);
    };

    return () => {
      ws.close();
    };
  }, [update]);

  return (
    <div className="flex flex-col space-y-3">
      {/* Updated text color for light theme readability */}
      <span className="px-2 text-sm font-semibold text-gray-500 uppercase tracking-wider">
        Recent Conversations
      </span>

      <div className="space-y-0.5">
        {conversations.map((conversation: any) => (
          // Assuming Conversation component handles its own display against a light background
          <Conversation
            key={conversation.id}
            id={conversation.id}
            conversation={conversation}
          />
        ))}
      </div>
    </div>
  );
}
