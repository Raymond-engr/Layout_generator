import React from 'react';
import html2canvas from 'html2canvas';
import { GridItem, Dimensions } from '../../types/types';

interface PreviewProps {
  items: GridItem[];
  dimensions: Dimensions;
  onClose: () => void;
}

const PreviewPage: React.FC<PreviewProps> = ({ items, dimensions, onClose }) => {
  const handleDownload = async () => {
    const element = document.getElementById('preview-grid');
    if (!element) return;

    const canvas = await html2canvas(element);
    const link = document.createElement('a');
    link.download = 'grid-preview.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="fixed inset-0 bg-white z-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between mb-4">
          <h2 className="text-2xl font-bold">Preview</h2>
          <div className="flex gap-4">
            <button
              onClick={handleDownload}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Download
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Close
            </button>
          </div>
        </div>

        <div id="preview-grid" className="grid gap-1">
          {items.map(item => (
            <div
              key={item.id}
              className="bg-gray-200"
              style={{
                width: `${item.width}px`,
                height: `${item.height}px`,
              }}
            />
          ))}
        </div>

        <div className="mt-4 text-sm text-gray-600">
          <div>Dimensions: {dimensions.width}mm x {dimensions.height}mm</div>
          <div>{items.length} tiles</div>
        </div>
      </div>
    </div>
  );
};

export default PreviewPage;