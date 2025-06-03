
import React from "react";
import { Card } from "@/components/ui/card";
import { useConversiveSettings } from "@/hooks/useConversiveSettings";
import AccountIdInput from "@/components/AccountIdInput";
import ConversiveIntegrations from "@/components/ConversiveIntegrations";
import ConversiveBetaFeatures from "@/components/ConversiveBetaFeatures";

const ConversiveForm = () => {
  const { 
    accountId, 
    setAccountId, 
    isChecking, 
    isUpdating, 
    accountStatus, 
    isStatusChecked,
    checkAccountStatus,
    resetForm,
    updateIntegrationSetting,
    username,
    setUsername,
    betaFeatures,
    isLoadingBetaFeatures,
    fetchBetaFeatures,
    updateBetaFeatureSetting,
    saveIntegration,
    saveBetaFeatures
  } = useConversiveSettings();

  return (
    <Card className="p-4 shadow-md">
      <div className="space-y-6">
        <AccountIdInput 
          accountId={accountId}
          onAccountIdChange={setAccountId}
          isChecking={isChecking}
          isStatusChecked={isStatusChecked}
          onCheckStatus={() => checkAccountStatus(accountId)}
          onResetForm={resetForm}
        />
        
        <ConversiveIntegrations 
          accountStatus={accountStatus}
          isStatusChecked={isStatusChecked}
          isUpdating={isUpdating}
          onUpdateSetting={updateIntegrationSetting}
          onSaveIntegration={() => saveIntegration(accountId)}
        />

        <ConversiveBetaFeatures 
          accountStatus={accountStatus}
          isStatusChecked={isStatusChecked}
          isUpdating={isUpdating}
          username={username}
          onUsernameChange={setUsername}
          betaFeatures={betaFeatures}
          isLoadingBetaFeatures={isLoadingBetaFeatures}
          onFetchBetaFeatures={() => fetchBetaFeatures(accountId, username)}
          onUpdateBetaFeatureSetting={updateBetaFeatureSetting}
          onSaveBetaFeatures={() => saveBetaFeatures(accountId, username)}
        />
      </div>
    </Card>
  );
};

export default ConversiveForm;
