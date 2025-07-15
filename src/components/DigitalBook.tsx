import { useState } from "react";
import { BookCover } from "./BookCover";
import { BookPage } from "./BookPage";
import { chapters } from "@/data/bookData";
import { useKeyboard } from "@/hooks/useKeyboard";

export const DigitalBook = () => {
  const [isReading, setIsReading] = useState(false);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  const handleStartReading = () => {
    console.log("Start reading button clicked!");
    console.log("Current isReading state:", isReading);
    setIsReading(true);
    setCurrentPageIndex(0);
    console.log("State should now be updated to isReading: true");
  };

  const handleNext = () => {
    if (currentPageIndex < chapters.length - 1) {
      setCurrentPageIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(prev => prev - 1);
    } else if (currentPageIndex === 0 && isReading) {
      setIsReading(false);
    }
  };

  // Keyboard navigation
  useKeyboard({
    ArrowLeft: handlePrevious,
    ArrowRight: handleNext,
    Space: isReading ? handleNext : handleStartReading,
    Enter: isReading ? handleNext : handleStartReading,
    Escape: () => setIsReading(false)
  });

  if (!isReading) {
    return <BookCover onStartReading={handleStartReading} />;
  }

  const currentChapter = chapters[currentPageIndex];

  return (
    <div className="w-full h-screen overflow-hidden bg-background">
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