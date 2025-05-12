
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Phone, Key, Send } from "lucide-react";
import { toast } from "@/components/ui/sonner";

const BlockForm = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!mobileNumber.trim() || !apiKey.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    setIsLoading(true);
    
    try {
      // This would be a real API call in a production application
      const response = await mockApiCall({ mobileNumber, apiKey });
      
      // Show success toast with the API response
      toast.success(response.message);
    } catch (error) {
      // Show error toast
      toast.error(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };
  
  // Mock API call function - replace with real API in production
  const mockApiCall = async (data: { mobileNumber: string; apiKey: string }) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate API response
    if (data.mobileNumber && data.apiKey) {
      return { success: true, message: "Block operation successful" };
    }
    
    throw new Error("Invalid mobile number or API key");
  };

  return (
    <Card className="p-4 shadow-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="mobile-number" className="text-sm font-medium">
            Mobile Number
          </Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Phone className="h-4 w-4 text-gray-400" />
            </div>
            <Input
              id="mobile-number"
              type="tel"
              placeholder="Enter mobile number"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              className="pl-10"
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="api-key" className="text-sm font-medium">
            API Key
          </Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Key className="h-4 w-4 text-gray-400" />
            </div>
            <Input
              id="api-key"
              type="password"
              placeholder="Enter API key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="pl-10"
              required
            />
          </div>
        </div>
        
        <Button 
          type="submit" 
          className="w-full flex items-center justify-center"
          disabled={isLoading}
        >
          {isLoading ? (
            <>Processing...</>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Submit
            </>
          )}
        </Button>
      </form>
    </Card>
  );
};

export default BlockForm;
