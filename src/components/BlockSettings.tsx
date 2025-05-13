
import React from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ShieldCheck, Slash } from "lucide-react";
import { AccountStatus } from "@/types/account";

interface BlockSettingsProps {
  accountStatus: AccountStatus | null;
  isStatusChecked: boolean;
  isUpdating: boolean;
  onUpdateSetting: (settingName: 'blockUrlInMessage' | 'blockNumberInMessage', value: boolean) => void;
}

const BlockSettings: React.FC<BlockSettingsProps> = ({
  accountStatus,
  isStatusChecked,
  isUpdating,
  onUpdateSetting
}) => {
  return (
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
          onCheckedChange={(checked) => onUpdateSetting('blockUrlInMessage', checked)}
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
          onCheckedChange={(checked) => onUpdateSetting('blockNumberInMessage', checked)}
          disabled={!isStatusChecked || isUpdating}
        />
      </div>
    </div>
  );
};

export default BlockSettings;
