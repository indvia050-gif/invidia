import { CiSearch } from "react-icons/ci";
import { useState } from "react";
import modules_00 from "/modules/modules_00.png";
import modules_01 from "/modules/modules_01.png";
import modules_02 from "/modules/modules_02.png";
import modules_03 from "/modules/modules_03.png";
import modules_04 from "/modules/modules_04.png";
import modules_05 from "/modules/modules_05.png";
import modules_06 from "/modules/modules_06.png";
import modules_07 from "/modules/modules_07.png";
import modules_08 from "/modules/modules_08.png";
import modules_09 from "/modules/modules_09.png";

function Modules() {
    const [dragPreview, setDragPreview] = useState<string | null>(null);

    return (
         <div className='lg:w-[362px] absolute left-0 lg:left-[100px] bottom-[200px] lg:bottom-[initial] z-20'>
              <div className='border border-[#CFCFCF] bg-white rounded-lg p-4 h-[300px] lg:h-screen overflow-y-scroll'>
                  <div className='mb-3'>
                    <h3 className='text-[22px] leading-[32px] text-[#414141] font-medium pb-0'>Modules</h3>
                    <p className='text-[16px] leading-[26px] text-[#818181] font-medium pb-2'>Drag & Drop</p>
                  </div>

                  <div className='search_section flex items-center gap-2 mb-5'>
                    <CiSearch className='text-2xl mx-2' />
                    <input 
                        type="text" 
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        placeholder='Search' 
                    />
                  </div>

                  {/* Empty Block */}
                  <div className='mt-3'>
                    <div
                      className='text-center border-b border-[#e8e8e8] cursor-grab hover:bg-gray-50 active:cursor-grabbing pb-2'
                      draggable
                      onDragStart={(e) => {
                        e.dataTransfer.setData('template', JSON.stringify({
                          templateKey: 'emptyBlock',
                          name: 'Empty Block'
                        }));
                        setDragPreview('Empty Block');
                      }}
                      onDragEnd={() => setDragPreview(null)}
                    >
                      <div className='pointer-events-none'>
                        <img src={modules_00} alt="modules_00" className='mb-0 inline-block' />
                        <p className='text-[16px] leading-[26px] text-[#A5A2AD] font-medium pb-2'>Empty Block</p>
                      </div>
                    </div>
                  </div>

                  {/* Item Recommendation */}
                  <div className='mt-3'>
                    <p className='text-[16px] leading-[26px] text-[#414141] font-medium pb-2'>Item recommendation</p>
                    <div
                      className='text-center border-b border-[#e8e8e8] cursor-grab hover:bg-gray-50 active:cursor-grabbing pb-2'
                      draggable
                      onDragStart={(e) => {
                        e.dataTransfer.setData('template', JSON.stringify({
                          templateKey: 'itemrecomndationTemplate',
                          name: 'Item Recommendation Block'
                        }));
                        setDragPreview('Item Recommendation Block');
                      }}
                      onDragEnd={() => setDragPreview(null)}
                    >
                      <div className='pointer-events-none'>
                        <img src={modules_01} alt="modules_01" className='mb-0 inline-block' />
                        <p className='text-[16px] leading-[26px] text-[#A5A2AD] font-medium pb-2'>Item recommendation Block</p>
                      </div>
                    </div>
                  </div>

                  {/* Category Recommendation */}
                  <div className='mt-3'>
                    <div
                      className='text-center border-b border-[#e8e8e8] cursor-grab hover:bg-gray-50 active:cursor-grabbing pb-2'
                      draggable
                      onDragStart={(e) => {
                        e.dataTransfer.setData('template', JSON.stringify({
                          templateKey: 'cateRecBlock',
                          name: 'Category Recommendation Block'
                        }));
                        setDragPreview('Category Recommendation Block');
                      }}
                      onDragEnd={() => setDragPreview(null)}
                    >
                      <div className='pointer-events-none'>
                        <img src={modules_02} alt="modules_02" className='mb-0 inline-block' />
                        <p className='text-[16px] leading-[26px] text-[#A5A2AD] font-medium pb-2'>Category recommendation Block</p>
                      </div>
                    </div>
                  </div>

                  {/* Layout 3 */}
                  <div className='mt-3'>
                    <div
                      className='text-center border-b border-[#e8e8e8] cursor-grab hover:bg-gray-50 active:cursor-grabbing pb-2'
                      draggable
                      onDragStart={(e) => {
                        e.dataTransfer.setData('template', JSON.stringify({
                          templateKey: 'categoryTemplate',
                          name: 'Layout 3'
                        }));
                        setDragPreview('Layout 3');
                      }}
                      onDragEnd={() => setDragPreview(null)}
                    >
                      <div className='pointer-events-none'>
                        <img src={modules_04} alt="modules_04" className='mb-0 inline-block' />
                        <p className='text-[16px] leading-[26px] text-[#A5A2AD] font-medium pb-2'>Layout 3</p>
                      </div>
                    </div>
                  </div>

                  {/* Benefit Block */}
                  <div className='mt-3 border-b border-[#e8e8e8]'>
                    <p className='text-[16px] leading-[26px] text-[#414141] font-medium pb-2'>Benefit Block</p>

                    {/* Benefit Layout 1 */}
                    <div
                      className='text-center mb-3 cursor-grab hover:bg-gray-50 active:cursor-grabbing pb-2'
                      draggable
                      onDragStart={(e) => {
                        e.dataTransfer.setData('template', JSON.stringify({
                          templateKey: 'threeColTemp',
                          name: 'Benefit Layout 1'
                        }));
                        setDragPreview('Benefit Layout 1');
                      }}
                      onDragEnd={() => setDragPreview(null)}
                    >
                      <div className='pointer-events-none'>
                        <img src={modules_03} alt="modules_03" className='mb-0 inline-block' />
                        <p className='text-[16px] leading-[26px] text-[#A5A2AD] font-medium pb-2'>Benefit Layout 1</p>
                      </div>
                    </div>

                    {/* Benefit Layout 2 */}
                    <div
                      className='text-center cursor-grab hover:bg-gray-50 active:cursor-grabbing pb-2'
                      draggable
                      onDragStart={(e) => {
                        e.dataTransfer.setData('template', JSON.stringify({
                          templateKey: 'itemRecommendationModule',
                          name: 'Benefit Layout 2'
                        }));
                        setDragPreview('Benefit Layout 2');
                      }}
                      onDragEnd={() => setDragPreview(null)}
                    >
                      <div className='pointer-events-none'>
                        <img src={modules_05} alt="modules_05" className='mb-0 inline-block' />
                        <p className='text-[16px] leading-[26px] text-[#A5A2AD] font-medium pb-2'>Benefit Layout 2</p>
                      </div>
                    </div>
                  </div>

                  {/* Product Usage */}
                  <div className='mt-3 border-b border-[#e8e8e8]'>
                    <p className='text-[16px] leading-[26px] text-[#414141] font-medium pb-2'>Product usage</p>
                    <div
                      className='text-center mb-3 cursor-grab hover:bg-gray-50 active:cursor-grabbing pb-2'
                      draggable
                      onDragStart={(e) => {
                        e.dataTransfer.setData('template', JSON.stringify({
                          templateKey: 'productUseTemp',
                          name: 'Product Usage Block'
                        }));
                        setDragPreview('Product Usage Block');
                      }}
                      onDragEnd={() => setDragPreview(null)}
                    >
                      <div className='pointer-events-none'>
                        <img src={modules_06} alt="modules_06" className='mb-0 inline-block' />
                        <p className='text-[16px] leading-[26px] text-[#A5A2AD] font-medium pb-2'>Product usage block</p>
                      </div>
                    </div>
                  </div>

                  {/* Social Proof */}
                  <div className='mt-3 border-b border-[#e8e8e8]'>
                    <p className='text-[16px] leading-[26px] text-[#414141] font-medium pb-2'>Social Proof</p>
                    <div
                      className='text-center mb-3 cursor-grab hover:bg-gray-50 active:cursor-grabbing pb-2'
                      draggable
                      onDragStart={(e) => {
                        e.dataTransfer.setData('template', JSON.stringify({
                          templateKey: 'socialmediaTemp',
                          name: 'Social Proof Block'
                        }));
                        setDragPreview('Social Proof Block');
                      }}
                      onDragEnd={() => setDragPreview(null)}
                    >
                      <div className='pointer-events-none'>
                        <img src={modules_07} alt="modules_07" className='mb-0 inline-block' />
                        <p className='text-[16px] leading-[26px] text-[#A5A2AD] font-medium pb-2'>Social Proof Block</p>
                      </div>
                    </div>
                  </div>

                  {/* Ingredient Spotlight */}
                  <div className='mt-3 border-b border-[#e8e8e8]'>
                    <p className='text-[16px] leading-[26px] text-[#414141] font-medium pb-2'>Ingredient Spotlight</p>

                    {/* Block 1 */}
                    <div
                      className='text-center mb-3 cursor-grab hover:bg-gray-50 active:cursor-grabbing pb-2'
                      draggable
                      onDragStart={(e) => {
                        e.dataTransfer.setData('template', JSON.stringify({
                          templateKey: 'indBlock1',
                          name: 'Ingredient Spotlight Block'
                        }));
                        setDragPreview('Ingredient Spotlight Block');
                      }}
                      onDragEnd={() => setDragPreview(null)}
                    >
                      <div className='pointer-events-none'>
                        <img src={modules_08} alt="modules_08" className='mb-0 inline-block' />
                        <p className='text-[16px] leading-[26px] text-[#A5A2AD] font-medium pb-2'>Ingredient Spotlight Block</p>
                      </div>
                    </div>

                    {/* Block 2 */}
                    <div
                      className='text-center cursor-grab hover:bg-gray-50 active:cursor-grabbing pb-2'
                      draggable
                      onDragStart={(e) => {
                        e.dataTransfer.setData('template', JSON.stringify({
                          templateKey: 'indBlockTemp2',
                          name: 'Ingredient Spotlight Block 2'
                        }));
                        setDragPreview('Ingredient Spotlight Block 2');
                      }}
                      onDragEnd={() => setDragPreview(null)}
                    >
                      <div className='pointer-events-none'>
                        <img src={modules_09} alt="modules_09" className='mb-0 inline-block' />
                        <p className='text-[16px] leading-[26px] text-[#A5A2AD] font-medium pb-2'>Ingredient Spotlight Block 2</p>
                      </div>
                    </div>
                  </div>

              </div>
        </div>
    );
}

export default Modules;