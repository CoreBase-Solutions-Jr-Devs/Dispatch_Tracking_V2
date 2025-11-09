import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function DispatchFilterPopup({ open, onClose }) {
  const [route, setRoute] = useState("");
  const [customer, setCustomer] = useState("");

  const handleApply = () => {
    console.log("Filter applied:", { route, customer });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Filter Dispatches</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-4">
  
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">By Route</label>
            <select
              className="border rounded-md p-2"
              value={route}
              onChange={(e) => setRoute(e.target.value)}
            >
              <option value="">Select Route</option>
              <option value="route1">Route 1</option>
              <option value="route2">Route 2</option>
            </select>
          </div>

         
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">By Customer Name</label>
            <select
              className="border rounded-md p-2"
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
            >
              <option value="">Select Customer</option>
              <option value="customer1">Customer A</option>
              <option value="customer2">Customer B</option>
            </select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleApply}>Apply Filters</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
