import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from './ChatMessage';
// @ts-ignore
import { I18N } from '../../../shared/i18n';
// @ts-ignore
import { GEMINI_RESPONSES } from '../../../heritageLogic.js';

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
  
  const lang = typeof localStorage !== 'undefined' ? localStorage.getItem('vheritage_lang') || 'vi' : 'vi';
  const isEn = lang === 'en';

  useEffect(() => {
    // Initial message
    setMessages([
      {
        id: 'init-msg',
        sender: 'ai',
        text: isEn 
          ? 'Hello! I am your **AI Cultural Stylist** (Gemini Live). Where are you planning to wear your traditional outfit, or which cultural philosophy would you like to explore today?'
          : 'Xin chào! Mình là **Trợ lý Cổ Phục AI** (Gemini Live Cultural Stylist). Bạn đang lên kế hoạch diện cổ phục đi đâu, hay muốn khám phá triết lý trang phục truyền thống nào hôm nay?'
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
      <button 
        onClick={() => onClose()} 
        className={`fixed bottom-6 right-6 z-40 px-3.5 py-2.5 rounded-full bg-[#8B0000] hover:bg-[#700000] text-[#D4AF37] font-mono text-xs font-bold shadow-2xl flex items-center space-x-2.5 border-2 border-[#D4AF37] transition-all hover:scale-105 cursor-pointer ring-4 ring-[#8B0000]/25 group ${isOpen ? 'hidden' : 'flex'}`}
      >
        <div className="text-left hidden sm:block">
          <span className="block text-[11px] text-white font-bold leading-tight">V-Assistant</span>
          <span className="block text-[9px] text-[#D4AF37] font-normal">Trợ lý Cổ Phục AI</span>
        </div>
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
      </button>

      <div className={`fixed top-0 right-0 h-full w-full sm:w-96 z-50 bg-[#FAF7F2] border-l border-[#D4AF37]/40 shadow-2xl transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col justify-between`}>
        <div className="p-4 bg-white border-b border-[#D4AF37]/30 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div>
              <h4 className="font-serif font-bold text-sm text-[#222222]">Trợ Lý Cổ Phục AI (V-Assistant)</h4>
              <div className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-[10px] font-mono text-stone-500">Gemini Live · 24/7 Văn Hóa Chuẩn Sử</span>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 font-mono text-xs flex items-center justify-center cursor-pointer">
            ✕
          </button>
        </div>

        <div className="p-2.5 bg-[#F5F1E8] border-b border-stone-200 overflow-x-auto flex items-center space-x-2 shrink-0">
          <button onClick={() => handleChipClick('hue')} className="px-2.5 py-1 rounded-full bg-white hover:bg-[#FDF6E2] text-stone-700 border border-stone-200 text-[10px] font-mono whitespace-nowrap cursor-pointer transition-colors">
            Tư vấn đồ đi Huế tháng 10
          </button>
          <button onClick={() => handleChipClick('nhatbinh')} className="px-2.5 py-1 rounded-full bg-white hover:bg-[#FDF6E2] text-stone-700 border border-stone-200 text-[10px] font-mono whitespace-nowrap cursor-pointer transition-colors">
            Ý nghĩa hoa văn Áo Nhật Bình
          </button>
          <button onClick={() => handleChipClick('nguthan')} className="px-2.5 py-1 rounded-full bg-white hover:bg-[#FDF6E2] text-stone-700 border border-stone-200 text-[10px] font-mono whitespace-nowrap cursor-pointer transition-colors">
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
              className="flex-1 px-3 py-2 rounded-lg border border-stone-300 font-sans text-xs focus:ring-1 focus:ring-[#8B0000] outline-none" 
            />
            <button type="submit" className="px-3.5 py-2 rounded-lg bg-[#8B0000] hover:bg-[#700000] text-white font-mono font-bold text-xs transition-colors cursor-pointer shadow-xs">
              {getTranslation('btnSend')}
            </button>
          </form>
          <div className="flex items-center justify-between text-[10px] text-stone-400 font-mono">
            <span>System: Cultural Etiquette Grounded</span>
            <span>Thinking Mode: High</span>
          </div>
        </div>
      </div>
    </>
  );
};
