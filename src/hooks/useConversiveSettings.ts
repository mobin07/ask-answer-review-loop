
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { ConversiveStatus, UseCase, UseCaseUpdatePayload } from "@/types/conversive";

export function useConversiveSettings() {
  const [accountId, setAccountId] = useState("");
  const [username, setUsername] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isLoadingUseCases, setIsLoadingUseCases] = useState(false);
  const [accountStatus, setAccountStatus] = useState<ConversiveStatus | null>(null);
  const [isStatusChecked, setIsStatusChecked] = useState(false);
  const [useCases, setUseCases] = useState<UseCase[]>([]);

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
      const status = await mockCheckConversiveStatus(accountIdToCheck);
      
      setAccountStatus(status);
      setIsStatusChecked(true);
      
      toast({
        title: status.exists ? "Account Found" : "Account Not Found",
        description: status.exists 
          ? `Account ${accountIdToCheck} conversive settings loaded` 
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
    setUsername("");
    setAccountStatus(null);
    setIsStatusChecked(false);
    setUseCases([]);
  };

  // Function to update integration setting
  const updateIntegrationSetting = async (value: boolean) => {
    if (!isStatusChecked || !accountId) return;
    
    setIsUpdating(true);
    
    try {
      await mockUpdateIntegrationSetting(accountId, value);

      setAccountStatus(prev => {
        if (!prev) return null;
        return {
          ...prev,
          conversiveIntegrationEnabled: value
        };
      });
      
      toast({
        title: "Integration Updated",
        description: `Conversive integration has been ${value ? 'enabled' : 'disabled'} for account ${accountId}`,
      });
      
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An error occurred updating integration",
        variant: "destructive"
      });
    } finally {
      setIsUpdating(false);
    }
  };

  // Function to fetch use cases
  const fetchUseCases = async (accountIdToFetch: string, usernameToFetch: string) => {
    if (!accountIdToFetch.trim() || !usernameToFetch.trim()) {
      toast({
        title: "Error",
        description: "Please enter both Account ID and Username",
        variant: "destructive",
      });
      return;
    }

    setIsLoadingUseCases(true);
    
    try {
      const fetchedUseCases = await mockFetchUseCases(accountIdToFetch, usernameToFetch);
      setUseCases(fetchedUseCases);
      
      toast({
        title: "Use Cases Loaded",
        description: `Found ${fetchedUseCases.length} use cases for ${usernameToFetch}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An error occurred fetching use cases",
        variant: "destructive",
      });
    } finally {
      setIsLoadingUseCases(false);
    }
  };

  // Function to update use case setting
  const updateUseCaseSetting = async (featureId: number, enabled: boolean) => {
    if (!accountId || !username) return;
    
    setIsUpdating(true);
    
    try {
      const payload: UseCaseUpdatePayload = {
        account_id: parseInt(accountId),
        username: username,
        features: [{
          feature_id: featureId,
          feature_value: enabled ? 1 : 0
        }]
      };

      await mockUpdateUseCaseSetting(payload);

      setUseCases(prev => 
        prev.map(useCase => 
          useCase.feature_id === featureId 
            ? { ...useCase, enabled } 
            : useCase
        )
      );
      
      const useCase = useCases.find(uc => uc.feature_id === featureId);
      toast({
        title: "Use Case Updated",
        description: `${useCase?.feature_name} has been ${enabled ? 'enabled' : 'disabled'}`,
      });
      
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An error occurred updating use case",
        variant: "destructive"
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return {
    accountId,
    setAccountId,
    username,
    setUsername,
    isChecking,
    isUpdating,
    isLoadingUseCases,
    accountStatus,
    isStatusChecked,
    useCases,
    checkAccountStatus,
    resetForm,
    updateIntegrationSetting,
    fetchUseCases,
    updateUseCaseSetting
  };
}

// Mock API functions
export const mockCheckConversiveStatus = async (accountIdToCheck: string): Promise<ConversiveStatus> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const lastDigit = parseInt(accountIdToCheck.slice(-1));
  const exists = !isNaN(lastDigit) && lastDigit % 2 === 0;
  
  return {
    exists,
    conversiveIntegrationEnabled: exists ? Math.random() > 0.5 : false,
  };
};

export const mockUpdateIntegrationSetting = async (accountIdToUpdate: string, value: boolean) => {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  if (!accountIdToUpdate) {
    throw new Error("Invalid account ID");
  }
  
  return { 
    success: true, 
    message: `Account ${accountIdToUpdate} conversive integration updated to ${value}` 
  };
};

export const mockFetchUseCases = async (accountId: string, username: string): Promise<UseCase[]> => {
  await new Promise(resolve => setTimeout(resolve, 1200));
  
  return [
    {
      feature_id: 37,
      feature_name: "Conversive Usecases",
      feature_code: "CONVRSV-USECASES",
      enabled: Math.random() > 0.5
    },
    {
      feature_id: 39,
      feature_name: "Embedded Messaging",
      feature_code: "EMBEDDED-MESSAGING",
      enabled: Math.random() > 0.5
    }
  ];
};

export const mockUpdateUseCaseSetting = async (payload: UseCaseUpdatePayload) => {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  console.log("Updating use case with payload:", payload);
  
  return { 
    success: true, 
    message: "Use case updated successfully" 
  };
};
