import { DialogFooter, DialogHeader } from '@/components/ui/dialog'
import React from 'react'
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


    return (
        <>
            <div className='my-2 overflow-auto max-h-[90vh] px-2'>
                <DialogHeader className='flex flex-row justify-between items-center mt-3'>
                    <DeliveryHeader />
                </DialogHeader>

                <Separator className="my-3" />

                {/* Details Section */}
                <DeliveryDetails data={rowData} />
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
