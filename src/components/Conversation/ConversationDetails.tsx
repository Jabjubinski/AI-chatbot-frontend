// ConversationDetails.tsx
import { useEffect, useRef } from "react";
import { useMessageStore } from "../../stores/messageStore";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Message from "../messages/Message";
import { useConversationStore } from "../../stores/conversationStore";

// Shadcn/ui Imports
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Loader2 } from "lucide-react";

// Assuming CustomInput is replaced by this combined input/button structure

export default function ConversationDetails() {
  const { id } = useParams<{ id: string }>();
  // Destructuring `loading` from message store for disabling input
  const { fetchMessages, messages, loading, createMessage } = useMessageStore();
  const { fetch } = useConversationStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: { content: "" },
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // --- 1. Data Fetching ---
  useEffect(() => {
    if (id) {
      // Ensure IDs are valid before fetching
      fetchMessages(id);
      fetch(id);
      // Removed: console.log(conversation); - Avoid logging state in render cycles
    }
  }, [id, fetchMessages, fetch]);

  // --- 2. Auto-Scroll to Bottom ---
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]); // Added loading to scroll when new assistant message starts/ends

  // --- 3. Form Submission ---
  const onSubmit = ({ content }: { content: string }) => {
    if (id && content.trim()) {
      createMessage(content, id);
      reset();
    }
  };

  const isFormDisabled = loading || isSubmitting;

  return (
    // Light Theme: bg-white, dark text
    <div className="flex flex-col flex-1 bg-white h-dvh">
      {/* Messages Container */}
      <div className="flex flex-col h-full overflow-y-auto pt-4 px-8 pb-4">
        {messages.map((data) => (
          // Remove the extra wrapper div, Message component should handle its own layout/margin
          <Message
            key={data.id}
            sent_by={data.sent_by}
            role={data.role}
            content={data.content}
          />
        ))}
        {/* Scroll Anchor */}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area (Form) */}
      <div className="h-20 flex justify-center items-center p-4 border-t border-gray-200 bg-white shadow-inner">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-1/2 flex relative items-center"
        >
          {/* Shadcn Input Field */}
          <Input
            {...register("content")}
            disabled={isFormDisabled}
            placeholder="Send a message..."
            className="w-full h-12 pr-12 text-base focus-visible:ring-blue-500 shadow-md"
            autoComplete="off"
          />

          {/* Shadcn Send Button */}
          <Button
            type="submit"
            disabled={isFormDisabled}
            variant="default" // Primary color button (blue)
            size="icon"
            className="p-0 h-10 w-10 absolute right-1 top-1 rounded-lg bg-blue-600 hover:bg-blue-700"
          >
            {/* Conditional icon display */}
            {isFormDisabled ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}