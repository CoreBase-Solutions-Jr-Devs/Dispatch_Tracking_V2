import { useTypedSelector } from "@/app/hook";
import PageLayout from "@/components/page-layout";
import { viewMeta } from "@/lib/utils";
import FilterSheet from "@/pages/shared/filter-sheet/filterSheet";
import StoreLabelValue from "./main/store-label-value";


const Dispatch = () => {
  const { user } = useTypedSelector((state) => state.auth);

  let moduleArea = user["userrights"]?.map((item) => item?.moduleArea);
  //   const pageMeta = viewMeta[moduleArea[1]?.toLowerCase() || ""];
  const pageMeta = viewMeta["dispatch"];

  const renderFilterSheet = () => {
    return <FilterSheet />;
  };

    const renderLabelValues = () => {
        return <StoreLabelValue />;
    };

    const renderMainContent = () => {
        return <StorePage />;
    };

    return (
   <PageLayout
      title={pageMeta?.title}
      subtitle={pageMeta?.subtitle}
      middleAction={
        <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2">
          {renderLabelValues()}
        </div>
      }
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

export default Dispatch;
