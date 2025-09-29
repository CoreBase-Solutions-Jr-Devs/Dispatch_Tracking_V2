import { Label } from "@/components/ui/label";

export default function DispatchSummary({ data }) {
    return (
        <section className="flex flex-row  justify-end items-center mb-2">
            <div className="flex items-center  text-xs text-medium mr-4">
                <Label>Total Count:</Label>
                {/* <Label className="ml-2">2</Label> */}
            </div>
            <div className="flex items-center text-xs text-medium">
                <Label>Total Value:</Label>
                {/* <Label className="ml-2">1,470.00</Label> */}
            </div>
        </section>
    );
}
