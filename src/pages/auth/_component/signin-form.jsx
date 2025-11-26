import { useAppDispatch } from "@/app/hook";
import Logo from "@/components/logo/logo";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLoginMutation } from "@/features/auth/authAPI";
import { setCredentials } from "@/features/auth/authSlice";
import { cn } from "@/lib/utils";
import { AUTH_ROUTES, PROTECTED_ROUTES } from "@/routes/common/routePath";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader, Shield, User } from "lucide-react";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  username: z.string().trim().min(1, "Username is required"),
  password: z.string().min(4, "Password must be at least 6 characters"),
});

const SignInForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      username: "",
      password: "",
      clientPin: 0,
      long: "",
      latt: "",
      machineCookie: "",
      ipLocation: "",
    },
  });

  const onSubmit = (values) => {
    const payload = {
      userName: values.username,
      password: values.password,
      clientPin: 0,
      long: "",
      latt: "",
      machineCookie: "",
      ipLocation: "",
    };
    login(payload)
      .unwrap()
      .then((data) => {
        dispatch(setCredentials(data));
        toast.success("Welcome back! Login successful", {
          description: "Redirecting to dashboard...",
          duration: 2000,
        });
        setTimeout(() => {
          // navigate(PROTECTED_ROUTES.OVERVIEW);
          navigate(AUTH_ROUTES.AUTH_BRANCH);
        }, 1000);
      })
      .catch((error) => {
        toast.error("Login Failed", {
          description:
            error?.data?.message ||
            "Please check your credentials and try again",
          duration: 4000,
        });
      });
  };

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  return (
    <div className="flex min-h-svh items-center justify-center bg-background px-5 py-12">
      <div className="w-full max-w-md space-y-6">
        <Card className="shadow-md">
          <CardHeader className="text-center pb-2">
            <Link
              to="/"
              className="flex items-center gap-2 justify-center font-medium text-base"
            >
              <Logo />
            </Link>
            <CardTitle className="text-xl">Welcome back</CardTitle>
            <CardDescription>Login to Dispatch Tracking System</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            {/* Form */}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-6 mt-4"
              >
                <div className="grid gap-4">
                  {/* Username */}
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel className="text-sm font-medium text-foreground flex items-center gap-2">
                          <User className="w-4 h-4 text-primary" />
                          Username
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Enter your username"
                            disabled={isLoading}
                            className={cn(
                              "h-12 px-4 text-base transition-all duration-200",
                              "focus:ring-2 focus:ring-primary/20 focus:border-primary",
                              "placeholder:text-muted-foreground/60"
                            )}
                            autoComplete="username"
                            aria-invalid={!!form.formState.errors.username}
                          />
                        </FormControl>
                        <FormMessage className="text-xs text-destructive" />
                      </FormItem>
                    )}
                  />

                  {/* Password */}
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <div className="flex items-center justify-between">
                          <FormLabel className="text-sm font-medium text-foreground flex items-center gap-2">
                            <Shield className="w-4 h-4 text-primary" />
                            Password
                          </FormLabel>
                          <Link
                            to="/forgot-password"
                            className="text-sm underline-offset-2 hover:underline text-primary"
                          >
                            Forgot?
                          </Link>
                        </div>
                        <FormControl>
                          <div className="relative">
                            <Input
                              {...field}
                              type={showPassword ? "text" : "password"}
                              placeholder="Enter your password"
                              disabled={isLoading}
                              className={cn(
                                "h-12 px-4 pr-12 text-base transition-all duration-200",
                                "focus:ring-2 focus:ring-primary/20 focus:border-primary",
                                "placeholder:text-muted-foreground/60"
                              )}
                              autoComplete="current-password"
                              aria-invalid={!!form.formState.errors.password}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 text-muted-foreground transition-colors"
                              onClick={togglePasswordVisibility}
                              tabIndex={-1}
                            >
                              {showPassword ? (
                                <EyeOff className="w-4 h-4" />
                              ) : (
                                <Eye className="w-4 h-4" />
                              )}
                              <span className="sr-only">
                                {showPassword
                                  ? "Hide password"
                                  : "Show password"}
                              </span>
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage className="text-xs text-destructive" />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Submit */}
                <Button
                  disabled={isLoading}
                  type="submit"
                  size="lg"
                  className="transition-transform duration-200 hover:scale-[1.02] bg-primary text-primary-foreground"
                >
                  {isLoading ? (
                    <Loader className="h-5 w-5 animate-spin mr-2" />
                  ) : (
                    <>
                      <Shield className="h-5 w-5 mr-2" />
                      Sign In
                    </>
                  )}
                </Button>

                {/* Footer */}
                <div className="text-center pt-4 border-t border-border/50 text-xs text-muted-foreground">
                  Secure pharmacy management system
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Legal + Branding */}
        <div className="text-center text-xs text-muted-foreground mt-2">
          By clicking login, you agree to our{" "}
          <a
            href="#"
            className="underline underline-offset-2 hover:text-primary"
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            href="#"
            className="underline underline-offset-2 hover:text-primary"
          >
            Privacy Policy
          </a>
          .
        </div>

        <div className="flex flex-col items-center justify-center text-xs text-muted-foreground gap-1 mt-2">
          <a
            href="https://corebase.co.ke/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-primary transition-colors"
          >
            <span>Powered by</span>
            <img
              src="/src/assets/images/corebase.png"
              alt="Company Logo"
              className="h-4 w-auto object-contain"
            />
            <span>Corebase Solutions</span>
          </a>
          <div>
            &copy; {new Date().getFullYear()} CoreBase Solutions. All rights
            reserved.
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
