// ===========================================
// DATA TABLE COMPONENT
// ===========================================

'use client';

import React, { useRef, useState, useCallback } from 'react';
import { FileSpreadsheet, Upload, Download, AlertTriangle, X, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui';
import { useStore } from '@/hooks/useStore';
import { useSubscription } from '@/hooks/useSubscription';
import { parseCSV, convertToCSV, formatFileSize, getFileSize } from '@/lib/csv';
import { DataRow } from '@/types';
import Link from 'next/link';

interface RowLimitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  totalRows: number;
  maxRows: number;
  fileName: string;
  theme: 'light' | 'dark';
}

function RowLimitModal({ isOpen, onClose, onConfirm, totalRows, maxRows, fileName, theme }: RowLimitModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div className={`absolute inset-0 backdrop-blur-sm ${theme === 'dark' ? 'bg-black/60' : 'bg-black/40'}`} onClick={onClose} />

      {/* Modal */}
      <div className={`relative rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden ${
        theme === 'dark'
          ? 'bg-slate-900 border border-slate-700'
          : 'bg-white border border-slate-200 shadow-xl'
      }`}>
        {/* Header */}
        <div className={`flex items-center justify-between p-4 border-b ${
          theme === 'dark' ? 'border-slate-700/50' : 'border-slate-100'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${
              theme === 'dark' ? 'bg-yellow-500/10' : 'bg-amber-50'
            }`}>
              <AlertTriangle className={`w-5 h-5 ${theme === 'dark' ? 'text-yellow-400' : 'text-amber-500'}`} />
            </div>
            <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>Row Limit Exceeded</h3>
          </div>
          <button
            onClick={onClose}
            className={`p-1 rounded-lg transition-colors ${
              theme === 'dark' ? 'hover:bg-slate-800' : 'hover:bg-slate-100'
            }`}
          >
            <X className={`w-5 h-5 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          <p className={theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}>
            <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>{fileName}</span> contains{' '}
            <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>{totalRows.toLocaleString()}</span> rows,
            but your plan allows <span className={`font-medium ${theme === 'dark' ? 'text-violet-400' : 'text-violet-600'}`}>{maxRows.toLocaleString()}</span> rows per month.
          </p>

          <div className={`rounded-xl p-4 ${
            theme === 'dark'
              ? 'bg-slate-800/50 border border-slate-700'
              : 'bg-slate-50 border border-slate-200'
          }`}>
            <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
              Would you like to import only the first <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>{maxRows.toLocaleString()}</span> rows from this file?
            </p>
          </div>

          {/* Upgrade option */}
          <div className={`flex items-center justify-center gap-2 text-sm ${
            theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
          }`}>
            <span>Or would you like to</span>
            <Link
              href="/billing"
              className={`inline-flex items-center gap-1.5 font-medium transition-colors ${
                theme === 'dark'
                  ? 'text-violet-400 hover:text-violet-300'
                  : 'text-violet-600 hover:text-violet-500'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              upgrade your plan
            </Link>
            <span>?</span>
          </div>
        </div>

        {/* Actions */}
        <div className={`flex gap-3 p-4 border-t ${
          theme === 'dark'
            ? 'border-slate-700/50 bg-slate-800/30'
            : 'border-slate-100 bg-slate-50/50'
        }`}>
          <button
            onClick={onClose}
            className={`flex-1 px-4 py-2.5 font-medium rounded-xl border transition-colors ${
              theme === 'dark'
                ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
            }`}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-medium rounded-xl shadow-lg shadow-violet-500/20 transition-all"
          >
            Import {maxRows.toLocaleString()} Rows
          </button>
        </div>
      </div>
    </div>
  );
}

export function DataTable() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [rowLimitModal, setRowLimitModal] = useState<{
    isOpen: boolean;
    parsedData: DataRow[];
    fileName: string;
  }>({ isOpen: false, parsedData: [], fileName: '' });
  const { dataset, fileName, setDataset, setFileName, addMessage, incrementRowsProcessed, theme } =
    useStore();
  const { canProcessRows, limits, getRemainingRows } = useSubscription();

  const loadData = useCallback((data: DataRow[], name: string) => {
    setDataset(data);
    setFileName(name);
    incrementRowsProcessed(data.length);
    addMessage({
      role: 'system',
      content: `Loaded ${name} with ${data.length.toLocaleString()} rows.`,
    });
  }, [setDataset, setFileName, incrementRowsProcessed, addMessage]);

  const processFile = useCallback((file: File) => {
    // Check file type
    if (!file.name.endsWith('.csv')) {
      addMessage({
        role: 'error',
        content: 'Please upload a CSV file.',
      });
      return;
    }

    // Check file size limit
    if (file.size > limits.maxFileSize) {
      addMessage({
        role: 'error',
        content: `File too large. Maximum size is ${formatFileSize(limits.maxFileSize)}.`,
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const parsedData = parseCSV(text);
      const remainingRows = getRemainingRows();

      // Check row limit - show modal if exceeded
      if (!canProcessRows(parsedData.length)) {
        setRowLimitModal({
          isOpen: true,
          parsedData,
          fileName: file.name,
        });
        return;
      }

      loadData(parsedData, file.name);
    };
    reader.readAsText(file);
  }, [limits.maxFileSize, canProcessRows, getRemainingRows, loadData, addMessage]);

  const handleConfirmPartialImport = useCallback(() => {
    const remainingRows = getRemainingRows();
    const truncatedData = rowLimitModal.parsedData.slice(0, remainingRows);
    loadData(truncatedData, rowLimitModal.fileName);
    addMessage({
      role: 'system',
      content: `Imported first ${remainingRows.toLocaleString()} rows (${rowLimitModal.parsedData.length.toLocaleString()} total in file).`,
    });
    setRowLimitModal({ isOpen: false, parsedData: [], fileName: '' });
  }, [rowLimitModal, getRemainingRows, loadData, addMessage]);

  const handleCloseModal = useCallback(() => {
    setRowLimitModal({ isOpen: false, parsedData: [], fileName: '' });
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    processFile(file);
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  }, [processFile]);

  const handleExport = () => {
    const csv = convertToCSV(dataset);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cleaned_${fileName || 'data.csv'}`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const headers = dataset.length > 0 ? Object.keys(dataset[0]).filter((k) => k !== 'id') : [];
  const fileSize = dataset.length > 0 ? formatFileSize(getFileSize(dataset)) : '0 KB';

  return (
    <>
      {/* Row Limit Modal */}
      <RowLimitModal
        isOpen={rowLimitModal.isOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmPartialImport}
        totalRows={rowLimitModal.parsedData.length}
        maxRows={getRemainingRows()}
        fileName={rowLimitModal.fileName}
        theme={theme}
      />

      <div
        className={`flex flex-col h-full backdrop-blur-md border rounded-2xl overflow-hidden relative transition-all ${
          isDragOver
            ? 'border-violet-500 border-2 bg-violet-500/10'
            : theme === 'dark'
              ? 'border-slate-700/50 bg-slate-900/60 shadow-xl'
              : 'border-slate-200/80 bg-white/90 shadow-lg shadow-slate-200/50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {/* Drag overlay */}
        {isDragOver && (
        <div className="absolute inset-0 bg-violet-500/10 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-16 h-16 bg-violet-500/20 rounded-2xl flex items-center justify-center border-2 border-dashed border-violet-400">
              <Upload className="text-violet-400 w-8 h-8" />
            </div>
            <p className="text-violet-300 font-medium">Drop your CSV file here</p>
          </div>
        </div>
      )}
      {/* Header */}
      <div className={`p-4 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 ${
        theme === 'dark' ? 'border-slate-700/50 bg-slate-800/30' : 'border-slate-100 bg-slate-50/30'
      }`}>
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-xl border ${
            theme === 'dark'
              ? 'bg-slate-800 border-slate-700'
              : 'bg-gradient-to-br from-violet-500/10 to-indigo-500/10 border-violet-200/50'
          }`}>
            <FileSpreadsheet className="text-violet-600" size={20} />
          </div>
          <div>
            <h3 className={`font-semibold text-sm ${theme === 'dark' ? 'text-slate-200' : 'text-slate-800'}`}>
              {fileName || 'No File'}
            </h3>
            <p className={`text-xs ${theme === 'dark' ? 'text-slate-500' : 'text-slate-500'}`}>
              {fileSize} • {dataset.length} rows • CSV
            </p>
          </div>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <label className={`cursor-pointer group relative flex items-center justify-center flex-1 sm:flex-none px-4 py-2 text-sm font-medium rounded-xl border transition-all overflow-hidden ${
            theme === 'dark'
              ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700 shadow-sm'
              : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 shadow-sm hover:shadow-md hover:border-violet-300'
          }`}>
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 to-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <Upload size={16} className="mr-2 text-violet-600" />
            Import
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept=".csv"
              onChange={handleFileUpload}
            />
          </label>
          <Button
            variant="secondary"
            onClick={handleExport}
            disabled={dataset.length === 0}
            className="!py-2 !px-4 !text-sm flex-1 sm:flex-none"
          >
            <Download size={16} className="mr-2 text-slate-400" />
            Export
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 min-h-0 overflow-auto custom-scrollbar">
        <table className={`min-w-full divide-y ${theme === 'dark' ? 'divide-slate-700/50' : 'divide-slate-100'}`}>
          <thead className={`sticky top-0 z-10 backdrop-blur-sm ${theme === 'dark' ? 'bg-slate-800/90' : 'bg-slate-50/95'}`}>
            <tr>
              {headers.map((header) => (
                <th
                  key={header}
                  className={`px-4 sm:px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider border-b ${
                    theme === 'dark' ? 'text-slate-400 border-slate-700/50' : 'text-slate-500 border-slate-200/80'
                  }`}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={`bg-transparent divide-y ${theme === 'dark' ? 'divide-slate-800/50 text-slate-300' : 'divide-slate-100/80 text-slate-600'}`}>
            {dataset.map((row, idx) => (
              <tr key={idx} className={`transition-colors group ${theme === 'dark' ? 'hover:bg-slate-800/50' : 'hover:bg-violet-50/50'}`}>
                {headers.map((cell, cIdx) => (
                  <td
                    key={cIdx}
                    className={`px-4 sm:px-6 py-3 whitespace-nowrap text-sm truncate max-w-[150px] sm:max-w-[200px] transition-colors ${
                      theme === 'dark' ? 'group-hover:text-white' : 'group-hover:text-slate-900'
                    }`}
                    title={String(row[cell])}
                  >
                    {String(row[cell])}
                  </td>
                ))}
              </tr>
            ))}
            {dataset.length === 0 && (
              <tr>
                <td colSpan={headers.length || 5} className="px-6 py-24 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 border-2 border-dashed ${
                      theme === 'dark' ? 'bg-slate-800/50 border-slate-600' : 'bg-violet-50/50 border-violet-200'
                    }`}>
                      <Upload className={theme === 'dark' ? 'text-slate-500' : 'text-violet-400'} />
                    </div>
                    <p className={`font-semibold ${theme === 'dark' ? 'text-slate-400' : 'text-slate-700'}`}>No data loaded</p>
                    <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-slate-600' : 'text-slate-500'}`}>
                      Drag and drop a CSV file or click Import
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
}
