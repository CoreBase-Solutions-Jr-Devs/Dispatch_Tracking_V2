
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import React from 'react'

export default function DeliveryHeader() {
    return (
        <div className="flex flex-row justify-between items-center mt-3 w-full">
            <Label className="text-primary">INVOICES FOR DELIVERY</Label>
            <Badge variant="pushed" className="uppercase">
                Document Dispatched
            </Badge>
        </div>
    )
}
