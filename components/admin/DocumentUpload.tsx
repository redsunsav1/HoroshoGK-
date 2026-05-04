import React, { useState, useRef } from 'react';
import { Upload, X, Loader2, Check, FileText } from 'lucide-react';

interface DocumentUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  placeholder?: string;
  className?: string;
  hint?: string;
}

const API_BASE = typeof window !== 'undefined'
  ? (window.location.hostname === 'localhost' ? 'http://localhost:3001' : '')
  : '';

const ALLOWED_EXT = /\.(pdf|doc|docx|xls|xlsx|ppt|pptx|txt|rtf|zip)$/i;

export const DocumentUpload: React.FC<DocumentUploadProps> = ({
  value,
  onChange,
  label,
  placeholder = 'Выберите файл или введите URL',
  className = '',
  hint,
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (file: File) => {
    if (!ALLOWED_EXT.test(file.name)) {
      setError('Допустимые форматы: PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX, TXT, RTF, ZIP');
      return;
    }
    if (file.size > 25 * 1024 * 1024) {
      setError('Максимальный размер: 25 МБ');
      return;
    }

    setIsUploading(true);
    setError(null);
    setUploadSuccess(false);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(`${API_BASE}/api/upload-document`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errBody = await response.json().catch(() => ({}));
        throw new Error(errBody.error || 'Ошибка загрузки');
      }

      const data = await response.json();
      onChange(data.url);
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 2000);
    } catch (err: any) {
      setError(err.message || 'Не удалось загрузить файл.');
      console.error('Upload error:', err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => setIsDragOver(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) handleFileSelect(files[0]);
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
    setError(null);
  };

  const clearFile = () => {
    onChange('');
    setError(null);
  };

  const fileName = value ? value.split('/').pop() : '';

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-sm font-bold text-gray-700">{label}</label>
      )}

      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
        className={`
          relative border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-all
          ${isDragOver ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-gray-400'}
          ${isUploading ? 'pointer-events-none opacity-70' : ''}
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.rtf,.zip"
          onChange={handleInputChange}
          className="hidden"
        />

        {isUploading ? (
          <div className="flex items-center justify-center gap-2 text-gray-500">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Загрузка...</span>
          </div>
        ) : uploadSuccess ? (
          <div className="flex items-center justify-center gap-2 text-green-600">
            <Check className="w-5 h-5" />
            <span>Загружено!</span>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2 text-gray-500">
            <Upload className="w-5 h-5" />
            <span className="text-sm">
              Перетащите файл сюда или <span className="text-primary underline">выберите</span>
            </span>
          </div>
        )}
      </div>

      <div className="flex gap-2 items-center">
        <div className="flex-1 relative">
          <input
            type="text"
            value={value}
            onChange={handleUrlChange}
            placeholder={placeholder}
            className="w-full p-3 pr-10 border border-gray-300 rounded-lg text-sm"
          />
          {value && (
            <button
              onClick={clearFile}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 rounded"
              type="button"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="w-14 h-14 border rounded-lg bg-gray-100 shrink-0 flex flex-col items-center justify-center text-gray-400">
          <FileText className="w-5 h-5" />
          {fileName && <span className="text-[8px] mt-1 px-1 truncate w-full text-center">{fileName.split('-').pop()?.slice(0, 6)}</span>}
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-500 flex items-center gap-1">
          <X className="w-4 h-4" />
          {error}
        </p>
      )}

      <p className="text-xs text-gray-400">
        PDF, DOC, XLS, PPT, ZIP до 25 МБ. {hint || ''}
      </p>
    </div>
  );
};
