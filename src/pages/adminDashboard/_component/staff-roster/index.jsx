import { useTypedSelector } from "@/app/hook";
import PageLayout from "@/components/page-layout";
import { viewMeta } from "@/lib/utils";
import FilterSheet from "@/pages/shared/filter-sheet/adminFilterSheet";
// import { DasboardLabelValue } from "../shared/label-values";
import Staffs from "./staff";

const StaffRoster = () => {
  const { user } = useTypedSelector((state) => state.auth);

  let moduleArea = user["userrights"]?.map((item) => item?.moduleArea);
  //   const pageMeta = viewMeta[moduleArea[1]?.toLowerCase() || ""];
  const pageMeta = viewMeta["view all stages"];

  const renderFilterSheet = () => {
    return <FilterSheet title={"staffRoster"} />;
  };

  // const renderLabelValues = () => {
  //   return <DasboardLabelValue />;
  // };

  const renderMainContent = () => {
    return <Staffs />;
  };

  return (
    <PageLayout
      title={"Staff Roster Overview"}
      subtitle={"All Staffs across the system."}
      // middleAction={
      //   <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2">
      //     {renderLabelValues()}
      //   </div>
      // }
      rightAction={
        <div className="flex items-center gap-2 text-sm">
          {renderFilterSheet()}
        </div>
      }
      noPadding
      className="flex flex-col flex-1"
    >
      <div className="flex-1 min-h-0 overflow-hidden">
        {renderMainContent()}
      </div>
    </PageLayout>
  );
};

export default StaffRoster;
