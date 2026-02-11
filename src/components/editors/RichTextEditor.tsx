"use client";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

// Type assertion needed due to version mismatch between ckeditor5-react and ckeditor5-build-classic
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Editor = ClassicEditor as any;

interface RichTextEditorProps {
  value: string;
  onChange: (data: string) => void;
  placeholder?: string;
}

export function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  return (
    <div className="ckeditor-wrapper">
      <CKEditor
        editor={Editor}
        data={value}
        config={{
          placeholder: placeholder || "Start typing...",
          toolbar: [
            "heading",
            "|",
            "bold",
            "italic",
            "link",
            "bulletedList",
            "numberedList",
            "|",
            "blockQuote",
            "|",
            "undo",
            "redo",
          ],
        }}
        onChange={(_, editor) => {
          // workaround for type issue - editor: any
          // ClassicEditor in ckeditor5-react at runtime has getData()
          const data = (editor as any).getData();
          onChange(data);
        }}
      />
    </div>
  );
}