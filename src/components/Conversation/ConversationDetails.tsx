import { useState, useRef, useEffect } from "react";
import CustomInput from "./CustomInput";
import { useParams } from "react-router-dom";
import { useMessageStore } from "../../stores/messageStore";
import { useAssistantStore } from "../../stores/assistantStore";
import { useForm } from "react-hook-form";
import { useAuthStore } from "../../stores/authStore";
import Message from "../messages/Message";

export default function Chat() {
  const { id } = useParams();
  const { fetchMessages, messages, loading, createMessage } = useMessageStore();
  const { assistants, fetchAssistants } = useAssistantStore();
  const { user } = useAuthStore();

  const [selectedAssistants, setSelectedAssistants] = useState<number[]>([]);
  
  const { register, handleSubmit, reset } = useForm({
    defaultValues: { content: "" },
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (id) fetchMessages(id);
  }, [id]);

  useEffect(() => {
    fetchAssistants();
  }, [fetchAssistants]);

  useEffect(() => {
    const local = localStorage.getItem("selectedAssistants");
    if (local) {
      const ids = JSON.parse(local);

      if (Array.isArray(ids)) setSelectedAssistants(ids);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleAssistantToggle = (assistantId: number) => {
    const stored = localStorage.getItem("selectedAssistants");
    let current = stored ? JSON.parse(stored) : [];

    if (current.includes(assistantId)) {
      current = current.filter((id: number) => id !== assistantId);
    } else {
      current.push(assistantId);
    }

    localStorage.setItem("selectedAssistants", JSON.stringify(current));

    setSelectedAssistants(current);
  };

  const clearAllAssistants = () => {
    setSelectedAssistants([]);
    localStorage.removeItem("selectedAssistants");
  };

  const onSubmit = ({ content }: { content: string }) => {
    if (id && content.trim()) {
      createMessage(content, id, selectedAssistants);
      reset();
    }
  };

  return (
    <div className="h-dvh w-full flex flex-col items-center gap-2">
      <div className="flex flex-1 overflow-y-auto w-full justify-center">
        <div className="px-5 flex flex-col gap-5 lg:w-180 sm:w-120 py-5 text-gray-100">
          {messages.length === 0 ? (
            <div className="text-5xl text-center h-full text-slate-500/60 flex justify-center items-center">
              <span>Ask me anything, {user?.firstname}...</span>
            </div>
          ) : (
            messages.map((data) => (
              <Message key={data.id} role={data.role} content={data.content} />
            ))
          )}

          {loading && (
            <span className="self-start bg-slate-700/40 text-slate-300 rounded-r-3xl rounded-tl-3xl px-4 py-2">
              Thinking...
            </span>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="h-20 lg:w-180 sm:w-120 mb-3 mt-10">
        <CustomInput
          disabled={loading}
          register={register}
          handleSubmit={handleSubmit(onSubmit)}
          textColor="white"
          assistants={assistants}
          selectedAssistants={selectedAssistants}
          onToggleAssistant={handleAssistantToggle}
          onClearAll={clearAllAssistants}
        />
      </div>
    </div>
  );
}
