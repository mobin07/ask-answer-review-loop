
import React from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Link, Save } from "lucide-react";
import { ConversiveStatus } from "@/types/conversive";

interface ConversiveIntegrationsProps {
  accountStatus: ConversiveStatus | null;
  isStatusChecked: boolean;
  isUpdating: boolean;
  onUpdateSetting: (value: boolean) => void;
  onSaveIntegration: () => void;
}

const ConversiveIntegrations: React.FC<ConversiveIntegrationsProps> = ({
  accountStatus,
  isStatusChecked,
  isUpdating,
  onUpdateSetting,
  onSaveIntegration
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Enable Conversive Integrations</h3>
      </div>
      
      <div className={`flex flex-row items-center justify-between rounded-lg border p-3 ${!isStatusChecked ? 'opacity-50' : ''}`}>
        <div className="space-y-0.5">
          <Label className="text-base flex items-center">
            <Link className="h-4 w-4 mr-2 text-blue-500" />
            Conversive Integration
          </Label>
          <p className="text-sm text-muted-foreground">
            Enable or disable Conversive integration for this account.
          </p>
        </div>
        <Switch
          checked={accountStatus?.conversiveIntegrationEnabled || false}
          onCheckedChange={onUpdateSetting}
          disabled={!isStatusChecked || isUpdating}
        />
      </div>

      <div className="flex justify-end">
        <Button 
          onClick={onSaveIntegration}
          disabled={!isStatusChecked || isUpdating}
          className="flex items-center gap-2"
        >
          <Save className="h-4 w-4" />
          Save Integration
        </Button>
      </div>
    </div>
  );
};

export default ConversiveIntegrations;
