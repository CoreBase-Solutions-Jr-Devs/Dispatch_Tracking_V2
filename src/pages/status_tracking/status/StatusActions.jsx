import React from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

/**
 * Invoice Check to see if it has reached the Delivery Stage.
 * Saved Dispatches remain in the Dispatch Stage, a false value is returned.
 *
 * @param {Object} tracker - Tracking payload from the Status Tracking API
 * @returns {boolean}
 */
export function isInvoiceDispatched(tracker) {
  if (!tracker) return false;

  // 1. Check currentStage (case-insensitive, e.g. "DELIVERY", "DELIVERED")
  const currentStage = tracker.currentStage?.toString().trim().toUpperCase();
  if (currentStage === "DELIVERY" || currentStage === "DELIVERED") {
    return true;
  }

  // 2. Check stages list
  if (Array.isArray(tracker.stages)) {
    // Delivery stage: reached if status is not Pending (e.g. Active, Completed) or timestamp is present
    const deliveryStage = tracker.stages.find((s) => {
      const stageName = s?.stage?.toString().trim().toUpperCase();
      return stageName === "DELIVERY" || stageName === "DELIVERED";
    });

    if (deliveryStage) {
      const deliveryStatus = deliveryStage.status?.toString().trim().toLowerCase();
      if (
        (deliveryStatus && deliveryStatus !== "pending") ||
        Boolean(deliveryStage.timestamp)
      ) {
        return true;
      }
    }

    // Dispatch stage: if dispatch stage is Completed, it has progressed to Delivery
    const dispatchStage = tracker.stages.find((s) => {
      const stageName = s?.stage?.toString().trim().toUpperCase();
      return stageName === "DISPATCH";
    });

    if (dispatchStage) {
      const dispatchStatus = dispatchStage.status?.toString().trim().toLowerCase();
      if (dispatchStatus === "completed") {
        return true;
      }
    }
  }

  return false;
}

export default function StatusActions({
  showDriver = true, driver, tracker,
  isDispatched: isDispatchedProp,
  disabled: disabledProp, onContactDriver
}) {
  // Determine dispatch status
  const isDispatched =
    typeof isDispatchedProp === "boolean"
      ? isDispatchedProp
      : isInvoiceDispatched(tracker);

  // Normalize driver info
  const driverObj =
    typeof driver === "object" && driver !== null
      ? driver
      : tracker?.driver && typeof tracker.driver === "object"
      ? tracker.driver
      : null;

  const driverName =
    typeof driver === "string"
      ? driver
      : driverObj?.name || "";

  const hasAssignedDriver = Boolean(
    driverName &&
      driverName.trim().toLowerCase() !== "not yet assigned" &&
      driverName.trim().toLowerCase() !== "not assigned"
  );

  // Button remains disabled until invoice reaches Delivery (dispatched) and a driver is assigned
  const isDriverDisabled = typeof disabledProp === "boolean"
    ? disabledProp
    : !isDispatched || !hasAssignedDriver;

  const driverPhone =
    driverObj?.phone ||
    driverObj?.phoneNo ||
    driverObj?.phoneNumber ||
    driverObj?.mobile ||
    driverObj?.telephone ||
    driverObj?.driverPhone ||
    null;

  const disabledTooltip = !isDispatched
    ? "Driver contact will be available once the order has been dispatched for delivery."
    : !hasAssignedDriver
    ? "Driver has not yet been assigned."
    : undefined;

  const handleDriverClick = () => {
    if (onContactDriver) {
      onContactDriver(driverObj);
      return;
    }

    if (!driverPhone) {
      toast.info("Driver Contact", {
        description: hasAssignedDriver
          ? `Driver ${driverName} is assigned (${driverObj?.vehicleReg || "Vehicle Assigned"}). Contact Customer Care for further routing assistance.`
          : "Driver has not yet been assigned to this delivery.",
      });
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {showDriver && (
        isDriverDisabled ? (
          <Tooltip delayDuration={150}>
            <TooltipTrigger asChild>
              <span
                tabIndex={0}
                className="w-full inline-block cursor-not-allowed"
                title={disabledTooltip}
              >
                <Button
                  variant="default"
                  size="sm"
                  className="w-full pointer-events-none"
                  disabled
                >
                  Contact Driver
                </Button>
              </span>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p className="max-w-xs text-center">{disabledTooltip}</p>
            </TooltipContent>
          </Tooltip>
        ) : driverPhone ? (
          <Button asChild variant="default" size="sm" className="w-full">
            <a href={`tel:${driverPhone}`}>
              Contact Driver
            </a>
          </Button>
        ) : (
          <Button
            variant="default"
            size="sm"
            className="w-full"
            onClick={handleDriverClick}
          >
            Contact Driver
          </Button>
        )
      )}

      <Button asChild variant="default" size="sm" className="w-full">
        <a href="tel:+254725027002">
          Contact Customer Care
        </a>
      </Button>
    </div>
  );
}
