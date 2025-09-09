import React from "react";

const PageHeader = ({ title, subtitle, middleAction, rightAction }) => {
  return (
    <div className="w-full px-4 lg:px-0 dark:text-white mb-4 lg:mb-6">
      <div className="w-full mx-auto">
        <div className="w-full flex flex-col gap-2 items-start justify-start lg:flex-row lg:items-center lg:justify-between">
          {/* Title & subtitle */}
          {(title || subtitle) && (
            <div className="space-y-0.5">
              {title && (
                <h1 className="break-normal font-bold text-base sm:text-lg">
                  {title}
                </h1>
              )}
              {subtitle && (
                <p className="text-muted-foreground text-xs sm:text-xs">
                  {subtitle}
                </p>
              )}
            </div>
          )}

          {/* Middle action */}
          {middleAction && (
            <div className="flex-1 flex justify-center">{middleAction}</div>
          )}

          {/* Right action */}
          {rightAction && (
            <div className="flex justify-end">{rightAction}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
