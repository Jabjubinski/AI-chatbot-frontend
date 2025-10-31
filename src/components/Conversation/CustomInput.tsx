import clsx from "clsx";
import { ArrowUp, Plus, X } from "lucide-react";
import { Activity, useState } from "react";
import type { UseFormRegister } from "react-hook-form";

interface Assistant {
  id: number;
  name: string;
}

interface CustomInputProps {
  className?: string;
  textColor: string;
  register: UseFormRegister<any>;
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
  disabled: boolean;
  assistants: Assistant[];
  selectedAssistants: number[];
  onToggleAssistant: (assistantId: number) => void;
  onClearAll: () => void;
}

export default function CustomInput({
  className,
  textColor,
  register,
  handleSubmit,
  disabled,
  assistants,
  selectedAssistants,
  onToggleAssistant,
}: CustomInputProps) {
  const selectedAssistantObjects = assistants.filter((a) =>
    selectedAssistants.includes(a.id)
  );
  const availableAssistants = assistants.filter(
    (a) => !selectedAssistants.includes(a.id)
  );

  const [isShowing, setIsShowing] = useState<boolean>(false);

  return (
    <div
      className={clsx(
        // 🌿 soft dark gradient background
        "bg-gradient-to-br from-[#2E3B32] via-[#3F5547] to-[#557C56] h-4/5 rounded-4xl w-full relative shadow-lg shadow-black/10 border border-[#445C4A]/30",
        className
      )}
    >
      <Activity mode={isShowing ? "visible" : "hidden"}>
        {selectedAssistants.length > 0 && (
          <div className="absolute bottom-full bg-[#364A3D]/90 p-2 rounded-2xl mb-3 w-full px-3 overflow-x-auto backdrop-blur-sm border border-[#4F6C5B]/30">
            <div className="flex flex-wrap gap-2">
              {selectedAssistantObjects.map((assistant) => (
                <div
                  key={assistant.id}
                  className="group bg-gradient-to-r from-[#6BC8B0] to-[#A8E6A3] text-[#1E1E1E] px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 shadow-md shadow-[#6BC8B0]/30 animate-in fade-in slide-in-from-bottom-2 duration-400"
                >
                  <span>{assistant.name}</span>
                  <button
                    type="button"
                    onClick={() => onToggleAssistant(assistant.id)}
                    className="hover:bg-black/10 rounded-full p-1 transition-colors"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        <div
          className="absolute bottom-full mb-3 w-full px-4"
          style={{
            marginBottom: selectedAssistants.length > 0 ? "110px" : "12px",
          }}
        >
          {availableAssistants.length > 0 && (
            <div className="flex flex-wrap gap-2 bg-[#364A3D]/90 p-2 px-4 rounded-2xl backdrop-blur-sm border border-[#4F6C5B]/30">
              {availableAssistants.map((assistant) => (
                <button
                  key={assistant.id}
                  type="button"
                  onClick={() => onToggleAssistant(assistant.id)}
                  className="px-4 py-2 rounded-full text-sm font-medium transition-transform ease-in-out duration-200 bg-[#4C6353]/80 text-[#E6EAE8] hover:bg-[#557C56]/80 hover:scale-105 active:scale-95 border border-[#5B7E64]/40"
                >
                  {assistant.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </Activity>

      <div className="flex justify-center h-full">
        <form
          onSubmit={handleSubmit}
          className="flex justify-between px-3.5 w-full h-full items-center"
        >
          <div
            onClick={() => setIsShowing(!isShowing)}
            className="h-full flex items-center py-2 gap-2 cursor-pointer"
          >
            <Plus
              color="#E6EAE8"
              className={clsx(
                "transition-transform duration-300 ease-in-out",
                isShowing && "rotate-45"
              )}
            />
            <div className="h-full border-r border-[#708872]/50"></div>
          </div>
          <input
            {...register("content", { required: true })}
            type="text"
            disabled={disabled}
            className="border-none w-[90%] bg-transparent h-full px-2 outline-none placeholder:text-[#C9D4CD]"
            style={{ color: textColor }}
            placeholder={
              selectedAssistants.length > 0
                ? `Asking ${selectedAssistants.length} assistant${
                    selectedAssistants.length > 1 ? "s" : ""
                  }...`
                : "Type your message..."
            }
            autoComplete="off"
          />
          <button
            type="submit"
            disabled={disabled}
            className="bg-[#A8E6A3] p-2.5 rounded-full cursor-pointer hover:bg-[#B6EBB4] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowUp color="#1E1E1E" size={20} />
          </button>
        </form>
      </div>
    </div>
  );
}
