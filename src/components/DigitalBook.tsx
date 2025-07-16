import { useState, useCallback, memo } from "react";
import { BookCover } from "./BookCover";
import { BookPage } from "./BookPage";
import { TableOfContents } from "./TableOfContents";
import { SearchNames } from "./SearchNames";
import { chapters } from "@/data/bookData";
import { useKeyboard } from "@/hooks/useKeyboard";

export const DigitalBook = () => {
  const [isReading, setIsReading] = useState(false);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  const handleStartReading = useCallback(() => {
    setIsReading(true);
    setCurrentPageIndex(0);
  }, []);

  const handleNext = useCallback(() => {
    if (currentPageIndex < chapters.length - 1) {
      setCurrentPageIndex(prev => prev + 1);
    }
  }, [currentPageIndex]);

  const handlePrevious = useCallback(() => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(prev => prev - 1);
    } else if (currentPageIndex === 0 && isReading) {
      setIsReading(false);
    }
  }, [currentPageIndex, isReading]);

  const handleGoToPage = useCallback((pageIndex: number) => {
    if (pageIndex === -1) {
      // Go to cover page
      setIsReading(false);
    } else {
      // Go to a chapter page
      setIsReading(true);
      setCurrentPageIndex(pageIndex);
    }
  }, []);

  useKeyboard({
    ArrowLeft: handlePrevious,
    ArrowRight: handleNext,
    Space: isReading ? handleNext : handleStartReading,
    Enter: isReading ? handleNext : handleStartReading,
    Escape: () => setIsReading(false)
  });

  if (!isReading) {
    return (
      <div className="w-full h-screen bg-background">
        <TableOfContents 
          currentPageIndex={-1}
          onGoToPage={handleGoToPage}
        />
        <BookCover onStartReading={handleStartReading} />
      </div>
    );
  }

  const currentChapter = chapters[currentPageIndex];

  return (
    <div className="w-full h-screen bg-background">
      <TableOfContents 
        currentPageIndex={currentPageIndex}
        onGoToPage={handleGoToPage}
      />
      <SearchNames onGoToPage={handleGoToPage} />
      
      <div 
        key={currentPageIndex}
        className="animate-page-turn"
      >
        <BookPage
          chapter={currentChapter}
          pageIndex={currentPageIndex}
          totalPages={chapters.length}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />
      </div>
    </div>
  );
};