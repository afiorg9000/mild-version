import { useState, useMemo, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { responses, chapters } from "@/data/bookData";
import { Search } from "lucide-react";

interface SearchNamesProps {
  onGoToPage: (pageIndex: number) => void;
}

export const SearchNames = ({ onGoToPage }: SearchNamesProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // Debounce search input to prevent excessive re-renders
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 150);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Memoize the search results to prevent recalculation on every render
  const searchResults = useMemo(() => {
    if (!debouncedSearchTerm.trim()) return [];
    
    return responses
      .filter(response => 
        response.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      )
      .map(response => {
        const containingChapters = chapters
          .map((chapter, index) => ({ chapter, index }))
          .filter(({ chapter }) => 
            chapter.content?.some(content => content.name === response.name)
          );
        
        return {
          name: response.name,
          chapters: containingChapters
        };
      });
  }, [debouncedSearchTerm]);

  const handleGoToPage = useCallback((pageIndex: number) => {
    onGoToPage(pageIndex);
    setIsOpen(false);
    setSearchTerm("");
  }, [onGoToPage]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-8 right-8 hover:bg-primary/10 z-10"
        >
          <Search className="w-6 h-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl">Search Names</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="Search for a name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
          <ScrollArea className="max-h-64">
            {searchResults.length > 0 ? (
              <div className="space-y-2">
                {searchResults.map((result) => (
                  <div key={result.name} className="space-y-1">
                    <div className="font-semibold text-sm">{result.name}</div>
                    {result.chapters.map(({ chapter, index }) => (
                      <Button
                        key={`${result.name}-${index}`}
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start text-left ml-4"
                        onClick={() => handleGoToPage(index)}
                      >
                        <div className="text-xs">
                          <div>{chapter.title}</div>
                          <div className="text-muted-foreground">{chapter.subtitle}</div>
                        </div>
                      </Button>
                    ))}
                  </div>
                ))}
              </div>
            ) : searchTerm.trim() !== "" ? (
              <div className="text-center text-muted-foreground py-4">
                No names found matching "{searchTerm}"
              </div>
            ) : (
              <div className="text-center text-muted-foreground py-4">
                Start typing to search for names...
              </div>
            )}
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
};