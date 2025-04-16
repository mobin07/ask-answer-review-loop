
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  BookOpen, 
  ArrowLeft,
  List,
  ThumbsUp,
  ThumbsDown
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import StructuredAnswer from "@/components/StructuredAnswer";

interface Question {
  id: string;
  question: string;
  answer: string;
  timestamp: string;
  status: "answered" | "pending" | "reviewed";
  feedback?: {
    rating: "helpful" | "not-helpful" | null;
    comment: string;
  };
}

// Mock data - in a real app, this would come from an API
const questionsData: Question[] = [
  {
    id: "1",
    question: "How do I set up the Converse Desk in Salesforce?",
    answer: `### Response Structure for Setting Up Converse Desk\n\n1. **Introduction**\n   - Setting up the Converse Desk involves configuring necessary settings in your Salesforce organization to ensure smooth functionality of SMS Magic.\n\n2. **Issue Analysis**\n   - **Function and Component**: The Converse Desk function relies mainly on configurations within Converse settings, sender ID assignments, and user permissions in Salesforce to manage incoming and outgoing messages. \n\n3. **Troubleshooting Steps**\n   - **Access Converse Settings**: \n     - Log in to your Salesforce account and navigate to SMS Magic Converse Home.\n     - Access the 'Converse Settings' section to configure the desk.\n   \n   - **Configuration of Notifications**:\n     - **Sound Notification**: Go to Conversations under General Settings of Converse Desk. Enable the 'Play sound for incoming message' to receive sound notifications.\n     - **Email Notification**: Ensure that email notifications for inbound messages in the Sender ID & Assignment section are turned on.\n   \n   - **Set Up Sender ID**:\n     - Go to the Sender ID & Assignment section within Converse Settings and use "Add Sender ID" to set up the required Sender IDs.\n\n   - **User Management**:\n     - Navigate to the User Management section within Converse Settings to add users and assign the necessary licenses.\n\n4. **Root Cause Analysis**\n   - Common issues arise due to improper assignment of sender IDs, incorrect notification settings, or insufficient user permissions.\n\n5. **Escalation and Handling**\n   - If you encounter persistent issues after these configurations, consider reaching out to SMS Magic support by emailing care@screen-magic.com for further assistance.`,
    timestamp: "2025-04-15T14:30:00Z",
    status: "answered",
    feedback: {
      rating: null,
      comment: ""
    }
  },
  {
    id: "2",
    question: "How to troubleshoot integration issues with external systems?",
    answer: `### Response Structure for Troubleshooting Integration Issues\n\n1. **Introduction**\n   - Integration issues with external systems can stem from various sources including authentication problems, data format mismatches, or network connectivity issues.\n\n2. **Issue Analysis**\n   - **Common Integration Points**: API endpoints, authentication tokens, data mapping configurations, and network settings are the most common areas where issues occur.\n\n3. **Troubleshooting Steps**\n   - **Verify Credentials**: \n     - Check that all API keys, usernames, passwords, and tokens are valid and not expired.\n     - Ensure that the integration user has appropriate permissions in both systems.\n   \n   - **Examine Logs**:\n     - Review system logs for error messages related to the integration.\n     - Check API call logs to see request/response details and identify failure points.\n   \n   - **Test Connectivity**:\n     - Use a tool like Postman to test API endpoints directly.\n     - Verify that firewalls and network settings allow communication between systems.\n\n   - **Data Validation**:\n     - Confirm that the data being sent matches the expected format and schema.\n     - Look for special characters or encoding issues that might be causing problems.\n\n4. **Root Cause Analysis**\n   - Integration problems typically stem from configuration mismatches, timeout issues, or changes in either system that weren't properly synchronized.\n\n5. **Escalation and Handling**\n   - If standard troubleshooting doesn't resolve the issue, engage vendor support for both systems and provide them with detailed logs and steps to reproduce the problem.`,
    timestamp: "2025-04-14T10:15:00Z",
    status: "reviewed",
    feedback: {
      rating: null,
      comment: ""
    }
  },
  {
    id: "3",
    question: "What are best practices for managing user permissions?",
    answer: `### Response Structure for Managing User Permissions\n\n1. **Introduction**\n   - Effective user permission management is crucial for maintaining system security while ensuring users can perform their required tasks efficiently.\n\n2. **Issue Analysis**\n   - **Permission Models**: Role-based access control (RBAC) vs. attribute-based access control (ABAC) approaches each have different strengths for different organizational needs.\n\n3. **Troubleshooting Steps**\n   - **Implement Least Privilege Principle**: \n     - Assign users only the permissions they need to perform their job functions.\n     - Regularly audit and remove unnecessary permissions.\n   \n   - **Use Role-Based Groups**:\n     - Create logical role groups instead of assigning permissions individually.\n     - Align roles with job functions rather than with specific individuals.\n   \n   - **Implement Approval Workflows**:\n     - Create documented processes for requesting and approving permission changes.\n     - Maintain an audit trail of who approved what changes and when.\n\n   - **Regular Auditing**:\n     - Schedule quarterly reviews of user permissions.\n     - Automate detection of unused permissions or dormant accounts.\n\n4. **Root Cause Analysis**\n   - Permission issues often arise from lack of proper offboarding processes, role changes without permission updates, or ad-hoc permission grants without documentation.\n\n5. **Escalation and Handling**\n   - For complex permission issues, involve both security and department managers to balance security needs with operational requirements.`,
    timestamp: "2025-04-13T16:45:00Z",
    status: "answered",
    feedback: {
      rating: null,
      comment: ""
    }
  }
];

const SingleQuestionPage = () => {
  const { questionId } = useParams();
  const [question, setQuestion] = useState<Question | null>(null);
  const [feedbackComment, setFeedbackComment] = useState("");
  const { toast } = useToast();

  // In a real app, this would fetch data from an API
  useEffect(() => {
    // Find the question from our mock data
    const foundQuestion = questionsData.find(q => q.id === questionId);
    setQuestion(foundQuestion || null);
    
    if (foundQuestion?.feedback?.comment) {
      setFeedbackComment(foundQuestion.feedback.comment);
    }
  }, [questionId]);

  const handleFeedbackRating = (rating: "helpful" | "not-helpful") => {
    if (!question) return;
    
    // In a real application, you would send this to an API
    const updatedQuestion = {
      ...question,
      feedback: {
        ...question.feedback,
        rating
      }
    };
    
    setQuestion(updatedQuestion);
    toast({
      title: "Feedback submitted",
      description: "Thank you for your feedback!",
      duration: 3000
    });
  };
  
  const handleFeedbackComment = () => {
    if (!question) return;
    
    // In a real application, you would send this to an API
    const updatedQuestion = {
      ...question,
      feedback: {
        ...question.feedback,
        comment: feedbackComment
      }
    };
    
    setQuestion(updatedQuestion);
    toast({
      title: "Comment submitted",
      description: "Thank you for your additional feedback!",
      duration: 3000
    });
  };

  if (!question) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-8 px-4 sm:px-6 flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Question not found</h2>
          <p className="mb-6">The question you're looking for doesn't exist or has been removed.</p>
          <Button asChild className="bg-purple-600 hover:bg-purple-700">
            <Link to="/questions">
              <List className="mr-2 h-5 w-5" />
              Back to Questions
            </Link>
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <Button 
            variant="outline" 
            asChild 
            className="mr-4"
          >
            <Link to="/questions">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Questions
            </Link>
          </Button>
          <h1 className="text-3xl font-bold text-gray-800">Question Details</h1>
        </div>
        
        <Card className="p-6 shadow-lg border-purple-100 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <BookOpen className="h-6 w-6 text-purple-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-800">Question</h2>
            </div>
            <div className="text-sm text-gray-500">
              {new Date(question.timestamp).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <p className="text-gray-700">{question.question}</p>
          </div>
          
          <h3 className="font-medium text-lg text-gray-800 mb-3">Answer:</h3>
          <StructuredAnswer answer={question.answer} />
          
          <div className="mt-6 flex justify-between items-center">
            <div className="flex items-center">
              <span className={`px-3 py-1 text-sm rounded-full ${
                question.status === "reviewed" 
                  ? "bg-green-100 text-green-800" 
                  : question.status === "answered" 
                  ? "bg-blue-100 text-blue-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}>
                {question.status.charAt(0).toUpperCase() + question.status.slice(1)}
              </span>
            </div>
            <Button asChild className="bg-purple-600 hover:bg-purple-700">
              <Link to="/qna">
                Ask New Question
              </Link>
            </Button>
          </div>
        </Card>
        
        {/* Feedback Section */}
        <Card className="p-6 shadow-lg border-purple-100">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Was this answer helpful?</h3>
          
          <div className="flex items-center mb-6">
            <Button 
              variant={question.feedback?.rating === "helpful" ? "default" : "outline"} 
              className={`mr-3 ${question.feedback?.rating === "helpful" ? "bg-green-600 hover:bg-green-700" : "hover:bg-green-50"}`}
              onClick={() => handleFeedbackRating("helpful")}
            >
              <ThumbsUp className={`mr-2 h-5 w-5 ${question.feedback?.rating === "helpful" ? "text-white" : "text-green-600"}`} />
              Helpful
            </Button>
            
            <Button 
              variant={question.feedback?.rating === "not-helpful" ? "default" : "outline"} 
              className={`${question.feedback?.rating === "not-helpful" ? "bg-red-600 hover:bg-red-700" : "hover:bg-red-50"}`}
              onClick={() => handleFeedbackRating("not-helpful")}
            >
              <ThumbsDown className={`mr-2 h-5 w-5 ${question.feedback?.rating === "not-helpful" ? "text-white" : "text-red-600"}`} />
              Not Helpful
            </Button>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium text-gray-800">Additional feedback</h4>
            <Textarea 
              placeholder="How can we improve this answer? (optional)"
              value={feedbackComment}
              onChange={(e) => setFeedbackComment(e.target.value)}
              rows={4}
              className="w-full"
            />
            
            <Button 
              onClick={handleFeedbackComment}
              className="mt-2 bg-purple-600 hover:bg-purple-700"
              disabled={!feedbackComment.trim()}
            >
              Submit feedback
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SingleQuestionPage;
