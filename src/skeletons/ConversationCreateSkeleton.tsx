function ConversationCreateSkeleton() {
  return (
    <div className="h-dvh w-full flex flex-col items-center gap-2">
      <div className="flex flex-1 overflow-y-auto w-full justify-center">
        <div className="px-5 flex flex-col justify-center gap-5 lg:w-180 sm:w-120 py-5 text-gray-100">
          <div className="text-xl text-center h-full text-gray-300 font-medium flex justify-center items-center">
            <div className="h-9 w-96 bg-gray-700 rounded-lg animate-pulse">Loading...</div>
          </div>

          <div className="w-full flex flex-col justify-center items-center">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 w-full  p-2 gap-3">
              {[...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className="flex py-1.5 justify-center border-none font-medium bg-accent-primary rounded-full h-9 animate-pulse"
                />
              ))}
            </div>

            <div className="h-16 flex lg:w-180 sm:w-120 mb-3">
              <div className="border-none px-5 w-[90%] rounded-l-full bg-[#1e2939] animate-pulse" />
              <div className="border-none w-[10%] pr-[3.25rem] rounded-r-full bg-[#1e2939] animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConversationCreateSkeleton;