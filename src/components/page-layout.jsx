import React from "react";
import { cn } from "@/lib/utils";
import PageHeader from "./page-header";

const PageLayout = ({
  children,
  className,
  title,
  subtitle,
  rightAction,
  showHeader = true,
  noPadding = false, // 🚀 instead of addMarginTop
}) => {
  return (
    <div className="w-full max-w-[var(--max-width)] mx-auto flex flex-col flex-1">
      {showHeader && (
        <PageHeader
          title={title}
          subtitle={subtitle}
          rightAction={rightAction}
        />
      )}
      <div
        className={cn(
          "flex-1 flex flex-col", // make children grow
          !noPadding && "pt-6",  // padding only if you want it
          className
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default PageLayout;
