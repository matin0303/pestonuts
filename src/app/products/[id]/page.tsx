"use client"
import AddToCardMobilePopup from '@/components/Products/AddToCardMobilePopup';
import AddToCardSidebar from '@/components/Products/AddToCardSidebar';
import ProductGallery from '@/components/Products/ProductGallery';
import { useProduct } from '@/hook/useProduct';
import { PhoneCall, Plus, Scale, ScaleIcon, ShoppingBag, ShoppingBasket, ShoppingCart } from 'lucide-react';
import React, { useEffect, useState } from 'react'

import { FaCashRegister } from 'react-icons/fa';
import { IoCash, IoCashOutline, IoClose, IoScaleOutline } from 'react-icons/io5';
export default function page({ params }: { params: any }) {
  const { id } = params;
  const [openAddToCard, setOpenAddToCard] = React.useState(false)
  const [images, setImages] = React.useState<string[]>([])

  const { data, isLoading, isError } = useProduct(id);

  useEffect(() => {
    if(!data)return
    const imagesArray = data.data.images
      .replace(/[\[\]"]/g, '') 
      .split(',')
      .map(img => img.trim());
    setImages(imagesArray)
  }, [data]);

  if(!isLoading && !data){
    return <div className='w-full h-screen font-sarvenaz text-orange-600 text-2xl flex justify-center items-center flex-row-reverse'> محصول یافت نشد <span className='text-3xl mx-2'>404 - </span> </div>
  }
  return (
    <div className='w-full min-h-screen pt-20 pb-5 px-10 bg-white font-[sarvenaz]'>
      <div className='relative w-full h-full flex max-md:flex-col justify-center items-start gap-1.5'>
        <div className='w-170 max-md:w-full min-h-140 flex justify-evenly items-start flex-col sticky max-md:relative top-0 right-0 p-3 max-lg:pb-5 rounded-sm shadow-md '>
          <h1 className=' text-2xl hidden max-md:block max-md:pr-5'><li>{data?.data.title}</li></h1>
          <ProductGallery images={images}/>

          <div className='w-full h-12 rounded-sm justify-center items-center bg-black'>
            <button className='w-full h-full text-white font-[paeez] text-3xl shadow-md/30 flex justify-center items-center flex-row-reverse'>ثبت سفارش تلفنی <PhoneCall className='pl-2' /></button>
          </div>
        </div>
        <div className=' w-full min-h-140 h-full rounded-sm shadow-md p-10 max-md:p-3'>
          <div className='w-full'>
            <h1 className=' text-2xl max-md:hidden'><li>{data?.data.title}</li></h1>
            <p className='w-full mt-5 text-center text-xl leading-relaxed text-gray-700'>
              {data?.data.description}
            </p>
          </div>
          <div></div>
        </div>
        <AddToCardSidebar data={data}/>

        <button onClick={() => { setOpenAddToCard(true) }} className='lg:hidden cursor-pointer w-full px-3 flex justify-between items-center fixed bottom-0 left-0 bg-gradient-to-r from-orange-400 to-orange-600 rounded-t-2xl shadow-xs/90 shadow-red-600 h-13'>
          <span className='text-white flex flex-row-reverse text-lg'>افزودن به سبدخرید <ShoppingBasket className='pl-1' /></span>

          <div className='z-5 flex justify-center items-center'>
            <span className=' text-3xl text-white'> {(data?.data.price)?.toLocaleString()} </span>
            <img src="/Toman.svg" alt="تومان" className='w-6 h-6 brightness-0 invert' />
          </div>

        </button>
        <div className={`z-10 w-full ${openAddToCard ? 'opacity-100 visible  h-full' : 'opacity-0 invisible h-0'} flex flex-col h-full fixed left-0 bottom-0 transition-discrete duration-300 backdrop-blur-2xl justify-center items-end`}>
          <div onClick={() => { setOpenAddToCard(false) }} className='h-full w-full' />
          <div className={`relative w-full bg-gray-100 pt-7 p-2 rounded-t-2xl`}>
            <div onClick={() => { setOpenAddToCard(false) }} className='absolute top-0 left-0 p-2'><IoClose size={23} /></div>
            <AddToCardMobilePopup data={data}/>

          </div>
        </div>
      </div>
    </div>

  )
}
