
import React from 'react';
import { UploadIcon } from './icons/UploadIcon';

interface DataImporterProps {
  onDataImport: () => void;
}

const DataImporter: React.FC<DataImporterProps> = ({ onDataImport }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center text-center">
      <div className="bg-brand-secondary p-4 rounded-full mb-4">
        <UploadIcon />
      </div>
      <h3 className="text-lg font-bold text-gray-800 mb-1">Import Your Data</h3>
      <p className="text-sm text-gray-500 mb-4">Load your glucose readings to get started.</p>
      <button
        onClick={onDataImport}
        className="w-full bg-brand-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary"
      >
        Load Demo Data
      </button>
      <p className="text-xs text-gray-400 mt-3">This will load 30 days of sample data.</p>
    </div>
  );
};

export default DataImporter;
