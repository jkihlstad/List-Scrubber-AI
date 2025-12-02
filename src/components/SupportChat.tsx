// ===========================================
// SUPPORT CHAT BOT COMPONENT
// ===========================================

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Bot, X, Send, MessageCircle } from 'lucide-react';

interface ChatMessage {
  role: 'user' | 'agent';
  content: string;
}

export function SupportChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    { role: 'agent', content: "Hi there! How can I help you with your data today?" },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatHistory, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setChatHistory((prev) => [...prev, { role: 'user', content: userMessage }]);
    setInput('');
    setIsTyping(true);

    // Simulate bot response (in production, this would call an API)
    setTimeout(() => {
      const responses: { [key: string]: string } = {
        pricing: "We offer two plans: Standard (free with 1,000 rows/month) and Pro ($29/month with unlimited rows and premium AI models).",
        help: "I can help you with data cleaning, CSV imports/exports, AI transformations, and billing questions. What do you need?",
        contact: "You can reach our support team at support@cleandata.ai or through this chat!",
      };

      let response = "I understand you're asking about: " + userMessage + ". ";

      if (userMessage.toLowerCase().includes('price') || userMessage.toLowerCase().includes('cost')) {
        response = responses.pricing;
      } else if (userMessage.toLowerCase().includes('help')) {
        response = responses.help;
      } else if (userMessage.toLowerCase().includes('contact') || userMessage.toLowerCase().includes('support')) {
        response = responses.contact;
      } else {
        response += "Try checking the Settings or Billing tabs for more options!";
      }

      setChatHistory((prev) => [...prev, { role: 'agent', content: response }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 w-80 md:w-96 h-96 bg-slate-900/95 backdrop-blur-xl border border-slate-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-200">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-violet-900/80 to-slate-900 border-b border-slate-700 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-violet-500 rounded-lg">
                <Bot size={16} className="text-white" />
              </div>
              <span className="font-semibold text-white">Support Assistant</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {chatHistory.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                    msg.role === 'user'
                      ? 'bg-violet-600 text-white rounded-br-none'
                      : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-bl-none'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-slate-800 text-slate-200 border border-slate-700 rounded-2xl rounded-bl-none px-4 py-2.5 text-sm">
                  <span className="flex gap-1">
                    <span className="animate-bounce">.</span>
                    <span className="animate-bounce" style={{ animationDelay: '0.1s' }}>.</span>
                    <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>.</span>
                  </span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-slate-900 border-t border-slate-800">
            <div className="flex gap-2">
              <input
                className="flex-1 bg-slate-800 border-slate-700 text-white text-sm rounded-xl px-3 py-2 focus:ring-2 focus:ring-violet-500 focus:outline-none placeholder-slate-500"
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <button
                onClick={handleSend}
                className="p-2 bg-violet-600 hover:bg-violet-500 text-white rounded-xl transition-colors"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-4 rounded-full shadow-lg shadow-violet-500/30 transition-all duration-300 ${
          isOpen
            ? 'bg-slate-800 text-white rotate-90'
            : 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:scale-110'
        }`}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </div>
  );
}
