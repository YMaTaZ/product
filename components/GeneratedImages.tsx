
import React from 'react';
import { ImageIcon } from './icons/ImageIcon';
import Spinner from './Spinner';

interface GeneratedImagesProps {
    onGenerateImage: () => void;
    image: string | null;
    isLoading: boolean;
}

const GeneratedImages: React.FC<GeneratedImagesProps> = ({ onGenerateImage, image, isLoading }) => {
    
    return (
        <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
                <div>
                    <h2 className="text-xl font-bold text-gray-800">Product Vision</h2>
                    <p className="text-sm text-gray-500">An AI-generated image illustrating the app concept.</p>
                </div>
                {!image && (
                     <button
                        onClick={onGenerateImage}
                        disabled={isLoading}
                        className="flex items-center justify-center bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-400 disabled:cursor-not-allowed whitespace-nowrap"
                    >
                        <ImageIcon />
                        <span className="ml-2">{isLoading ? 'Generating...' : 'Generate Vision Image'}</span>
                    </button>
                )}
            </div>

            {isLoading && (
                 <div className="flex flex-col items-center justify-center min-h-[200px] space-y-3">
                    <Spinner />
                    <p className="text-sm text-gray-600 animate-pulse">Generating product vision... this may take a moment.</p>
                </div>
            )}

            {image && !isLoading && (
                <div className="mt-4">
                   <div className="border border-gray-200 rounded-lg p-3 bg-gray-50">
                        <img 
                            src={image} 
                            alt="AI-generated product vision"
                            className="rounded-md w-full h-auto object-cover aspect-video"
                        />
                   </div>
                </div>
            )}
        </div>
    );
};

export default GeneratedImages;