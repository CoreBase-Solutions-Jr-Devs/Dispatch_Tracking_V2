import { Badge } from '@/components/ui/badge'
import { DialogTitle } from '@/components/ui/dialog'
import React from 'react'

export default function DeliveryHeader() {
    return (
        <div className="flex flex-row justify-between items-center mt-3 w-full">
            <DialogTitle className="text-primary">DELIVERY CONFIRMATION</DialogTitle>
            <Badge variant="pushed" className="uppercase">
                Document Confirmed
            </Badge>
        </div>
    )
}
