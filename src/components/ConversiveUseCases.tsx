
import React, { useState } from "react";
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
  const [selectedUseCaseId, setSelectedUseCaseId] = useState<string>("");
  const areUseCasesLoaded = useCases.length > 0;
  const selectedUseCase = useCases.find(uc => uc.feature_id.toString() === selectedUseCaseId);

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

      {/* Use Case Selection */}
      {areUseCasesLoaded && (
        <div className="space-y-3">
          <Label className="text-sm font-medium">Select Use Case</Label>
          <Select 
            value={selectedUseCaseId} 
            onValueChange={setSelectedUseCaseId}
            disabled={isUpdating}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choose a use case to configure" />
            </SelectTrigger>
            <SelectContent>
              {useCases.map((useCase) => (
                <SelectItem key={useCase.feature_id} value={useCase.feature_id.toString()}>
                  <div className="flex items-center">
                    <Settings className="h-4 w-4 mr-2 text-purple-500" />
                    <div>
                      <div className="font-medium">{useCase.feature_name}</div>
                      <div className="text-sm text-muted-foreground">{useCase.feature_code}</div>
                    </div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Selected Use Case Toggle */}
          {selectedUseCase && (
            <div className="flex flex-row items-center justify-between rounded-lg border p-3 bg-gray-50">
              <div className="space-y-0.5">
                <Label className="text-base flex items-center">
                  <Settings className="h-4 w-4 mr-2 text-purple-500" />
                  {selectedUseCase.feature_name}
                </Label>
                <p className="text-sm text-muted-foreground">
                  {selectedUseCase.feature_code}
                </p>
              </div>
              <Switch
                checked={selectedUseCase.enabled || false}
                onCheckedChange={(checked) => onUpdateUseCaseSetting(selectedUseCase.feature_id, checked)}
                disabled={isUpdating}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ConversiveUseCases;
