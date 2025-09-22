import { Label } from "@/components/ui/label";

export default function DeliverySummary({ data }) {
    return (
        <section className="flex flex-row  justify-end items-center mb-2">
            <div className="flex items-center  text-xs font-medium mr-4">
                <Label className="flex items-center  text-xs font-medium mr-4">Total Count:</Label>
                <Label className="ml-2 text-xs font-medium">2</Label>
            </div>
            <div className="flex items-center text-xs font-medium">
                <Label className="flex items-center  text-xs font-medium mr-4">Total Value:</Label>
                <Label className="ml-2 text-xs font-medium">1,470.00</Label>
            </div>
        </section>
    );
}
