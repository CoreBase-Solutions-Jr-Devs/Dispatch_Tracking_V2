import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'

export default function DeliveryInventory() {
    return (
        <section className="flex flex-row justify-between items-center mb-2 gap-x-2 w-full">
            <div className="flex items-center">
                <Label className="text-xs">Items:</Label>
                <Label className="ml-2">5</Label>
            </div>
            {/* <div className='border-l border-gray-800 h-6 self-center'></div> */}
            <div className="flex items-center">
                <Label className="text-xs">Total Weight(kg):</Label>
                <Input type="number" className="w-20 ml-2 h-6"/>
            </div>
            {/* <div className='border-l border-gray-800 h-6 self-center'></div> */}
            <div className="flex items-center">
                <Label className="text-xs">No of Packages:</Label>
                <Input type="number"  className="w-18 ml-2 h-6"/>
            </div>
        </section>
    )
}
