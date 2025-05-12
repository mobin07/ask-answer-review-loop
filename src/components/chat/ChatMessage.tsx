
import React from "react";
import { Avatar } from "@/components/ui/avatar";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import StructuredAnswer from "@/components/StructuredAnswer";

export type MessageType = {
  id: string;
  content: string;
  type: "user" | "ai";
  timestamp: Date;
  showFeedback?: boolean;
  helpful?: boolean | null;
};

interface ChatMessageProps {
  message: MessageType;
  onFeedback: (messageId: string, helpful: boolean) => void;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, onFeedback }) => {
  return (
    <div className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
      <div className={`flex gap-3 max-w-[85%] ${message.type === "user" ? "flex-row-reverse" : ""}`}>
        <Avatar className={`h-8 w-8 ${message.type === "ai" ? "bg-purple-100 text-purple-600" : "bg-blue-100 text-blue-600"}`}>
          {message.type === "ai" ? "AI" : "U"}
        </Avatar>
        
        <div className={`rounded-2xl px-4 py-3 ${message.type === "user" 
          ? "bg-blue-600 text-white" 
          : "bg-gray-100 text-gray-800"}`}>
          {message.type === "ai" ? (
            <StructuredAnswer answer={message.content} />
          ) : (
            <p className="whitespace-pre-wrap">{message.content}</p>
          )}
          
          {message.showFeedback && (
            <div className="mt-4 pt-3 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-2">Did you find this helpful?</p>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-1"
                  onClick={() => onFeedback(message.id, true)}
                >
                  <ThumbsUp className="h-4 w-4" />
                  <span>Yes</span>
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex items-center gap-1"
                  onClick={() => onFeedback(message.id, false)}
                >
                  <ThumbsDown className="h-4 w-4" />
                  <span>No</span>
                </Button>
              </div>
            </div>
          )}
          
          {message.helpful !== null && message.helpful !== undefined && !message.showFeedback && (
            <div className="mt-4 pt-3 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                {message.helpful 
                  ? "Thanks for your feedback! We're glad this was helpful."
                  : "Thanks for your feedback. We'll work on improving our responses."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
