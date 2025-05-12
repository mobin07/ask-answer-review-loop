
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import QnAPage from "./pages/QnAPage";
import QuestionsListPage from "./pages/QuestionsListPage";
import SingleQuestionPage from "./pages/SingleQuestionPage";
import ChatQnAPage from "./pages/ChatQnAPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ChatQnAPage />} />
          <Route path="/old-index" element={<Index />} />
          <Route path="/qna" element={<QnAPage />} />
          <Route path="/chat" element={<ChatQnAPage />} />
          <Route path="/questions" element={<QuestionsListPage />} />
          <Route path="/question/:questionId" element={<SingleQuestionPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
