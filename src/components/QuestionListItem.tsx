
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TableRow, TableCell } from "@/components/ui/table";
import { Question } from "@/services/questionService";

interface QuestionListItemProps {
  question: Question;
}

const QuestionListItem = ({ question }: QuestionListItemProps) => {
  const navigate = useNavigate();
  
  const handleSelectQuestion = () => {
    navigate(`/question/${question.id}`);
  };
  
  return (
    <TableRow>
      <TableCell className="font-medium">{question.question}</TableCell>
      <TableCell>
        <span className={`px-2 py-1 text-xs rounded-full ${
          question.status === "reviewed" 
            ? "bg-green-100 text-green-800" 
            : question.status === "answered" 
            ? "bg-blue-100 text-blue-800"
            : "bg-yellow-100 text-yellow-800"
        }`}>
          {question.status.charAt(0).toUpperCase() + question.status.slice(1)}
        </span>
      </TableCell>
      <TableCell>
        {new Date(question.timestamp).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        })}
      </TableCell>
      <TableCell>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={handleSelectQuestion}
          className="hover:bg-purple-50"
        >
          <ArrowRight className="h-4 w-4 text-purple-600" />
          <span className="sr-only">View question</span>
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default QuestionListItem;
