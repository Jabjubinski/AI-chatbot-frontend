import React, { forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import { ExternalLink } from "lucide-react"; // Recommended for the generic "Read Paper" icon
import { useConversationsStore } from "../../stores/conversationsStore";
import icons from "../UI/icons";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface BlogFeedProps {
  id: number;
  blog_title: string;
  summary: string;
}

const BlogCard = forwardRef<HTMLDivElement, BlogFeedProps>(
  ({ id, blog_title, summary }, ref) => {
    const navigate = useNavigate();
    const { create, loading } = useConversationsStore();

    const handleAsk = async () => {
      try {
        const newConversation = await create({
          content: `write about of: ${summary}`,
        });
        if (newConversation) {
          navigate(`/c/${newConversation}`);
        }
      } catch (error) {
        console.error("Failed to create conversation:", error);
      }
    };

    return (
      <Card
        ref={ref}
        className="group flex flex-col overflow-hidden border-slate-200 bg-white shadow-sm transition-all duration-300 hover:border-slate-300 hover:shadow-md"
      >
        {/* Header */}
        <CardHeader className="p-5 pb-3">
          <CardTitle className="text-lg font-semibold leading-snug text-slate-900">
            {blog_title}
          </CardTitle>
        </CardHeader>

        {/* Content */}
        <CardContent className="px-5 pb-4">
          <div className="relative mb-4 aspect-[2/1] w-full overflow-hidden rounded-md border border-slate-100 bg-slate-100">
            <img
              src={`https://picsum.photos/1000/${600 + id}`}
              alt={blog_title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          <p className="line-clamp-3 text-sm leading-relaxed text-slate-500">
            {summary}
          </p>
        </CardContent>

        {/* Footer / Actions */}
        <CardFooter className="mt-auto flex items-center justify-between border-t border-slate-100 bg-slate-50/50 p-3">
          {/* Read Paper Link */}
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="h-8 gap-2 px-2 text-sky-600 hover:bg-sky-50 hover:text-sky-700"
          >
            <a
              href={`${id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Read Paper
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </Button>

          <div className="flex items-center gap-2">
            {/* Share Button */}
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-slate-400 hover:text-slate-900"
              title="Share"
            >
              <img
                src={icons.share.src}
                alt="Share"
                className="h-4 w-4 opacity-70 transition-opacity group-hover:opacity-100"
              />
            </Button>

            {/* Ask AI Button */}
            <Button
              disabled={loading}
              onClick={handleAsk}
              variant="outline"
              size="sm"
              className="h-8 gap-2 border-sky-200 bg-sky-50 text-sky-700 hover:bg-sky-100 hover:text-sky-800 disabled:opacity-50"
            >
              <img
                src={icons.sparkles.src}
                alt="AI"
                className="h-3.5 w-3.5"
              />
              <span className="text-xs font-semibold">Ask AI</span>
            </Button>
          </div>
        </CardFooter>
      </Card>
    );
  }
);

BlogCard.displayName = "BlogCard";

export default BlogCard;