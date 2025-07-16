import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";

interface BookCoverProps {
  onStartReading: () => void;
}

export const BookCover = ({ onStartReading }: BookCoverProps) => {
  return (
    <div className="relative w-full h-screen flex items-center justify-center paper-texture">
      {/* Main book cover */}
      <div className="relative w-[600px] md:w-[600px] w-[90vw] h-[800px] md:h-[800px] h-[70vh] bg-gradient-to-br from-amber-800 to-amber-900 shadow-2xl rounded-lg book-spine overflow-hidden group cursor-pointer transform transition-all duration-700 hover:scale-105">
        
        {/* Decorative elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent"></div>
        
        {/* Corner decorations */}
        <div className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-amber-200/30"></div>
        <div className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-amber-200/30"></div>
        <div className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-amber-200/30"></div>
        <div className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-amber-200/30"></div>
        
        {/* Content */}
        <div className="relative h-full flex flex-col items-center justify-center p-16 md:p-16 p-8 text-center">
          {/* Title */}
          <h1 className="font-serif text-6xl md:text-6xl text-4xl font-bold text-amber-50 mb-6 leading-tight tracking-wide animate-title-fade-in">
            Collected
            <br />
            <span className="italic font-light">Thoughts</span>
          </h1>
          
          {/* Decorative line */}
          <div className="w-32 h-0.5 bg-amber-200/50 mb-8 animate-text-fade-in" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}></div>
          
          {/* Subtitle */}
          <p className="font-serif text-2xl md:text-2xl text-lg text-amber-100/90 mb-12 italic leading-relaxed animate-text-fade-in" style={{ animationDelay: '0.5s', animationFillMode: 'both' }}>
            Written by the people
            <br />
            you've touched
          </p>
          
          {/* Year */}
          <div className="font-serif text-3xl md:text-3xl text-2xl text-amber-100/80 font-light mb-16 animate-text-fade-in" style={{ animationDelay: '0.7s', animationFillMode: 'both' }}>
            2025
          </div>
          
          {/* Start Reading Button */}
          <button
            onClick={() => {
              console.log("Button clicked in BookCover");
              onStartReading();
            }}
            className="relative z-10 bg-amber-50 text-amber-900 hover:bg-amber-100 px-8 md:px-8 px-6 py-4 md:py-4 py-3 rounded-lg text-lg md:text-lg text-base font-serif shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 flex items-center gap-3"
          >
            <BookOpen className="w-5 h-5 transition-transform hover:rotate-12" />
            Start Reading
          </button>
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
            className="absolute w-1 h-1 bg-amber-200/20 rounded-full animate-float"
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