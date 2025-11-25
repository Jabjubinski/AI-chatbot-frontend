import {
  ArrowUp,
  MoreVertical,
  Reply,
  Edit2,
  Trash2,
  Plus,
  Smile,
  Check,
} from "lucide-react";

const myAvatarUrl = "https://i.pravatar.cc/150?u=me";

export default function Chat() {
  const chatPartner = {
    name: "Sarah Jens",
    status: "Online",
    avatarUrl: "https://i.pravatar.cc/150?u=sarah",
  };

  const messages = [
    {
      id: "m1",
      text: "Hey! Did you see the new design mocks?",
      isMe: false,
      status: "sent",
    },
    {
      id: "m2",
      text: "Yeah, looking at them now. The spacing looks much better.",
      isMe: true,
      status: "seen",
    },
    {
      id: "m3",
      text: "I think the sidebar colors finally match the main content area perfectly.",
      isMe: false,
      status: "sent",
    },
    { id: "m4", text: "Agreed.", isMe: true, status: "delivered" },
    {
      id: "m5",
      text: "Are we ready to deploy this to staging?",
      isMe: true,
      status: "sent",
    },
    {
      id: "m6",
      text: "I received your message.",
      isMe: false,
      status: "delivered",
    },
    {
      id: "m7",
      text: "Testing the last message status.",
      isMe: true,
      status: "delivered",
    },
  ];

  const renderStatusIndicator = (status: string) => {
    if (status === "seen") {
      return (
        <div className="flex items-center text-sky-400">
          <Check size={14} className="-mr-1" />
          <Check size={14} />
        </div>
      );
    }
    if (status === "delivered") {
      return (
        <div className="flex items-center text-slate-400">
          <Check size={14} className="-mr-1" />
          <Check size={14} />
        </div>
      );
    }
    if (status === "sent") {
      return (
        <div className="text-slate-400">
          <Check size={14} />
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col h-dvh bg-[#020617] text-slate-200">
      <div className="w-full border-b border-slate-800/40 py-3 px-6 flex items-center justify-between bg-[#020617]/80 backdrop-blur-md sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={chatPartner.avatarUrl}
              alt={chatPartner.name}
              className="w-9 h-9 rounded-full object-cover border border-slate-700/50"
            />
            <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-[#020617] bg-green-500" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-medium text-slate-100 text-sm">
              {chatPartner.name}
            </span>
            <span className="text-xs text-slate-400 font-medium">
              {chatPartner.status}
            </span>
          </div>
        </div>
        <button className="text-slate-400 hover:text-slate-200 p-2 rounded-lg hover:bg-slate-800/50 transition-colors">
          <MoreVertical size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
        <div className="max-w-3xl mx-auto flex flex-col gap-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`group flex items-end gap-2 w-full ${
                msg.isMe ? "justify-end" : "justify-start"
              }`}
            >
              {!msg.isMe && (
                <img
                  src={chatPartner.avatarUrl}
                  alt={chatPartner.name}
                  className="w-6 h-6 rounded-full object-cover mb-0.5 shadow-sm shrink-0 opacity-80"
                />
              )}

              <div
                className={`flex items-end gap-2 max-w-[80%] ${
                  msg.isMe ? "flex-row-reverse" : "flex-row"
                }`}
              >
                <div className="flex flex-col">
                  <div
                    className={`px-3.5 py-2 shadow-sm text-[15px] leading-relaxed ${
                      msg.isMe
                        ? "bg-blue-600 text-white rounded-[20px] rounded-br-sm"
                        : "bg-slate-800 text-slate-200 border border-slate-700/50 rounded-[20px] rounded-bl-sm"
                    }`}
                  >
                    {msg.text}
                  </div>

                  {msg.isMe && (
                    <div className="flex justify-end pt-0.5 pr-2">
                      {renderStatusIndicator(msg.status)}
                    </div>
                  )}
                </div>

                {/* Hover Actions */}
                <div
                  className={`flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${
                    msg.isMe ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <ActionButton icon={<Reply size={14} />} tooltip="Reply" />
                  <ActionButton icon={<Edit2 size={14} />} tooltip="Edit" />
                  <ActionButton
                    icon={<Trash2 size={14} />}
                    tooltip="Remove"
                    isDestructive
                  />
                </div>
              </div>

              {msg.isMe && (
                <img
                  src={myAvatarUrl}
                  alt="Me"
                  className="w-6 h-6 rounded-full object-cover mb-0.5 shadow-sm shrink-0 opacity-80"
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="w-full pb-5 pt-3 px-4 bg-[#020617]">
        <div className="max-w-3xl mx-auto flex items-end gap-2">
          <button className="p-2.5 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded-full transition-colors">
            <Plus size={22} />
          </button>

          <div className="flex-1 bg-slate-900/90 border border-slate-700/60 rounded-[26px] flex items-center p-1.5 focus-within:ring-2 focus-within:ring-blue-600/20 focus-within:border-blue-600/50 transition-all shadow-sm">
            <textarea
              placeholder="Message..."
              className="flex-1 resize-none bg-transparent px-4 py-1.5 max-h-32 focus:outline-none text-slate-200 placeholder:text-slate-500 text-[15px]"
            />

            <button className="p-2 text-slate-400 hover:text-yellow-500 transition-colors">
              <Smile size={20} />
            </button>

            <button className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-500 transition-colors shadow-md ml-1">
              <ArrowUp size={18} strokeWidth={2.5} />
            </button>
          </div>
        </div>

        <div className="text-center mt-2">
          <p className="text-[11px] text-slate-600">
            Enter to send, Shift + Enter for new line
          </p>
        </div>
      </div>
    </div>
  );
}

function ActionButton({ icon, tooltip, isDestructive = false }: any) {
  return (
    <button
      title={tooltip}
      className={`p-1.5 rounded-full hover:bg-slate-800 transition-colors ${
        isDestructive
          ? "text-slate-500 hover:text-red-400"
          : "text-slate-500 hover:text-slate-200"
      }`}
    >
      {icon}
    </button>
  );
}
