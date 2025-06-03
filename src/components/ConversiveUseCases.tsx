
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Settings } from "lucide-react";
import { ConversiveStatus, UseCase } from "@/types/conversive";

interface ConversiveUseCasesProps {
  accountStatus: ConversiveStatus | null;
  isStatusChecked: boolean;
  isUpdating: boolean;
  username: string;
  onUsernameChange: (value: string) => void;
  useCases: UseCase[];
  isLoadingUseCases: boolean;
  onFetchUseCases: () => void;
  onUpdateUseCaseSetting: (featureId: number, enabled: boolean) => void;
}

const ConversiveUseCases: React.FC<ConversiveUseCasesProps> = ({
  accountStatus,
  isStatusChecked,
  isUpdating,
  username,
  onUsernameChange,
  useCases,
  isLoadingUseCases,
  onFetchUseCases,
  onUpdateUseCaseSetting
}) => {
  const areUseCasesLoaded = useCases.length > 0;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Enable Conversive UseCases</h3>
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
              disabled={!isStatusChecked || isLoadingUseCases}
            />
          </div>
          <Button 
            onClick={onFetchUseCases}
            disabled={!isStatusChecked || !username.trim() || isLoadingUseCases}
            variant="outline"
          >
            {isLoadingUseCases ? "Loading..." : "Fetch UseCases"}
          </Button>
        </div>
      </div>

      {/* Use Cases List */}
      {areUseCasesLoaded && (
        <div className="space-y-3">
          <Label className="text-sm font-medium">Available Use Cases</Label>
          {useCases.map((useCase) => (
            <div key={useCase.feature_id} className="flex flex-row items-center justify-between rounded-lg border p-3">
              <div className="space-y-0.5">
                <Label className="text-base flex items-center">
                  <Settings className="h-4 w-4 mr-2 text-purple-500" />
                  {useCase.feature_name}
                </Label>
                <p className="text-sm text-muted-foreground">
                  {useCase.feature_code}
                </p>
              </div>
              <Switch
                checked={useCase.enabled || false}
                onCheckedChange={(checked) => onUpdateUseCaseSetting(useCase.feature_id, checked)}
                disabled={isUpdating}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ConversiveUseCases;
