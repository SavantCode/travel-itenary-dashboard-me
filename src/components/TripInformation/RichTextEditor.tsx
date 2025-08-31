// src/components/RichTextEditor.tsx

import React, { useEffect, useCallback } from 'react';
import { useEditor, EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import Image from '@tiptap/extension-image';
import { Bold, Italic, Underline, Link as LinkIcon, Image as ImageIcon, List, ListOrdered } from 'lucide-react';

const Toolbar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) return null;

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);
    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  const addImage = useCallback(() => {
    const url = window.prompt('Image URL');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  const buttonClass = (name: string, opts?: any) => 
    `p-2 rounded ${editor.isActive(name, opts) ? 'bg-gray-200 text-black' : 'hover:bg-gray-100 text-gray-600'}`;

  return (
    <div className="flex flex-wrap items-center gap-1 border border-b-0 border-gray-300 p-1 rounded-t-md bg-white">
      <button onClick={() => editor.chain().focus().toggleBold().run()} className={buttonClass('bold')}><Bold className="w-4 h-4" /></button>
      <button onClick={() => editor.chain().focus().toggleItalic().run()} className={buttonClass('italic')}><Italic className="w-4 h-4" /></button>
      <button onClick={() => editor.chain().focus().toggleUnderline().run()} className={buttonClass('underline')}><Underline className="w-4 h-4" /></button>
      <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={buttonClass('bulletList')}><List className="w-4 h-4" /></button>
      <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className={buttonClass('orderedList')}><ListOrdered className="w-4 h-4" /></button>
      <button onClick={setLink} className={buttonClass('link')}><LinkIcon className="w-4 h-4" /></button>
      <button onClick={addImage} className="p-2 rounded hover:bg-gray-100 text-gray-600"><ImageIcon className="w-4 h-4" /></button>
    </div>
  );
};

// --- THIS IS THE CRUCIAL PART THAT FIXES THE ERROR ---
// The props are now correctly defined as 'content' and 'onUpdate'.
interface RichTextEditorProps {
  content: string;
  onUpdate: (html: string) => void;
  placeholder?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ content, onUpdate, placeholder }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3] } }),
      Link.configure({ openOnClick: true, autolink: true }),
      Image,
      Placeholder.configure({ placeholder }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      onUpdate(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm max-w-none focus:outline-none w-full border border-gray-300 p-3 text-sm min-h-[120px] rounded-b-md',
      },
    },
  });
  
  // This useEffect ensures the editor stays in sync if the state is changed externally (e.g., by the "Trash" icon)
  useEffect(() => {
    if (editor && editor.getHTML() !== content) {
      editor.commands.setContent(content, false);
    }
  }, [content, editor]);

  return (
    <div>
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default RichTextEditor;