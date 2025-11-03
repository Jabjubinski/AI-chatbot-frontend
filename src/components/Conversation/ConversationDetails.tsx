import { useEffect, useRef } from "react";
import { useAuthStore } from "../../stores/authStore";
import { useMessageStore } from "../../stores/messageStore";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import CustomInput from "./CustomInput";
import Message from "../messages/Message";
import { useConversationStore } from "../../stores/conversationStore";

export default function ConversationDetails() {
  const { id } = useParams();
  const { fetchMessages, messages, loading, createMessage } = useMessageStore();
  const { conversation, fetch } = useConversationStore();
  const { user } = useAuthStore();

  const { register, handleSubmit, reset } = useForm({
    defaultValues: { content: "" },
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (id) {
      fetchMessages(id);
      fetch(id);
      console.log(conversation);
    }
  }, [id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const onSubmit = ({ content }: { content: string }) => {
    if (id && content.trim()) {
      createMessage(content, id);
      reset();
    }
  };

  return (
    <div className="h-dvh w-full flex flex-col justify-end items-center gap-2">
      <div className="h-4/5 flex flex-col lg:w-180 sm:w-120">
        {messages.length === 0 ? (
          <div className="text-5xl text-center h-full text-slate-500/60 flex justify-center items-center">
            <span>Ask me anything, {user?.firstname}...</span>
          </div>
        ) : (
          messages.map((data) => (
            <Message key={data.id} role={data.role} content={data.content} />
          ))
        )}
      </div>

      <div className="h-20 lg:w-180 sm:w-120 mb-3 mt-10">
        <CustomInput
          disabled={loading}
          register={register}
          handleSubmit={handleSubmit(onSubmit)}
          textColor="white"
        />
      </div>
    </div>
  );
}
