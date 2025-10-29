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
}:
CustomInputProps) {
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
        "bg-gray-800 h-4/5 rounded-4xl w-full relative",
        className
      )}
    >
      <Activity mode={isShowing ? "visible" : "hidden"}>
        {selectedAssistants.length > 0 && (
          <div className="absolute bottom-full bg-[#1a1a1a] p-2 rounded-2xl mb-3 w-full px-3 overflow-x-auto">
            <div className="flex flex-wrap gap-2">
              {selectedAssistantObjects.map((assistant) => (
                <div
                  key={assistant.id}
                  className="group bg-gradient-to-r transition-all from-blue-600 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 shadow-lg shadow-blue-500/30 animate-in fade-in slide-in-from-bottom-2 duration-400"
                >
                  <span>{assistant.name}</span>
                  <button
                    type="button"
                    onClick={() => onToggleAssistant(assistant.id)}
                    className="hover:bg-white/20 rounded-full p-1 transition-colors"
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
            <div className="flex flex-wrap gap-2 bg-[#1a1a1a] p-2 px-4 rounded-2xl">
              {availableAssistants.map((assistant) => (
                <button
                  key={assistant.id}
                  type="button"
                  onClick={() => onToggleAssistant(assistant.id)}
                  className="px-4 py-2 rounded-full text-sm font-medium transition-transform ease-in-out duration-00 bg-gray-700/75 text-gray-200 hover:bg-gray-600/75 hover:scale-102 active:scale-95 border border-gray-600 hover:border-gray-500"
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
            className="h-full flex items-center py-2 gap-2"
          >
            <Plus
              color="white"
              className={clsx(
                "transition-transform duration-300 ease-in-out",
                isShowing && "rotate-45"
              )}
            />
            <div className="h-full border-r border-gray-600"></div>
          </div>
          <input
            {...register("content", { required: true })}
            type="text"
            disabled={disabled}
            className="border-none w-[90%] bg-transparent h-full px-2 outline-none"
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
            className="bg-white p-2.5 rounded-full cursor-pointer hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowUp color="black" size={20} />
          </button>
        </form>
      </div>
    </div>
  );
}
