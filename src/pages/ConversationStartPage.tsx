import { useForm } from "react-hook-form";
import clsx from "clsx";
import { useAuthStore } from "../stores/authStore";
import { useConversationsStore } from "../stores/conversationsStore";
import { useNavigate } from "react-router-dom";
import { useAssistantStore } from "../stores/assistantStore";
import { useEffect } from "react";
import ConversationCreateSkeleton from "../skeletons/ConversationCreateSkeleton";
import { useSelectedAssistants } from "../hooks/useSelectedAssistants";

function ConversationCreate() {
  const { create, loading } = useConversationsStore();
  const { assistants, fetchAssistants } = useAssistantStore();
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const { selectedAssistants, toggleAssistant } = useSelectedAssistants();

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
        navigate(`/c/${data}`);
        reset();
      });
    }
  };

  if (loading) return <ConversationCreateSkeleton />;

  return (
    <div className="h-dvh w-full flex flex-col items-center gap-2">
      <div className="flex h-full overflow-y-auto w-full justify-center items-center">
        <div className="px-5 flex flex-col gap-5 lg:w-180 sm:w-120 text-gray-100">
          <div className="text-3xl text-center text-gray-300 font-medium flex justify-center items-center">
            <span>
              {loading
                ? "Thinking..."
                : `Please select at least one Assistant, ${user?.firstname}`}
            </span>
          </div>

          <div className="w-full flex flex-col items-center gap-2">
            {assistants.length > 0 && (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 w-full gap-3">
                  {assistants.map((assistant) => {
                    const isSelected = selectedAssistants.includes(
                      assistant.id
                    );
                    return (
                      <button
                        key={assistant.id}
                        onClick={() => toggleAssistant(assistant.id)}
                      >
                        <div
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
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="h-14 flex lg:w-180 sm:w-120 mb-3"
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
    </div>
  );
}

export default ConversationCreate;
