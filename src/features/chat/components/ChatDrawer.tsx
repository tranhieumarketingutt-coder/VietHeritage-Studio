import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from './ChatMessage';
// @ts-ignore
import { I18N } from '../../../shared/i18n';
// @ts-ignore
import { GEMINI_RESPONSES, getCulturalAdvisorResponse } from '../../../heritageLogic.js';
import { useFocusTrap } from '../../../shared/hooks/useFocusTrap';

export interface ChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface MessageData {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  isStreaming?: boolean;
}

/**
 * Chat drawer component for Gemini Live Assistant.
 */
export const ChatDrawer: React.FC<ChatDrawerProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const drawerRef = useFocusTrap<HTMLDivElement>({
    isOpen,
    onClose,
    lockScroll: true,
    closeOnEscape: true
  });
  
  const lang = typeof localStorage !== 'undefined' ? localStorage.getItem('vheritage_lang') || 'vi' : 'vi';
  const isEn = lang === 'en';

  useEffect(() => {
    // Initial message from Cố vấn cổ phục
    setMessages([
      {
        id: 'init-msg',
        sender: 'ai',
        text: isEn 
          ? 'Hello! I am your **Traditional Costume Advisor** (Cố vấn cổ phục). Which occasion are you planning to wear Vietnamese traditional attire for, or which historical period would you like to explore? I would love to assist you!'
          : 'Xin chào bạn! Mình là **Cố vấn cổ phục**, trợ lý trang phục truyền thống Việt Nam. Bạn đang lên kế hoạch diện cổ phục cho dịp nào, hay muốn tìm hiểu trang phục của thời kỳ lịch sử nào? Mình rất sẵn lòng hỗ trợ bạn!'
      }
    ]);
  }, [isEn]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async (text: string) => {
    if (!text.trim() || isLoading) return;
    
    const userMsg: MessageData = { id: Date.now().toString(), sender: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, lang: isEn ? 'en' : 'vi' })
      });

      if (response.ok) {
        const data = await response.json();
        if (data && typeof data.text === 'string' && data.text.trim()) {
          const aiMsg: MessageData = {
            id: (Date.now() + 1).toString(),
            sender: 'ai',
            text: data.text,
            isStreaming: true
          };
          setMessages(prev => [...prev, aiMsg]);
          setIsLoading(false);
          return;
        }
      }
    } catch {
      // Offline fallback handling below
    }

    // High quality offline fallback adhering strictly to role and knowledge base
    const fallbackText = getCulturalAdvisorResponse(text, isEn ? 'en' : 'vi');
    const aiMsg: MessageData = {
      id: (Date.now() + 1).toString(),
      sender: 'ai',
      text: fallbackText,
      isStreaming: true
    };
    setMessages(prev => [...prev, aiMsg]);
    setIsLoading(false);
  };

  const handleChipClick = (promptKey: string) => {
    const res = (GEMINI_RESPONSES as any)[promptKey];
    if (!res) return;
    
    const userPrompt = isEn ? res.enPrompt || promptKey : res.viPrompt || promptKey;
    const userMsg: MessageData = { id: Date.now().toString(), sender: 'user', text: userPrompt };
    setMessages(prev => [...prev, userMsg]);
    
    setTimeout(() => {
      const aiText = isEn ? res.en : res.vi;
      const aiMsg: MessageData = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: aiText,
        isStreaming: true
      };
      setMessages(prev => [...prev, aiMsg]);
    }, 400);
  };

  const getTranslation = (key: string) => {
    const dict = I18N[lang as 'vi' | 'en'] || I18N.vi;
    return (dict as any)[key] || key;
  };

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs transition-opacity duration-300"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <div 
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="chat-drawer-title"
        aria-hidden={!isOpen}
        inert={!isOpen ? true : undefined}
        tabIndex={-1}
        className={`fixed top-0 right-0 h-full w-full sm:w-96 z-50 bg-[#FAF7F2] border-l border-[#D4AF37]/40 shadow-2xl transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full pointer-events-none'} flex flex-col justify-between outline-none`}
      >
        <div className="p-4 bg-white border-b border-[#D4AF37]/30 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div>
              <h4 id="chat-drawer-title" className="font-serif font-bold text-sm text-[#222222]">
                {isEn ? "Heritage Cultural Advisor (V-Assistant)" : "Cố Vấn Điển Chế Phục Trang (V-Assistant)"}
              </h4>
              <div className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-[10px] font-mono text-stone-600">Gemini Live · 24/7 Văn Hóa Chuẩn Sử</span>
              </div>
            </div>
          </div>
          <button 
            type="button"
            onClick={onClose} 
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 font-mono text-xs flex items-center justify-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B0000]"
            aria-label={isEn ? "Close assistant" : "Đóng trợ lý cổ phục"}
          >
            ✕
          </button>
        </div>

        <div className="p-2.5 bg-[#F5F1E8] border-b border-stone-200 overflow-x-auto flex items-center space-x-2 shrink-0">
          <button type="button" onClick={() => handleChipClick('totnghiep')} className="px-2.5 py-1 rounded-full bg-white hover:bg-[#FDF6E2] text-stone-700 border border-stone-200 text-[10px] font-mono whitespace-nowrap cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B0000]">
            {isEn ? 'Graduation photoshoot' : 'Tư vấn chụp ảnh tốt nghiệp'}
          </button>
          <button type="button" onClick={() => handleChipClick('nhatbinh')} className="px-2.5 py-1 rounded-full bg-white hover:bg-[#FDF6E2] text-stone-700 border border-stone-200 text-[10px] font-mono whitespace-nowrap cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B0000]">
            {isEn ? 'Ao Nhat Binh rules' : 'Quy chế Áo Nhật Bình'}
          </button>
          <button type="button" onClick={() => handleChipClick('nguthan')} className="px-2.5 py-1 rounded-full bg-white hover:bg-[#FDF6E2] text-stone-700 border border-stone-200 text-[10px] font-mono whitespace-nowrap cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B0000]">
            {isEn ? 'Ao Ngu Than styling' : 'Phối Áo Ngũ Thân & Phụ kiện'}
          </button>
          <button type="button" onClick={() => handleChipClick('lytran')} className="px-2.5 py-1 rounded-full bg-white hover:bg-[#FDF6E2] text-stone-700 border border-stone-200 text-[10px] font-mono whitespace-nowrap cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B0000]">
            {isEn ? 'Ly - Tran dynasties' : 'Cổ phục thời Lý - Trần'}
          </button>
          <button type="button" onClick={() => handleChipClick('hue')} className="px-2.5 py-1 rounded-full bg-white hover:bg-[#FDF6E2] text-stone-700 border border-stone-200 text-[10px] font-mono whitespace-nowrap cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B0000]">
            {isEn ? 'Hue Imperial City' : 'Trang phục đi Cố Đô Huế'}
          </button>
        </div>

        <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
          {messages.map(msg => (
            <ChatMessage key={msg.id} sender={msg.sender} text={msg.text} isStreaming={msg.isStreaming} />
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="p-2.5 rounded-xl bg-white border border-[#D4AF37]/30 text-stone-500 text-[11px] font-mono flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8B0000] animate-pulse"></span>
                <span>{isEn ? 'Advisor is consulting records...' : 'Cố vấn đang tra cứu điển chế...'}</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-3 bg-white border-t border-[#D4AF37]/30 space-y-2">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(inputValue); }} 
            className="flex items-center space-x-2"
          >
            <input 
              type="text" 
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              placeholder={getTranslation('chatPlaceholder')} 
              aria-label={getTranslation('chatPlaceholder')}
              className="flex-1 px-3 py-2 rounded-lg border border-stone-300 font-sans text-xs focus:ring-2 focus:ring-[#8B0000] focus:border-[#8B0000] outline-none" 
            />
            <button 
              type="submit" 
              disabled={isLoading || !inputValue.trim()}
              className="px-3.5 py-2 rounded-lg bg-[#8B0000] hover:bg-[#700000] disabled:opacity-50 text-white font-mono font-bold text-xs transition-colors cursor-pointer shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B0000]"
            >
              {getTranslation('btnSend')}
            </button>
          </form>
          <div className="flex items-center justify-between text-[10px] text-stone-600 font-mono">
            <span>System: Cultural Etiquette Grounded</span>
            <span>{isEn ? "Archival & Canonical Research" : "Tra cứu Điển chế & Sử liệu"}</span>
          </div>
        </div>
      </div>
    </>
  );
};
