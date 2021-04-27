import React from 'react';
import { FaImage } from 'react-icons/fa';
import { useMessage } from 'ui/intl';
import { ids } from 'ui/messages';

export default function Empty({
  onFileSelect,
}: {
  onFileSelect(files: FileList);
}) {
  return (
    <label
      className="flex flex-col justify-center items-center space-y-4 text-gray-300 cursor-pointer hover:text-gray-100"
      onDragEnter={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
      onDragOver={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
      onDrop={(e) => {
        e.stopPropagation();
        e.preventDefault();
        const dt = e.dataTransfer;
        const { files } = dt;
        onFileSelect(files);
      }}
    >
      <FaImage size="4em" />
      <div>{useMessage(ids.elements.upload.placeholder)}</div>
      <input
        type="file"
        className="sr-only"
        onChange={(e) => onFileSelect(e.target.files)}
      />
    </label>
  );
}
