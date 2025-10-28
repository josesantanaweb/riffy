'use client';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface EditorProps {
  value: string;
  setValue: (value: string) => void;
  label?: string;
}

const Editor = ({ value, setValue, label }: EditorProps) => {
  return (
    <div className="w-full gap-2 flex flex-col">
      {label && <label className="text-body-100 text-sm">{label}</label>}
      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        className="[&_.ql-stroke]:!stroke-base-300
                [&_.ql-editor]:!text-white
                [&_.ql-toolbar.ql-snow]:!rounded-t-md
                [&_.ql-toolbar.ql-snow]:!border-base-600
                [&_.ql-container.ql-snow]:!rounded-b-md
                [&_.ql-editor]:!h-28
                [&_.ql-picker-label]:!text-body-100
                [&_.ql-container.ql-snow]:!border-base-600"
      />
    </div>
  );
};

export default Editor;
