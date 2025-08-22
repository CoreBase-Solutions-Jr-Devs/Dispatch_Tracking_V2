/* eslint-disable react-refresh/only-export-components */
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateReportMutation } from "@/features/reports/reportsAPI";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertTriangle, Check, Copy, Loader } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

// Validation schema
const createReportSchema = z.object({
  name: z
    .string()
    .min(3, "Report name must be at least 3 characters")
    .max(50, "Report name must be less than 50 characters")
    .regex(
      /^[a-zA-Z0-9\s\-_]+$/,
      "Report name can only contain letters, numbers, spaces, hyphens, and underscores"
    ),
});

const CreateReportDialog = ({ children }) => {
  const [generatedKey, setGeneratedKey] = useState("");
  const [isKeyGenerated, setIsKeyGenerated] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(createReportSchema),
    defaultValues: { name: "" },
  });

  const [createReport, { isLoading }] = useCreateReportMutation();

  const onSubmit = async (values) => {
    createReport(values.name)
      .unwrap()
      .then((res) => {
        setGeneratedKey(res.key);
        setIsKeyGenerated(true);
      })
      .catch((error) => {
        console.error("Failed to create report:", error);
        toast.error("Failed to create report");
      });
  };

  const handleCopyKey = async () => {
    try {
      await navigator.clipboard.writeText(generatedKey);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleDialogClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      setGeneratedKey("");
      form.reset();
      setIsKeyGenerated(false);
      setIsCopied(false);
    }, 100);
  };

  const handleOpenChange = (open) => {
    if (!open) {
      handleDialogClose();
      return;
    }
    setIsOpen(true);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Report</DialogTitle>
          <DialogDescription>
            {!isKeyGenerated
              ? "Generate a new report key to access your report."
              : "Your report key has been generated successfully."}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {!isKeyGenerated ? (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Report Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Monthly Report" className="h-10" {...field} />
                      </FormControl>
                      <FormDescription>
                        Choose a descriptive name to help you identify this report later.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <DialogFooter>
                  <Button type="submit" disabled={isLoading} className="w-full">
                    {isLoading && <Loader className="w-4 h-4 animate-spin" />}
                    {isLoading ? "Creating Report..." : "Create Report"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          ) : (
            <>
              <Alert className="border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/30">
                <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                <AlertDescription className="text-amber-800 dark:text-amber-200">
                  <strong>Important:</strong> This report key will only be shown once. Copy it and store it securely.
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="key-name-display">Report Name</Label>
                  <Input
                    id="key-name-display"
                    value={form.getValues("name")}
                    readOnly
                    className="h-10 bg-muted"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="generated-key">Report Key</Label>
                  <div className="flex gap-2">
                    <Input
                      id="generated-key"
                      value={generatedKey}
                      readOnly
                      className="h-10 font-mono text-sm bg-muted !pointer-events-none focus-visible:ring-0"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={handleCopyKey}
                      className="h-10 w-10 shrink-0 !bg-black"
                    >
                      {isCopied ? (
                        <Check className="!h-5 !w-5 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4 text-white" />
                      )}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {isCopied
                      ? "Copied to clipboard!"
                      : "Click the copy button to copy your report key."}
                  </p>
                </div>
              </div>

              <DialogFooter>
                <Button onClick={handleDialogClose} variant="outline" className="w-full bg-transparent">
                  Done
                </Button>
              </DialogFooter>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateReportDialog;
