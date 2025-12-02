// ===========================================
// DATA TABLE COMPONENT
// ===========================================

'use client';

import React, { useRef } from 'react';
import { FileSpreadsheet, Upload, Download } from 'lucide-react';
import { Button } from '@/components/ui';
import { useStore } from '@/hooks/useStore';
import { useSubscription } from '@/hooks/useSubscription';
import { parseCSV, convertToCSV, formatFileSize, getFileSize } from '@/lib/csv';

export function DataTable() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { dataset, fileName, setDataset, setFileName, addMessage, incrementRowsProcessed } =
    useStore();
  const { canProcessRows, limits } = useSubscription();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

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

      // Check row limit
      if (!canProcessRows(parsedData.length)) {
        addMessage({
          role: 'error',
          content: `Row limit exceeded. Your plan allows ${limits.monthlyRows} rows per month. Consider upgrading to Pro for unlimited rows.`,
        });
        return;
      }

      setDataset(parsedData);
      setFileName(file.name);
      incrementRowsProcessed(parsedData.length);
      addMessage({
        role: 'system',
        content: `Loaded ${file.name} with ${parsedData.length} rows.`,
      });
    };
    reader.readAsText(file);

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

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
    <div className="flex flex-col h-full border-slate-700/50 bg-slate-900/60 backdrop-blur-md border rounded-2xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-slate-700/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-slate-800/30">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-slate-800 rounded-lg border border-slate-700">
            <FileSpreadsheet className="text-violet-400" size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-slate-200 text-sm">
              {fileName || 'No File'}
            </h3>
            <p className="text-xs text-slate-500">
              {fileSize} • {dataset.length} rows • CSV
            </p>
          </div>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <label className="cursor-pointer group relative flex items-center justify-center flex-1 sm:flex-none px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium rounded-xl border border-slate-700 transition-all shadow-sm overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 to-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <Upload size={16} className="mr-2 text-violet-400" />
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
      <div className="flex-1 overflow-auto custom-scrollbar">
        <table className="min-w-full divide-y divide-slate-700/50">
          <thead className="bg-slate-800/50 sticky top-0 z-10 backdrop-blur-sm">
            <tr>
              {headers.map((header) => (
                <th
                  key={header}
                  className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-700/50"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-transparent divide-y divide-slate-800/50 text-slate-300">
            {dataset.map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-800/50 transition-colors group">
                {headers.map((cell, cIdx) => (
                  <td
                    key={cIdx}
                    className="px-4 sm:px-6 py-3 whitespace-nowrap text-sm truncate max-w-[150px] sm:max-w-[200px] group-hover:text-white transition-colors"
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
                    <div className="w-16 h-16 bg-slate-800/50 rounded-2xl flex items-center justify-center mb-4 border border-slate-700">
                      <Upload className="text-slate-600" />
                    </div>
                    <p className="text-slate-400 font-medium">No data loaded</p>
                    <p className="text-slate-600 text-sm mt-1">
                      Import a CSV to begin cleaning
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
