import { ParsedLogEntry, LogData } from '../types';

export const parseLogFile = (text: string): ParsedLogEntry[] => {
  const lines = text.split('\n').filter((line) => line.trim() !== '');
  
  const parsedData: ParsedLogEntry[] = [];

  lines.forEach((line) => {
    try {
      // Find the first colon which separates the filename from the JSON
      const firstColonIndex = line.indexOf(':');
      
      if (firstColonIndex === -1) return;

      const filename = line.substring(0, firstColonIndex).trim();
      const jsonString = line.substring(firstColonIndex + 1).trim();
      
      const jsonData: LogData = JSON.parse(jsonString);

      // Create a shorter name for charts (e.g., "apis/Chat.json" -> "Chat")
      const shortName = filename.split('/').pop()?.replace('.json', '') || filename;

      parsedData.push({
        ...jsonData,
        filename,
        shortName,
        total_tokens: jsonData.tokens_prompt + jsonData.tokens_completion,
        native_total_tokens: jsonData.native_tokens_prompt + jsonData.native_tokens_completion,
      });
    } catch (error) {
      console.error("Failed to parse line:", line, error);
      // Skip malformed lines
    }
  });

  return parsedData;
};

export const formatCurrency = (val: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 4,
  }).format(val);
};

export const formatNumber = (val: number) => {
  return new Intl.NumberFormat('en-US').format(val);
};

export const formatDuration = (ms: number) => {
  return (ms / 1000).toFixed(2) + 's';
};