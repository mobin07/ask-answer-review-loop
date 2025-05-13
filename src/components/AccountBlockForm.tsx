
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { Ban, Slash, ShieldCheck } from "lucide-react";
import { useForm } from "react-hook-form";

interface BlockingFormValues {
  accountId: string;
  blockUrlInMessage: boolean;
  blockNumberInMessage: boolean;
}

interface AccountStatus {
  exists: boolean;
  blockUrlInMessage: boolean;
  blockNumberInMessage: boolean;
}

const AccountBlockForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [accountStatus, setAccountStatus] = useState<AccountStatus | null>(null);
  const [isStatusChecked, setIsStatusChecked] = useState(false);
  
  const form = useForm<BlockingFormValues>({
    defaultValues: {
      accountId: "",
      blockUrlInMessage: false,
      blockNumberInMessage: false,
    },
  });

  // Function to check if account exists
  const checkAccountStatus = async (accountId: string) => {
    if (!accountId.trim()) {
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
      const status = await mockCheckAccountStatus(accountId);
      
      setAccountStatus(status);
      setIsStatusChecked(true);
      
      // Update form values with current settings
      form.setValue("blockUrlInMessage", status.blockUrlInMessage);
      form.setValue("blockNumberInMessage", status.blockNumberInMessage);
      
      toast({
        title: status.exists ? "Account Found" : "Account Not Found",
        description: status.exists 
          ? `Account ${accountId} settings loaded` 
          : `Account ${accountId} not found. New settings will be created.`,
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

  const onSubmit = async (data: BlockingFormValues) => {
    if (!isStatusChecked) {
      toast({
        title: "Error",
        description: "Please check account status first",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // This would be a real API call in a production application
      const response = await mockBlockingApiCall(data);
      
      // Show success toast with the API response
      toast({
        title: "Success",
        description: response.message,
      });
      
      // Update account status after saving
      setAccountStatus({
        exists: true,
        blockUrlInMessage: data.blockUrlInMessage,
        blockNumberInMessage: data.blockNumberInMessage,
      });
    } catch (error) {
      // Show error toast
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Mock API call function to check account status - replace with real API in production
  const mockCheckAccountStatus = async (accountId: string): Promise<AccountStatus> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate database check - in reality this would query your backend
    // For demo, we'll say accounts ending with even numbers exist, odd numbers don't
    const lastDigit = parseInt(accountId.slice(-1));
    const exists = !isNaN(lastDigit) && lastDigit % 2 === 0;
    
    // For existing accounts, we return random settings
    // For non-existing accounts, we return default false values
    return {
      exists,
      blockUrlInMessage: exists ? Math.random() > 0.5 : false,
      blockNumberInMessage: exists ? Math.random() > 0.5 : false,
    };
  };
  
  // Mock API call function - replace with real API in production
  const mockBlockingApiCall = async (data: BlockingFormValues) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate API response
    if (data.accountId) {
      const changedSettings = [];
      if (data.blockUrlInMessage) changedSettings.push("URL blocking");
      if (data.blockNumberInMessage) changedSettings.push("number blocking");
      
      const settingsText = changedSettings.length > 0 
        ? `with ${changedSettings.join(" and ")} enabled`
        : "with no blocking options enabled";
      
      return { 
        success: true, 
        message: `Account ${data.accountId} settings updated ${settingsText}` 
      };
    }
    
    throw new Error("Invalid account ID");
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
                value={form.watch("accountId")}
                onChange={(e) => form.setValue("accountId", e.target.value)}
                className="pl-10"
                disabled={isChecking}
              />
            </div>
            <Button 
              onClick={() => checkAccountStatus(form.watch("accountId"))}
              disabled={isChecking || !form.watch("accountId").trim()}
              variant="outline"
            >
              {isChecking ? "Checking..." : "Check Status"}
            </Button>
          </div>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
              
              <FormField
                control={form.control}
                name="blockUrlInMessage"
                render={({ field }) => (
                  <FormItem className={`flex flex-row items-center justify-between rounded-lg border p-3 ${!isStatusChecked ? 'opacity-50' : ''}`}>
                    <div className="space-y-0.5">
                      <FormLabel className="text-base flex items-center">
                        <Slash className="h-4 w-4 mr-2 text-red-500" />
                        Block URLs in Messages
                      </FormLabel>
                      <FormDescription>
                        When enabled, all URLs in messages will be blocked for this account.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={!isStatusChecked}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="blockNumberInMessage"
                render={({ field }) => (
                  <FormItem className={`flex flex-row items-center justify-between rounded-lg border p-3 ${!isStatusChecked ? 'opacity-50' : ''}`}>
                    <div className="space-y-0.5">
                      <FormLabel className="text-base flex items-center">
                        <Slash className="h-4 w-4 mr-2 text-red-500" />
                        Block Numbers in Messages
                      </FormLabel>
                      <FormDescription>
                        When enabled, all phone numbers in messages will be blocked for this account.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={!isStatusChecked}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full"
              disabled={isLoading || !isStatusChecked || !form.watch("accountId").trim()}
            >
              {isLoading ? "Processing..." : "Save Blocking Settings"}
            </Button>
          </form>
        </Form>
      </div>
    </Card>
  );
};

export default AccountBlockForm;
