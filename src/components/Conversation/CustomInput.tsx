import clsx from "clsx";
import { ArrowUp, Plus } from "lucide-react";
import { useState } from "react";
import type { UseFormRegister } from "react-hook-form";
import CustomButton from "../UI/CustomButton";

interface CustomInputProps {
  className?: string;
  textColor: string;
  register: UseFormRegister<any>;
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
  disabled: boolean;
}

export default function CustomInput({
  className,
  textColor,
  register,
  handleSubmit,
  disabled,
}: CustomInputProps) {
  const [isShowing, setIsShowing] = useState<boolean>(false);

  return (
    <div
      className={clsx(
        // 🌿 soft dark gradient background
        "bg-gradient-to-br from-[#2E3B32] via-[#3F5547] to-[#557C56] h-4/5 rounded-4xl w-full relative shadow-lg shadow-black/10 border border-[#445C4A]/30",
        className
      )}
    >
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
            autoComplete="off"
          />
          <CustomButton
            type="submit"
            disabled={disabled}
            className="bg-[#A8E6A3] p-2.5 rounded-full cursor-pointer hover:bg-[#B6EBB4] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowUp color="#1E1E1E" size={20} />
          </CustomButton>
        </form>
      </div>
    </div>
  );
}
