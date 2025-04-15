import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">Q&A Review System</h1>
        <p className="text-xl text-gray-600 mb-8">Ask questions and help us improve by reviewing answers</p>
        <Button asChild className="bg-purple-600 hover:bg-purple-700">
          <Link to="/qna">Go to Q&A Page</Link>
        </Button>
      </div>
    </div>
  );
};

export default Index;
