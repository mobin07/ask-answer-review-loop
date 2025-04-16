
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useQuestionStore } from "@/services/questionService";

const QuestionSearch = () => {
  const { searchTerm, setSearchTerm } = useQuestionStore();
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  return (
    <div className="mb-6 relative">
      <Input
        type="text"
        placeholder="Search questions..."
        value={searchTerm}
        onChange={handleSearch}
        className="pl-10 pr-4"
      />
      <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
    </div>
  );
};

export default QuestionSearch;
