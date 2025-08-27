import React from "react";

const PageHeader = ({ title, subtitle, rightAction }) => {
  return (
    <div className="w-full px-4 lg:px-0 dark:text-white">
      <div className="w-full mx-auto">
        <div className="w-full flex flex-col gap-2 items-start justify-start lg:items-center lg:flex-row lg:justify-between">
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
          {rightAction && rightAction}
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
