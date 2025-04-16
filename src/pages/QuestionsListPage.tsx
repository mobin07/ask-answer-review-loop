
import { useNavigate } from "react-router-dom";
import { 
  PlusCircle,
  BookOpen
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useQuestionStore, getPaginationData } from "@/services/questionService";
import QuestionSearch from "@/components/QuestionSearch";
import QuestionListItem from "@/components/QuestionListItem";
import QuestionPagination from "@/components/QuestionPagination";

const QuestionsListPage = () => {
  const navigate = useNavigate();
  const { filteredQuestions } = useQuestionStore();
  const { currentQuestions, totalPages } = getPaginationData();
  
  // Navigate to ask a new question
  const handleAskQuestion = () => {
    navigate('/qna');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-8 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <BookOpen className="h-7 w-7 text-purple-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-800">Questions Library</h1>
          </div>
          <Button 
            onClick={handleAskQuestion} 
            className="bg-purple-600 hover:bg-purple-700"
          >
            <PlusCircle className="mr-2 h-5 w-5" />
            Ask New Question
          </Button>
        </div>
        
        <Card className="p-6 shadow-lg">
          <QuestionSearch />
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Question</TableHead>
                  <TableHead className="w-[150px]">Status</TableHead>
                  <TableHead className="w-[180px]">Date</TableHead>
                  <TableHead className="w-[100px]">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentQuestions.map((question) => (
                  <QuestionListItem key={question.id} question={question} />
                ))}
                
                {currentQuestions.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-6 text-gray-500">
                      No questions found matching your search.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          {/* Pagination Controls */}
          <QuestionPagination totalPages={totalPages} />
        </Card>
      </div>
    </div>
  );
};

export default QuestionsListPage;
