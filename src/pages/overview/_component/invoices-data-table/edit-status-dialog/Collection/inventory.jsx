import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'

export default function CollectionInventory({ data }) {
    return (
        <section className="flex flex-row justify-between items-center mb-2">
            <div className="flex items-center">
                <Label className="text-xs">Items:</Label>
                <Label className="ml-2">5</Label>
            </div>

            <div className="flex items-center">
                <Label className="text-xs">Total Weight(kg):</Label>
                <Input type="number" className="w-18 ml-2 h-6" value="5"/>
            </div>

            <div className="flex items-center">
                <Label className="text-xs">No of Packages:</Label>
                <Input type="number" value="3" className="w-12 ml-2 h-6"/>
            </div>
        </section>
    )
}
