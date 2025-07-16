import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { chapters } from "@/data/bookData";
import { BookOpen } from "lucide-react";

interface TableOfContentsProps {
  currentPageIndex: number;
  onGoToPage: (pageIndex: number) => void;
}

export const TableOfContents = ({ currentPageIndex, onGoToPage }: TableOfContentsProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-8 md:top-8 top-4 left-8 md:left-8 left-4 hover:bg-primary/10 z-10"
        >
          <BookOpen className="w-6 h-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl">Table of Contents</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-96">
          <div className="space-y-2">
            {/* Cover Page */}
            <Button
              key="cover"
              variant={currentPageIndex === -1 ? "default" : "ghost"}
              className="w-full justify-start text-left h-auto p-4"
              onClick={() => onGoToPage(-1)}
            >
              <div>
                <div className="font-serif text-lg">Cover</div>
                <div className="text-sm text-muted-foreground font-normal">
                  Collected Thoughts
                </div>
              </div>
            </Button>
            
            {chapters.map((chapter, index) => (
              <Button
                key={chapter.id}
                variant={index === currentPageIndex ? "default" : "ghost"}
                className="w-full justify-start text-left h-auto p-4"
                onClick={() => onGoToPage(index)}
              >
                <div>
                  <div className="font-serif text-lg">{chapter.title}</div>
                  <div className="text-sm text-muted-foreground font-normal">
                    {chapter.subtitle}
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};