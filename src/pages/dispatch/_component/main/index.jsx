import { useSelector } from "react-redux";
import { getInvoiceColumns } from "@/components/invoice-data-table/invoice-columns";
import { roleToView } from "@/lib/utils";
import DispatchSearch from "./main_sections/search";
import DispatchButton from "./main_sections/button";
import DispatchGrid from "./main_sections/grid";
import { useNavigate } from "react-router-dom";
import { PROTECTED_ROUTES } from "@/routes/common/routePath";
import { useState } from "react";
import { useDispatchSearchQuery, useGetSavedDispatchedInvoicesQuery } from "@/features/dispatch/dispatchAPI";


export default function DispatchMain() {
    const { user } = useSelector((state) => state.auth);
    const { invoices } = useSelector((state) => state.invoice);
    const [searchValue, setSearchValue] = useState("");

    const view = roleToView(user?.userRole || "User");
    const columns = getInvoiceColumns(view);

    const navigate = useNavigate();

    const handleGoToDispatchPage = () => {
        navigate(PROTECTED_ROUTES.NEWDISPATCH);
    };

    const {
        data: searchData,
        isFetching: isSearching,
        isError: searchError,
    } = useDispatchSearchQuery(searchValue, {
        skip: !searchValue, 
    });

    const {
        data: savedData,
        isFetching: isLoadingSaved,
        isError: savedError,
    } = useGetSavedDispatchedInvoicesQuery({
        pageNumber: 1,
        pageSize: 50,
    });

    const hasSearchResults = searchValue?.trim()?.length > 0;
    const dataToDisplay = hasSearchResults
        ? searchData?.invoices ?? []
        : savedData?.items ?? [];
    const isLoading = hasSearchResults ? isSearching : isLoadingSaved;

    return (
        <div className="p-1 w-full">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-2 w-full mb-4">
                <div className="w-full sm:flex-1">
                    <DispatchSearch 
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                    />
                </div>

                <div className="w-full sm:w-auto flex lg:justify-end">
                    <DispatchButton onClick={handleGoToDispatchPage} />
                </div>
            </div>

            <div key={searchValue || 'saved'} className="w-full">
                <DispatchGrid data={dataToDisplay} isLoading={isLoading} isSearch={hasSearchResults}/>
            </div>
        </div>
    );
}
