import { Response } from "@/data/bookData";
import { ChevronLeft, ChevronRight, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { memo, useMemo, useState, useEffect } from "react";

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

export const BookPage = memo(({ chapter, pageIndex, totalPages, onPrevious, onNext }: BookPageProps) => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Handle scroll to show/hide back to top button
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setShowBackToTop(scrollTop > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Pre-compute content to avoid rendering delays
  const leftPageContent = useMemo(() => {
    if (chapter.id === 'final') {
      return {
        title: chapter.title,
        subtitle: chapter.subtitle,
        content: chapter.content?.[0]?.impact || ''
      };
    }
    return {
      title: chapter.title,
      subtitle: chapter.subtitle
    };
  }, [chapter]);

  const rightPageContent = useMemo(() => {
    if (chapter.id === 'final') {
      return null; // Final page has special right side content
    }
    
    if (chapter.id === 'preface') {
      return chapter.content?.map((response, idx) => {
        const content = getContentForChapter(chapter, response);
        if (!content || content.trim().length === 0) return null;
        
        return {
          key: `${response.name}-${idx}`,
          content,
          name: response.name
        };
      }).filter(Boolean);
    }
    
    return chapter.content?.map((response, idx) => {
      const content = getContentForChapter(chapter, response);
      if (!content || content.trim().length === 0) return null;
      
      return {
        key: `${response.name}-${idx}`,
        name: response.name,
        content
      };
    }).filter(Boolean);
  }, [chapter]);

  if (chapter.id === 'final') {
    const finalContent = leftPageContent.content;
    
    return (
      <div className="relative w-full h-screen book-page-layout">
        {/* Left Page */}
        <div className="book-page-left paper-texture border-r border-border/30">
          <div className="p-16 md:p-16 p-8 min-h-full flex flex-col justify-center">
            <div className="max-w-lg mx-auto">
              <div className="text-center mb-12">
                <div className="chapter-number text-4xl md:text-4xl text-3xl mb-8 animate-title-fade-in">{leftPageContent.title}</div>
                <h2 className="font-serif text-xl md:text-xl text-lg text-foreground mb-12 font-medium animate-text-fade-in" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>{leftPageContent.subtitle}</h2>
              </div>
              
              <div className="story-quote text-left animate-content-stagger" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
                <p className="text-lg md:text-lg text-base leading-relaxed whitespace-pre-line">
                  {finalContent}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Page */}
        <div className="book-page-right paper-texture p-16 md:p-16 p-8 flex flex-col justify-center items-center">
          <div className="text-center space-y-8">
            <div className="font-serif text-6xl md:text-6xl text-5xl font-light text-accent animate-title-fade-in">30</div>
            <div className="font-serif text-2xl md:text-2xl text-xl animate-text-fade-in" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>Years of Wonder</div>
            
            <div className="w-32 h-0.5 bg-accent/50 mx-auto my-8 animate-text-fade-in" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}></div>
            
            <div className="font-serif text-lg md:text-lg text-base animate-text-fade-in" style={{ animationDelay: '0.6s', animationFillMode: 'both' }}>
              Happy Birthday, Ryan
            </div>
          </div>
        </div>

        {/* Navigation */}
        <Button
          onClick={onPrevious}
          variant="ghost"
          size="icon"
          className="absolute left-8 md:left-8 left-4 top-1/2 md:top-1/2 top-1/2 transform -translate-y-1/2 hover:bg-primary/10 mobile-nav-left"
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>

        {/* Back to Top Button - Mobile Only */}
        {showBackToTop && (
          <Button
            onClick={scrollToTop}
            variant="ghost"
            size="icon"
            className="fixed bottom-4 right-4 md:hidden bg-primary/10 hover:bg-primary/20 text-primary rounded-full shadow-lg z-50"
          >
            <ArrowUp className="w-5 h-5" />
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen book-page-layout">
      {/* Left Page - Chapter Title */}
      <div className="book-page-left paper-texture border-r border-border/30 p-16 md:p-16 p-8 flex flex-col justify-center">
        <div className="max-w-md mx-auto text-center">
          <div className="chapter-number text-6xl md:text-6xl text-4xl mb-8 font-light animate-title-fade-in">{leftPageContent.title}</div>
          <h2 className="font-serif text-4xl md:text-4xl text-2xl text-foreground mb-12 leading-tight animate-text-fade-in" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>{leftPageContent.subtitle}</h2>
        </div>
      </div>

      {/* Right Page - Content */}
      <div className="book-page-right paper-texture p-16 md:p-16 p-8">
        {chapter.id === 'preface' ? (
          // Preface content - vertically centered
          <div className="h-full flex flex-col justify-center">
            <div className="max-w-lg mx-auto">
              {rightPageContent?.map((item, index) => (
                <div key={item.key} className="space-y-4 animate-content-stagger" style={{ animationDelay: `${0.3 + index * 0.15}s`, animationFillMode: 'both' }}>
                  <div className="story-quote text-left">
                    <p className="text-lg leading-relaxed whitespace-pre-line">
                      {item.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          // Regular chapter content
          <div className="max-w-lg mx-auto space-y-12 md:space-y-12 space-y-8">
            {rightPageContent?.map((item, index) => (
              <div key={item.key} className="space-y-4 animate-content-stagger" style={{ animationDelay: `${0.3 + index * 0.1}s`, animationFillMode: 'both' }}>
                <h3 className="font-serif text-2xl font-semibold text-primary border-b border-border/50 pb-2">
                  {item.name}
                </h3>
                
                <div className="story-quote">
                  <p className="text-lg leading-relaxed whitespace-pre-line">
                    {item.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Navigation */}
      <Button
        onClick={onPrevious}
        variant="ghost"
        size="icon"
        className="absolute left-8 md:left-8 left-4 top-1/2 md:top-1/2 top-1/2 transform -translate-y-1/2 hover:bg-primary/10 mobile-nav-left"
        disabled={pageIndex === 0}
      >
        <ChevronLeft className="w-6 h-6" />
      </Button>

      <Button
        onClick={onNext}
        variant="ghost"
        size="icon"
        className="absolute right-8 md:right-8 right-4 top-1/2 md:top-1/2 top-1/2 transform -translate-y-1/2 hover:bg-primary/10 mobile-nav-right"
        disabled={pageIndex === totalPages - 1}
      >
        <ChevronRight className="w-6 h-6" />
      </Button>

      {/* Page indicator */}
      <div className="absolute bottom-8 md:bottom-8 bottom-4 left-1/2 transform -translate-x-1/2 font-serif text-sm text-muted-foreground">
        {pageIndex + 1} of {totalPages}
      </div>

      {/* Back to Top Button - Mobile Only */}
      {showBackToTop && (
        <Button
          onClick={scrollToTop}
          variant="ghost"
          size="icon"
          className="fixed bottom-4 right-4 md:hidden bg-primary/10 hover:bg-primary/20 text-primary rounded-full shadow-lg z-50"
        >
          <ArrowUp className="w-5 h-5" />
        </Button>
      )}
    </div>
  );
});

BookPage.displayName = "BookPage";