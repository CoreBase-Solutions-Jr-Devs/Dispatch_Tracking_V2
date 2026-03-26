import PageLayout from "@/components/page-layout";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import CreateReportDialog from "./_component/create-report";
import AllReports from "./_component/all-reports";

const Reports = () => {
  return (
    <PageLayout
      title="Reports"
      subtitle="View and manage your reports."
      rightAction={
        <CreateReportDialog>
          <Button className="!pr-7">
            <PlusIcon />
            Create Report
          </Button>
        </CreateReportDialog>
      }
    >
      <div className="w-full h-auto">
        <AllReports />
      </div>
    </PageLayout>
  );
};

export default Reports;
