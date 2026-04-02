import React, { useRef, useCallback, useEffect, useState } from 'react';
import { Bold, Italic, Underline, Strikethrough, Link, Type, List, ListOrdered } from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  className?: string;
  minHeight?: string;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = 'Введите текст...',
  className = '',
  minHeight = '150px',
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [fontSize, setFontSize] = useState('3');
  const savedSelectionRef = useRef<Range | null>(null);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || '';
    }
  }, []);

  const handleInput = useCallback(() => {
    if (editorRef.current) {
      const html = editorRef.current.innerHTML;
      onChange(html === '<br>' ? '' : html);
    }
  }, [onChange]);

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    handleInput();
  };

  const saveSelection = () => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      savedSelectionRef.current = sel.getRangeAt(0).cloneRange();
    }
  };

  const restoreSelection = () => {
    const sel = window.getSelection();
    if (sel && savedSelectionRef.current) {
      sel.removeAllRanges();
      sel.addRange(savedSelectionRef.current);
    }
  };

  const handleLink = () => {
    saveSelection();
    setShowLinkInput(true);
    setLinkUrl('https://');
  };

  const applyLink = () => {
    if (linkUrl && linkUrl !== 'https://') {
      restoreSelection();
      document.execCommand('createLink', false, linkUrl);
      // Make links open in new tab
      if (editorRef.current) {
        const links = editorRef.current.querySelectorAll('a');
        links.forEach(link => {
          link.setAttribute('target', '_blank');
          link.setAttribute('rel', 'noopener noreferrer');
        });
      }
      handleInput();
    }
    setShowLinkInput(false);
    setLinkUrl('');
    editorRef.current?.focus();
  };

  const removeLink = () => {
    restoreSelection();
    document.execCommand('unlink', false);
    handleInput();
    setShowLinkInput(false);
    setLinkUrl('');
    editorRef.current?.focus();
  };

  const handleFontSize = (size: string) => {
    setFontSize(size);
    execCommand('fontSize', size);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      // Default behavior - insert <br> or new paragraph
    }
    // Ctrl+B, Ctrl+I, Ctrl+U shortcuts
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case 'b': e.preventDefault(); execCommand('bold'); break;
        case 'i': e.preventDefault(); execCommand('italic'); break;
        case 'u': e.preventDefault(); execCommand('underline'); break;
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const html = e.clipboardData.getData('text/html');
    const text = e.clipboardData.getData('text/plain');

    if (html) {
      // Clean pasted HTML - keep only safe tags
      const temp = document.createElement('div');
      temp.innerHTML = html;
      // Remove scripts, styles, etc.
      temp.querySelectorAll('script, style, meta, link').forEach(el => el.remove());
      document.execCommand('insertHTML', false, temp.innerHTML);
    } else {
      // Plain text - preserve line breaks
      const htmlText = text.replace(/\n/g, '<br>');
      document.execCommand('insertHTML', false, htmlText);
    }
    handleInput();
  };

  const ToolButton: React.FC<{ onClick: () => void; active?: boolean; title: string; children: React.ReactNode }> =
    ({ onClick, active, title, children }) => (
    <button
      type="button"
      onMouseDown={e => e.preventDefault()}
      onClick={onClick}
      title={title}
      className={`p-1.5 rounded hover:bg-gray-200 transition-colors ${active ? 'bg-gray-200 text-primary' : 'text-gray-600'}`}
    >
      {children}
    </button>
  );

  return (
    <div className={`border border-gray-300 rounded-lg overflow-hidden ${className}`}>
      {/* Toolbar */}
      <div className="flex items-center gap-0.5 px-2 py-1.5 bg-gray-50 border-b border-gray-200 flex-wrap">
        <ToolButton onClick={() => execCommand('bold')} title="Жирный (Ctrl+B)">
          <Bold className="w-4 h-4" />
        </ToolButton>
        <ToolButton onClick={() => execCommand('italic')} title="Курсив (Ctrl+I)">
          <Italic className="w-4 h-4" />
        </ToolButton>
        <ToolButton onClick={() => execCommand('underline')} title="Подчёркнутый (Ctrl+U)">
          <Underline className="w-4 h-4" />
        </ToolButton>
        <ToolButton onClick={() => execCommand('strikeThrough')} title="Зачёркнутый">
          <Strikethrough className="w-4 h-4" />
        </ToolButton>

        <div className="w-px h-5 bg-gray-300 mx-1" />

        <ToolButton onClick={handleLink} title="Вставить ссылку">
          <Link className="w-4 h-4" />
        </ToolButton>

        <div className="w-px h-5 bg-gray-300 mx-1" />

        <ToolButton onClick={() => execCommand('insertUnorderedList')} title="Маркированный список">
          <List className="w-4 h-4" />
        </ToolButton>
        <ToolButton onClick={() => execCommand('insertOrderedList')} title="Нумерованный список">
          <ListOrdered className="w-4 h-4" />
        </ToolButton>

        <div className="w-px h-5 bg-gray-300 mx-1" />

        <div className="flex items-center gap-1">
          <Type className="w-3.5 h-3.5 text-gray-500" />
          <select
            value={fontSize}
            onChange={e => handleFontSize(e.target.value)}
            onMouseDown={e => e.stopPropagation()}
            className="text-xs border border-gray-200 rounded px-1 py-0.5 bg-white text-gray-700"
            title="Размер шрифта"
          >
            <option value="1">Мелкий</option>
            <option value="2">Маленький</option>
            <option value="3">Обычный</option>
            <option value="4">Средний</option>
            <option value="5">Большой</option>
            <option value="6">Крупный</option>
            <option value="7">Огромный</option>
          </select>
        </div>
      </div>

      {/* Link input popup */}
      {showLinkInput && (
        <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 border-b border-blue-200">
          <span className="text-xs text-blue-700 font-medium">Ссылка:</span>
          <input
            type="url"
            value={linkUrl}
            onChange={e => setLinkUrl(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') applyLink(); if (e.key === 'Escape') { setShowLinkInput(false); editorRef.current?.focus(); }}}
            placeholder="https://example.com"
            className="flex-1 px-2 py-1 text-sm border border-blue-300 rounded"
            autoFocus
          />
          <button onClick={applyLink} className="px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700">Применить</button>
          <button onClick={removeLink} className="px-2 py-1 text-xs bg-red-100 text-red-600 rounded hover:bg-red-200">Убрать</button>
          <button onClick={() => { setShowLinkInput(false); editorRef.current?.focus(); }} className="px-2 py-1 text-xs bg-gray-200 text-gray-600 rounded hover:bg-gray-300">Отмена</button>
        </div>
      )}

      {/* Editor area */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        data-placeholder={placeholder}
        className="p-3 outline-none text-sm leading-relaxed"
        style={{ minHeight }}
        suppressContentEditableWarning
      />

      <style>{`
        [contenteditable][data-placeholder]:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
          pointer-events: none;
        }
        [contenteditable] a {
          color: #2563eb;
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};
