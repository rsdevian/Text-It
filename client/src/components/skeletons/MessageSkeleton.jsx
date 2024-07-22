function MessageSkeleton() {
  return (
    <>
        <div className="flex w-full flex-col gap-4">
            <div className="skeleton h-8 w-52"></div>
            <div className="skeleton h-8 w-52"></div>
            <div className="flex skeleton h-8 w-52 ml-auto"></div>
            <div className="skeleton h-8 w-52"></div>
            <div className="flex skeleton h-8 w-52 ml-auto"></div>
            <div className="h-3"></div>
        </div>
    </>
  )
}

export default MessageSkeleton