
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useQuestionStore } from "@/services/questionService";

interface QuestionPaginationProps {
  totalPages: number;
}

const QuestionPagination = ({ totalPages }: QuestionPaginationProps) => {
  const { currentPage, setCurrentPage } = useQuestionStore();
  
  if (totalPages <= 1) {
    return null;
  }
  
  return (
    <Pagination className="mt-6">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious 
            onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
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
            onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
            className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default QuestionPagination;
