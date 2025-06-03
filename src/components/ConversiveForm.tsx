
import React from "react";
import { Card } from "@/components/ui/card";
import { useConversiveSettings } from "@/hooks/useConversiveSettings";
import AccountIdInput from "@/components/AccountIdInput";
import ConversiveIntegrations from "@/components/ConversiveIntegrations";
import ConversiveUseCases from "@/components/ConversiveUseCases";

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
    useCases,
    isLoadingUseCases,
    fetchUseCases,
    updateUseCaseSetting
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
        />

        <ConversiveUseCases 
          accountStatus={accountStatus}
          isStatusChecked={isStatusChecked}
          isUpdating={isUpdating}
          username={username}
          onUsernameChange={setUsername}
          useCases={useCases}
          isLoadingUseCases={isLoadingUseCases}
          onFetchUseCases={() => fetchUseCases(accountId, username)}
          onUpdateUseCaseSetting={updateUseCaseSetting}
        />
      </div>
    </Card>
  );
};

export default ConversiveForm;
