import { useState, useRef } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { fonts, colorPalettes, aiRecommendedPalettes } from '../../utils/BrandManagementconstants';

const BrandAssetSetup = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const guidelinesInputRef = useRef<HTMLInputElement>(null);
  const [step, setStep] = useState(1);
  const [uploadedLogo, setUploadedLogo] = useState(false);
  const [logoFileName, setLogoFileName] = useState<string | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [selectedColors, setSelectedColors] = useState<Set<string>>(new Set());
  const [selectedFonts, setSelectedFonts] = useState<string | null>(null);
  const [uploadedGuidelines, setUploadedGuidelines] = useState(false);
  const [guidelinesFileName, setGuidelinesFileName] = useState<string | null>(null);

  const stepLabels = ['Upload Logo', 'Define Color', 'Select Fonts', 'Brand Guidelines'];

  const handleStepClick = (stepNum: number) => stepNum < step && setStep(stepNum);
  const handleNext = () => step < 4 && setStep(step + 1);
  const handleBack = () => step > 1 && setStep(step - 1);

  const isStepComplete = (stepNum: number) => {
    switch (stepNum) {
      case 1: return uploadedLogo;
      case 2: return selectedColors.size > 0;
      case 3: return selectedFonts !== null;
      case 4: return uploadedGuidelines;
      default: return false;
    }
  };

  const toggleSelection = (set: Set<string>, setter: (s: Set<string>) => void, id: string) => {
    setter(new Set(set.has(id) ? [...set].filter(x => x !== id) : [...set, id]));
  };

  const toggleFontSelection = (fontName: string) => {
    setSelectedFonts(selectedFonts === fontName ? null : fontName);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 max-w-7xl mx-auto p-3 mb-2 mr-2">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-[#5D586C] mb-1">Brand Asset Setup</h1>
        <p className="text-sm text-[#5D586C]">Complete These Steps To Set Up Your Brand Assets</p>
      </div>

      <div className="flex items-center justify-between mb-8">
        {[1, 2, 3, 4].map((num) => {
          const isActive = step === num;
          const isComplete = isStepComplete(num) && step > num;
          return (
            <div key={num} className="flex items-center flex-1">
              <div
                className={` flex w-[90%] h-[5vh] items-center px-4 py-2 rounded-lg border transition-all duration-150 cursor-pointer ${
                  isActive
                    ? 'bg-white shadow-sm'
                    : 'bg-gray-50 border-gray-200'
                }`}
                onClick={() => handleStepClick(num)}
              >
                <span
                  className={`flex items-center justify-center w-6 h-6 rounded-full font-semibold text-sm mr-3 border ${
                    isActive
                      ? 'bg-[#5087FF] text-white border-[#5087FF]'
                      : isComplete
                      ? 'bg-green-500 text-white border-green-500'
                      : 'bg-white text-[#5D586C] border-gray-300'
                  }`}
                >
                  {isComplete ? '✓' : num}
                </span>
                <span className={`text-sm truncate`}>{stepLabels[num - 1]}</span>
                {isActive && (
                  <ChevronRight className="w-4 h-4 ml-2" />
                )}
              </div>
              {/* {num < 4 && <div className="flex-1 h-1 bg-gray-100 mx-4" />} */}
            </div>
          );
        })}
      </div>

      {step === 1 && (
        <div className="border border-gray-200 rounded-lg p-3">
          <h2 className="text-2xl font-bold text-[#5D586C] mb-2">Upload Your Logo</h2>
          <p className="text-sm text-[#5D586C] mb-8">Upload Your brand logo in various formats (SVG, PNG, JPG)</p>

          <div className="mb-4">
            <label className="text-sm font-medium text-gray-700 mb-4 block">Upload Logo</label>
            <div
              className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-[#5087FF] cursor-pointer transition"
              onClick={() => fileInputRef.current?.click()}
            >
              <img src="/upload.png" alt="Upload Logo" className="w-16 h-16 mx-auto mb-4" />
              <p className="text-gray-700 font-medium mb-2">Upload Logo</p>
              <p className="text-xs text-gray-400">PNG,JPG (Max 10MB)</p>
              <input
                type="file"
                className="hidden"
                ref={fileInputRef}
                accept="image/png, image/jpeg, image/svg+xml"
                onChange={e => {
                  if (e.target.files && e.target.files.length > 0) {
                    const file = e.target.files[0];
                    setUploadedLogo(true);
                    setLogoFileName(file.name);
                    setLogoPreview(URL.createObjectURL(file));
                  }
                }}
              />
            </div>
          </div>

          {uploadedLogo && (
            <div>
              <h3 className="text-md font-semibold text-[#5D586C] mb-2">Uploaded</h3>
              <div className="flex flex-col gap-2">
                <div className="border rounded-lg p-1 w-24 h-24 flex items-center justify-center">
                  {logoPreview ? (
                    <img src={logoPreview} alt={logoFileName || 'Logo'} className="w-[100%] h-[100%] rounded" />
                  ) : (
                    <div className="text-white text-center text-xs font-bold">{logoFileName || 'Logo Uploaded'}</div>
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{logoFileName || 'Logo Uploaded'}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {step === 2 && (
        <div className="border border-gray-200 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-[#5D586C] mb-2">Define Brand Colors</h2>
          <p className="text-sm text-[#6F6B7D] mb-8">Set your brand color palette for consistent use</p>

          <div className="mb-12">
            <div className="grid grid-cols-4 gap-6">
              {colorPalettes.map((palette) => (
                <div key={palette.id} className="relative">
                  <div className="flex justify-center text-center mb-3 relative top-[14%] ">
                    <h3 className="text-sm border bg-white rounded-lg text-[#5D586C] p-1">{palette.label}</h3>
                  </div>
                  <div
                    onClick={() => toggleSelection(selectedColors, setSelectedColors, palette.id)}
                    className={`border rounded-xl overflow-hidden p-4 cursor-pointer transition ${
                      selectedColors.has(palette.id) ? 'border-[#5087FF] shadow-lg' : 'border-gray-200 hover:border-[#5087FF]/50'
                    }`}
                  >
                    <div className="flex gap-3">
                      <div className="flex-1 ">
                        <div className="text-xs text-gray-500 text-center bg-white">Main Color</div>
                        <div
                          className="h-[110px] flex items-end rounded-lg justify-center "
                          style={{ backgroundColor: palette.mainColor.hex }}
                        >
                          <span className="text-xs border font-medium bg-white text-[#6F6B7D] px-2 relative top-2 rounded">
                            {palette.mainColor.code}
                          </span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="text-xs text-gray-500 text-center bg-white">Accent</div>
                        <div 
                          className="h-[110px] flex items-end rounded-lg justify-center"
                          style={{ backgroundColor: palette.accentColor.hex }}
                        >
                           <span className="text-xs border font-medium bg-white text-[#6F6B7D] px-2 relative top-2 rounded">
                            {palette.accentColor.code}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-[#5D586C] mb-1">AI Recommended</h3>
            <p className="text-sm text-[#6F6B7D] mb-6">AI Recommended color palette</p>
            <div className="grid grid-cols-4 gap-6">
              {aiRecommendedPalettes.map((palette) => (
                <div key={palette.id} className="relative">
                  <div className="flex justify-center text-center mb-3  relative top-[14%]">
                    <h3 className="text-sm border bg-white rounded-lg text-[#5D586C] p-1">{palette.label}</h3>
                  </div>
                  <div
                    onClick={() => toggleSelection(selectedColors, setSelectedColors, palette.id)}
                     className={`border rounded-xl overflow-hidden p-3 cursor-pointer transition ${
                      selectedColors.has(palette.id) ? 'border-[#5087FF] shadow-lg' : 'border-gray-200 hover:border-[#5087FF]/50'
                    }`}
                  >
                  <div className="flex gap-3">
                      <div className="flex-1 ">
                        <div className="text-xs text-gray-500 text-center bg-white">Main Color</div>
                        <div
                          className="h-[110px] flex items-end rounded-lg justify-center "
                          style={{ backgroundColor: palette.mainColor.hex }}
                        >
                          <span className="text-xs border font-medium bg-white text-[#6F6B7D] px-2 relative top-2 rounded">
                            {palette.mainColor.code}
                          </span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="text-xs text-gray-500 text-center bg-white">Accent</div>
                        <div 
                          className="h-[110px] flex items-end rounded-lg justify-center"
                          style={{ backgroundColor: palette.accentColor.hex }}
                        >
                           <span className="text-xs border font-medium bg-white text-[#6F6B7D] px-2 relative top-2 rounded">
                            {palette.accentColor.code}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="border border-gray-200 rounded-lg p-3">
          <h2 className="text-2xl font-bold text-[#5D586C] mb-2">Select Brand Fonts</h2>
          <p className="text-sm text-[#5D586C] mb-4">Choose fonts that represent your brand identity</p>

          <div className="grid grid-cols-3 gap-6">
            {fonts.map((font) => (
              <div
                key={font.name}
                onClick={() => toggleFontSelection(font.name)}
                className={`p-2 border-2 rounded-lg cursor-pointer transition ${
                  selectedFonts === font.name
                    ? 'border-[#5087FF] bg-[#5087FF]/10'
                    : 'border-gray-200 hover:border-[#5087FF]/70'
                }`}
              >
                <h3
                  className="text-lg font-semibold text-[#5D586C] mb-1"
                  style={{ fontFamily: font.font }}
                >
                  {font.name}
                </h3>
                <p className="text-xs text-gray-600"  
                style={{ fontFamily: font.font }}
                >{font.description}</p>
                 <p className="text-xs text-gray-600"  
                style={{ fontFamily: font.font }}>{font.description}</p>
              </div>
              
            ))}
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="border border-gray-200 rounded-lg p-3">
          <h2 className="text-2xl font-bold text-[#5D586C] mb-8">Upload Brand Guidelines</h2>

          <div className="mb-4">
            <div
              className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-[#5087FF] cursor-pointer transition"
              onClick={() => guidelinesInputRef.current?.click()}
            >
              <img src="/upload.png" alt="Upload Guidelines" className="w-16 h-16 mx-auto mb-4" />
              <p className="text-gray-700 font-medium mb-2">Upload Brand Guidelines</p>
              <p className="text-xs text-gray-400">PDF, DOC(Max 10MB)</p>
              <input
                type="file"
                className="hidden"
                ref={guidelinesInputRef}
                accept="application/pdf,.doc,.docx"
                onChange={e => {
                  if (e.target.files && e.target.files.length > 0) {
                    const file = e.target.files[0];
                    setUploadedGuidelines(true);
                    setGuidelinesFileName(file.name);
                  }
                }}
              />
            </div>
          </div>

          {uploadedGuidelines && (
            <div>
              <h3 className="text-md font-semibold text-[#5D586C] mb-2">Uploaded</h3>
              <div className="flex flex-col gap-2">
                <div className="border rounded-lg p-4 flex items-center justify-center">
                  <div className="text-gray-700 text-center text-sm font-medium">{guidelinesFileName || 'Guidelines Uploaded'}</div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{guidelinesFileName || 'Guidelines Uploaded'}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="flex items-center justify-between mt-8 pt-6">
        
        <button
          onClick={handleBack}
          disabled={step === 1}
          className={`flex items-center gap-2 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed ${step === 1 ? 'invisible' : ''}`}
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </button>

        <button
          onClick={handleNext}
          className={`flex items-center gap-2 px-6 py-2 bg-[#5087FF] text-white rounded-lg hover:bg-[#3D6CE8] disabled:opacity-50 disabled:cursor-not-allowed`}
          disabled={!isStepComplete(step)}
        >
          {step === 4 ? 'Complete' : 'Next'}
          {step !== 4 && <ChevronRight className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}

export default BrandAssetSetup;
