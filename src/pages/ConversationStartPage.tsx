import { useForm } from "react-hook-form";
import CustomInput from "../components/Conversation/CustomInput";
import DeleteWarningModal from "../components/modals/DeleteWarningModal";
import { useDeleteModal } from "../hooks/useDeleteModal";
import { useAuthStore } from "../stores/authStore";
import { useConversationsStore } from "../stores/conversationsStore";
import { useNavigate } from "react-router-dom";

// interface Props {}

function ConversationCreate() {
  const { create, loading } = useConversationsStore();

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      content: ""
    }
  })

  const navigate = useNavigate();
  const { user } = useAuthStore();

  const onSubmit = async ({ content }: { content: string }) => {
    if (content.trim()) {
      create({
        content: content,
        assistants: []
      }).then((data) => {
        navigate(`/c/${data}`)
        
      }).finally(() => {
        reset();
      });
    }
  };

  return (
    <div className="h-dvh w-full flex flex-col items-center gap-2">
      <div className="flex flex-1 overflow-y-auto w-full justify-center">
        <div className="px-5 flex flex-col gap-5 lg:w-180 sm:w-120 py-5 text-gray-100">
          <div className="text-5xl text-center h-full text-slate-500/60 flex justify-center items-center">
              <span>Ask me anything, {user?.firstname}...</span>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="h-20 flex gap-5 lg:w-180 sm:w-120 mb-3 mt-10">
              <input className="w-full h-full bg-red-600" placeholder="Text" {...register("content", { required: true })}/>
              <button type="submit">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ConversationCreate;
