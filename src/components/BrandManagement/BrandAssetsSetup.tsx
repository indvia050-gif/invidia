import { useState } from 'react';
import { ChevronRight, ChevronLeft, Upload, X } from 'lucide-react';
import { fonts, aiColors, colors } from '../../utils/BrandManagementconstants';

interface BrandAssetSetupProps {
  isOpen: boolean;
  onClose: () => void;
}

const BrandAssetSetup = ({ isOpen, onClose }: BrandAssetSetupProps) => {
  const [step, setStep] = useState(1);
  const [uploadedLogo, setUploadedLogo] = useState(false);
  const [selectedColors, setSelectedColors] = useState<{ [key: string]: boolean }>({});
  const [selectedFonts, setSelectedFonts] = useState<{ [key: string]: boolean }>({});

  if (!isOpen) return null;

  const handleStepClick = (stepNum: number) => {
    if (stepNum < step) setStep(stepNum);
  };

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const isStepComplete = (stepNum: number) => {
    if (stepNum === 1) return uploadedLogo;
    if (stepNum === 2) return Object.values(selectedColors).some(v => v);
    if (stepNum === 3) return Object.values(selectedFonts).some(v => v);
    return false;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="bg-indigo-500 text-white p-4 flex items-center justify-between sticky top-0 z-10">
          <div />
          <button onClick={onClose} className="hover:bg-indigo-600 p-2 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Brand Asset Setup</h1>
          <p className="text-sm text-gray-500 mb-8">Complete These Steps To Set Up Your Brand Assets</p>

          <div className="flex items-center justify-between mb-8">
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="flex items-center flex-1">
                <button
                  onClick={() => handleStepClick(num)}
                  className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold text-sm cursor-pointer transition ${
                    step === num
                      ? 'bg-indigo-500 text-white'
                      : isStepComplete(num)
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {isStepComplete(num) && step > num ? '✓' : num}
                </button>
                <span className="text-sm font-medium text-gray-700 ml-2">
                  {num === 1 && 'Upload Logo'}
                  {num === 2 && 'Define Color'}
                  {num === 3 && 'Select Fonts'}
                  {num === 4 && 'Brand Guidelines'}
                </span>
                {num < 4 && <div className="flex-1 h-1 bg-gray-200 mx-4" />}
              </div>
            ))}
          </div>

          {step === 1 && (
            <div className="border border-gray-200 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload Your Logo</h2>
              <p className="text-sm text-gray-500 mb-8">Upload Your brand logo in various formats (SVG, PNG, JPG)</p>

              <div className="mb-8">
                <label className="text-sm font-medium text-gray-700 mb-4 block">Upload Logo</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-indigo-500 cursor-pointer transition">
                  <Upload className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                  <p className="text-gray-700 font-medium mb-2">Upload Logo</p>
                  <p className="text-xs text-gray-400">PNG,JPG (Max 10MB)</p>
                  <input
                    type="file"
                    className="hidden"
                    onChange={() => setUploadedLogo(true)}
                  />
                </div>
              </div>

              {uploadedLogo && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Uploaded</h3>
                  <div className="flex gap-4">
                    <div className="border-4 border-indigo-500 rounded-lg p-4 w-24 h-24 flex items-center justify-center bg-gradient-to-br from-indigo-400 to-pink-500">
                      <div className="text-white text-center text-xs font-bold">Individia Logo</div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Individia Logo</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {step === 2 && (
            <div className="border border-gray-200 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Define Brand Colors</h2>
              <p className="text-sm text-gray-500 mb-8">Set your brand color palette for consistent use</p>

              <div className="mb-8">
                <div className="grid grid-cols-4 gap-4 mb-8">
                  {colors.map((color) => (
                    <div key={color.id} className="text-center">
                      <div
                        className="w-full h-24 rounded-lg mb-3 cursor-pointer border-4 border-transparent hover:border-indigo-500 transition"
                        style={{ backgroundColor: color.hex }}
                      >
                        <div className="flex items-center justify-center h-full text-white text-xs font-semibold">{color.hex}</div>
                      </div>
                      <p className="text-sm font-medium text-gray-900">{color.name}</p>
                    </div>
                  ))}
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-6">AI Recommended</h3>
                <p className="text-sm text-gray-500 mb-6">AI Recommended color palette</p>
                <div className="grid grid-cols-4 gap-4">
                  {aiColors.map((color) => (
                    <div key={color.id} className="text-center">
                      <div
                        className="w-full h-24 rounded-lg mb-3 cursor-pointer border-4 border-transparent hover:border-indigo-500 transition"
                        style={{ backgroundColor: color.hex }}
                      >
                        <div className="flex items-center justify-center h-full text-white text-xs font-semibold">{color.hex}</div>
                      </div>
                      <p className="text-sm font-medium text-gray-900">{color.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="border border-gray-200 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Select Brand Fonts</h2>
              <p className="text-sm text-gray-500 mb-8">Choose fonts that represent your brand identity</p>

              <div className="grid grid-cols-3 gap-6">
                {fonts.map((font) => (
                  <div
                    key={font.name}
                    onClick={() =>
                      setSelectedFonts({
                        ...selectedFonts,
                        [font.name]: !selectedFonts[font.name as keyof typeof selectedFonts],
                      })
                    }
                    className={`p-6 border-2 rounded-lg cursor-pointer transition ${
                      selectedFonts[font.name as keyof typeof selectedFonts]
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-gray-200 hover:border-indigo-300'
                    }`}
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{font.name}</h3>
                    <p className="text-xs text-gray-600 mb-2">{font.description}</p>
                    <p className="text-xs text-gray-600">{font.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="border border-gray-200 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Upload Brand Guidelines</h2>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-indigo-500 cursor-pointer transition">
                <Upload className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <p className="text-gray-700 font-medium mb-2">Upload Brand Guidelines</p>
                <p className="text-xs text-gray-400">PDF, DOC(Max 10MB)</p>
                <input type="file" className="hidden" />
              </div>
            </div>
          )}

          <div className="flex items-center justify-between mt-8 border-t border-gray-200 pt-6">
            <button
              onClick={handleBack}
              disabled={step === 1}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </button>

            <button
              onClick={handleNext}
              disabled={!isStepComplete(step)}
              className="flex items-center gap-2 px-6 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {step === 4 ? 'Complete' : 'Next'}
              {step !== 4 && <ChevronRight className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default BrandAssetSetup;
