
import React from "react";
import { Card } from "@/components/ui/card";
import { useAccountStatus } from "@/hooks/useAccountStatus";
import AccountIdInput from "@/components/AccountIdInput";
import BlockSettings from "@/components/BlockSettings";

const AccountBlockForm = () => {
  const { 
    accountId, 
    setAccountId, 
    isChecking, 
    isUpdating, 
    accountStatus, 
    isStatusChecked,
    checkAccountStatus,
    resetForm,
    updateBlockSetting
  } = useAccountStatus();

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
        
        <BlockSettings 
          accountStatus={accountStatus}
          isStatusChecked={isStatusChecked}
          isUpdating={isUpdating}
          onUpdateSetting={updateBlockSetting}
        />
      </div>
    </Card>
  );
};

export default AccountBlockForm;
