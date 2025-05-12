
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { List } from "lucide-react";

const ChatHeader: React.FC = () => {
  return (
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
  );
};

export default ChatHeader;
