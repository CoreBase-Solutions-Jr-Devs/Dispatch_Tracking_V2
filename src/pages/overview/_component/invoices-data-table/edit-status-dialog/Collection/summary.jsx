import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"


export default function CollectionSummary() {
    const [type, setType] = useState("")
    const [mode, setMode] = useState("")

    return (
        <div className="flex flex-col">
            <section className="flex flex-row justify-between items-center gap-6 mb-2">
                {/* Collection Type */}
                <div className="flex justify-between w-1/2">

                    <Label className="text-xs font-medium">Collection Type:</Label>
                    
                    <Select value={type} onValueChange={setType}>
                        <SelectTrigger className="w-36 border border-gray-300 rounded-md px-2 !h-8 text-xs">
                            <SelectValue placeholder="Type" />
                        </SelectTrigger>
                        <SelectContent className="w-40 bg-gray-200">
                            <SelectItem value="Single">Single Order</SelectItem>
                            <SelectItem value="Batch">Batch</SelectItem>
                            <SelectItem value="BTR">Branch Transfer</SelectItem>
                        </SelectContent>
                    </Select>

                </div>

                {/* Collection Mode */}
                <div className="flex justify-between w-1/2">
                    <Label className="text-xs font-medium">Collection Mode:</Label>

                    <Select value={mode} onValueChange={setMode}>
                        <SelectTrigger className="w-36 border border-gray-300 rounded-md px-2 !h-8 text-xs">
                            <SelectValue placeholder="Mode" />
                        </SelectTrigger>
                        <SelectContent className="w-40 bg-gray-200">
                            <SelectItem value="BTR">Branch Transfer</SelectItem>
                            <SelectItem value="Courier">Courier</SelectItem>
                            <SelectItem value="Pickup">Pickup Location</SelectItem>
                        </SelectContent>
                    </Select>

                </div>
            </section>
        </div>
    )
}
