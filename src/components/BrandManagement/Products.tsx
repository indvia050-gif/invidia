import { useState } from 'react';
import { Trash2, FileText, Package } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  description: string;
  category: string;
}

export function ProductManagement() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'Premium Deodorant Stick',
      image: '/Product.png',
      price: 12.99,
      description: 'Natural aluminium - free deodorant with 24-hour protection',
      category: 'Fitness'
    },
    {
      id: '2',
      name: 'Premium Deodorant Stick',
      image: '/Product.png',
      price: 12.99,
      description: 'Natural aluminium - free deodorant with 24-hour protection',
      category: 'Fitness'
    },
    {
      id: '3',
      name: 'Premium Deodorant Stick',
      image: '/Product.png',
      price: 12.99,
      description: 'Natural aluminium - free deodorant with 24-hour protection',
      category: 'Fitness'
    },
    {
      id: '4',
      name: 'Premium Deodorant Stick',
      image: '/Product.png',
      price: 12.99,
      description: 'Natural aluminium - free deodorant with 24-hour protection',
      category: 'Fitness'
    }
  ]);

  const [formData, setFormData] = useState({
    productName: '',
    category: 'Personal care',
    price: '0.00',
    description: '',
    tags: ''
  });

  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.add('bg-blue-50');
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.currentTarget.classList.remove('bg-blue-50');
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.remove('bg-blue-50');
    const files = Array.from(e.dataTransfer.files);
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const handleSaveProduct = () => {
    const newProduct: Product = {
      id: Date.now().toString(),
      name: formData.productName || 'New Product',
      image: uploadedFiles.length > 0
        ? URL.createObjectURL(uploadedFiles[0])
        : 'https://images.pexels.com/photos/3962286/pexels-photo-3962286.jpeg?auto=compress&cs=tinysrgb&w=600',
      price: parseFloat(formData.price) || 0,
      description: formData.description || 'Product description',
      category: formData.category
    };

    setProducts(prev => [...prev, newProduct]);
    setFormData({ productName: '', category: 'Personal care', price: '0.00', description: '', tags: '' });
    setUploadedFiles([]);
  };

  const totalProducts = products.length;
  const totalCategories = new Set(products.map(p => p.category)).size;

  return (
    <div className="p-2 bg-gray-50 min-h-full border rounded-xl">
        {/* Header */}
            <h1 className="text-2xl font-semibold text-[#5D586C]">Products</h1>
          <p className="text-sm text-gray-500 mb-2">Manage Your Product Catalog And Upload New Items</p>

        {/* Stats Cards */}
        <div className="grid bg-white grid-cols-4 border border-gray-200 rounded-lg gap-6 mb-8">
          <div className=" rounded-lg p-6">
            <div className="text-4xl font-bold text-[#5D586C]">{totalProducts}</div>
            <div className="text-sm text-[#6F6B7D] mt-2">Total Products</div>
          </div>
          <div className='border-r my-5'>
          </div>
          <div className="rounded-lg p-6">
            <div className="text-4xl font-bold text-[#5D586C]">{totalCategories}</div>
            <div className="text-sm text-[#6F6B7D] mt-2">Categories</div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-3 bg-white gap-1 border border-gray-200 rounded-lg p-2">
          {/* Product Catalog - Left Side */}
          <div className="col-span-2 ">
            <h2 className="text-xl text-[#5D586C] mb-2">Product Catalog</h2>

            <div className="flex flex-wrap gap-6">
              {products.map(product => (
                <div key={product.id} className=" w-[240px] p-2 h-[450px] border border-gray-200 rounded-lg hover:shadow-lg transition">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-[240px] h-[240px]"
                    />

                  <div className="p-4">
                    <h3 className="font-semibold text-[#5D586C] text-sm mb-1">{product.name}</h3>
                    <p className="text-xs text-[#6F6B7D] mb-1 line-clamp-2">{product.description}</p>
                    <div className="text-sm text-[#5D586C] mb-3">${product.price.toFixed(2)}</div>

                    <div className="mb-4">
                      <span className="inline-block border border-gray-300 text-[#6F6B7D] px-3 py-1 rounded-full text-xs font-medium">
                        {product.category}
                      </span>
                    </div>

                    <div className="flex gap-1 p-1 rounded-xl  mb-4  bg-[#F7F7F7]">
                  <button className="flex-1 px-3 py-1 bg-white text-sm font-medium text-[#5D586C] border border-gray-300 rounded-lg hover:bg-gray-50">
                    View
                  </button>
                  <button className="flex-1 px-3 py-1 bg-white  text-sm font-medium text-[#5D586C] border border-gray-300 rounded-lg hover:bg-gray-50">
                    Edit
                  </button>
                  <button className="flex-1 px-3 py-1 bg-white  text-sm font-medium text-[#5D586C] border border-gray-300 rounded-lg hover:bg-gray-50">
                    Delete
                  </button>
                </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add New Product Form - Right Side */}
          <div className="col-span-1">
            <div className="bg-white border border-gray-200 rounded-lg p-3 sticky top-6">
              <h3 className="text-xl font-semibold text-[#5D586C] mb-2">Add New Product</h3>
              <p className="text-sm text-[#6F6B7D] mb-6">Upload A New Product To Your Catalog</p>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-[#5D586C] mb-2">Product Name</label>
                  <input
                    type="text"
                    name="productName"
                    value={formData.productName}
                    onChange={handleInputChange}
                    placeholder="Enter product name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#5087FF] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#5D586C] mb-2">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#5087FF] focus:border-transparent appearance-none bg-white"
                  >
                    <option>Personal care</option>
                    <option>Fitness</option>
                    <option>Health</option>
                    <option>Beauty</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#5D586C] mb-2">Price</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="$ 0.00"
                    // step="0.01"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#5087FF] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#5D586C] mb-2">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe your product"
                    rows={1}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#5087FF] focus:border-transparent resize-none"
                  />
                </div>

                <div>
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center transition cursor-pointer hover:border-[#5087FF] hover:bg-blue-50"
                  >
                    <p className="text-sm text-[#6F6B7D] mb-1">
                      Drop files here, <label htmlFor="fileInput" className="text-[#5087FF] hover:underline cursor-pointer">browse files</label>
                    </p>
                    <p className="text-xs text-gray-500 mb-3">or import from:</p>
                    <div className="flex gap-2 justify-between">
                      <div className='flex border border-gray-300 justify-center items-center px-3 py-1.5 rounded-3xl hover:bg-gray-50 transition cursor-pointer'>
                      <img src="/device.png" alt="My Device" className="w-8 h-8 " />
                      <label htmlFor="fileInput" className="px-2 py-1.5 text-xs font-medium text-[#6F6B7D] bg-white  rounded hover:bg-gray-50 transition cursor-pointer">
                        My Device
                      </label>
                      </div>
                       <div className='flex border border-gray-300 justify-center items-center px-3 py-1.5 rounded-3xl hover:bg-gray-50 transition cursor-pointer'>
                      <img src="/drive.png" alt="Google Drive" className="w-8 h-8" />
                      <label htmlFor="fileInput" className="px-2 py-1.5 text-xs font-medium text-[#6F6B7D] bg-white  rounded hover:bg-gray-50 transition cursor-pointer">
                        Google Drive
                      </label>
                      </div>
                    </div>
                    <input
                      type="file"
                      multiple
                      onChange={handleFileSelect}
                      className="hidden"
                      id="fileInput"
                    />
                  </div>

                  {uploadedFiles.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {uploadedFiles.map((file, idx) => (
                        <div key={idx} className="flex items-center justify-between bg-blue-50 p-2 rounded border border-blue-200">
                          <span className="text-xs text-blue-900 truncate">{file.name}</span>
                          <button
                            onClick={() => removeFile(idx)}
                            className="text-[#5087FF] hover:text-red-600 transition"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#5D586C] mb-2">Tags</label>
                  <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleInputChange}
                    placeholder="Add tags"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#5087FF] focus:border-transparent"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-sm font-medium text-[#6F6B7D] hover:bg-gray-100 transition">
                    Save as Draft
                  </button>
                  <button
                    onClick={handleSaveProduct}
                    className="flex-1 py-2 px-4 bg-[#5087FF] text-white rounded-lg text-sm font-medium hover:bg-[#3D6CE8] transition"
                  >
                    Save Product
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}