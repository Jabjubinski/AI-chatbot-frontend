import { useEffect } from "react";
import { useConversationsStore } from "../../stores/conversationsStore";
import Conversation from "./Conversation";
import useSidebar from "../../hooks/useSidebar";

export default function ConversationList() {
  const { conversations, fetch, update } = useConversationsStore();

  const { isOpen } = useSidebar();

  useEffect(() => {
    fetch({
      limit: 10,
    });
  }, []);

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
      console.log("❌ WebSocket disconnected");
    };

    ws.onerror = (err) => {
      console.error("⚠️ WebSocket error:", err);
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div className="flex-1 mt-3 overflow-y-auto">
      <span className="px-2 ">Recent</span>
      {isOpen && (
        <div className="space-y-0.5">
          {conversations.map((conversation: any) => (
            <Conversation
              key={conversation.id}
              id={conversation.id}
              conversation={conversation}
            />
          ))}
        </div>
      )}
    </div>
  );
}
