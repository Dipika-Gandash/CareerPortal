import { Skeleton } from "@/components/ui/skeleton";

const JobCardSkeleton = () => {
  return (
    <div className="bg-white rounded-xl shadow-md border border-purple-300 p-4 flex flex-col justify-between w-75">
      <div>
        <Skeleton className="h-6 w-48" />

        <Skeleton className="h-4 w-32 mt-2" />

        <Skeleton className="h-4 w-24 mt-2" />

        <div className="flex gap-2 mt-3">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
      </div>
      <Skeleton className="h-9 w-full mt-5 rounded-lg" />
    </div>
  );
};

export default JobCardSkeleton;