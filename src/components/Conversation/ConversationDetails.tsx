import { useEffect, useRef } from "react";
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
    <div className="flex flex-col flex-1 bg-[#121826] h-dvh">
      <div className="flex flex-col h-full overflow-scroll mt-10">
        {messages.map((data) => (
          <div className="flex flex-col">
            <Message key={data.id} role={data.role} content={data.content} />
          </div>
        ))}
      </div>
      <div className="h-1/9 flex justify-center items-center">
        <CustomInput
          disabled={loading}
          register={register}
          handleSubmit={handleSubmit(onSubmit)}
          textColor="white"
          className="w-1/2"
        />
      </div>
    </div>
  );
}
