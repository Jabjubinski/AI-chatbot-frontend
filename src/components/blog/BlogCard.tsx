import { useNavigate } from "react-router-dom";
import { useConversationsStore } from "../../stores/conversationsStore";
import icons from "../UI/icons";
import type { SafeBlog } from "../../types";

interface BlogFeedProps {
  id: number
  blog_title: string;
  summary: string
  ref?: any
}

export default function BlogCard({ id, blog_title, summary, ref }: BlogFeedProps) {
  const navigate = useNavigate();
  const { create, loading } = useConversationsStore();

  const handleAsk = async (prompt: string) => {
    try {
      const newConversation = await create({
        content: prompt,
      });
      if (newConversation) {
        navigate(`/c/${newConversation}`);
      }
    } catch (error) {
      console.error("Failed to create conversation:", error);
    }
  };

  return (
        <article
            ref={ref}
            className="group relative flex flex-col overflow-hidden rounded-2xl bg-[#1E293B]/40 border border-white/5 hover:border-white/10 transition-all duration-300 backdrop-blur-sm"
          >
            {/* Header: Title & Authors */}
            <div className="p-5 pb-3">
              <h3 className="text-lg font-semibold text-slate-100 leading-snug mb-1 transition-colors">
                {blog_title}
              </h3>
              {/* <p className="text-sm text-slate-400 font-medium">
                {item..authors
                  ?.map((author: any) => author.name)
                  .join(", ")}
              </p> */}
            </div>

            {/* Media & Content */}
            <div className="px-5">
              {/* Image Container with overflow hidden for zoom effect */}
              <div className="relative w-full aspect-[2/1] rounded-xl overflow-hidden mb-4 bg-slate-800 border border-white/5">
                <img
                  src={`https://picsum.photos/1000/${600 + id}`}
                  alt="Publication preview"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>

              <p className="text-slate-300 text-sm leading-relaxed line-clamp-3 mb-4">
                {summary}
              </p>
            </div>

            {/* Footer / Actions */}
            <div className="mt-auto border-t border-white/5 bg-white/[0.02] p-3 flex items-center justify-between">
              
              {/* Primary Link */}
              <a
                href={`${id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-sky-400 hover:text-sky-300 hover:bg-sky-500/10 rounded-lg transition-all"
              >
                Read Paper
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
              </a>

              <div className="flex items-center gap-2">
                <button 
                  className="p-2 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-full transition-all"
                  title="Share"
                >
                  <img 
                    src={icons.share.src} 
                    alt="Share" 
                    className="w-5 h-5 block transform-gpu backface-hidden opacity-70 group-hover:opacity-100" 
                  />
                </button>

                {/* Ask AI Button (Primary Action) */}
                <button
                  disabled={loading}
                  onClick={() => handleAsk(`write about of: ${summary}`)}
                  className="flex items-center gap-2 pl-3 pr-4 py-1.5 rounded-full bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/20 hover:border-sky-500/40 text-sky-100 text-sm font-medium transition-all group/btn"
                >
                  <img 
                    src={icons.sparkles.src} 
                    alt="AI" 
                    className="w-4 h-4 block transform-gpu backface-hidden" 
                  />
                  <span>Ask AI</span>
                </button>
              </div>
            </div>
        </article>
  );
}