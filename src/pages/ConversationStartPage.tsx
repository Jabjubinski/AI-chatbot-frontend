import { useForm } from "react-hook-form";
import clsx from "clsx";
import { useAuthStore } from "../stores/authStore";
import { useConversationsStore } from "../stores/conversationsStore";
import { useNavigate } from "react-router-dom";
import { useAssistantStore } from "../stores/assistantStore";
import { useEffect, useState } from "react";
import ConversationCreateSkeleton from "../skeletons/ConversationCreateSkeleton";
import { ArrowRight, Check, X } from "lucide-react";

function ConversationCreate() {
  const [showSkeleton, setShowSkeleton] = useState(false);
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const { create, loading } = useConversationsStore();
  const {
    assistants,
    fetchAssistants,
    getSelectedAssistants,
    toggleAssistant,
    clearSelectedAssistants,
  } = useAssistantStore();
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const selectedAssistants = getSelectedAssistants("new");

  const { register, handleSubmit, reset } = useForm({
    defaultValues: { content: "" },
  });

  useEffect(() => {
    fetchAssistants();
  }, [fetchAssistants]);

  const onSubmit = async ({ content }: { content: string }) => {
    if (content.trim()) {
      create({
        content,
        assistants: selectedAssistants,
      }).then((data) => {
        const newChatId = String(data);
        useAssistantStore.setState((state) => ({
          selectedAssistantsByChat: {
            ...state.selectedAssistantsByChat,
            [newChatId]: state.selectedAssistantsByChat["new"] || [],
          },
        }));

        clearSelectedAssistants("new");
        navigate(`/c/${newChatId}`);
        reset();
      });
    }
  };

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;

    if (loading) {
      timer = setTimeout(() => setShowSkeleton(true), 1000);
    } else {
      setShowSkeleton(false);
      if (timer) clearTimeout(timer);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [loading]);

  if (showSkeleton) return <ConversationCreateSkeleton />;

  const selectedAssistantsData = assistants.filter((a) =>
    selectedAssistants.includes(a.id)
  );

  return (
    <div className="h-dvh w-full bg-slate-950 text-slate-100 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-screen">
        {/* Left Panel - Selection */}
        <div className="flex-1 flex flex-col border-r border-slate-800/60 overflow-hidden">
          {/* Header */}
          <div className="px-8 py-6 border-b border-slate-800/60 bg-slate-900/30 backdrop-blur-sm">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent mb-2">
              Start a Conversation
            </h1>
            <p className="text-slate-400 text-sm">
              Select one or multiple assistants to begin
            </p>
          </div>

          {/* Search */}
          <div className="px-8 py-4 border-b border-slate-800/60 bg-slate-900/20 backdrop-blur-sm">
            <div className="relative">
              <input
                type="text"
                placeholder="Search assistants..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-slate-800/50 border border-slate-700/50 text-slate-100 placeholder:text-slate-500 transition-all duration-200 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 outline-none"
              />
            </div>
          </div>

          {/* Assistants Grid */}
          <div className="flex-1 overflow-y-auto px-8 py-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filtered.map((assistant) => {
                const isSelected = selectedAssistants.includes(assistant.id);
                return (
                  <button
                    key={assistant.id}
                    onClick={() => toggleAssistant("new", assistant.id)}
                    className={`relative group p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                      isSelected
                        ? "border-blue-500/60 bg-slate-800/80 shadow-xl shadow-blue-500/20"
                        : "border-slate-700/50 bg-slate-800/40 hover:border-slate-600/80 hover:bg-slate-800/60"
                    }`}
                  >
                    {/* Checkbox */}
                    <div
                      className={`absolute top-3 right-3 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200 ${
                        isSelected
                          ? "bg-gradient-to-r from-blue-500 to-cyan-500 border-blue-400"
                          : "border-slate-600 group-hover:border-slate-500"
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 text-white" />}
                    </div>

                    {/* Content */}
                    <div className="pr-8">
                      <h3 className="font-semibold text-slate-100 mb-1">
                        {assistant.name}
                      </h3>
                      <p className="text-sm text-slate-400 leading-tight">
                        {assistant.description || "Assistant"}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Panel - Preview */}
        <div className="w-80 border-l border-slate-800/60 bg-slate-900/50 backdrop-blur-sm flex flex-col">
          {/* Header */}
          <div className="px-6 py-6 border-b border-slate-800/60">
            <h2 className="text-lg font-semibold text-slate-100 mb-1">
              Selected
            </h2>
            <p className="text-sm text-slate-500">
              {selectedAssistants.length} of {assistants.length}
            </p>
          </div>

          {/* Selected List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
            {selectedAssistants.length === 0 ? (
              <div className="h-full flex items-center justify-center text-center">
                <div>
                  <p className="text-slate-400 text-sm">
                    No assistants selected yet
                  </p>
                  <p className="text-slate-500 text-xs mt-2">
                    Choose from the left to get started
                  </p>
                </div>
              </div>
            ) : (
              <>
                {selectedAssistantsData.map((assistant) => (
                  <div
                    key={assistant.id}
                    className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/60 border border-slate-700/50 group hover:bg-slate-800/80 transition-all duration-200"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-100 truncate">
                        {assistant.name}
                      </p>
                      <p className="text-xs text-slate-500">Selected</p>
                    </div>
                    <button
                      onClick={() => toggleAssistant("new", assistant.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 hover:bg-slate-700/60 rounded-md"
                    >
                      <X className="w-4 h-4 text-slate-400 hover:text-slate-200" />
                    </button>
                  </div>
                ))}
              </>
            )}
          </div>

          {/* Message Input */}
          <div className="px-6 py-4 border-t border-slate-800/60 space-y-3">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
              <textarea
                disabled={selectedAssistants.length < 1 || loading}
                autoComplete="off"
                placeholder={
                  selectedAssistants.length < 1 || loading
                    ? "Select at least one assistant"
                    : "Type your message..."
                }
                className={clsx(
                  "w-full px-4 py-3 rounded-lg border border-slate-700/50 outline-none transition-all duration-200 resize-none",
                  "bg-slate-800/50 text-slate-100 placeholder:text-slate-500",
                  selectedAssistants.length > 0 && !loading
                    ? "focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 hover:border-slate-600"
                    : "opacity-50",
                  "disabled:cursor-not-allowed disabled:opacity-40"
                )}
                rows={4}
                {...register("content", { required: true })}
              />

              <button
                disabled={selectedAssistants.length < 1 || loading}
                type="submit"
                className={clsx(
                  "w-full py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2",
                  selectedAssistants.length > 0 && !loading
                    ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 active:translate-y-0"
                    : "bg-slate-800/50 text-slate-500 cursor-not-allowed opacity-40"
                )}
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Starting...
                  </>
                ) : (
                  <>
                    Start
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConversationCreate;
