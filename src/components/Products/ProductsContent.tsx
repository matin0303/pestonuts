// app/products/ProductsContent.tsx
'use client';

import ProductCard from '@/components/ProductCard/ProductCard';
import { useProducts } from '@/hook/useProduct';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  X,
  Package,
  Filter,
} from 'lucide-react';
import { FourSquare } from "react-loading-indicators";
import PaginationComponent from '@/components/ui/Pagination';
import { usePagination } from '@/hook/usePagination';
import ProductCardSkeleton from '../Skeleton/ProductCardSkeleton';

export default function ProductsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search') || undefined;

  const [searchInput, setSearchInput] = useState('');
  const [activeCategory, setActiveCategory] = useState(searchQuery || 'همه');
  const { currentPage, handlePageChange, resetPage } = usePagination({ scrollToTop: true, });

  const { data, isLoading, isError } = useProducts({
    page: currentPage,
    limit: 15,
    search: activeCategory === 'همه' ? undefined : activeCategory
  });

  const categories = [
    { label: 'همه', value: undefined, icon: '' },
    { label: 'مغز پسته', value: 'مغز پسته', icon: ' ' },
    { label: 'پسته اکبری', value: 'پسته اکبری', icon: ' ' },
    { label: 'پسته خندان', value: 'پسته خندان', icon: ' ' },
    { label: 'پسته کله قوچی', value: 'پسته کله قوچی', icon: ' ' },
  ];

  function handleSearch(query: string) {
    resetPage();
    if (query.trim()) {
      router.push(`/products?search=${encodeURIComponent(query.trim())}`);
      setActiveCategory(query.trim());
    } else {
      router.push(`/products`);
      setActiveCategory('همه');
    }
  }

  function handleCategoryClick(category: typeof categories[0]) {
    resetPage();
    setActiveCategory(category.label);
    if (category.value) {
      router.push(`/products?search=${encodeURIComponent(category.value)}`);
    } else {
      router.push(`/products`);
    }
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchInput);
  };

  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-50 to-white py-20 font-kalameh'>
      <div className='w-full mx-auto px-0 md:px-10'>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className='text-center mb-6'
        >
          <h1 className='text-5xl font-black text-gray-900 font-[sarvenaz]'>
            محصولات
            <span className='text-orange-600'> ویژه</span>
          </h1>
        </motion.div>

        {/* Search & Filters Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className='bg-white rounded-2xl shadow-lg border border-gray-200 p-4 mb-8'
        >
          <div>
            <p className='text-sm font-semibold text-gray-600 mb-3 flex items-center gap-2'>
              <Filter size={16} className='text-orange-600' />
              جستجو و دسته‌بندی محصولات
            </p>

            <div className='flex max-lg:flex-col flex-row-reverse justify-between items-start gap-3'>
              {/* Search Input */}
              <form onSubmit={handleSearchSubmit} className='w-full lg:max-w-150'>
                <div className='relative'>
                  <Search size={20} className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400' />
                  <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="جستجوی محصول..."
                    className='w-full border-2 border-gray-200 rounded-xl px-4 py-3 pr-10 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 outline-none text-black text-right'
                  />
                  {searchInput && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearchInput('');
                        router.push('/products');
                        setActiveCategory('همه');
                        resetPage();
                      }}
                      className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors'
                    >
                      <X size={18} />
                    </button>
                  )}
                </div>
              </form>

              {/* Categories */}
              <div className='relative w-full'>
                <div className='flex gap-2 overflow-x-auto pb-2 w-full scroll-smooth'>
                  {categories.map((cat) => (
                    <motion.button
                      key={cat.label}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleCategoryClick(cat)}
                      className={`sm:px-4 px-2 sm:py-2.5 py-1 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-2 whitespace-nowrap flex-shrink-0 ${activeCategory === cat.label
                        ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/20'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                      <span>{cat.icon}</span>
                      {cat.label}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Products Grid */}
        <div className='min-h-[400px] w-full'>
          {isLoading ? (
                 <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                 {[...Array(10)].map((_, index) => (
                  <div className='flex justify-center items-center w-full'>
                    <ProductCardSkeleton key={index} />
                  </div>
                 ))}
             </div>
          ) : isError ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className='flex flex-col items-center justify-center h-96 text-center'
            >
              <div className='w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-4'>
                <X size={32} className='text-red-500' />
              </div>
              <h3 className='text-xl font-bold text-gray-800 mb-2'>خطا در بارگذاری</h3>
              <p className='text-gray-500 mb-4'>متأسفانه در دریافت محصولات مشکلی پیش آمده است</p>
              <button
                onClick={() => window.location.reload()}
                className='px-6 py-2 bg-orange-600 text-white rounded-xl font-semibold hover:bg-orange-700 transition-all'
              >
                تلاش مجدد
              </button>
            </motion.div>
          ) : data?.data.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className='flex flex-col items-center justify-center h-96 text-center'
            >
              <div className='w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4'>
                <Package size={32} className='text-gray-400' />
              </div>
              <h3 className='text-xl font-bold text-gray-800 mb-2'>محصولی یافت نشد</h3>
              <p className='text-gray-500 mb-4'>
                {activeCategory !== 'همه'
                  ? `محصولی در دسته "${activeCategory}" پیدا نشد`
                  : 'هیچ محصولی برای نمایش وجود ندارد'}
              </p>
              <button
                onClick={() => {
                  setActiveCategory('همه');
                  setSearchInput('');
                  resetPage();
                  router.push('/products');
                }}
                className='px-6 py-2 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all'
              >
                مشاهده همه محصولات
              </button>
            </motion.div>
          ) : (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'
                dir='ltr'
              >
                {data?.data.map((product, index) => (
                  <motion.div
                    key={product.id || index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className='flex justify-center items-center w-full h-full'
                  >
                    <div className='w-full h-full max-sm:min-w-90 px-5'>
                      <ProductCard data={product} />
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Pagination Component */}
              {data &&
                <PaginationComponent
                  pagination={data?.pagination}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                  className="mt-12 mb-8"
                  infoText="محصول"
                />
              }
            </>
          )}
        </div>
      </div>
    </div>
  );
}