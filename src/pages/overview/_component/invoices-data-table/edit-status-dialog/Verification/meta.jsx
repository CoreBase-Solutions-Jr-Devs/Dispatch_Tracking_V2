import { Label } from '@/components/ui/label'

export default function VerificationMeta() {
    return (
        <section className="flex flex-row justify-between items-center gap-2">
            <section className="flex items-center gap-1">
                <Label className="text-xs font-medium">Turnaround Time (mins):</Label>
                <Label className="text-xs font-medium text-muted uppercase">0d 02h 30m 0s</Label>
            </section>
            <section className="flex items-center gap-1">
                <Label className="text-xs font-medium">Verification Control:</Label>
                <Label className="text-xs font-medium text-muted uppercase">CoreDBA</Label>
            </section>
        </section>
    )
}
