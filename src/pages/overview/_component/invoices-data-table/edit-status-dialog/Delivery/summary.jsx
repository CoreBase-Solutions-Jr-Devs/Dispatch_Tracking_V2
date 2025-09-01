import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function DeliverySummary() {
    const [status, setStatus] = useState("")
    const [mode, setMode] = useState("")

    return (
        <div className="flex flex-col">
            {/* Delivery Status */}
            <section className="flex flex-row justify-between items-center gap-6 mb-2">
                <div className="flex justify-between w-1/2">
                <Label className="text-xs font-medium">Delivery Status:</Label>
                <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger className="w-28 border border-gray-300 rounded-md px-2">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>

                    <SelectContent className="w-40 bg-gray-200">
                        <SelectItem value="pending">Pending Collection</SelectItem>
                        <SelectItem value="progress">In Progress</SelectItem>
                        <SelectItem value="delivered">Delivered</SelectItem>
                    </SelectContent>
                </Select>
                </div>
                <div className="flex justify-between w-1/2">
                    <Label className="text-xs font-medium">Invoice Value:</Label>
                    <Label className="text-xs font-medium">KES 14,700.00</Label>
                </div>
            </section>

            {/* Delivery Mode */}
            <section className="flex flex-row justify-between items-center gap-6 mb-4">
                <div className="flex justify-between w-1/2">
                    <Label className="text-xs font-medium">Delivery Mode:</Label>
                    <Select value={mode} onValueChange={setMode}>

                        <SelectTrigger className="w-28 border border-gray-300 rounded-md px-2 h-6">
                            <SelectValue placeholder="Mode" />
                        </SelectTrigger>

                        <SelectContent className="w-40 bg-gray-200">
                            <SelectItem value="COO">Cash on Order</SelectItem>
                            <SelectItem value="COD">Cash on Delivery</SelectItem>
                            <SelectItem value="ACC">Account</SelectItem>
                        </SelectContent>

                    </Select>
                </div>
                <div className="flex justify-between w-1/2">
                    <Label className="text-xs font-medium">Cash Collected:</Label>
                    <Input type="number" value="0.00" className="w-28 ml-2 h-6" readOnly />
                </div>
            </section>
        </div>
    )
}
