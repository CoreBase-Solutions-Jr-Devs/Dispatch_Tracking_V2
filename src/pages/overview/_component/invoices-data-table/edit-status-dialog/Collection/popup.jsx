import { DialogFooter, DialogHeader } from '@/components/ui/dialog'
import React, { useState } from 'react'
import CollectionHeader from './header'
import { Separator } from '@/components/ui/separator'
import CollectionDetails from './details'
import CollectionClient from './client'
import CollectionInventory from './inventory'
import CollectionSummary from './summary'
import CollectionRemarks from './remarks'
import CollectionMeta from './meta'
import CollectionFooter from './footer'

export default function CollectionPopup({ rowData, onSubmit }) {

    const [isOpen, setIsOpen] = useState(false)
    const handleDialogClose = () => setIsOpen(false)

    return (
        <>
            <div className='my-2 overflow-auto'>
                {/* Collection Header */}
                <DialogHeader className="flex flex-row justify-between items-center mt-3">
                    <CollectionHeader />
                </DialogHeader>

                <Separator className="my-3" />
                {/* Collection Details Section */}
                <CollectionDetails />
                {/* Client Info */}
                <CollectionClient />
                {/* Item Collection Inventory Section */}
                <CollectionInventory />
                {/* Collection Summary Section */}
                <CollectionSummary />
                {/* Collection Remarks */}
                <CollectionRemarks />
                {/* Meta Data */}
                <CollectionMeta />

                {/* Collection Footer */}
                <DialogFooter>
                    <CollectionFooter />
                </DialogFooter>

            </div>
        </>
    )
}
