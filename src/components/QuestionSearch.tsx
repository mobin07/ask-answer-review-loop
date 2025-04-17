
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useQuestionStore } from "@/services/questionService";

interface QuestionSearchProps {
  placeholder?: string;
  className?: string;
}

const QuestionSearch = ({ placeholder = "Search questions...", className = "mb-6" }: QuestionSearchProps) => {
  const { searchTerm, setSearchTerm } = useQuestionStore();
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  return (
    <div className={`relative ${className}`}>
      <Input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleSearch}
        className="pl-10 pr-4"
      />
      <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
    </div>
  );
};

export default QuestionSearch;
