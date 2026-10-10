import React, { useState, useEffect } from 'react';

export interface ChatMessageProps {
  sender: 'ai' | 'user';
  text: string;
  isStreaming?: boolean;
}

/**
 * Renders a chat message with a typewriter effect for AI responses.
 */
export const ChatMessage: React.FC<ChatMessageProps> = ({ sender, text, isStreaming = false }) => {
  const isAi = sender === 'ai';
  const [displayedText, setDisplayedText] = useState(isStreaming ? '' : text);

  useEffect(() => {
    if (!isStreaming) {
      setDisplayedText(text);
      return;
    }

    let currentIdx = 0;
    const interval = setInterval(() => {
      currentIdx += 4;
      if (currentIdx >= text.length) {
        setDisplayedText(text);
        clearInterval(interval);
      } else {
        setDisplayedText(text.slice(0, currentIdx));
      }
    }, 20);

    return () => clearInterval(interval);
  }, [text, isStreaming]);

  // Safely render **bold** and newlines without dangerouslySetInnerHTML
  const renderFormattedText = (str: string) => {
    const lines = str.split('\n');
    return lines.map((line, lineIndex) => {
      const parts = line.split(/(\*\*.*?\*\*)/g);
      return (
        <React.Fragment key={lineIndex}>
          {parts.map((part, partIndex) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={partIndex}>{part.slice(2, -2)}</strong>;
            }
            return <span key={partIndex}>{part}</span>;
          })}
          {lineIndex < lines.length - 1 && <br />}
        </React.Fragment>
      );
    });
  };

  return (
    <div className={`flex ${isAi ? 'justify-start' : 'justify-end'}`}>
      <div 
        className={`max-w-[85%] p-3 rounded-xl shadow-2xs leading-relaxed ${isAi ? 'bg-white border border-[#D4AF37]/30 text-[#222222]' : 'bg-[#8B0000] text-white'}`}
      >
        {renderFormattedText(displayedText)}
      </div>
    </div>
  );
};
