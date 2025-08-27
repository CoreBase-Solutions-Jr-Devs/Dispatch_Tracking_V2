import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

export default function VerificationSummary({ data }) {
    return (
        <section className="flex flex-row justify-between items-center mb-2">
            <div className="flex items-center">
                <Label>Items:</Label>
                <Label className="ml-2">{data.items}</Label>
            </div>
            <div className="flex items-center">
                <Label>Total Weight (kg):</Label>
                <Input type="number" defaultValue={data.totalWeight} className="w-20 ml-2 h-8"/>
            </div>
        </section>
    )
}
