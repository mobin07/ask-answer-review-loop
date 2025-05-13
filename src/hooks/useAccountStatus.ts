
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { AccountStatus } from "@/types/account";

export function useAccountStatus() {
  const [accountId, setAccountId] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [accountStatus, setAccountStatus] = useState<AccountStatus | null>(null);
  const [isStatusChecked, setIsStatusChecked] = useState(false);

  // Function to check if account exists
  const checkAccountStatus = async (accountIdToCheck: string) => {
    if (!accountIdToCheck.trim()) {
      toast({
        title: "Error",
        description: "Please enter an Account ID",
        variant: "destructive",
      });
      return;
    }

    setIsChecking(true);
    setIsStatusChecked(false);
    
    try {
      // This would be a real API call in a production application
      const status = await mockCheckAccountStatus(accountIdToCheck);
      
      setAccountStatus(status);
      setIsStatusChecked(true);
      
      toast({
        title: status.exists ? "Account Found" : "Account Not Found",
        description: status.exists 
          ? `Account ${accountIdToCheck} settings loaded` 
          : `Account ${accountIdToCheck} not found. New settings will be created.`,
        variant: status.exists ? "default" : "default",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An error occurred checking account",
        variant: "destructive",
      });
      setIsStatusChecked(false);
    } finally {
      setIsChecking(false);
    }
  };

  // Function to reset form to check another account
  const resetForm = () => {
    setAccountId("");
    setAccountStatus(null);
    setIsStatusChecked(false);
  };

  // Function to update a specific block setting
  const updateBlockSetting = async (settingName: 'blockUrlInMessage' | 'blockNumberInMessage', value: boolean) => {
    if (!isStatusChecked || !accountId) return;
    
    setIsUpdating(true);
    
    try {
      // This would be a real API call in a production application
      const settingLabel = settingName === 'blockUrlInMessage' ? 'URL blocking' : 'number blocking';
      
      await mockUpdateBlockSetting(accountId, settingName, value);

      // Update local state to reflect the change
      setAccountStatus(prev => {
        if (!prev) return null;
        return {
          ...prev,
          [settingName]: value
        };
      });
      
      toast({
        title: "Setting Updated",
        description: `${settingLabel} has been ${value ? 'enabled' : 'disabled'} for account ${accountId}`,
      });
      
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : `An error occurred updating ${settingName}`,
        variant: "destructive"
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return {
    accountId,
    setAccountId,
    isChecking,
    isUpdating,
    accountStatus,
    isStatusChecked,
    checkAccountStatus,
    resetForm,
    updateBlockSetting
  };
}

// Mock API functions
export const mockCheckAccountStatus = async (accountIdToCheck: string): Promise<AccountStatus> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Simulate database check - in reality this would query your backend
  // For demo, we'll say accounts ending with even numbers exist, odd numbers don't
  const lastDigit = parseInt(accountIdToCheck.slice(-1));
  const exists = !isNaN(lastDigit) && lastDigit % 2 === 0;
  
  // For existing accounts, we return random settings
  // For non-existing accounts, we return default false values
  return {
    exists,
    blockUrlInMessage: exists ? Math.random() > 0.5 : false,
    blockNumberInMessage: exists ? Math.random() > 0.5 : false,
  };
};

export const mockUpdateBlockSetting = async (
  accountIdToUpdate: string, 
  settingName: string, 
  value: boolean
) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Simulate API response
  if (!accountIdToUpdate) {
    throw new Error("Invalid account ID");
  }
  
  return { 
    success: true, 
    message: `Account ${accountIdToUpdate} setting "${settingName}" updated to ${value}` 
  };
};
