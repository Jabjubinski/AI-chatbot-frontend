import { useForm } from "react-hook-form";
import clsx from "clsx";
import { useAuthStore } from "../stores/authStore";
import { useConversationsStore } from "../stores/conversationsStore";
import { useNavigate } from "react-router-dom";
import { useAssistantStore } from "../stores/assistantStore";
import { useEffect, useState } from "react";

function ConversationCreate() {
  const { create, loading } = useConversationsStore();

  const [selectedAssistants, setSelectedAssistants] = useState<number[]>([]);
  const { assistants, fetchAssistants } = useAssistantStore();

  const handleClick = (assistantId: number) => {
    setSelectedAssistants((prev) =>
      prev.includes(assistantId)
        ? prev.filter((id) => id !== assistantId)
        : [...prev, assistantId]
    );
  };

  useEffect(() => {
    fetchAssistants();
  }, [fetchAssistants]);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      content: "",
    },
  });

  const navigate = useNavigate();
  const { user } = useAuthStore();

  const onSubmit = async ({ content }: { content: string }) => {
    if (content.trim()) {
      create({
        content: content,
        assistants: [],
      })
        .then((data) => {
          navigate(`/c/${data}`);
        })
        .finally(() => {
          reset();
        });
    }
  };

  return (
    <div className="h-dvh w-full flex flex-col items-center gap-2">
      <div className="flex flex-1 overflow-y-auto w-full justify-center">
        <div className="px-5 flex flex-col gap-5 lg:w-180 sm:w-120 py-5 text-gray-100">
          <div className="bg-[#0A0A0A] w-full rounded-xl">
            {assistants.length > 0 && (
              <>
                <div className="w-full flex justify-center py-3">
                  <span className="text-accent-primary text-lg font-medium">
                    Please select your assistant(s)
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 w-full p-2 gap-3">
                  {assistants.map((assistant) => {
                    const isSelected = selectedAssistants.includes(
                      assistant.id
                    );
                    return (
                      <button onClick={() => handleClick(assistant.id)}>
                        <div
                          key={assistant.id}
                          className={clsx(
                            "flex py-1.5 justify-center border-none font-medium bg-accent-primary rounded-full transition-all duration-300 ease-in-out",
                            isSelected &&
                              "bg-gradient-to-br scale-102 from-blue-700 via-blue-600 to-blue-500"
                          )}
                        >
                          {assistant.name}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </div>

          {loading ? (
            <div className="text-5xl text-center h-full text-slate-500/60 flex justify-center items-center">
              <span>Thinking...</span>
            </div>
          ) : (
            <div className="text-5xl text-center h-full text-slate-500/60 flex justify-center items-center">
              <span>Ask me anything, {user?.firstname}...</span>
            </div>
          )}

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="h-20 flex lg:w-180 sm:w-120 mb-3 mt-10"
          >
            <input
              disabled={selectedAssistants.length < 1 || loading}
              autoComplete="off"
              className={clsx(
                "border-none px-5 w-[90%] rounded-l-full outline-none transition-colors duration-300",
                "bg-[#1e2939] text-gray-400",
                "disabled:cursor-not-allowed"
              )}
              placeholder={
                selectedAssistants.length < 1 || loading
                  ? "Please select at least one Assistant"
                  : `Asking ${selectedAssistants.length} Assistant${
                      selectedAssistants.length > 1 ? "s" : ""
                    }`
              }
              {...register("content", { required: true })}
            />

            <button
              className={clsx(
                "border-none w-[10%] cursor-pointer pr-[3.25rem] rounded-r-full transition-all duration-300",
                selectedAssistants.length < 1 || loading
                  ? "text-gray-600 bg-[#1e2939]"
                  : "bg-[#1e2939]",
                "disabled:cursor-not-allowed"
              )}
              disabled={selectedAssistants.length < 1 || loading}
              type="submit"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ConversationCreate;
