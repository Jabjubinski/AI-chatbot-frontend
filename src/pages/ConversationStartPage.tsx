import { ArrowRight, Check, X } from "lucide-react";
import { useAssistantTagStore } from "../stores/assistantTagStore";
import { useEffect, useState } from "react";
import { useAssistantStore } from "../stores/assistantStore";
import clsx from "clsx";
import type { SafeAssistant } from "../types";
import { useConversationsStore } from "../stores/conversationsStore";

function ConversationCreate() {
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const [prompt, setPrompt] = useState("");
  const [selectedAssistants, setSelectedAssistants] = useState<SafeAssistant[]>(
    []
  );
  const { assistant_tags, fetchAssistantTags } = useAssistantTagStore();
  const { assistants, fetchAssistants } = useAssistantStore();
  const { create } = useConversationsStore()
  console.log(selectedTags);
  console.log(assistants);

  useEffect(() => {
    fetchAssistantTags();
  }, [fetchAssistantTags]);

  useEffect(() => {
    fetchAssistants(selectedTags);
  }, [selectedTags, fetchAssistants]);

  const handleSubmit = () => {
    const assistantIds: number[] = selectedAssistants.map((a) => a.id);


    console.log(assistantIds);
    create({
      content: prompt,
      assistants: assistantIds
    })
  };

  return (
    <div className="h-screen w-full bg-slate-950 text-slate-100 overflow-hidden">
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
                className="w-full px-4 py-3 rounded-lg bg-slate-800/50 border border-slate-700/50 text-slate-100 placeholder:text-slate-500 transition-all duration-200 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 outline-none"
              />
            </div>
          </div>

          {/* Category Tags */}
          <div className="px-8 py-4 border-b border-slate-800/60 bg-slate-900/20 backdrop-blur-sm">
            <div className="flex flex-wrap gap-2">
              <button
                disabled={selectedTags.length === 0}
                onClick={() => setSelectedTags([])}
                className={clsx(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  selectedTags.length === 0
                    ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/20"
                    : "bg-slate-800/50 text-slate-400 border border-slate-700/50 hover:bg-slate-800/80 hover:text-slate-300 hover:border-slate-600"
                )}
              >
                All
              </button>
              {assistant_tags.map((tag) => (
                <button
                  key={tag.id}
                  onClick={() =>
                    selectedTags.includes(tag.id)
                      ? setSelectedTags((prev) =>
                          prev.filter((f) => f !== tag.id)
                        )
                      : setSelectedTags((prev) => [...prev, tag.id])
                  }
                  className={clsx(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    selectedTags.includes(tag.id)
                      ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/20"
                      : "bg-slate-800/50 text-slate-400 border border-slate-700/50 hover:bg-slate-800/80 hover:text-slate-300 hover:border-slate-600"
                  )}
                >
                  {tag.name}
                </button>
              ))}
            </div>
          </div>

          {/* Assistants Grid */}
          <div className="flex-1 overflow-y-auto px-8 py-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Selected Assistant Card */}

              {assistants.map((assistant) => (
                <button
                  onClick={() =>
                    selectedAssistants.some(
                      (_assistant) => _assistant.id === assistant.id
                    )
                      ? setSelectedAssistants((prev) =>
                          prev.filter((f) => f.id !== assistant.id)
                        )
                      : setSelectedAssistants((prev) => [...prev, assistant])
                  }
                  className={clsx(
                    "relative group p-4 rounded-xl border-2 transition-all duration-300 text-left shadow-xl",
                    selectedAssistants.some(
                      (_assistant) => _assistant.id === assistant.id
                    )
                      ? "border-blue-500/60 bg-slate-800/80 shadow-blue-500/20"
                      : "border-slate-700/50  bg-slate-800/40"
                  )}
                >
                  <div
                    className={clsx(
                      "absolute top-3 right-3 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200 bg-gradient-to-r",
                      selectedAssistants.some(
                        (_assistant) => _assistant.id === assistant.id
                      )
                        ? "from-blue-500 to-cyan-500 border-blue-400"
                        : "border-slate-600 group-hover:border-slate-500"
                    )}
                  >
                    {selectedAssistants.some(
                      (_assistant) => _assistant.id === assistant.id
                    ) && <Check className="w-3 h-3 text-white" />}
                  </div>
                  <div className="pr-8">
                    <h3 className="font-semibold text-slate-100 mb-1">
                      {assistant.name}
                    </h3>
                    <p className="text-sm text-slate-400 leading-tight mb-2">
                      {assistant.description}
                    </p>
                    <span className="inline-block px-2 py-1 text-xs rounded-md bg-slate-700/50 text-slate-300 border border-slate-600/50">
                      {assistant.tag}
                    </span>
                  </div>
                </button>
              ))}
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
            <p className="text-sm text-slate-500">2 of 6</p>
          </div>

          {/* Selected List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
            {selectedAssistants.map((assistant) => (
              <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/60 border border-slate-700/50 group hover:bg-slate-800/80 transition-all duration-200">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-100 truncate">
                    {assistant.name}
                  </p>
                  <p className="text-xs text-slate-500">Selected</p>
                </div>
                <button
                  onClick={() =>
                    setSelectedAssistants((prev) =>
                      prev.filter((f) => f.id !== assistant.id)
                    )
                  }
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 hover:bg-slate-700/60 rounded-md"
                >
                  <X className="w-4 h-4 text-slate-400 hover:text-slate-200" />
                </button>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="px-6 py-4 border-t border-slate-800/60 space-y-3">
            <div className="space-y-3">
              <textarea
                onChange={(e) => setPrompt(e.target.value)}
                value={prompt}
                placeholder="Type your message..."
                className="w-full px-4 py-3 rounded-lg border border-slate-700/50 outline-none transition-all duration-200 resize-none bg-slate-800/50 text-slate-100 placeholder:text-slate-500 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 hover:border-slate-600"
                rows={4}
              />

              <button
                type="button"
                onClick={handleSubmit}
                disabled={prompt.length <= 0}
                className="w-full py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 active:translate-y-0"
              >
                Start
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConversationCreate;
