
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Ban, RefreshCw } from "lucide-react";

interface AccountIdInputProps {
  accountId: string;
  onAccountIdChange: (value: string) => void;
  isChecking: boolean;
  isStatusChecked: boolean;
  onCheckStatus: () => void;
  onResetForm: () => void;
}

const AccountIdInput: React.FC<AccountIdInputProps> = ({
  accountId,
  onAccountIdChange,
  isChecking,
  isStatusChecked,
  onCheckStatus,
  onResetForm
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="account-id" className="text-sm font-medium">
        Account ID
      </Label>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Ban className="h-4 w-4 text-gray-400" />
          </div>
          <Input
            id="account-id"
            placeholder="Enter account ID"
            value={accountId}
            onChange={(e) => onAccountIdChange(e.target.value)}
            className="pl-10"
            disabled={isChecking || isStatusChecked}
          />
        </div>
        {isStatusChecked ? (
          <Button 
            onClick={onResetForm}
            variant="outline"
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Check Another
          </Button>
        ) : (
          <Button 
            onClick={onCheckStatus}
            disabled={isChecking || !accountId.trim()}
            variant="outline"
          >
            {isChecking ? "Checking..." : "Check Status"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default AccountIdInput;
