import { Response } from "@/data/bookData";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BookPageProps {
  chapter: {
    id: string;
    title: string;
    subtitle: string;
    content: Response[] | null;
  };
  pageIndex: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
}

const getContentForChapter = (chapter: any, response: Response) => {
  switch (chapter.id) {
    case 'preface':
      return response.impact;
    case 'impact':
      return response.impact;
    case 'memories':
      return response.unforgettableMemory;
    case 'personal':
      return response.whatToHear;
    case 'love':
      return response.loveAdmire;
    case 'growth':
      return response.growthArea;
    case 'future':
      return response.yearVision;
    case 'reflections':
      return response.reflections;
    default:
      return '';
  }
};

export const BookPage = ({ chapter, pageIndex, totalPages, onPrevious, onNext }: BookPageProps) => {
  if (chapter.id === 'final') {
    return (
      <div className="relative w-full h-screen flex">
        {/* Left Page */}
        <div className="w-1/2 h-full paper-texture border-r border-border/30 p-16 flex flex-col justify-center">
          <div className="max-w-md mx-auto text-center">
            <div className="chapter-number text-4xl mb-8">{chapter.title}</div>
            <h2 className="font-serif text-3xl text-foreground mb-12 italic">{chapter.subtitle}</h2>
            
            <div className="space-y-6 text-lg leading-relaxed">
              <p className="font-serif">My dearest Ryan,</p>
              
              <div className="story-quote">
                <p>This collection of thoughts represents just a fraction of the lives you've touched and the hearts you've changed. Each page holds the genuine affection and admiration of someone whose world is brighter because you're in it.</p>
              </div>
              
              <p>As you turn 30, know that your impact ripples far beyond what you can see. You've been a catalyst for growth, joy, and meaningful connection in so many lives.</p>
              
              <p>Here's to another year of your beautiful, chaotic, brilliant self making the world a better place.</p>
              
              <p className="font-serif italic pt-4">
                With all my love,<br />
                Sofia ❤️
              </p>
            </div>
          </div>
        </div>

        {/* Right Page */}
        <div className="w-1/2 h-full paper-texture p-16 flex flex-col justify-center items-center">
          <div className="text-center space-y-8">
            <div className="font-serif text-6xl font-light text-accent">30</div>
            <div className="font-serif text-2xl">Years of Wonder</div>
            <div className="font-serif text-lg text-muted-foreground italic">
              "The person most likely to change the world"
              <br />
              - All Saints Yearbook
            </div>
            
            <div className="w-32 h-0.5 bg-accent/50 mx-auto my-8"></div>
            
            <div className="font-serif text-lg">
              Happy Birthday, Ryan
            </div>
          </div>
        </div>

        {/* Navigation */}
        <Button
          onClick={onPrevious}
          variant="ghost"
          size="icon"
          className="absolute left-8 top-1/2 transform -translate-y-1/2 hover:bg-primary/10"
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen flex">
      {/* Left Page - Chapter Title */}
      <div className="w-1/2 h-full paper-texture border-r border-border/30 p-16 flex flex-col justify-center">
        <div className="max-w-md mx-auto text-center">
          <div className="chapter-number text-6xl mb-8 font-light">{chapter.title}</div>
          <h2 className="font-serif text-4xl text-foreground mb-12 leading-tight">{chapter.subtitle}</h2>
        </div>
      </div>

      {/* Right Page - Content */}
      <div className="w-1/2 h-full paper-texture p-16 overflow-y-auto">
        <div className="max-w-lg mx-auto space-y-12">
          {chapter.content?.map((response, idx) => {
            const content = getContentForChapter(chapter, response);
            if (!content || content.trim().length === 0) return null;
            
            return (
              <div key={`${response.name}-${idx}`} className="space-y-4">
                <h3 className="font-serif text-2xl font-semibold text-primary border-b border-border/50 pb-2">
                  {response.name}
                </h3>
                
                <div className="story-quote">
                  <p className="text-lg leading-relaxed whitespace-pre-line">
                    {content}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation */}
      <Button
        onClick={onPrevious}
        variant="ghost"
        size="icon"
        className="absolute left-8 top-1/2 transform -translate-y-1/2 hover:bg-primary/10"
        disabled={pageIndex === 0}
      >
        <ChevronLeft className="w-6 h-6" />
      </Button>

      <Button
        onClick={onNext}
        variant="ghost"
        size="icon"
        className="absolute right-8 top-1/2 transform -translate-y-1/2 hover:bg-primary/10"
        disabled={pageIndex === totalPages - 1}
      >
        <ChevronRight className="w-6 h-6" />
      </Button>

      {/* Page indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 font-serif text-sm text-muted-foreground">
        {pageIndex + 1} of {totalPages}
      </div>
    </div>
  );
};