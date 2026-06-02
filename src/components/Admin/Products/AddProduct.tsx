'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCreateProduct, useUpdateProduct } from '@/hook/useProduct';
import { AddProduct, Product } from '@/types/api.types';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FileUploader } from '../FileUploader/FileUploader';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from "framer-motion";
import { Edit, Plus, ArrowRight, ArrowLeft, Check } from 'lucide-react';

const productSchema = z.object({
  title: z.string()
    .min(3, 'عنوان حداقل ۳ کاراکتر')
    .max(255, 'عنوان حداکثر ۲۵۵ کاراکتر'),
  price: z.number()
    .positive('قیمت باید مثبت باشد'),
  description: z.string().optional(),
  images: z.array(z.string())
    .min(1, 'حداقل یک تصویر الزامی است')
    .max(4, 'حداکثر ۴ تصویر مجاز است'),
});

type ProductFormData = z.infer<typeof productSchema>;

type ProductFormProps = {
  initialData?: AddProduct;
  isEditing?: boolean;
  setOpenEditeModal?: (e: boolean) => void
};

export const ProductForm = ({ initialData, isEditing = false, setOpenEditeModal }: ProductFormProps) => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [imageInput, setImageInput] = useState('');

  const { mutate: createProduct, isPending: isCreating } = useCreateProduct();
  const { mutate: updateProduct, isPending: isUpdating } = useUpdateProduct();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: initialData?.title || '',
      price: initialData?.price || 0,
      description: initialData?.description || '',
      images: initialData?.images || [],
    },
  });

  const images = watch('images');
  const title = watch('title');
  const price = watch('price');

  const handleImageUpload = (url: string, file: File) => {
    if (images.length < 4) {
      const newImages = [...images, url];
      setValue('images', newImages);

      if (isEditing && initialData?.id) {
        const formData = watch();
        updateProduct({
          id: initialData.id,
          data: { ...formData, images: newImages }
        });
      }
    }
  };

  const handleDeleteImage = (url: string) => {
    const newImages = images.filter(image => image !== url);
    setValue('images', newImages);

    if (isEditing && initialData?.id) {
      const formData = watch();
      updateProduct({
        id: initialData.id,
        data: { ...formData, images: newImages }
      });
    }
  };

  const handleNextStep = async () => {
    const isValid = await trigger(['title', 'price']);
    if (isValid) {
      setStep(2);
    }
  };

  const handlePrevStep = () => {
    setStep(1);
  };

  const onSubmit = (data: ProductFormData) => {
    if (isEditing && initialData) {
      updateProduct({ id: initialData.id, data }, {
        onSuccess() {
          setOpenEditeModal?.(false)
        }
      });
    } else {
      createProduct(data);
      router.push('/admin/products')
    }
  };

  const isPending = isCreating || isUpdating;

  const steps = [
    { number: 1, title: 'اطلاعات پایه' },
    { number: 2, title: 'جزئیات تکمیلی' },
  ];

  return (
    <motion.form
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-2xl bg-white p-8 rounded-2xl shadow-2xl border border-orange-100 relative overflow-hidden font-kalameh"
    >
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600/5 rounded-bl-full -mr-10 -mt-16" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-orange-600/5 rounded-tr-full -ml-12 -mb-12" />

      {/* Header with steps */}
      <div className="mb-8">
        <motion.h2
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="text-3xl font-bold mb-6 relative text-center"
        >
          <span className="bg-gradient-to-l from-orange-600 to-orange-400 bg-clip-text text-transparent font-sarvenaz">
            {isEditing ? 'ویرایش محصول' : 'محصول جدید'}
          </span>
        </motion.h2>

        {/* Step Indicators */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {steps.map((s, index) => (
            <div key={s.number} className="flex items-center">
              <motion.div
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2, type: "spring" }}
                className={`flex items-center gap-2 px-2 py-1 rounded-full ${
                  step >= s.number
                    ? 'bg-orange-600 text-white'
                    : 'bg-gray-100 text-gray-400'
                } transition-all duration-300`}
              >
                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  step > s.number
                    ? 'bg-white text-orange-600'
                    : step === s.number
                    ? 'bg-white/20 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {step > s.number ? <Check size={16} /> : s.number}
                </span>
                <span className="text-sm font-medium hidden sm:block">{s.title}</span>
              </motion.div>
              {index < steps.length - 1 && (
                <div className={`w-8 h-0.5 mx-1 ${
                  step > s.number ? 'bg-orange-600' : 'bg-gray-200'
                } transition-all duration-300`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step 1: Title & Price */}
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.4 }}
          >
            {/* Title */}
            <div className="mb-5">
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                عنوان محصول <span className="text-orange-600">*</span>
              </label>
              <input
                {...register('title')}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 outline-none hover:border-orange-300"
                placeholder="عنوان محصول را وارد کنید..."
              />
              {errors.title && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm mt-2 flex items-center gap-1"
                >
                  <span>⚠</span> {errors.title.message}
                </motion.p>
              )}
            </div>

            {/* Price */}
            <div className="mb-5">
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                قیمت (تومان) <span className="text-orange-600">*</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  {...register('price', { valueAsNumber: true })}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 pl-16 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 outline-none hover:border-orange-300"
                  placeholder="۰"
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium bg-gray-50 px-3 py-1 rounded-lg">
                  تومان
                </span>
              </div>
              {errors.price && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm mt-2 flex items-center gap-1"
                >
                  <span>⚠</span> {errors.price.message}
                </motion.p>
              )}
            </div>

            {/* Preview Card */}
            {(title || price > 0) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-50 rounded-xl p-4 border border-gray-200 mb-5"
              >
                <p className="text-xs text-gray-500 mb-2">پیش‌نمایش</p>
                <div className="space-y-2">
                  {title && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">عنوان:</span>
                      <span className="font-semibold text-gray-800">{title}</span>
                    </div>
                  )}
                  {price > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">قیمت:</span>
                      <span className="font-semibold text-orange-600">{price.toLocaleString()} تومان</span>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Step 2: Description & Images */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
          >
            {/* Description */}
            <div className="mb-5">
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                توضیحات
              </label>
              <textarea
                {...register('description')}
                rows={4}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 outline-none hover:border-orange-300 resize-none"
                placeholder="توضیحات محصول را وارد کنید..."
              />
            </div>

            {/* Images */}
            <div className="mb-6" dir='ltr'>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                تصاویر <span className="text-orange-600">*</span>
                <span className="text-xs text-gray-500 font-normal mr-2">
                  (حداقل ۱، حداکثر ۴)
                </span>
              </label>

              <div className="bg-gray-50 rounded-xl p-4 border-2 border-dashed border-gray-300 hover:border-orange-400 transition-all duration-300">
                <FileUploader
                  folder="product"
                  onUploadSuccess={handleImageUpload}
                  onUploadError={(error) => toast.error(error)}
                  onDeleteImage={handleDeleteImage}
                  images={images}
                  maxFiles={4}
                />
              </div>

              {errors.images && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm mt-2 flex items-center gap-1"
                >
                  <span>⚠</span> {errors.images.message}
                </motion.p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.4 }}
        className="flex gap-3 pt-4 border-t border-gray-100"
      >
        {step === 1 ? (
          <>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={handleNextStep}
              className="flex-1 relative bg-gradient-to-r from-orange-600 to-orange-500 text-white py-3 rounded-xl font-semibold hover:from-orange-700 hover:to-orange-600 transition-all duration-300 shadow-lg shadow-orange-600/20 hover:shadow-xl hover:shadow-orange-600/30 overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                مرحله بعد
                <ArrowLeft size={18} />
              </span>
            </motion.button>

        
            {/* <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={() => isEditing ? setOpenEditeModal?.(false) : router.back()}
              className="px-6 bg-white text-gray-700 py-3 rounded-xl font-semibold border-2 border-gray-200 hover:border-orange-300 hover:text-orange-600 transition-all duration-300"
            >
              انصراف
            </motion.button> */}
          </>
        ) : (
          <>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={handlePrevStep}
              className="px-6 bg-white text-gray-700 py-3 rounded-xl font-semibold border-2 border-gray-200 hover:border-orange-300 hover:text-orange-600 transition-all duration-300 flex items-center gap-2"
            >
              <ArrowRight size={18} />
              مرحله قبل
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isPending}
              className="flex-1 relative bg-gradient-to-r from-orange-600 to-orange-500 text-white py-3 rounded-xl font-semibold hover:from-orange-700 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg shadow-orange-600/20 hover:shadow-xl hover:shadow-orange-600/30 overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isPending ? (
                  <>
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="inline-block"
                    >
                      ⏳
                    </motion.span>
                    در حال ذخیره...
                  </>
                ) : (
                  <>
                    {isEditing ? (
                      <>
                        <Edit size={18} /> ویرایش
                      </>
                    ) : (
                      <>
                        <Plus size={18} /> ایجاد
                      </>
                    )}
                  </>
                )}
              </span>
            </motion.button>
          </>
        )}
      </motion.div>
    </motion.form>
  );
};