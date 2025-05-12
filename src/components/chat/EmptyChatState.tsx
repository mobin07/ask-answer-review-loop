
import React from "react";
import { MessageSquare } from "lucide-react";

const EmptyChatState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-6">
      <div className="bg-purple-100 p-4 rounded-full mb-4">
        <MessageSquare className="h-8 w-8 text-purple-600" />
      </div>
      <h2 className="text-xl font-semibold mb-2">Ask me anything!</h2>
      <p className="text-gray-500 max-w-md">
        Type your question below and I'll do my best to help you find the answers you need.
      </p>
    </div>
  );
};

export default EmptyChatState;
