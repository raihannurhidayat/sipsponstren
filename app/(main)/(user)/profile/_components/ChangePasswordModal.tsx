"use client";

import type React from "react";

import { useState } from "react";
import {
  KeyRound,
  Eye,
  EyeOff,
  AlertCircle,
  Check,
  Loader2,
} from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

export default function ChangePasswordModal() {
  const [open, setOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Password strength calculation
  const calculatePasswordStrength = (password: string) => {
    if (!password) return 0;

    let strength = 0;

    // Length check
    if (password.length >= 8) strength += 25;

    // Character variety checks
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;

    return strength;
  };

  const passwordStrength = calculatePasswordStrength(newPassword);

  const getPasswordStrengthLabel = () => {
    if (passwordStrength === 0) return "";
    if (passwordStrength <= 25) return "Weak";
    if (passwordStrength <= 50) return "Fair";
    if (passwordStrength <= 75) return "Good";
    return "Strong";
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 25) return "bg-red-500";
    if (passwordStrength <= 50) return "bg-yellow-500";
    if (passwordStrength <= 75) return "bg-blue-500";
    return "bg-green-500";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      setIsLoading(true);
      toast.loading("Proses sedang berlangsung", {
        id: "change-password-from-user",
      });
      e.preventDefault();

      // Validation
      if (!currentPassword || !newPassword || !confirmPassword) {
        toast.error("All fields are required", {
          id: "change-password-from-user",
        });
        return;
      }

      if (newPassword !== confirmPassword) {
        toast.error("New passwords don't match", {
          id: "change-password-from-user",
        });
        return;
      }

      if (passwordStrength < 50) {
        toast.warning("Please use a stronger password", {
          id: "change-password-from-user",
        });
        return;
      }

      const response = await authClient.changePassword({
        newPassword: newPassword,
        currentPassword: currentPassword,
        revokeOtherSessions: true, // revoke all other sessions the user is signed into
      });

      if (response.error) {
        toast.error("Failed to change password", {
          id: "change-password-from-user",
        });
        return;
      }
      toast.success("Your password has been updated successfully", {
        id: "change-password-from-user",
      });

      // Reset form and close modal
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setOpen(false);
    } catch (error) {
      toast.error("Internal server error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="w-full justify-start cursor-pointer" size="lg">
          <KeyRound className="mr-2 h-4 w-4" />
          Change Password
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
            <DialogDescription>
              Update your password to keep your account secure.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="current-password" className="text-right">
                Current Password
              </Label>
              <div className="relative">
                <Input
                  id="current-password"
                  type={showCurrentPassword ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="pr-10"
                  autoComplete="current-password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                  <span className="sr-only">
                    {showCurrentPassword ? "Hide password" : "Show password"}
                  </span>
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password" className="text-right">
                New Password
              </Label>
              <div className="relative">
                <Input
                  id="new-password"
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="pr-10"
                  autoComplete="new-password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                  <span className="sr-only">
                    {showNewPassword ? "Hide password" : "Show password"}
                  </span>
                </Button>
              </div>

              {/* Password strength indicator */}
              {newPassword && (
                <div className="space-y-1 mt-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">
                      Password strength: {getPasswordStrengthLabel()}
                    </span>
                  </div>
                  <Progress
                    value={passwordStrength}
                    className={getPasswordStrengthColor()}
                  />

                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div className="flex items-center text-xs">
                      {/[A-Z]/.test(newPassword) ? (
                        <Check className="h-3 w-3 text-green-500 mr-1" />
                      ) : (
                        <AlertCircle className="h-3 w-3 text-slate-400 mr-1" />
                      )}
                      <span>Uppercase letter</span>
                    </div>
                    <div className="flex items-center text-xs">
                      {/[0-9]/.test(newPassword) ? (
                        <Check className="h-3 w-3 text-green-500 mr-1" />
                      ) : (
                        <AlertCircle className="h-3 w-3 text-slate-400 mr-1" />
                      )}
                      <span>Number</span>
                    </div>
                    <div className="flex items-center text-xs">
                      {newPassword.length >= 8 ? (
                        <Check className="h-3 w-3 text-green-500 mr-1" />
                      ) : (
                        <AlertCircle className="h-3 w-3 text-slate-400 mr-1" />
                      )}
                      <span>8+ characters</span>
                    </div>
                    <div className="flex items-center text-xs">
                      {/[^A-Za-z0-9]/.test(newPassword) ? (
                        <Check className="h-3 w-3 text-green-500 mr-1" />
                      ) : (
                        <AlertCircle className="h-3 w-3 text-slate-400 mr-1" />
                      )}
                      <span>Special character</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password" className="text-right">
                Confirm New Password
              </Label>
              <div className="relative">
                <Input
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pr-10"
                  autoComplete="new-password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                  <span className="sr-only">
                    {showConfirmPassword ? "Hide password" : "Show password"}
                  </span>
                </Button>
              </div>
              {confirmPassword && newPassword !== confirmPassword && (
                <p className="text-sm text-red-500 mt-1">
                  Passwords don't match
                </p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
