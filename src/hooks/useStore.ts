// ===========================================
// ZUSTAND STORE
// ===========================================

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DataRow, ChatMessage, User, Subscription } from '@/types';

interface AppState {
  // User & Auth
  user: User | null;
  subscription: Subscription | null;
  setUser: (user: User | null) => void;
  setSubscription: (subscription: Subscription | null) => void;

  // Dataset
  dataset: DataRow[];
  fileName: string | null;
  setDataset: (data: DataRow[]) => void;
  setFileName: (name: string | null) => void;
  updateRow: (id: number, updates: Partial<DataRow>) => void;
  deleteRow: (id: number) => void;
  clearDataset: () => void;

  // AI Chat
  messages: ChatMessage[];
  isProcessing: boolean;
  selectedModel: string;
  addMessage: (message: ChatMessage) => void;
  clearMessages: () => void;
  setIsProcessing: (isProcessing: boolean) => void;
  setSelectedModel: (model: string) => void;

  // UI State
  sidebarOpen: boolean;
  activeTab: string;
  theme: 'light' | 'dark';
  setSidebarOpen: (open: boolean) => void;
  setActiveTab: (tab: string) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;

  // Usage tracking
  rowsProcessed: number;
  aiCallsMade: number;
  incrementRowsProcessed: (count: number) => void;
  incrementAiCalls: () => void;
  resetUsage: () => void;
}

const initialMessages: ChatMessage[] = [
  {
    role: 'system',
    content: 'Ready to analyze your data. Import a file to get started.',
    timestamp: new Date(),
  },
];

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      // User & Auth
      user: null,
      subscription: null,
      setUser: (user) => set({ user }),
      setSubscription: (subscription) => set({ subscription }),

      // Dataset
      dataset: [],
      fileName: null,
      setDataset: (dataset) => set({ dataset }),
      setFileName: (fileName) => set({ fileName }),
      updateRow: (id, updates) =>
        set((state) => ({
          dataset: state.dataset.map((row) =>
            row.id === id ? ({ ...row, ...updates } as DataRow) : row
          ),
        })),
      deleteRow: (id) =>
        set((state) => ({
          dataset: state.dataset.filter((row) => row.id !== id),
        })),
      clearDataset: () => set({ dataset: [], fileName: null }),

      // AI Chat
      messages: initialMessages,
      isProcessing: false,
      selectedModel: 'openai/gpt-3.5-turbo',
      addMessage: (message) =>
        set((state) => ({
          messages: [...state.messages, { ...message, timestamp: new Date() }],
        })),
      clearMessages: () => set({ messages: initialMessages }),
      setIsProcessing: (isProcessing) => set({ isProcessing }),
      setSelectedModel: (selectedModel) => set({ selectedModel }),

      // UI State
      sidebarOpen: true,
      activeTab: 'dashboard',
      theme: 'dark',
      setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
      setActiveTab: (activeTab) => set({ activeTab }),
      setTheme: (theme) => set({ theme }),
      toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),

      // Usage tracking
      rowsProcessed: 0,
      aiCallsMade: 0,
      incrementRowsProcessed: (count) =>
        set((state) => ({ rowsProcessed: state.rowsProcessed + count })),
      incrementAiCalls: () =>
        set((state) => ({ aiCallsMade: state.aiCallsMade + 1 })),
      resetUsage: () => set({ rowsProcessed: 0, aiCallsMade: 0 }),
    }),
    {
      name: 'cleandata-storage',
      partialize: (state) => ({
        // Persist dataset and file info
        dataset: state.dataset,
        fileName: state.fileName,
        // Persist chat messages
        messages: state.messages,
        // Persist settings
        selectedModel: state.selectedModel,
        sidebarOpen: state.sidebarOpen,
        theme: state.theme,
        // Persist usage tracking
        rowsProcessed: state.rowsProcessed,
        aiCallsMade: state.aiCallsMade,
      }),
    }
  )
);
