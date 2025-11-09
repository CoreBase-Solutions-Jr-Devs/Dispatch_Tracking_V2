import { Label } from "@/components/ui/label";
import { useSelector } from "react-redux";

export default function DispatchMeta() {
    const { assignedTo } = useSelector((state) => state.dispatch);

    return (
        <section className="flex flex-row justify-between items-center gap-2">
            <section className="flex items-center gap-1">
                <Label className="text-xs font-medium">Dispatch Control:</Label>
                <Label className="text-xs font-medium uppercase">{assignedTo || "—"}</Label>
            </section>
        </section>
    );
}
