
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";
import { Ban, Slash, ShieldCheck, RefreshCw } from "lucide-react";

interface AccountStatus {
  exists: boolean;
  blockUrlInMessage: boolean;
  blockNumberInMessage: boolean;
}

const AccountBlockForm = () => {
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
  
  // Mock API call function to check account status - replace with real API in production
  const mockCheckAccountStatus = async (accountIdToCheck: string): Promise<AccountStatus> => {
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
  
  // Mock API call function for updating a single setting - replace with real API in production
  const mockUpdateBlockSetting = async (
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

  return (
    <Card className="p-4 shadow-md">
      <div className="space-y-6">
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
                onChange={(e) => setAccountId(e.target.value)}
                className="pl-10"
                disabled={isChecking || isStatusChecked}
              />
            </div>
            {isStatusChecked ? (
              <Button 
                onClick={resetForm}
                variant="outline"
                className="flex items-center gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Check Another
              </Button>
            ) : (
              <Button 
                onClick={() => checkAccountStatus(accountId)}
                disabled={isChecking || !accountId.trim()}
                variant="outline"
              >
                {isChecking ? "Checking..." : "Check Status"}
              </Button>
            )}
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Blocking Settings</h3>
            <div className="text-sm">
              {accountStatus !== null && (
                <span className={`inline-flex items-center ${accountStatus.exists ? 'text-green-600' : 'text-amber-600'}`}>
                  <ShieldCheck className="h-4 w-4 mr-1" />
                  {accountStatus.exists ? 'Account exists' : 'New account will be created'}
                </span>
              )}
            </div>
          </div>
          
          <div className={`flex flex-row items-center justify-between rounded-lg border p-3 ${!isStatusChecked ? 'opacity-50' : ''}`}>
            <div className="space-y-0.5">
              <Label className="text-base flex items-center">
                <Slash className="h-4 w-4 mr-2 text-red-500" />
                Block URLs in Messages
              </Label>
              <p className="text-sm text-muted-foreground">
                When enabled, all URLs in messages will be blocked for this account.
              </p>
            </div>
            <Switch
              checked={accountStatus?.blockUrlInMessage || false}
              onCheckedChange={(checked) => updateBlockSetting('blockUrlInMessage', checked)}
              disabled={!isStatusChecked || isUpdating}
            />
          </div>
          
          <div className={`flex flex-row items-center justify-between rounded-lg border p-3 ${!isStatusChecked ? 'opacity-50' : ''}`}>
            <div className="space-y-0.5">
              <Label className="text-base flex items-center">
                <Slash className="h-4 w-4 mr-2 text-red-500" />
                Block Numbers in Messages
              </Label>
              <p className="text-sm text-muted-foreground">
                When enabled, all phone numbers in messages will be blocked for this account.
              </p>
            </div>
            <Switch
              checked={accountStatus?.blockNumberInMessage || false}
              onCheckedChange={(checked) => updateBlockSetting('blockNumberInMessage', checked)}
              disabled={!isStatusChecked || isUpdating}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AccountBlockForm;
