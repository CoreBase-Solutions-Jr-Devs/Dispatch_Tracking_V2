import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'

export default function DeliveryInventory() {
    return (
        <section className="flex flex-row justify-between items-center mb-2">
            <div className="flex items-center">
                <Label className="text-xs">Items:</Label>
                <Label className="ml-2">5</Label>
            </div>
            <div className='border-l border-gray-800 h-6 self-center'></div>
            <div className="flex items-center">
                <Label className="text-xs">Total Weight(kg):</Label>
                <Input type="number" value="12.5" className="w-20 ml-2 h-8"/>
            </div>
            <div className='border-l border-gray-800 h-6 self-center'></div>
            <div className="flex items-center">
                <Label className="text-xs">No of Packages:</Label>
                <Input type="number" value="3" className="w-12 ml-2 h-8"/>
            </div>
        </section>
    )
}
