
import React, { useRef, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChatMessage, { MessageType } from "./ChatMessage";
import EmptyChatState from "./EmptyChatState";

interface ChatMessageListProps {
  messages: MessageType[];
  onFeedback: (messageId: string, helpful: boolean) => void;
}

const ChatMessageList: React.FC<ChatMessageListProps> = ({ messages, onFeedback }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <ScrollArea className="h-[calc(100vh-280px)] w-full pr-4">
      {messages.length === 0 ? (
        <EmptyChatState />
      ) : (
        <div className="space-y-6 pb-4">
          {messages.map((message) => (
            <ChatMessage 
              key={message.id} 
              message={message} 
              onFeedback={onFeedback} 
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
      )}
    </ScrollArea>
  );
};

export default ChatMessageList;
