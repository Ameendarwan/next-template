import { RootState } from "@/store";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./Pagination";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

// Helper function to convert numbers to Eastern Arabic numerals
const toArabicDigits = (num: number, lang: string) => {
  if (lang !== "ar") return num.toString();
  const arabicDigits = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
  return num
    .toString()
    .split("")
    .map((digit) => (/\d/.test(digit) ? arabicDigits[Number(digit)] : digit))
    .join("");
};

export function DynamicPagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const { t } = useTranslation();
  const currLanguage = useSelector((state: RootState) => state.user.lang);

  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pageNumbers: (number | "ellipsis")[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pageNumbers.push(1, 2, 3, 4, "ellipsis", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(
          1,
          "ellipsis",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pageNumbers.push(
          1,
          "ellipsis",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "ellipsis",
          totalPages
        );
      }
    }
    return pageNumbers;
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const pageNumbers = getPageNumbers();

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            icon={
              currLanguage === "en" ? (
                <ChevronLeft className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )
            }
            label={t("users.pages.budgets.previous")}
            className="cursor-pointer md:flex items-center [&>span]:hidden md:[&>span]:inline"
            onClick={() => handlePageChange(currentPage - 1)}
          />
        </PaginationItem>

        {pageNumbers.map((page, index) => (
          <PaginationItem key={index}>
            {page === "ellipsis" ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                className="cursor-pointer"
                isActive={page === currentPage}
                onClick={() => handlePageChange(page)}
              >
                {toArabicDigits(page, currLanguage)}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            icon={
              currLanguage === "en" ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )
            }
            label={t("users.pages.budgets.next")}
            className="cursor-pointer md:flex items-center [&>span]:hidden md:[&>span]:inline"
            onClick={() => handlePageChange(currentPage + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
