
// This service will handle question-related operations
import { create } from 'zustand';

export interface Question {
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
const initialQuestions: Question[] = [
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
];

interface QuestionStore {
  questions: Question[];
  filteredQuestions: Question[];
  searchTerm: string;
  currentPage: number;
  questionsPerPage: number;
  setSearchTerm: (term: string) => void;
  setCurrentPage: (page: number) => void;
  getQuestion: (id: string) => Question | undefined;
  generateAnswer: (question: string) => Promise<Question>;
}

export const useQuestionStore = create<QuestionStore>((set, get) => ({
  questions: initialQuestions,
  filteredQuestions: initialQuestions,
  searchTerm: "",
  currentPage: 1,
  questionsPerPage: 5,
  
  setSearchTerm: (term: string) => {
    const { questions } = get();
    const filtered = term 
      ? questions.filter(q => q.question.toLowerCase().includes(term.toLowerCase()))
      : questions;
    
    set({ 
      searchTerm: term, 
      filteredQuestions: filtered,
      currentPage: 1 // Reset to first page on search
    });
  },
  
  setCurrentPage: (page: number) => {
    set({ currentPage: page });
  },
  
  getQuestion: (id: string) => {
    return get().questions.find(q => q.id === id);
  },
  
  generateAnswer: async (question: string) => {
    // In a real application, this would make an API call to an AI service
    // For now, we'll simulate a response
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newQuestion: Question = {
      id: (get().questions.length + 1).toString(),
      question,
      answer: `### Response Structure for ${question}\n\n1. **Introduction**\n   - This is an auto-generated response to your question.\n\n2. **Issue Analysis**\n   - **Function and Component**: In a real system, this would analyze your specific question.\n\n3. **Troubleshooting Steps**\n   - **Step 1**: This is where custom troubleshooting steps would be provided.\n   - **Step 2**: Additional steps would be shown here based on your specific question.\n\n4. **Root Cause Analysis**\n   - In a production environment, this would provide insights into the possible root causes.\n\n5. **Escalation and Handling**\n   - Recommendations for further action would be provided here.`,
      timestamp: new Date().toISOString(),
      status: "answered"
    };
    
    // Add the new question to our store
    const updatedQuestions = [...get().questions, newQuestion];
    set({ questions: updatedQuestions, filteredQuestions: updatedQuestions });
    
    return newQuestion;
  }
}));

// Utility functions for pagination
export const getPaginationData = () => {
  const { filteredQuestions, currentPage, questionsPerPage } = useQuestionStore.getState();
  
  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = filteredQuestions.slice(indexOfFirstQuestion, indexOfLastQuestion);
  const totalPages = Math.ceil(filteredQuestions.length / questionsPerPage);
  
  return {
    currentQuestions,
    totalPages,
    currentPage,
    questionsPerPage
  };
};
