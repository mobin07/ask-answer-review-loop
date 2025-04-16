
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MessageSquare, List } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">Q&A Review System</h1>
        <p className="text-xl text-gray-600 mb-8">Ask questions and help us improve by reviewing answers</p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="bg-purple-600 hover:bg-purple-700">
            <Link to="/qna" className="flex items-center">
              <MessageSquare className="mr-2 h-5 w-5" />
              Ask a Question
            </Link>
          </Button>
          
          <Button asChild variant="outline" className="border-purple-300">
            <Link to="/questions" className="flex items-center">
              <List className="mr-2 h-5 w-5" />
              Browse Questions
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
