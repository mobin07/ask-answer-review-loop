
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { MessageSquare, Send, ThumbsUp, ThumbsDown, Loader2 } from "lucide-react";

const QnAPage = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [rating, setRating] = useState("");
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleAskQuestion = async () => {
    if (!question.trim()) return;
    
    setIsLoading(true);
    setAnswer("");
    setShowReview(false);
    setSubmitted(false);
    
    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock response - this would be replaced with an actual API call
      const mockResponse = `This is a simulated answer to your question: "${question}". 
      In a real implementation, this would come from an actual API integration.`;
      
      setAnswer(mockResponse);
      setShowReview(true);
    } catch (error) {
      console.error("Error fetching answer:", error);
      setAnswer("Sorry, we couldn't process your question. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitReview = () => {
    // In a real implementation, this would send the review data to an API
    console.log("Review submitted:", { question, answer, rating, feedback });
    setSubmitted(true);
  };

  const handleReset = () => {
    setQuestion("");
    setAnswer("");
    setShowReview(false);
    setRating("");
    setFeedback("");
    setSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Ask & Review</h1>
          <p className="text-gray-600">Ask your question and help us improve by reviewing the answer</p>
        </div>
        
        <Card className="p-6 shadow-lg border-purple-100">
          <div className="flex items-start space-x-3">
            <MessageSquare className="h-5 w-5 text-purple-500 mt-2" />
            <div className="flex-1">
              <Label htmlFor="question" className="text-lg font-medium mb-2 block">Your Question</Label>
              <Textarea
                id="question"
                placeholder="Type your question here..."
                className="min-h-[100px] mb-4"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                disabled={isLoading}
              />
              <div className="flex justify-end">
                <Button 
                  onClick={handleAskQuestion} 
                  disabled={!question.trim() || isLoading}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Getting Answer
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Get Answer
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {answer && (
          <Card className="p-6 shadow-lg border-purple-100 mt-8">
            <h2 className="text-lg font-medium mb-2 flex items-center">
              <span className="bg-purple-100 text-purple-800 py-1 px-3 rounded-full text-sm mr-3">Answer</span>
              Response
            </h2>
            <div className="bg-white p-4 rounded-md border border-gray-100 min-h-[100px] whitespace-pre-line">
              {answer}
            </div>
          </Card>
        )}

        {showReview && !submitted && (
          <Card className="p-6 shadow-lg border-purple-100 mt-8">
            <h2 className="text-lg font-medium mb-4">Review this Answer</h2>
            
            <div className="mb-6">
              <Label htmlFor="rating" className="text-md font-medium mb-3 block">How would you rate this answer?</Label>
              <RadioGroup id="rating" value={rating} onValueChange={setRating} className="flex flex-col space-y-3">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="excellent" id="excellent" className="border-purple-500 text-purple-600" />
                  <Label htmlFor="excellent" className="cursor-pointer flex items-center">
                    <ThumbsUp className="h-4 w-4 mr-2 text-green-600" />
                    Excellent
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="good" id="good" className="border-purple-500 text-purple-600" />
                  <Label htmlFor="good" className="cursor-pointer">Good</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="average" id="average" className="border-purple-500 text-purple-600" />
                  <Label htmlFor="average" className="cursor-pointer">Average</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="poor" id="poor" className="border-purple-500 text-purple-600" />
                  <Label htmlFor="poor" className="cursor-pointer flex items-center">
                    <ThumbsDown className="h-4 w-4 mr-2 text-red-600" />
                    Poor
                  </Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="mb-6">
              <Label htmlFor="feedback" className="text-md font-medium mb-2 block">Additional Feedback (optional)</Label>
              <Textarea 
                id="feedback" 
                placeholder="Please share any additional feedback about the answer..." 
                className="min-h-[100px]"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />
            </div>
            
            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={handleReset}>
                Cancel
              </Button>
              <Button 
                onClick={handleSubmitReview} 
                disabled={!rating} 
                className="bg-purple-600 hover:bg-purple-700"
              >
                Submit Review
              </Button>
            </div>
          </Card>
        )}

        {submitted && (
          <Card className="p-6 shadow-lg border-green-100 bg-green-50 mt-8">
            <div className="text-center text-green-800">
              <ThumbsUp className="h-12 w-12 mx-auto mb-2 text-green-600" />
              <h2 className="text-xl font-medium mb-2">Thank You!</h2>
              <p>Your review has been submitted successfully.</p>
              <Button 
                variant="outline" 
                onClick={handleReset} 
                className="mt-4 border-green-300 hover:bg-green-100"
              >
                Ask Another Question
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default QnAPage;
