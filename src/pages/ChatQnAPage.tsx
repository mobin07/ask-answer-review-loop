
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { List, Send, ThumbsDown, ThumbsUp } from "lucide-react";
import { useQuestionStore } from "@/services/questionService";
import { Avatar } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { MessageSquare, Loader2 } from "lucide-react";
import StructuredAnswer from "@/components/StructuredAnswer";
import BlockForm from "@/components/BlockForm";

type MessageType = {
  id: string;
  content: string;
  type: "user" | "ai";
  timestamp: Date;
  showFeedback?: boolean;
  helpful?: boolean | null;
};

type TabType = "BLOCK NO" | "TAB2";

const ChatQnAPage = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("BLOCK NO");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { generateAnswer } = useQuestionStore();

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
      {/* Header */}
      <header className="border-b bg-white p-4 sticky top-0 z-10 flex justify-between items-center">
        <div className="flex items-center">
          <img 
            src="/lovable-uploads/d457f1ba-851e-4735-8930-7d1068c085f3.png" 
            alt="SMS Magic" 
            className="h-10 mr-4" 
          />
          <h1 className="text-xl font-semibold text-gray-800">Support Chat</h1>
        </div>
        <div className="flex items-center">
          <span className="text-sm text-gray-600 mr-4">mohammad.m@screen-magic.com</span>
          <Button asChild variant="outline" size="sm">
            <Link to="/questions" className="flex items-center">
              <List className="mr-2 h-4 w-4" />
              Browse Questions
            </Link>
          </Button>
        </div>
      </header>

      {/* Navigation tabs */}
      <div className="bg-white border-b">
        <div className="max-w-screen-xl mx-auto flex">
          <div 
            className={`px-6 py-3 cursor-pointer ${activeTab === "INCOMING" ? "border-b-2 border-blue-500" : "text-gray-500"}`}
            onClick={() => setActiveTab("BLOCK NO")}
          >
            INCOMING
          </div>
          <div 
            className={`px-6 py-3 cursor-pointer ${activeTab === "OUTGOING" ? "border-b-2 border-blue-500" : "text-gray-500"}`}
          >
            OUTGOING
          </div>
          <div 
            className={`px-6 py-3 cursor-pointer ${activeTab === "HEALTH CHECK" ? "border-b-2 border-blue-500" : "text-gray-500"}`}
          >
            HEALTH CHECK
          </div>
          <div 
            className={`px-6 py-3 cursor-pointer ${activeTab === "TROUBLESHOOT" ? "border-b-2 border-blue-500" : "text-gray-500"}`}
          >
            TROUBLESHOOT
          </div>
          <div 
            className={`px-6 py-3 cursor-pointer border-b-2 border-blue-500 text-blue-500 font-medium`}
          >
            CUSTOMER CASES
          </div>
        </div>
      </div>

      {/* Sub tabs */}
      <div className="bg-white border-b">
        <div className="max-w-screen-xl mx-auto flex">
          <div 
            className={`px-6 py-3 cursor-pointer border-b-2 ${activeTab === "BLOCK NO" ? "border-pink-500 text-pink-500 font-medium" : "border-transparent"}`}
            onClick={() => setActiveTab("BLOCK NO")}
          >
            BLOCK NO
          </div>
          <div 
            className={`px-6 py-3 cursor-pointer border-b-2 ${activeTab === "TAB2" ? "border-pink-500 text-pink-500 font-medium" : "border-transparent"}`}
            onClick={() => setActiveTab("TAB2")}
          >
            TAB2
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-4 md:p-6 max-w-4xl mx-auto w-full">
        {activeTab === "BLOCK NO" ? (
          <BlockForm />
        ) : (
          <ScrollArea className="h-[calc(100vh-280px)] w-full pr-4">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-6">
                <div className="bg-purple-100 p-4 rounded-full mb-4">
                  <MessageSquare className="h-8 w-8 text-purple-600" />
                </div>
                <h2 className="text-xl font-semibold mb-2">Ask me anything!</h2>
                <p className="text-gray-500 max-w-md">
                  Type your question below and I'll do my best to help you find the answers you need.
                </p>
              </div>
            ) : (
              <div className="space-y-6 pb-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
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
                                onClick={() => handleFeedback(message.id, true)}
                              >
                                <ThumbsUp className="h-4 w-4" />
                                <span>Yes</span>
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="flex items-center gap-1"
                                onClick={() => handleFeedback(message.id, false)}
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
                ))}
                <div ref={messagesEndRef} />
              </div>
            )}
          </ScrollArea>
        )}
      </div>

      {/* Input area - only shown for chat tab */}
      {activeTab !== "BLOCK NO" && (
        <div className="border-t bg-white p-4 sticky bottom-0">
          <div className="max-w-4xl mx-auto flex items-end gap-2">
            <Card className="flex-1 flex items-center p-2 border rounded-full">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything..."
                className="flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              <Button 
                type="submit" 
                size="icon" 
                variant="ghost"
                disabled={isLoading || !inputValue.trim()}
                onClick={handleSendMessage} 
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
      )}
    </div>
  );
};

export default ChatQnAPage;
