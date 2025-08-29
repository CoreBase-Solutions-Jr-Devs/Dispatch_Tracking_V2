import { Badge } from '@/components/ui/badge'
import { DialogTitle } from '@/components/ui/dialog'
import React from 'react'

export default function CollectionHeader() {
    return (
        <div className="flex flex-row justify-between items-center mt-3 w-full">
                <DialogTitle className="text-primary">DELIVERY COLLECTION</DialogTitle>
                <Badge variant="pushed" className="uppercase">
                    Document Delivered
                </Badge>
        </div>
    )
}
