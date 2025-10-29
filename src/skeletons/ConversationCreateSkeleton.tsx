export default function ConversationCreateSkeleton() {
  return (
    <div className="h-dvh w-full flex flex-col items-center gap-2">
      <div className="flex h-full overflow-y-auto w-full justify-center items-center">
        <div className="px-5 flex flex-col gap-5 lg:w-180 sm:w-120">
          {/* Title placeholder */}
          <div className="h-10 w-full bg-gray-700 rounded-md animate-pulse"></div>

          {/* Assistants grid placeholder */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 w-full gap-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="h-10 bg-gray-700 rounded-full animate-pulse"
              ></div>
            ))}
          </div>

          {/* Input field placeholder */}
          <div className="flex h-14 w-full gap-2">
            <div className="flex-1 bg-gray-700 rounded-l-full animate-pulse"></div>
            <div className="w-16 bg-gray-700 rounded-r-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
