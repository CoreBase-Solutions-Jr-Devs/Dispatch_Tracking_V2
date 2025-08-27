import { Label } from '@/components/ui/label'

export default function VerificationDetails({ data }) {
    return (
        <div className="flex flex-col gap-2">
            <section className="flex gap-x-12">
                <Label className="text-xs font-medium">Customer Name:</Label>
                <Label className="text-xs font-medium text-muted">{data.customerName}</Label>
            </section>

            <section className="flex justify-between">
                <div className="flex justify-between w-1/2">
                    <Label className="text-xs font-medium">Invoice No:</Label>
                    <Label className="text-xs font-medium text-muted">{data.invoiceNo}</Label>
                </div>
                <div className="flex justify-between w-1/2">
                    <Label className="text-xs font-medium">Invoice Date & Time:</Label>
                    <Label className="text-xs font-medium text-muted">{data.invoiceDate}</Label>
                </div>
            </section>

            <section className="flex justify-between">
                <div className="flex justify-between w-1/2">
                    <Label className="text-xs font-medium">Salesman:</Label>
                    <Label className="text-xs font-medium text-muted">{data.salesman}</Label>
                </div>
                <div className="flex justify-between w-1/2">
                    <Label className="text-xs font-medium">Start Date & Time:</Label>
                    <Label className="text-xs font-medium text-muted">{data.startDate}</Label>
                </div>
            </section>

            <section className="flex justify-between">
                <div className="flex justify-between w-1/2">
                    <Label className="text-xs font-medium">Verified By:</Label>
                    <Label className="text-xs font-medium text-muted">{data.verifiedBy}</Label>
                </div>
                <div className="flex justify-between w-1/2">
                    <Label className="text-xs font-medium">End Date & Time:</Label>
                    <Label className="text-xs font-medium text-muted">{data.endDate}</Label>
                </div>
            </section>
        </div>
    )
}
