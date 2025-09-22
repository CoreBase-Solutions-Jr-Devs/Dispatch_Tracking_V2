import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Shield, User, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

export default function StoreStartPopup({ onConfirm, children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleCancel = () => {
    onConfirm(false);
    setIsOpen(false);
  };

  const handleStart = () => {
    if (!username.trim() || !password.trim()) {
      toast.error("Both username and password are required");
      return;
    }

    toast.success("Credentials submitted successfully!");
    onConfirm({ username, password });
    setIsOpen(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {React.cloneElement(children, { onClick: () => setIsOpen(true) })}
      </DialogTrigger>

      <DialogContent className="w-full max-w-sm md:max-w-md max-h-[90vh] overflow-y-auto rounded-2xl">
        <div className="flex flex-col gap-4 p-6 md:p-8">
          <DialogHeader className="flex flex-col items-center justify-center pb-2 text-center">
            <h3 className="text-lg font-medium">Welcome Back</h3>
            <p className="text-sm text-muted-foreground">
              Please fill in your credentials to start!
            </p>
          </DialogHeader>

          <div className="p-2 space-y-4">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="username"
                className="text-sm font-medium text-foreground flex items-center gap-2"
              >
                <User className="w-4 h-4 text-primary" />
                Username
              </label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="h-12 px-4 text-base placeholder:text-muted-foreground/60 focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-foreground flex items-center gap-2"
              >
                <Shield className="w-4 h-4 text-primary" />
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="h-12 px-4 pr-12 text-base placeholder:text-muted-foreground/60 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 text-muted-foreground"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>

            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>

          <DialogFooter className="flex flex-col gap-5 justify-between">
            <Button className="uppercase" onClick={handleStart}>
              Login
            </Button>
            <Button
              variant="destructive"
              className="uppercase"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
