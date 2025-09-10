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
import { useGetCollectionTrackingDetailsQuery } from '@/features/invoices/invoicesAPI'

export default function CollectionPopup({ rowData, onSubmit }) {

    const [isOpen, setIsOpen] = useState(false)
    const handleDialogClose = () => setIsOpen(false)

    const { data } = useGetCollectionTrackingDetailsQuery({
        docNum: Number(rowData.docNumber),
    });

    return (
        <>
            <div className='my-2 overflow-auto max-h-[90vh]'>
                {/* Collection Header */}
                <DialogHeader className="flex flex-row justify-between items-center mt-3">
                    <CollectionHeader />
                </DialogHeader>

                <Separator className="my-3" />
                {/* Collection Details Section */}
                <CollectionDetails data={data} />
                {/* Client Info */}
                <CollectionClient data={data} />
                {/* Item Collection Inventory Section */}
                <CollectionInventory data={data} />
                {/* Collection Summary Section */}
                <CollectionSummary data={data} />
                {/* Collection Remarks */}
                <CollectionRemarks data={data} />
                {/* Meta Data */}
                <CollectionMeta data={data} />

                {/* Collection Footer */}
                <DialogFooter>
                    <CollectionFooter
                        rowData={data}
                        onSubmit={onSubmit}
                    />
                </DialogFooter>

            </div>
        </>
    )
}
