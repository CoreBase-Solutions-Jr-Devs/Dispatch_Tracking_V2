import React from "react";
import { Button } from "@/components/ui/button";
export default function StatusActions({
  showDriver = false,
  // driver,
}) {
  return (
    <>
      <div className="flex flex-col gap-2">
        {showDriver && (
          <Button variant="default" size="sm">
            Contact Driver
          </Button>
        )}

        <Button asChild variant="default" size="sm" className="w-full">
          <a href="tel:+254725027002">
            Contact Customer Care
          </a>
        </Button>
      </div>
    </>
  );
}
