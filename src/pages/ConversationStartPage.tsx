import { useAssistantTagStore } from "../stores/assistantTagStore";
import { useEffect, useState } from "react";
import { useAssistantStore } from "../stores/assistantStore";
import clsx from "clsx";
import type { SafeAssistant } from "../types";
import { useConversationsStore } from "../stores/conversationsStore";
import CustomButton from "../components/UI/CustomButton";
import icons from "../components/UI/icons";
import { useNavigate } from "react-router-dom";
import LoadingCircleSpinner from "../components/UI/LoadingCircle";

function ConversationCreate() {
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const [prompt, setPrompt] = useState("");
  const [selectedAssistants, setSelectedAssistants] = useState<SafeAssistant[]>(
    []
  );
  const { assistant_tags, fetchAssistantTags } = useAssistantTagStore();
  const { assistants, fetchAssistants } = useAssistantStore();
  const { create, loading } = useConversationsStore();

  const navigate = useNavigate();

  console.log(selectedTags);
  console.log(assistants);

  useEffect(() => {
    fetchAssistantTags();
  }, [fetchAssistantTags]);

  useEffect(() => {
    fetchAssistants(selectedTags);
  }, [selectedTags, fetchAssistants]);

  const handleSubmit = async () => {
    const assistantIds: number[] = selectedAssistants.map((a) => a.id);

    try {
      const newConversation = await create({
        content: prompt,
        assistants: assistantIds,
      });

      // If successful and we have an ID, navigate to it.
      if (newConversation && newConversation) {
        navigate(`/c/${newConversation}`);
      }
    } catch (error) {
      console.error("Failed to create conversation:", error);
    }
  };

  return (
    <div className="h-screen w-full bg-[#121826] text-slate-100 overflow-hidden">
      {/* Content */}
      <div className="relative z-10 h-screen">
        <div className="flex flex-col h-4/8 border-r border-slate-800/60 overflow-hidden">
          {/* Header */}
          <div className="h-2/8 px-8 py-6 border-b border-slate-800/60 bg-slate-900/30 backdrop-blur-sm">
            <h1 className="text-3xl font-bold bg-gradient-to-r text-white opacity-80 bg-clip-text mb-2">
              Start a Conversation
            </h1>
            <p className="text-slate-400 text-sm">
              Select one or multiple assistants to begin
            </p>
          </div>

          {/* Search */}
          <div className="px-8 h-2/8 py-4 border-b border-slate-800/60 bg-slate-900/20 backdrop-blur-sm">
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
              <CustomButton
                disabled={selectedTags.length === 0}
                onClick={() => setSelectedTags([])}
                className={clsx(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  selectedTags.length === 0
                    ? "bg-gradient-to-r bg-[#2c3a4a] border-[#0a0e14] text-white shadow-lg shadow-black/30"
                    : "bg-slate-800/50 text-slate-400 border border-slate-700/50 hover:bg-slate-800/80 hover:text-slate-300 hover:border-slate-600"
                )}
              >
                All
              </CustomButton>
              {assistant_tags.map((tag) => (
                <CustomButton
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
                      ? "bg-gradient-to-r bg-[#2c3a4a] border-[#0a0e14] text-white shadow-lg shadow-black/30"
                      : "bg-slate-800/50 text-slate-400 border border-slate-700/50 hover:bg-slate-800/80 hover:text-slate-300 hover:border-slate-600"
                  )}
                >
                  {tag.name}
                </CustomButton>
              ))}
            </div>
          </div>

          {loading ? ( 
              <div className="flex w-full justify-center">
              <LoadingCircleSpinner />
            </div>
          ) : (
            <div className="px-8 py-6">
              <div className="grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 overflow-y-scroll gap-4">
                {/* Selected Assistant Card */}

                {assistants.map((assistant) => (
                  <CustomButton
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
                      "relative group p-4 h-32 rounded-xl border-2 transition-all duration-300 text-left shadow-xl",
                      selectedAssistants.some(
                        (_assistant) => _assistant.id === assistant.id
                      )
                        ? "border-[#0a0e14]/60 bg-slate-800/80"
                        : "border-slate-700/50  bg-slate-800/40"
                    )}
                  >
                    <div
                      className={clsx(
                        "absolute top-3 right-3 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200 bg-gradient-to-r",
                        selectedAssistants.some(
                          (_assistant) => _assistant.id === assistant.id
                        )
                          ? "bg-emerald-400 border-slate-800"
                          : "border-slate-700 group-hover:border-slate-500"
                      )}
                    >
                      {selectedAssistants.some(
                        (_assistant) => _assistant.id === assistant.id
                      ) && (
                        <img
                          src={icons.check.src}
                          alt={icons.check.alt}
                          className="w-3 h-3"
                        />
                      )}
                    </div>
                    <div className="pr-8">
                      <h3 className="font-semibold text-slate-100 mb-1">
                        {assistant.name}
                      </h3>
                      <p className="text-sm text-slate-400 leading-tight mb-2 line-clamp-1 sm:line-clamp-0">
                        {assistant.description}
                      </p>
                      <span className="inline-block px-2 py-1 text-xs rounded-md bg-slate-700/50 text-slate-300 border border-slate-600/50">
                        {assistant.tag}
                      </span>
                    </div>
                  </CustomButton>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Assistants Grid */}

        <div className="w-full h-4/8 justify-end backdrop-blur-sm flex flex-col">
          {/* Message Input */}
          <div className="px-6 py-4 flex w-full justify-center">
            <div className="w-1/2 h-14 flex relative">
              <input
                type="text"
                onChange={(e) => setPrompt(e.target.value)}
                value={prompt}
                disabled={selectedAssistants.length < 1 || loading}
                placeholder={selectedAssistants.length === 0 ? "Please select at least one assistant..." : "Share your thoughts..."}
                className={clsx("w-full px-4 py-3 rounded-lg border  border-slate-700/50 outline-none transition-all duration-200 resize-none bg-slate-800/50 text-slate-100 placeholder:text-slate-500 focus:border-[#0a0e14]/50 focus:ring-2 focus:ring-blue-500/20 hover:border-slate-600",
                (selectedAssistants.length === 0 || loading) && "cursor-not-allowed bg-slate-800"
                )}
              />

              <div className="w-fit flex justify-center">
                <CustomButton
                  onClick={handleSubmit}
                  disabled={selectedAssistants.length < 1 || loading}
                  className={clsx("p-3 rounded-full absolute right-2 top-2 font-semibold transition-all duration-300 flex items-center justify-center gap-2 bg-gradient-to-r bg-[#2c3a4a] text-white hover:shadow-lg hover:shadow-gray-900 hover:-translate-y-0.5 active:translate-y-0",
                    (selectedAssistants.length < 1 || loading) && "cursor-not-allowed hover:bg-[#2c3a4a] hover:text-white hover:shadow-none hover:translate-y-0",
                  )}
                >
                  <img
                    src={icons.arrowRight.src}
                    alt={icons.arrowRight.alt}
                    className="w-4 h-4"
                  />
                </CustomButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConversationCreate;
