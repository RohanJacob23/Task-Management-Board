import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

/**
 * Render a loading component with skeleton placeholders.
 */
export default function Loading() {
  // Define an object with temporary data.
  const tempArr = {
    1: [4, 5, 6],
    2: [7, 8, 9],
    3: [10, 11, 12],
  };

  // Render the loading component.
  return (
    <div className="flex overflow-auto p-4 gap-4">
      {/* Iterate over the keys of the tempArr object */}
      {Object.keys(tempArr).map((key) => (
        <div key={key} className="flex flex-col min-w-[16rem]">
          {/* Render a skeleton for text */}
          <Skeleton className="h-8 w-60 mb-3 rounded-xl bg-bg-color-variant" />
          <div className="flex flex-col space-y-4 flex-grow pb-4">
            {/* Iterate over the values of the current key */}
            {tempArr[key].map((item) => (
              // Render a skeleton for each item
              <Skeleton
                key={item}
                className="w-64 h-28 rounded-lg bg-bg-color-variant"
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
