import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search as SearchIcon } from "lucide-react";
import EditStatusDialog from "../../../invoices-data-table/edit-status-dialog/edit-status-dialog";
import { PROTECTED_ROUTES } from "@/routes/common/routePath";
import { useNavigate } from "react-router-dom";
import {
  useDeleteDispatchInvoiceMutation,
  useRemoveSelectedInvoicesMutation,
} from "@/features/dispatch/dispatchAPI";
import { useAppDispatch, useTypedSelector } from "@/app/hook";
import { toast } from "sonner";
import { removeDispatchIds } from "@/features/dispatch/dispatchSlice";

export default function DispatchSearch({
  value,
  onChange,
  placeholder = "Invoice No",
  rowData,
  onSubmit,
  checkedInvoices = [],
  resetCheckedInvoice,
}) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const backToMainPage = () => {
    navigate(PROTECTED_ROUTES.OVERVIEW);
  };

  const { user } = useTypedSelector((state) => state.auth);

  const [removeSelectedInvoices, { isLoading }] =
    useRemoveSelectedInvoicesMutation();
  const [DeleteDispatchInvoice, { isLoading: isDeletingLoading }] =
    useDeleteDispatchInvoiceMutation();

  const handleRecall = async () => {
    const payload = {
      dispatchIds: checkedInvoices.map((inv) => inv?.dispatchId) || [0],
      dispatchNum: checkedInvoices[0]?.dispatchNumber || 0,
      userName: user?.username || "",
    };

    try {
      const data = await removeSelectedInvoices(payload).unwrap();
      toast.success("Invoice recalled successfully!");
      resetCheckedInvoice();
      let selected = checkedInvoices.map((inv) => inv?.dispatchId);
      dispatch(removeDispatchIds(selected || [0]));
      console.log(data);
    } catch (error) {
      let description = "Recall failed. Please try again.";
      toast.error("Recall Failed", {
        description: error?.data?.message || error?.data?.title || description,
        duration: 4000,
      });
    }
  };

  const handleDispatchDelete = async () => {
    const payload = {
      dispatchIds: checkedInvoices.map((inv) => inv?.dispatchId) || [0],
      dispatchNum: checkedInvoices[0]?.dispatchNumber || 0,
      userName: user?.username || "",
    };

    try {
      const data = await DeleteDispatchInvoice(payload).unwrap();
      toast.success("Dispatch deleted successfully!");
      resetCheckedInvoice();
      console.log(data);
    } catch (error) {
      let description = "Recall failed. Please try again.";
      toast.error("Recall Failed", {
        description: error?.data?.message || error?.data?.title || description,
        duration: 4000,
      });
    }
  };

  return (
    <section className="flex justify-between items-center w-full">
      <div className="relative w-1/2 max-w-sm">
        {/* <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className="w-50 pl-9 pr-3 py-2 bg-gray-100"
                /> */}
      </div>

      <div className="relative w-1/2 max-w-sm flex flex-row space-x-2 justify-end">
        <EditStatusDialog rowData={rowData} view="dispatch" onSubmit={onSubmit}>
          <Button className="uppercase text-xs font-medium" variant="apply">
            Pick Invoice
          </Button>
        </EditStatusDialog>

        <Button
          variant="store"
          onClick={handleRecall}
          disabled={
            checkedInvoices.length === 0 || isLoading || isDeletingLoading
          }
          className="uppercase text-xs font-medium"
        >
          Remove Invoice
        </Button>

        <Button
          variant="destructive"
          onClick={handleDispatchDelete}
          disabled={
            checkedInvoices.length === 0 || isLoading || isDeletingLoading
          }
          className="uppercase text-xs font-medium"
        >
          Delete
        </Button>

        <Button
          className="uppercase text-xs font-medium"
          variant="ghost"
          onClick={backToMainPage}
        >
          Cancel
        </Button>
      </div>
    </section>
  );
}
