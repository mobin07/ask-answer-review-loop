
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { ConversiveStatus, UseCase, UseCaseUpdatePayload } from "@/types/conversive";

export function useConversiveSettings() {
  const [accountId, setAccountId] = useState("");
  const [username, setUsername] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isLoadingBetaFeatures, setIsLoadingBetaFeatures] = useState(false);
  const [accountStatus, setAccountStatus] = useState<ConversiveStatus | null>(null);
  const [isStatusChecked, setIsStatusChecked] = useState(false);
  const [betaFeatures, setBetaFeatures] = useState<UseCase[]>([]);

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
    setBetaFeatures([]);
  };

  // Function to update integration setting
  const updateIntegrationSetting = async (value: boolean) => {
    setAccountStatus(prev => {
      if (!prev) return null;
      return {
        ...prev,
        conversiveIntegrationEnabled: value
      };
    });
  };

  // Function to save integration
  const saveIntegration = async (accountIdToSave: string) => {
    if (!isStatusChecked || !accountIdToSave) return;
    
    setIsUpdating(true);
    
    try {
      await mockSaveIntegrationSetting(accountIdToSave, accountStatus?.conversiveIntegrationEnabled || false);
      
      toast({
        title: "Integration Saved",
        description: `Conversive integration has been ${accountStatus?.conversiveIntegrationEnabled ? 'enabled' : 'disabled'} for account ${accountIdToSave}`,
      });
      
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An error occurred saving integration",
        variant: "destructive"
      });
    } finally {
      setIsUpdating(false);
    }
  };

  // Function to fetch beta features
  const fetchBetaFeatures = async (accountIdToFetch: string, usernameToFetch: string) => {
    if (!accountIdToFetch.trim() || !usernameToFetch.trim()) {
      toast({
        title: "Error",
        description: "Please enter both Account ID and Username",
        variant: "destructive",
      });
      return;
    }

    setIsLoadingBetaFeatures(true);
    
    try {
      const fetchedBetaFeatures = await mockFetchBetaFeatures(accountIdToFetch, usernameToFetch);
      setBetaFeatures(fetchedBetaFeatures);
      
      toast({
        title: "Beta Features Loaded",
        description: `Found ${fetchedBetaFeatures.length} beta features for ${usernameToFetch}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An error occurred fetching beta features",
        variant: "destructive",
      });
    } finally {
      setIsLoadingBetaFeatures(false);
    }
  };

  // Function to update beta feature setting
  const updateBetaFeatureSetting = async (featureId: number, enabled: boolean) => {
    setBetaFeatures(prev => 
      prev.map(feature => 
        feature.feature_id === featureId 
          ? { ...feature, enabled } 
          : feature
      )
    );
  };

  // Function to save beta features
  const saveBetaFeatures = async (accountIdToSave: string, usernameToSave: string) => {
    if (!accountIdToSave || !usernameToSave) return;
    
    setIsUpdating(true);
    
    try {
      const payload: UseCaseUpdatePayload = {
        account_id: parseInt(accountIdToSave),
        username: usernameToSave,
        features: betaFeatures.map(feature => ({
          feature_id: feature.feature_id,
          feature_value: feature.enabled ? 1 : 0
        }))
      };

      await mockSaveBetaFeatures(payload);
      
      toast({
        title: "Beta Features Saved",
        description: `All beta features have been saved successfully`,
      });
      
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An error occurred saving beta features",
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
    isLoadingBetaFeatures,
    accountStatus,
    isStatusChecked,
    betaFeatures,
    checkAccountStatus,
    resetForm,
    updateIntegrationSetting,
    fetchBetaFeatures,
    updateBetaFeatureSetting,
    saveIntegration,
    saveBetaFeatures
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

export const mockSaveIntegrationSetting = async (accountIdToUpdate: string, value: boolean) => {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  console.log("Saving integration with API for account:", accountIdToUpdate, "value:", value);
  
  if (!accountIdToUpdate) {
    throw new Error("Invalid account ID");
  }
  
  return { 
    success: true, 
    message: `Account ${accountIdToUpdate} conversive integration saved as ${value}` 
  };
};

export const mockFetchBetaFeatures = async (accountId: string, username: string): Promise<UseCase[]> => {
  await new Promise(resolve => setTimeout(resolve, 1200));
  
  return [
    {
      feature_id: 37,
      feature_name: "Conversive Beta Features",
      feature_code: "CONVRSV-BETA-FEATURES",
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

export const mockSaveBetaFeatures = async (payload: UseCaseUpdatePayload) => {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  console.log("Saving beta features with API using payload:", payload);
  
  return { 
    success: true, 
    message: "Beta features saved successfully" 
  };
};
