import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from './ChatMessage';
// @ts-ignore
import { I18N } from '../../../shared/i18n';
// @ts-ignore
import { GEMINI_RESPONSES } from '../../../heritageLogic.js';
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
    // Initial message
    setMessages([
      {
        id: 'init-msg',
        sender: 'ai',
        text: isEn 
          ? 'Hello! I am your **Heritage Cultural Advisor** (V-Heritage Cultural Stylist). Where are you planning to wear your traditional outfit, or which cultural philosophy would you like to explore today?'
          : 'Xin chào! Mình là **Cố Vấn Điển Chế Phục Trang** (V-Heritage Cultural Stylist). Bạn đang lên kế hoạch diện cổ phục đi đâu, hay muốn khám phá triết lý trang phục truyền thống nào hôm nay?'
      }
    ]);
  }, [isEn]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    
    const userMsg: MessageData = { id: Date.now().toString(), sender: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = isEn 
        ? "That sounds lovely! Traditional Vietnamese costumes offer a deep connection to our heritage. I can assist you with selecting the right colors and fabrics."
        : "Thật tuyệt vời! Cổ phục Việt Nam mang ý nghĩa di sản sâu sắc. Mình có thể giúp bạn chọn màu sắc và chất liệu phù hợp.";
      
      const aiMsg: MessageData = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: aiResponse,
        isStreaming: true
      };
      setMessages(prev => [...prev, aiMsg]);
    }, 600);
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
          <button type="button" onClick={() => handleChipClick('hue')} className="px-2.5 py-1 rounded-full bg-white hover:bg-[#FDF6E2] text-stone-700 border border-stone-200 text-[10px] font-mono whitespace-nowrap cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B0000]">
            Tư vấn đồ đi Huế tháng 10
          </button>
          <button type="button" onClick={() => handleChipClick('nhatbinh')} className="px-2.5 py-1 rounded-full bg-white hover:bg-[#FDF6E2] text-stone-700 border border-stone-200 text-[10px] font-mono whitespace-nowrap cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B0000]">
            Ý nghĩa hoa văn Áo Nhật Bình
          </button>
          <button type="button" onClick={() => handleChipClick('nguthan')} className="px-2.5 py-1 rounded-full bg-white hover:bg-[#FDF6E2] text-stone-700 border border-stone-200 text-[10px] font-mono whitespace-nowrap cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B0000]">
            Phối Áo Ngũ Thân Gen Z
          </button>
        </div>

        <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
          {messages.map(msg => (
            <ChatMessage key={msg.id} sender={msg.sender} text={msg.text} isStreaming={msg.isStreaming} />
          ))}
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
            <button type="submit" className="px-3.5 py-2 rounded-lg bg-[#8B0000] hover:bg-[#700000] text-white font-mono font-bold text-xs transition-colors cursor-pointer shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B0000]">
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
