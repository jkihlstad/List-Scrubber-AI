// ===========================================
// AI CHAT COMPONENT
// ===========================================

'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Loader2, Wand2, Zap, Lock } from 'lucide-react';
import { Badge, Select } from '@/components/ui';
import { useStore } from '@/hooks/useStore';
import { useSubscription } from '@/hooks/useSubscription';
import { AI_MODELS } from '@/lib/config';

export function AIChat() {
  const [prompt, setPrompt] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const {
    messages,
    isProcessing,
    selectedModel,
    dataset,
    setSelectedModel,
    addMessage,
    setIsProcessing,
    setDataset,
    incrementAiCalls,
    theme,
  } = useStore();
  const { isPro, plan } = useSubscription();

  // Filter models based on plan
  const availableModels = AI_MODELS.filter(
    (model) => model.tier === 'standard' || isPro
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async () => {
    if (!prompt.trim() || dataset.length === 0) return;

    if (dataset.length === 0) {
      addMessage({
        role: 'error',
        content: 'Please import a dataset first.',
      });
      return;
    }

    setIsProcessing(true);
    addMessage({ role: 'user', content: prompt });

    try {
      const response = await fetch('/api/ai/transform', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          model: selectedModel,
          data: dataset.slice(0, 20), // Send only first 20 rows for processing
        }),
      });

      const result = await response.json();

      if (result.error) {
        addMessage({ role: 'error', content: result.error });
      } else if (result.data) {
        // Merge transformed data back into dataset
        const newData = [...dataset];
        result.data.forEach((row: Record<string, string | number>, i: number) => {
          if (newData[i]) {
            newData[i] = { ...newData[i], ...row };
          }
        });
        setDataset(newData);
        incrementAiCalls();
        addMessage({
          role: 'assistant',
          content: `Processed ${result.data.length} rows successfully.`,
        });
      }
    } catch (error) {
      addMessage({
        role: 'error',
        content: error instanceof Error ? error.message : 'Failed to process data',
      });
    } finally {
      setIsProcessing(false);
      setPrompt('');
    }
  };

  const selectedModelInfo = AI_MODELS.find((m) => m.id === selectedModel);
  const isProModel = selectedModelInfo?.tier === 'pro';

  return (
    <div className={`flex flex-col h-full backdrop-blur-md border rounded-2xl overflow-hidden ${
      theme === 'dark'
        ? 'border-violet-500/20 shadow-[0_0_40px_-10px_rgba(139,92,246,0.15)] bg-slate-900/60'
        : 'border-violet-200/60 shadow-lg shadow-violet-200/30 bg-white/90'
    }`}>
      {/* Header */}
      <div className={`p-4 border-b flex items-center justify-between ${
        theme === 'dark'
          ? 'border-violet-500/10 bg-gradient-to-r from-violet-500/5 to-transparent'
          : 'border-violet-100 bg-gradient-to-r from-violet-50 to-transparent'
      }`}>
        <div className="flex items-center gap-2">
          <div className={`p-1.5 rounded-lg border ${
            theme === 'dark' ? 'bg-violet-500/20 border-violet-500/30' : 'bg-violet-100 border-violet-200'
          }`}>
            <Sparkles size={18} className={theme === 'dark' ? 'text-violet-300' : 'text-violet-600'} />
          </div>
          <h3 className={`font-semibold ${theme === 'dark' ? 'text-violet-100' : 'text-violet-900'}`}>AI Scrubber</h3>
        </div>
        <Badge type="purple">
          {selectedModelInfo?.name.split(' ').slice(-1)[0] || 'GPT-3.5'}
        </Badge>
      </div>

      {/* Model Selector */}
      <div className={`px-4 py-2 border-b ${
        theme === 'dark' ? 'border-slate-700/30 bg-slate-800/20' : 'border-gray-200 bg-gray-50/50'
      }`}>
        <Select
          value={selectedModel}
          onChange={setSelectedModel}
          options={AI_MODELS.map((model) => ({
            value: model.id,
            label: `${model.name} ${model.tier === 'pro' && !isPro ? '(Pro)' : ''}`,
            disabled: model.tier === 'pro' && !isPro,
          }))}
          className="!py-2 !text-xs !bg-slate-900/50"
        />
        {isProModel && !isPro && (
          <div className="flex items-center gap-1 mt-1 text-xs text-amber-400">
            <Lock size={10} />
            <span>Upgrade to Pro to use this model</span>
          </div>
        )}
      </div>

      {/* Messages */}
      <div className={`flex-1 min-h-0 p-4 overflow-y-auto space-y-4 ${
        theme === 'dark' ? 'bg-slate-900/30' : 'bg-gray-50/30'
      }`}>
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.role === 'user' ? 'justify-end' : 'justify-start'
            } animate-in fade-in slide-in-from-bottom-2 duration-300`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-md ${
                msg.role === 'user'
                  ? 'bg-gradient-to-br from-violet-600 to-indigo-600 text-white rounded-br-none'
                  : msg.role === 'error'
                  ? 'bg-red-500/10 text-red-300 border border-red-500/20'
                  : theme === 'dark'
                    ? 'bg-slate-800 text-slate-200 border border-slate-700 rounded-bl-none'
                    : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none shadow-sm'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {isProcessing && (
          <div className="flex justify-start animate-pulse">
            <div className={`rounded-2xl px-4 py-3 flex items-center gap-2 text-sm border ${
              theme === 'dark' ? 'bg-slate-800 text-slate-400 border-slate-700' : 'bg-white text-gray-500 border-gray-200'
            }`}>
              <Loader2 size={14} className="animate-spin text-violet-400" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-indigo-400 font-medium">
                Processing data...
              </span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className={`p-4 border-t backdrop-blur-md ${
        theme === 'dark' ? 'border-slate-700/50 bg-slate-800/30' : 'border-gray-200 bg-gray-50/50'
      }`}>
        <div className="relative">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder='Describe changes (e.g., "Fix broken emails")'
            className={`w-full rounded-xl pl-4 pr-12 py-3 text-sm focus:ring-2 focus:ring-violet-500 focus:border-transparent focus:outline-none shadow-inner ${
              theme === 'dark'
                ? 'bg-slate-900/80 border border-slate-600 text-white placeholder-slate-500'
                : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-400'
            }`}
            onKeyDown={(e) => e.key === 'Enter' && !isProcessing && handleSubmit()}
            disabled={isProcessing || dataset.length === 0}
          />
          <button
            onClick={handleSubmit}
            disabled={isProcessing || dataset.length === 0 || !prompt.trim()}
            className="absolute right-2 top-2 p-1.5 bg-violet-600 hover:bg-violet-500 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Wand2 size={16} />
          </button>
        </div>
        <p className={`text-[10px] mt-2 text-center flex items-center justify-center gap-1 ${
          theme === 'dark' ? 'text-slate-500' : 'text-gray-500'
        }`}>
          <Zap size={10} className="text-amber-500" />
          Powered by OpenRouter LLMs
        </p>
      </div>
    </div>
  );
}
