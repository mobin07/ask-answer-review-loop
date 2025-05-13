
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { toast } from "@/components/ui/sonner";
import { Ban, Slash } from "lucide-react";
import { useForm } from "react-hook-form";

interface BlockingFormValues {
  accountId: string;
  blockUrlInMessage: boolean;
  blockNumberInMessage: boolean;
}

const AccountBlockForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<BlockingFormValues>({
    defaultValues: {
      accountId: "",
      blockUrlInMessage: false,
      blockNumberInMessage: false,
    },
  });

  const onSubmit = async (data: BlockingFormValues) => {
    if (!data.accountId.trim()) {
      toast.error("Please enter an Account ID");
      return;
    }
    
    setIsLoading(true);
    
    try {
      // This would be a real API call in a production application
      const response = await mockBlockingApiCall(data);
      
      // Show success toast with the API response
      toast.success(response.message);
    } catch (error) {
      // Show error toast
      toast.error(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
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
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="account-id" className="text-sm font-medium">
              Account ID
            </Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Ban className="h-4 w-4 text-gray-400" />
              </div>
              <Input
                id="account-id"
                placeholder="Enter account ID"
                {...form.register("accountId")}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-medium">Blocking Settings</h3>
            
            <FormField
              control={form.control}
              name="blockUrlInMessage"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
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
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="blockNumberInMessage"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
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
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Save Blocking Settings"}
          </Button>
        </form>
      </Form>
    </Card>
  );
};

export default AccountBlockForm;
