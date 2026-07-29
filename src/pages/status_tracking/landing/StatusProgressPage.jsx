import React from "react";
import { useSearchParams } from "react-router-dom";
import { Loader2, PackageCheck } from "lucide-react";
import { toast } from "sonner";

import { useGetStatusTrackerQuery } from "@/pages/status_tracking/api/statusTrackerAPI";
import StatusTimeline from "@/pages/status_tracking/status/StatusTimeline";
import StatusDetails from "@/pages/status_tracking/status/StatusDetails";
import StatusMessage from "@/pages/status_tracking/status/StatusMessage";
import StatusActions from "@/pages/status_tracking/status/StatusActions";

import NoTrackingImage from "@/assets/images/No tracking Found.png";

export default function StatusProgressPage() {
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");

  const { data, error, isLoading } = useGetStatusTrackerQuery(token);

  const tracker = data;

  let apiMessage =
    error?.data?.message || "Something went wrong. Please try again.";

  if (error) {
    switch (error.status) {
      case 400:
      case 401:
      case 403:
      case 404:
      case 500:
        toast.error(apiMessage);
        break;

      case "FETCH_ERROR":
        apiMessage = "Please check your internet connection.";
        toast.error(apiMessage);
        break;

      case "PARSING_ERROR":
        apiMessage = "The server returned an invalid response.";
        toast.error(apiMessage);
        break;

      case "TIMEOUT_ERROR":
        apiMessage = "The request timed out. Please try again.";
        toast.error(apiMessage);
        break;

      default:
        toast.error(apiMessage);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 py-4 px-4 sm:px-5 lg:px-6">
      <div className="mx-auto w-full max-w-2xl">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
          {/* Header */}
          <div className="border-b bg-linear-to-r from-primary/10 via-white to-white px-2 py-2 text-center">
            <PackageCheck className="mx-auto mb-2 h-8 w-8 text-primary" />

            <h1 className="text-base sm:text-xl font-bold text-slate-900">
              Dispatch Status Tracking
            </h1>

            <p className="mt-1 text-xs sm:text-sm text-slate-500">
              Follow your order from the store through delivery.
            </p>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-5">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="mt-4 text-gray-500">
                  Loading tracking details...
                </p>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <img
                  src={NoTrackingImage}
                  alt="Tracking Error"
                  className="w-56 h-auto mb-6"
                />

                <h3 className="text-xl font-semibold text-slate-900">
                  Tracking Unavailable
                </h3>

                <p className="mt-2 text-sm text-destructive">
                  {apiMessage}
                </p>
              </div>
            ) : !tracker ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <img
                  src={NoTrackingImage}
                  alt="No Tracking"
                  className="w-56 h-auto mb-6"
                />

                <h3 className="text-xl font-semibold text-slate-900">
                  No Tracking Information
                </h3>

                <p className="mt-2 text-sm text-destructive">
                  We couldn't find any tracking information for this shipment.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <section className="rounded-xl border border-slate-200 bg-white p-3">
                  <StatusTimeline stages={tracker.stages} />
                </section>

                <section className="rounded-xl border border-slate-200 bg-white p-3">
                  <StatusDetails tracker={tracker} />
                </section>

                <section className="rounded-xl border border-slate-200 bg-white p-3">
                  <StatusMessage
                    message={tracker.message}
                    currentStage={tracker.currentStage}
                  />
                </section>

                <section className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <h3 className="mb-3 text-base font-semibold">
                    Need Assistance?
                  </h3>

                  <StatusActions
                    showDriver={!error && tracker?.driver}
                    driver={tracker?.driver?.name}
                  />
                </section>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}