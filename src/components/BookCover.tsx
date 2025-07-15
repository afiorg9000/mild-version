import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";

interface BookCoverProps {
  onStartReading: () => void;
}

export const BookCover = ({ onStartReading }: BookCoverProps) => {
  return (
    <div className="relative w-full h-screen flex items-center justify-center paper-texture">
      {/* Main book cover */}
      <div className="relative w-[600px] h-[800px] bg-gradient-to-br from-primary/90 to-primary shadow-2xl rounded-lg book-spine overflow-hidden group cursor-pointer transform transition-all duration-700 hover:scale-105">
        
        {/* Decorative elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent"></div>
        
        {/* Corner decorations */}
        <div className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-primary-foreground/30"></div>
        <div className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-primary-foreground/30"></div>
        <div className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-primary-foreground/30"></div>
        <div className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-primary-foreground/30"></div>
        
        {/* Content */}
        <div className="relative h-full flex flex-col items-center justify-center p-12 text-left max-w-md mx-auto">
          {/* Preface Header */}
          <h2 className="font-serif text-3xl font-bold text-primary-foreground mb-8 text-center">
            Preface
          </h2>
          
          {/* Preface Text */}
          <div className="font-serif text-primary-foreground/95 leading-relaxed mb-12 space-y-4">
            <p className="text-lg">My dearest Ryan,</p>
            
            <p className="text-base">
              What you're about to read is a collection of thoughts that represent just a fraction of the lives you've touched and the connections you've made. Each page holds the genuine affection and admiration of someone whose world is brighter because, in so many ways, you've been a steady ground to lean on, a dyngus to laugh with, and a catalyst for growth and joy in their lives.
            </p>
            
            <p className="text-base">
              I made this for you so you can look back someday — to laugh or cry at the absurdity and sweetness of the responses, to see the friends who remain close and remember those who've drifted. I want to give you everything, and part of that is a sense of love and belonging. So here's a little dopamine boost to help you feel just how cherished you are.
            </p>
            
            <div className="text-right mt-8">
              <p className="text-base">With all my love, and my endless will to make you feel like the most special boy in the world,</p>
              <p className="text-lg font-medium mt-2">Sofia</p>
            </div>
          </div>
          
          {/* Start Reading Button */}
          <div className="text-center">
            <button
              onClick={() => {
                console.log("Button clicked in BookCover");
                onStartReading();
              }}
              className="relative z-10 bg-primary-foreground text-primary hover:bg-primary-foreground/90 px-8 py-4 rounded-lg text-lg font-serif shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 flex items-center gap-3"
            >
              <BookOpen className="w-5 h-5 transition-transform hover:rotate-12" />
              Start Reading
            </button>
          </div>
        </div>
        
        {/* Book spine shadow effect */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/20 to-transparent"></div>
        
        {/* Subtle animation overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};