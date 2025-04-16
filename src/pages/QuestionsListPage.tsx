
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Search,
  PlusCircle,
  BookOpen,
  ChevronRight
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import StructuredAnswer from "@/components/StructuredAnswer";

interface Question {
  id: string;
  question: string;
  answer: string;
  timestamp: string;
  status: "answered" | "pending" | "reviewed";
}

const QuestionsListPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: "1",
      question: "How do I set up the Converse Desk in Salesforce?",
      answer: `### Response Structure for Setting Up Converse Desk\n\n1. **Introduction**\n   - Setting up the Converse Desk involves configuring necessary settings in your Salesforce organization to ensure smooth functionality of SMS Magic.\n\n2. **Issue Analysis**\n   - **Function and Component**: The Converse Desk function relies mainly on configurations within Converse settings, sender ID assignments, and user permissions in Salesforce to manage incoming and outgoing messages. \n\n3. **Troubleshooting Steps**\n   - **Access Converse Settings**: \n     - Log in to your Salesforce account and navigate to SMS Magic Converse Home.\n     - Access the 'Converse Settings' section to configure the desk.\n   \n   - **Configuration of Notifications**:\n     - **Sound Notification**: Go to Conversations under General Settings of Converse Desk. Enable the 'Play sound for incoming message' to receive sound notifications.\n     - **Email Notification**: Ensure that email notifications for inbound messages in the Sender ID & Assignment section are turned on.\n   \n   - **Set Up Sender ID**:\n     - Go to the Sender ID & Assignment section within Converse Settings and use "Add Sender ID" to set up the required Sender IDs.\n\n   - **User Management**:\n     - Navigate to the User Management section within Converse Settings to add users and assign the necessary licenses.\n\n4. **Root Cause Analysis**\n   - Common issues arise due to improper assignment of sender IDs, incorrect notification settings, or insufficient user permissions.\n\n5. **Escalation and Handling**\n   - If you encounter persistent issues after these configurations, consider reaching out to SMS Magic support by emailing care@screen-magic.com for further assistance.`,
      timestamp: "2025-04-15T14:30:00Z",
      status: "answered"
    },
    {
      id: "2",
      question: "How to troubleshoot integration issues with external systems?",
      answer: `### Response Structure for Troubleshooting Integration Issues\n\n1. **Introduction**\n   - Integration issues with external systems can stem from various sources including authentication problems, data format mismatches, or network connectivity issues.\n\n2. **Issue Analysis**\n   - **Common Integration Points**: API endpoints, authentication tokens, data mapping configurations, and network settings are the most common areas where issues occur.\n\n3. **Troubleshooting Steps**\n   - **Verify Credentials**: \n     - Check that all API keys, usernames, passwords, and tokens are valid and not expired.\n     - Ensure that the integration user has appropriate permissions in both systems.\n   \n   - **Examine Logs**:\n     - Review system logs for error messages related to the integration.\n     - Check API call logs to see request/response details and identify failure points.\n   \n   - **Test Connectivity**:\n     - Use a tool like Postman to test API endpoints directly.\n     - Verify that firewalls and network settings allow communication between systems.\n\n   - **Data Validation**:\n     - Confirm that the data being sent matches the expected format and schema.\n     - Look for special characters or encoding issues that might be causing problems.\n\n4. **Root Cause Analysis**\n   - Integration problems typically stem from configuration mismatches, timeout issues, or changes in either system that weren't properly synchronized.\n\n5. **Escalation and Handling**\n   - If standard troubleshooting doesn't resolve the issue, engage vendor support for both systems and provide them with detailed logs and steps to reproduce the problem.`,
      timestamp: "2025-04-14T10:15:00Z",
      status: "reviewed"
    },
    {
      id: "3",
      question: "What are best practices for managing user permissions?",
      answer: `### Response Structure for Managing User Permissions\n\n1. **Introduction**\n   - Effective user permission management is crucial for maintaining system security while ensuring users can perform their required tasks efficiently.\n\n2. **Issue Analysis**\n   - **Permission Models**: Role-based access control (RBAC) vs. attribute-based access control (ABAC) approaches each have different strengths for different organizational needs.\n\n3. **Troubleshooting Steps**\n   - **Implement Least Privilege Principle**: \n     - Assign users only the permissions they need to perform their job functions.\n     - Regularly audit and remove unnecessary permissions.\n   \n   - **Use Role-Based Groups**:\n     - Create logical role groups instead of assigning permissions individually.\n     - Align roles with job functions rather than with specific individuals.\n   \n   - **Implement Approval Workflows**:\n     - Create documented processes for requesting and approving permission changes.\n     - Maintain an audit trail of who approved what changes and when.\n\n   - **Regular Auditing**:\n     - Schedule quarterly reviews of user permissions.\n     - Automate detection of unused permissions or dormant accounts.\n\n4. **Root Cause Analysis**\n   - Permission issues often arise from lack of proper offboarding processes, role changes without permission updates, or ad-hoc permission grants without documentation.\n\n5. **Escalation and Handling**\n   - For complex permission issues, involve both security and department managers to balance security needs with operational requirements.`,
      timestamp: "2025-04-13T16:45:00Z",
      status: "answered"
    }
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [questionsPerPage] = useState(5);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  
  // Pagination logic
  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  
  // Filter questions based on search term
  const filteredQuestions = questions.filter(question =>
    question.question.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const currentQuestions = filteredQuestions.slice(indexOfFirstQuestion, indexOfLastQuestion);
  const totalPages = Math.ceil(filteredQuestions.length / questionsPerPage);

  // Handle search functionality
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };
  
  // Select a question to view
  const handleSelectQuestion = (question: Question) => {
    setSelectedQuestion(question);
  };
  
  // Navigate to ask a new question
  const handleAskQuestion = () => {
    navigate('/qna');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Questions Library</h1>
          <Button 
            onClick={handleAskQuestion} 
            className="bg-purple-600 hover:bg-purple-700"
          >
            <PlusCircle className="mr-2 h-5 w-5" />
            Ask New Question
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Questions List Section */}
          <div className="md:col-span-1">
            <Card className="p-4">
              <div className="mb-4 relative">
                <Input
                  type="text"
                  placeholder="Search questions..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="pl-10 pr-4"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              
              <div className="overflow-y-auto max-h-[calc(100vh-300px)]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Questions</TableHead>
                      <TableHead className="w-[100px]">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentQuestions.map((question) => (
                      <TableRow 
                        key={question.id}
                        className={selectedQuestion?.id === question.id ? "bg-purple-50" : ""}
                      >
                        <TableCell className="font-medium">{question.question}</TableCell>
                        <TableCell>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleSelectQuestion(question)}
                          >
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    
                    {currentQuestions.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={2} className="text-center py-6 text-gray-500">
                          No questions found matching your search.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
              
              {/* Pagination Controls */}
              {totalPages > 1 && (
                <Pagination className="mt-4">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                    
                    {Array.from({ length: Math.min(totalPages, 5) }).map((_, index) => {
                      const page = currentPage > 3 && totalPages > 5 
                        ? currentPage - 3 + index 
                        : index + 1;
                        
                      if (page > totalPages) return null;
                      
                      return (
                        <PaginationItem key={page}>
                          <PaginationLink 
                            isActive={currentPage === page}
                            onClick={() => setCurrentPage(page)}
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    })}
                    
                    {totalPages > 5 && currentPage < totalPages - 2 && (
                      <>
                        <PaginationItem>
                          <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink onClick={() => setCurrentPage(totalPages)}>
                            {totalPages}
                          </PaginationLink>
                        </PaginationItem>
                      </>
                    )}
                    
                    <PaginationItem>
                      <PaginationNext 
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </Card>
          </div>
          
          {/* Question Display Section */}
          <div className="md:col-span-2">
            {selectedQuestion ? (
              <Card className="p-6 shadow-lg border-purple-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <BookOpen className="h-6 w-6 text-purple-600 mr-3" />
                    <h2 className="text-xl font-semibold text-gray-800">Question Details</h2>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      onClick={handleAskQuestion} 
                      className="border-purple-300"
                    >
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Ask New Question
                    </Button>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <h3 className="font-medium text-lg text-gray-800 mb-1">Question:</h3>
                  <p className="text-gray-700">{selectedQuestion.question}</p>
                </div>
                
                <h3 className="font-medium text-lg text-gray-800 mb-3">Answer:</h3>
                <StructuredAnswer answer={selectedQuestion.answer} />
              </Card>
            ) : (
              <Card className="p-6 shadow-lg border-purple-100 flex flex-col items-center justify-center h-full min-h-[400px]">
                <BookOpen className="h-12 w-12 text-gray-300 mb-4" />
                <h3 className="text-xl font-medium text-gray-600">Select a question</h3>
                <p className="text-gray-500 mt-2 text-center max-w-md">
                  Choose a question from the list to view its details and answer
                </p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionsListPage;
