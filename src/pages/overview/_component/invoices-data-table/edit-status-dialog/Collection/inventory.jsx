import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'

export default function CollectionInventory({ data }) {
    const invoice = data || mockInvoices[0];

    return (
        <section className="flex flex-row justify-between items-center mb-2">
            <div className="flex items-center">
                <Label className="text-xs">Items:</Label>
                <Label className="ml-2">{invoice?.itemas}</Label>
            </div>

            <div className="flex items-center">
                <Label className="text-xs">Total Weight(kg):</Label>
                <Input type="number" className="w-18 ml-2 h-6" value={invoice?.totalWeight}/>
            </div>

            <div className="flex items-center">
                <Label className="text-xs">No of Packages:</Label>
                <Input type="number"className="w-12 ml-2 h-6" value={invoice?.packages} />
            </div>
        </section>
    )
}
