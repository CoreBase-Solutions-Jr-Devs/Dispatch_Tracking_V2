import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function ConfirmStartPopup({ isOpen, onOpenChange, onStart, onCancel }) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-xs rounded-2xl p-3 text-center">
        <DialogHeader>
          <h2 className="text-lg font-medium">Confirm Start</h2>
          <p className="text-sm text-muted-foreground mt-2">
            Do you want to start now?
          </p>
        </DialogHeader>
        <DialogFooter className="mt-4 flex justify-center gap-4">
          <Button onClick={onStart}>Start</Button>
          <Button variant="destructive" onClick={onCancel}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
