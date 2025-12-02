// ===========================================
// CSV UTILITIES
// ===========================================

import { DataRow } from '@/types';

export function parseCSV(text: string): DataRow[] {
  const lines = text.split('\n').filter((line) => line.trim() !== '');
  if (lines.length === 0) return [];

  // Parse header row
  const headers = parseCSVLine(lines[0]);

  // Parse data rows
  return lines.slice(1).map((line, idx) => {
    const values = parseCSVLine(line);
    const row: DataRow = { id: idx };
    headers.forEach((header, i) => {
      row[header] = values[i] || '';
    });
    return row;
  });
}

// Parse a single CSV line, handling quoted values
function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const nextChar = line[i + 1];

    if (char === '"' && inQuotes && nextChar === '"') {
      // Escaped quote
      current += '"';
      i++;
    } else if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }

  result.push(current.trim());
  return result;
}

export function convertToCSV(data: DataRow[]): string {
  if (!data || data.length === 0) return '';

  const headers = Object.keys(data[0]).filter((k) => k !== 'id');

  const csvRows = [
    headers.join(','),
    ...data.map((row) =>
      headers
        .map((fieldName) => {
          const value = row[fieldName];
          const stringValue = value?.toString() || '';
          // Escape quotes and wrap in quotes if contains comma, quote, or newline
          if (
            stringValue.includes(',') ||
            stringValue.includes('"') ||
            stringValue.includes('\n')
          ) {
            return `"${stringValue.replace(/"/g, '""')}"`;
          }
          return stringValue;
        })
        .join(',')
    ),
  ];

  return csvRows.join('\n');
}

export function getFileSize(data: DataRow[]): number {
  return new Blob([convertToCSV(data)]).size;
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}
