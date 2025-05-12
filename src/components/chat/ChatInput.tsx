
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2, Send } from "lucide-react";

interface ChatInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  onSend: () => void;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ 
  value, 
  onChange, 
  onKeyDown, 
  onSend, 
  isLoading 
}) => {
  return (
    <div className="border-t bg-white p-4 sticky bottom-0">
      <div className="max-w-4xl mx-auto flex items-end gap-2">
        <Card className="flex-1 flex items-center p-2 border rounded-full">
          <Input
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
            placeholder="Ask me anything..."
            className="flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          <Button 
            type="submit" 
            size="icon" 
            variant="ghost"
            disabled={isLoading || !value.trim()}
            onClick={onSend} 
            className="rounded-full"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Send className="h-5 w-5" />
            )}
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default ChatInput;
