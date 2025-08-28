import { DialogFooter, DialogHeader } from '@/components/ui/dialog'
import React, { useState } from 'react'
import DeliveryHeader from './header'
import { Separator } from '@/components/ui/separator'
import DeliveryDetails from './details'
import DeliveryReception from './reception'
import DeliverySummary from './summary'
import DeliveryRemarks from './remarks'
import DeliveryMeta from './meta'
import DeliveryFooter from './footer'
import DeliveryInventory from './inventory'

export default function DeliveryPopup({ rowData, onSubmit }) {

    const [isOpen, setIsOpen] = useState(false)
    const handleDialogClose = () => setIsOpen(false)

    return (
        <>
            <div className='my-2 overflow-y-auto'>
                <DialogHeader className='flex flex-row justify-between items-center mt-3'>
                    <DeliveryHeader />
                </DialogHeader>

                <Separator className="my-3" />

                {/* Details Section */}
                <DeliveryDetails data ={rowData} />
                {/* Item Reception Section */}
                <DeliveryReception />

                <Separator className="my-2" />
                {/* Delivery Inventory Section */}
                <DeliveryInventory />
                
                {/* Delivery Summary Section */}
                <DeliverySummary />

                {/* Delivery Remarks Section*/}
                <DeliveryRemarks />

                {/* Meta Content */}
                <DeliveryMeta />

                {/* Delivery Footer */}
                <DialogFooter>
                    <DeliveryFooter />
                </DialogFooter>
            </div>
        </>
    )
}
