
import React, { useState } from "react";
import { useQuestionStore } from "@/services/questionService";
import ChatHeader from "@/components/chat/ChatHeader";
import ChatTabs, { TabType } from "@/components/chat/ChatTabs";
import ChatMessageList from "@/components/chat/ChatMessageList";
import ChatInput from "@/components/chat/ChatInput";
import { MessageType } from "@/components/chat/ChatMessage";
import BlockForm from "@/components/BlockForm";

const ChatQnAPage = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("BLOCK NO");
  const { generateAnswer } = useQuestionStore();

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const newUserMessage: MessageType = {
      id: Date.now().toString(),
      content: inputValue,
      type: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Generate response using our existing service
      const response = await generateAnswer(inputValue);
      
      const newAiMessage: MessageType = {
        id: `ai-${Date.now()}`,
        content: response.answer,
        type: "ai",
        timestamp: new Date(),
        showFeedback: true,
        helpful: null,
      };
      
      setMessages((prev) => [...prev, newAiMessage]);
    } catch (error) {
      console.error("Error generating response:", error);
      const errorMessage: MessageType = {
        id: `error-${Date.now()}`,
        content: "Sorry, I couldn't process your question. Please try again.",
        type: "ai",
        timestamp: new Date(),
        showFeedback: false,
      };
      
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFeedback = (messageId: string, helpful: boolean) => {
    setMessages(prev => 
      prev.map(message => 
        message.id === messageId 
          ? { ...message, helpful, showFeedback: false } 
          : message
      )
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <ChatHeader />
      <ChatTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main content */}
      <div className="flex-1 p-4 md:p-6 max-w-4xl mx-auto w-full">
        {activeTab === "BLOCK NO" ? (
          <BlockForm />
        ) : (
          <ChatMessageList 
            messages={messages} 
            onFeedback={handleFeedback} 
          />
        )}
      </div>

      {/* Input area - only shown for chat tab */}
      {activeTab !== "BLOCK NO" && (
        <ChatInput 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onSend={handleSendMessage}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default ChatQnAPage;
