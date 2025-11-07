import { useTypedSelector } from "@/app/hook";
import PageLayout from "@/components/page-layout";
import { viewMeta } from "@/lib/utils";
import { DispatchLabelValue } from "../overview/_component/label-values";
import DispatchMain from "./_component/main";

const Dispatch = () => {
  const { user } = useTypedSelector((state) => state.auth);

  let moduleArea = user["userrights"]?.map((item) => item?.moduleArea);
  //   const pageMeta = viewMeta[moduleArea[1]?.toLowerCase() || ""];
  const pageMeta = viewMeta["dispatch"];

//   const renderFilterSheet = () => {
//     return <FilterSheet />;
//   };

    const renderLabelValues = () => {
        return <DispatchLabelValue />;
    };

    const renderMainContent = () => {
        return <DispatchMain />;
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
