
export interface ConversiveStatus {
  exists: boolean;
  conversiveIntegrationEnabled: boolean;
}

export interface UseCase {
  feature_id: number;
  feature_name: string;
  feature_code: string;
  enabled?: boolean;
}

export interface UseCaseUpdatePayload {
  account_id: number;
  username: string;
  features: {
    feature_id: number;
    feature_value: number;
  }[];
}
