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
import { useGetDeliveryTrackingDetailsQuery } from '@/features/delivery/deliveryAPI'

export default function DeliveryPopup({ rowData, onSubmit }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleDialogClose = () => setIsOpen(false);
    const { data } = useGetDeliveryTrackingDetailsQuery({
        docNum: Number(rowData.invoiceNo),
        // docNum: Number(rowData._id),
    });

    return (
        <>
            <div className='my-2 overflow-auto max-h-[90vh] px-2'>
                <DialogHeader className='flex flex-row justify-between items-center mt-3'>
                    <DeliveryHeader />
                </DialogHeader>

                <Separator className="my-3" />

                {/* Details Section */}
                <DeliveryDetails data={data} />
                {/* Item Reception Section */}
                <DeliveryReception data={data} />

                <Separator className="my-2" />
                {/* Delivery Inventory Section */}
                <DeliveryInventory data={data} />

                {/* Delivery Summary Section */}
                <DeliverySummary data={data} />

                {/* Delivery Remarks Section*/}
                <DeliveryRemarks data={data} />

                {/* Meta Content */}
                <DeliveryMeta data={data} />

                {/* Delivery Footer */}
                <DialogFooter>
                    <DeliveryFooter
                        rowData={data}
                        onSubmit={onSubmit}
                        onClose={handleDialogClose}
                    />
                </DialogFooter>
            </div>
        </>
    )
}
