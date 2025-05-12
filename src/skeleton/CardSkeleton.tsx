import { Card, Skeleton } from "@nextui-org/react";

const CardSkeleton = () => {
  return (
   
    <>
     <Card className="w-[300px] space-y-5 p-4 mb-8" radius="lg">
      {/* Header with profile image and name */}
      <div className="flex items-center space-x-3">
        <Skeleton className="rounded-full">
          <div className="h-12 w-12 rounded-full bg-default-300"></div>
        </Skeleton>
        <div className="flex-1 space-y-5">
          <Skeleton className="w-3/5 rounded-lg">
            <div className="h-5 w-3/5 rounded-lg bg-default-200"></div>
          </Skeleton>
          <Skeleton className="w-2/5 rounded-lg">
            <div className="h-5 w-2/5 rounded-lg bg-default-200"></div>
          </Skeleton>
        </div>
      </div>


      {/* Post image */}
      <Skeleton className="rounded-lg">
        <div className="h-48 w-full rounded-lg bg-default-200"></div>
      </Skeleton>

      {/* Footer with action buttons */}
      <div className="flex justify-between border-t border-gray-700 pt-4">
        <div className="flex gap-4 mt-5">
          {/* Like Button Skeleton */}
          <Skeleton className="w-10 h-5 rounded-lg">
            <div className="h-full w-full rounded-lg bg-default-300"></div>
          </Skeleton>

          {/* Dislike Button Skeleton */}
          <Skeleton className="w-10 h-5 rounded-lg">
            <div className="h-full w-full rounded-lg bg-default-300"></div>
          </Skeleton>

          {/* Comment Button Skeleton */}
          <Skeleton className="w-10 h-5 rounded-lg">
            <div className="h-full w-full rounded-lg bg-default-300"></div>
          </Skeleton>
        </div>
      </div>
    </Card>
    <Card className="w-[300px] space-y-5 p-4" radius="lg">
      {/* Header with profile image and name */}
      <div className="flex items-center space-x-3">
        <Skeleton className="rounded-full">
          <div className="h-12 w-12 rounded-full bg-default-300"></div>
        </Skeleton>
        <div className="flex-1 space-y-5">
          <Skeleton className="w-3/5 rounded-lg">
            <div className="h-5 w-3/5 rounded-lg bg-default-200"></div>
          </Skeleton>
          <Skeleton className="w-2/5 rounded-lg">
            <div className="h-5 w-2/5 rounded-lg bg-default-200"></div>
          </Skeleton>
        </div>
      </div>

      {/* Post image */}
      <Skeleton className="rounded-lg">
        <div className="h-48 w-full rounded-lg bg-default-300"></div>
      </Skeleton>

      {/* Footer with action buttons */}
      <div className="flex justify-between border-t border-gray-700 pt-4">
        <div className="flex gap-4 mt-5">
          {/* Like Button Skeleton */}
          <Skeleton className="w-10 h-5 rounded-lg">
            <div className="h-full w-full rounded-lg bg-default-300"></div>
          </Skeleton>

          {/* Dislike Button Skeleton */}
          <Skeleton className="w-10 h-5 rounded-lg">
            <div className="h-full w-full rounded-lg bg-default-300"></div>
          </Skeleton>

          {/* Comment Button Skeleton */}
          <Skeleton className="w-10 h-5 rounded-lg">
            <div className="h-full w-full rounded-lg bg-default-300"></div>
          </Skeleton>
        </div>
      </div>
    </Card>
    </>
  );
};

export default CardSkeleton;
