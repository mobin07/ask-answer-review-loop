
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { User, Settings, Save } from "lucide-react";
import { ConversiveStatus, UseCase } from "@/types/conversive";

interface ConversiveBetaFeaturesProps {
  accountStatus: ConversiveStatus | null;
  isStatusChecked: boolean;
  isUpdating: boolean;
  username: string;
  onUsernameChange: (value: string) => void;
  betaFeatures: UseCase[];
  isLoadingBetaFeatures: boolean;
  onFetchBetaFeatures: () => void;
  onUpdateBetaFeatureSetting: (featureId: number, enabled: boolean) => void;
  onSaveBetaFeatures: () => void;
}

const ConversiveBetaFeatures: React.FC<ConversiveBetaFeaturesProps> = ({
  accountStatus,
  isStatusChecked,
  isUpdating,
  username,
  onUsernameChange,
  betaFeatures,
  isLoadingBetaFeatures,
  onFetchBetaFeatures,
  onUpdateBetaFeatureSetting,
  onSaveBetaFeatures
}) => {
  const areBetaFeaturesLoaded = betaFeatures.length > 0;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Enable Conversive Beta Features</h3>
      </div>
      
      {/* Username Input */}
      <div className="space-y-2">
        <Label htmlFor="username" className="text-sm font-medium">
          Username
        </Label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <User className="h-4 w-4 text-gray-400" />
            </div>
            <Input
              id="username"
              placeholder="Enter username (e.g., user@email.com)"
              value={username}
              onChange={(e) => onUsernameChange(e.target.value)}
              className="pl-10"
              disabled={!isStatusChecked || isLoadingBetaFeatures}
            />
          </div>
          <Button 
            onClick={onFetchBetaFeatures}
            disabled={!isStatusChecked || !username.trim() || isLoadingBetaFeatures}
            variant="outline"
          >
            {isLoadingBetaFeatures ? "Loading..." : "Fetch Beta Features"}
          </Button>
        </div>
      </div>

      {/* Beta Features List */}
      {areBetaFeaturesLoaded && (
        <div className="space-y-3">
          <Label className="text-sm font-medium">Available Beta Features</Label>
          {betaFeatures.map((feature) => (
            <div key={feature.feature_id} className="flex flex-row items-center justify-between rounded-lg border p-3">
              <div className="space-y-0.5">
                <Label className="text-base flex items-center">
                  <Settings className="h-4 w-4 mr-2 text-purple-500" />
                  {feature.feature_name}
                </Label>
                <p className="text-sm text-muted-foreground">
                  {feature.feature_code}
                </p>
              </div>
              <Switch
                checked={feature.enabled || false}
                onCheckedChange={(checked) => onUpdateBetaFeatureSetting(feature.feature_id, checked)}
                disabled={isUpdating}
              />
            </div>
          ))}
          
          <div className="flex justify-end">
            <Button 
              onClick={onSaveBetaFeatures}
              disabled={isUpdating}
              className="flex items-center gap-2"
            >
              <Save className="h-4 w-4" />
              Save Beta Features
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConversiveBetaFeatures;
