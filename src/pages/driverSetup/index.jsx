import PageLayout from "@/components/page-layout";
import { roleToView, viewMeta } from "@/lib/utils";
import React from "react";
import { useSelector } from "react-redux";
import Drivers from "./_component/drivers_setup-main-page/main";

export default function DriverSetupOverview() {
  const user = useSelector((state) => state.auth);

  const view = roleToView(user?.userRole);
  const pageMeta = viewMeta[view];

  return (
    <PageLayout
      title={"Driver Setup"}
      subtitle={"System drivers"}
      rightAction={<div className="flex items-center gap-2 text-sm"></div>}
      noPadding
      className="flex flex-col flex-1"
    >
      {/* Main Content */}
      <div className="flex-1 min-h-0 overflow-hidden">
        <Drivers />
      </div>
    </PageLayout>
  );
}
