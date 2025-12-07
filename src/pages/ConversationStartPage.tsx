import { useState } from "react";
import { useConversationsStore } from "../stores/conversationsStore";
import { useNavigate } from "react-router-dom";
import { Send, Loader2 } from "lucide-react"; // Using lucide icons for consistency
import { Button } from "@/components/ui/button"; // Shadcn Button component
import { Input } from "@/components/ui/input"; // Shadcn Input component

// Assuming your CustomButton and LoadingCircleSpinner can be replaced,
// or that you will provide the simple definitions for them if they are needed.

function ConversationCreate() {
  const [prompt, setPrompt] = useState("");
  const { create, loading } = useConversationsStore();

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!prompt.trim() || loading) return;

    try {
      // Assuming 'create' returns the new conversation ID
      const newConversationId = await create({
        content: prompt,
      });

      if (newConversationId) {
        navigate(`/c/${newConversationId}`);
      }
    } catch (error) {
      console.error("Failed to create conversation:", error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !loading) {
      handleSubmit();
    }
  };

  return (
    <div className="h-screen w-full bg-white text-gray-900 overflow-hidden">
      <div className="relative z-10 h-full flex flex-col overflow-hidden">
        <div className="h-4/8 flex flex-col items-center justify-center pt-20">
          {loading ? (
            <div className="flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
          ) : (
            <div className="px-8 py-6 flex flex-col items-center">
              <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
                Start a Conversation
              </h1>
              <p className="text-lg text-gray-600">
                I am your scientific agent, ask me anything!
              </p>
            </div>
          )}
        </div>

        <div className="w-full h-4/8 flex flex-col justify-end pb-12">
          <div className="px-6 py-4 flex w-full justify-center">
            <div className="w-1/2 flex relative">
              <Input
                type="text"
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={handleKeyDown}
                value={prompt}
                disabled={loading}
                placeholder="Ask me anything..."
                className="w-full h-14 pr-16 mb-3 text-lg focus-visible:ring-blue-500 shadow-lg"
              />

              <Button
                onClick={handleSubmit}
                disabled={loading || !prompt.trim()}
                variant="default"
                size="icon"
                className="p-0 h-10 w-10 absolute right-2 top-2 rounded-lg bg-blue-600 hover:bg-blue-700"
              >
                {loading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConversationCreate;
