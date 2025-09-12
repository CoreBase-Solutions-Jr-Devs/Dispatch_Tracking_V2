import React, { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";

import DeliverySearch from "../delivery-sections/search";
import DeliveryTable from "../delivery-sections/table";
import DeliverySummary from "../delivery-sections/summary";

import DeliveryDetails from "../delivery-sections/details";
import DeliveryMeta from "../delivery-sections/meta";
import DeliveryRemarks from "../delivery-sections/remarks";
import DeliveryFooter from "../delivery-sections/footer";

import DeliveryPagination from "../delivery-sections/pagination";
export default function DeliveryInvoice({ rowData, onSubmit }) {
  const [query, setQuery] = useState("");
  return (
    <div className=" overflow-y-auto max-h-[90vh] px-2">
      <DeliverySearch
        value={query}
        onChange={setQuery}
        data={rowData}
        placeholder="invoice No..."
      />
      <div className="py-2">
        <div className="min-h-[300px]">
          <DeliveryTable data={rowData} />
        </div>
        <DeliverySummary data={rowData} />
        <DeliveryPagination data={rowData} />
      </div>

      <Separator className="my-2" />

      <DeliveryDetails data={rowData} />
      <div className=" py-1">
        <DeliveryRemarks />
      </div>

      <DeliveryMeta />
      <DeliveryFooter rowData={rowData} onSubmit={onSubmit} />
    </div>
  );
}
