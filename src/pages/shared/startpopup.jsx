import React, { useState, useCallback } from "react";
import { DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Shield, User, Eye, EyeOff } from "lucide-react";
import {
  useAuthTransactionMutation,
  useLoginMutation,
} from "@/features/auth/authAPI";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { useTypedSelector } from "@/app/hook";

export default function StartPopup({ onClose, onSubmit }) {
  // const [login, { isLoading }] = useLoginMutation();
  const [authTransaction, { isLoading }] = useAuthTransactionMutation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { user } = useTypedSelector((state) => state.auth);

  let right = user["userrights"]?.map((item) => item?.moduleCode)[0];

  const [errors, setErrors] = useState({ username: "", password: "" });

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const handleLoginClick = () => {
    let hasError = false;
    const newErrors = { username: "", password: "" };

    if (!username.trim()) {
      newErrors.username = "Username is required";
      hasError = true;
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
      hasError = true;
    }

    setErrors(newErrors);
    if (hasError) return;

    authTransaction({ UserName: username, Password: password, moduleId: right })
      .unwrap()
      .then((data) => {
        toast.success("Authentication successful");

          onSubmit?.(data);

        onClose?.();
      })
      .catch((error) => {
        toast.error("Authentication failed", {
          description: error?.data?.message || "Check your credentials",
        });
      });
  };

  if (isLoading)
    return (
      <div className="space-y-4 p-6">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    );

  return (
    <div className="flex flex-col gap-4 p-6 md:p-8">
      <DialogHeader className="flex flex-col items-center justify-center pb-2 text-center">
        <h3 className="text-lg font-medium">Welcome Back</h3>
        <p className="text-sm text-muted-foreground">
          Set credentials to proceed with operation!
        </p>
      </DialogHeader>

      <div className="p-2 space-y-4">
        <div className="flex flex-col gap-1">
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
            className={`h-12 px-4 text-base placeholder:text-muted-foreground/60 focus:ring-2 focus:ring-primary/20 focus:border-primary ${
              errors.username ? "border-destructive" : ""
            }`}
          />
          {errors.username && (
            <p className="text-xs text-destructive">{errors.username}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
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
              className={`h-12 px-4 pr-12 text-base placeholder:text-muted-foreground/60 focus:ring-2 focus:ring-primary/20 focus:border-primary ${
                errors.password ? "border-destructive" : ""
              }`}
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
          {errors.password && (
            <p className="text-xs text-destructive">{errors.password}</p>
          )}
        </div>
      </div>

      <DialogFooter className="flex flex-col gap-5 justify-between">
        <Button className="uppercase" onClick={handleLoginClick}>
          Login
        </Button>
        <Button variant="destructive" className="uppercase" onClick={onClose}>
          Close
        </Button>
      </DialogFooter>
    </div>
  );
}
