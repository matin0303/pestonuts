import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { EffectCards, Autoplay, Pagination } from 'swiper/modules';
import Button from '../Button/Button';
import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { mockProducts } from '@/muckDatas/productCard';
import ProductCard from '../ProductCard/ProductCard';
import ArticleCard from '../ArticleCard/ArticleCard';
import { useProducts } from '@/hook/useProduct';
import { usePublishedArticles } from '@/hook/useArticle';
import {
  Nut,
  Truck,
  Shield,
  Star,
  Clock,
  Phone,
  ChevronLeft,
  Sparkles,
  Package,
  BadgeCheck,
  ArrowRight,
  Send,
  MapPin,
  Users,
  ThumbsUp,
  User2,
  Sprout
} from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import ProductCardSkeleton from '../Skeleton/ProductCardSkeleton';
import ArticleCardSkeleton from '../Skeleton/ArticleCardSkeleton';
import { Product } from '@/types/api.types';

export default function Main() {
  const cardsPic: Array<string> = ["./land1.jpg", "./land2.jpg", "./land3.jpg", "./land4.jpg"]
  const { data, isLoading, isError } = useProducts({ page: 1, limit: 10 });
  const { data: articlesData } = usePublishedArticles({ page: 1, limit: 6 });

  const getRandomProducts = (products: Product[], count: number) => {
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };
  const [randomProducts, setRandomProducts] = useState<Product[] | null>(null)

  useEffect(() => {
    if (!data) return
    setRandomProducts(getRandomProducts(data.data, 4))
  }, [data])

  const getImage1 = (images: string) => {
    const image = JSON.parse(images)
    return image[0]
  }

  const features = [
    {
      icon: Shield,
      title: 'تضمین کیفیت',
      description: 'بهترین پسته دامغان با ضمانت بازگشت وجه',
      color: 'from-orange-600 to-red-600'
    },
    {
      icon: Truck,
      title: 'ارسال سریع',
      description: 'تحویل ۴۸ ساعته به سراسر کشور',
      color: 'from-orange-500 to-amber-500'
    },
    {
      icon: Clock,
      title: 'تضمین تازگی',
      description: 'مستقیم از باغ به دست شما',
      color: 'from-green-500 to-emerald-600'
    },
    {
      icon: Package,
      title: 'بسته‌بندی حرفه‌ای',
      description: 'بسته‌بندی وکیوم برای حفظ تازگی',
      color: 'from-purple-500 to-purple-700'
    },
  ];

  const testimonials = [
    {
      name: 'احمد رضایی',
      role: 'مشتری دائمی',
      text: 'بهترین پسته‌ای که تا حالا خریدم. واقعاً طعم دامغان رو میده!',
      rating: 5,
      avatar: '/images/users/user1.jpg'
    },
    {
      name: 'سارا محمدی',
      role: 'خریدار عمده',
      text: 'برای فروشگاهم همیشه از اینجا خرید می‌کنم. کیفیت عالی و قیمت منصفانه.',
      rating: 5,
      avatar: '/images/users/user2.jpg'
    },
    {
      name: 'مهدی حسینی',
      role: 'مشتری جدید',
      text: 'ارسالشون خیلی سریع بود. پسته‌ها تازه و خوشمزه بودن.',
      rating: 5,
      avatar: '/images/users/user3.jpg'
    },
  ];



  return (
    <div className='relative text-white'>
      <div id='main' className='w-full flex max-sm:flex-col justify-center items-center '>
        <section className='relative w-1/2 h-screen max-h-200 max-sm:h-1/2 max-sm:w-full max-sm:mb-10 flex flex-col justify-center items-center'>

          {/* Floating Small Nuts */}
          <motion.div
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className='absolute top-20 left-20'
          >
            <Nut size={40} className='text-orange-400/20 rotate-45' />
          </motion.div>

          <motion.div
            animate={{
              y: [0, -30, 0],
              rotate: [0, -15, 0],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
            className='absolute top-40 right-24'
          >
            <Nut size={50} className='text-orange-400/15 -rotate-30' />
          </motion.div>

          <motion.div
            animate={{
              y: [0, -25, 0],
              rotate: [0, 20, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
            className='absolute bottom-32 left-32'
          >
            <Nut size={35} className='text-orange-400/20 rotate-12' />
          </motion.div>

          {/* Decorative Lines */}
          <motion.div
            animate={{
              width: ['0%', '100%', '0%'],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
            className='absolute top-1/3 left-10 h-0.5 bg-gradient-to-l from-transparent via-orange-400/30 to-transparent w-1/3'
          />


          {/* Corner Decorations */}
          <div className='absolute top-10 left-0 w-32 h-32'>
            <div className='absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-orange-300/30 rounded-tl-2xl' />
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className='absolute top-4 left-4'
            >
              <Nut size={20} className='text-orange-400/40' />
            </motion.div>
          </div>

          <div className='absolute top-10 right-0 w-32 h-32'>
            <div className='absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-orange-300/30 rounded-tr-2xl' />
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.5
              }}
              className='absolute top-4 right-4'
            >
              <Nut size={20} className='text-orange-400/40 rotate-90' />
            </motion.div>
          </div>

          <div className='absolute bottom-30 left-0 w-32 h-32'>
            <div className='absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-orange-300/30 rounded-bl-2xl' />
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.7
              }}
              className='absolute bottom-4 left-4'
            >
              <Nut size={20} className='text-orange-400/40 -rotate-45' />
            </motion.div>
          </div>

          <div className='absolute bottom-30 right-0 w-32 h-32'>
            <div className='absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-orange-300/30 rounded-br-2xl' />
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2.2
              }}
              className='absolute bottom-4 right-4'
            >
              <Nut size={20} className='text-orange-400/40 rotate-45' />
            </motion.div>
          </div>

          {/* Dots Grid Pattern */}
          <div className='absolute inset-0 opacity-[0.03]'>
            <div className='w-full h-full' style={{
              backgroundImage: 'radial-gradient(circle, #ea580c 1px, transparent 1px)',
              backgroundSize: '30px 30px'
            }} />
          </div>

          {/* Glow Effect Behind Content */}
          <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] max-md:w-50 h-[300px] bg-orange-400/10 rounded-full blur-3xl' />

          {/* Main Content */}
          <div className='w-full max-sm:mt-20 flex flex-col justify-center items-center z-20'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className='font-[paeez] text-7xl text-center text-black max-sm:text-5xl'>پخش عمده پسته</h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h2 className='font-[paeez] text-8xl text-center text-orange-600 max-sm:text-6xl relative'>
                از دامغان
                <motion.span
                  animate={{
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className='absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-orange-500 rounded-full'
                />
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <h2 className='font-[paeez] text-7xl text-center text-black max-sm:text-5xl'>به سرار کشور</h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <h3 className='font-[paeez] text-5xl text-center text-black max-sm:text-3xl'>
                با دیوپسته کیفیت تضمین شده است
              </h3>
            </motion.div>
          </div>

          {/* Buttons */}
          <div className='w-full flex justify-around items-center z-20'>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='flex justify-center items-center'
            >
              <Link href={'/products'} className='w-full min-w-35 px-5 hover:bg-gray-200 transition-all duration-300 cursor-pointer flex justify-center items-center shadow-md shadow-gray-400 bg-gray-100 text-black font-[paeez] mt-7 max-sm:mt-0 text-4xl rounded-4xl'>
                سفارش آنلاین </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='flex justify-center items-center'

            >
              <Link href="tel:09010791929" className='w-full min-w-35 px-5 hover:bg-gray-200 transition-all duration-300 cursor-pointer flex justify-center items-center shadow-md shadow-gray-400 bg-gray-100 text-black font-[paeez]  mt-7 max-sm:mt-0 text-4xl rounded-4xl'> سفارش تلفنی </Link>
            </motion.div>
          </div>

        </section>
        <section className='w-[1200px] max-xl:hidden relative h-screen max-h-200 flex justify-center items-center '>
          <div className='w-[600px] h-[650px] absolute top-[-20px] bg-cover shadow-2xl shadow-black mt-12 rounded-4xl bg-neutral-600'>
            <img src="./landpic.jpg" alt="img" className='w-[600px] h-[650px] absolute bg-cover shadow-2xl shadow-black  rounded-4xl' />
          </div>
        </section>
        <section className='w-1/2 h-screen max-h-200 max-sm:h-1/2 max-sm:mt-10 max-sm:w-full flex flex-col justify-center items-center '>
          <div className='pb-1'>
            <h4 className='font-[paeez] text-5xl text-center text-black'>!! محصولات پر فروش </h4>
          </div>
          <div>
            <Swiper
              effect={'cards'}
              grabCursor={true}
              modules={[EffectCards]}
              className="mySwiper"
            >
              {randomProducts &&
                randomProducts.map((product) => (
                  <SwiperSlide className='shadow-2xl shadow-black'>
                    <Link
                      href={`/products/${product.id}`}
                      key={product.id}
                      className="relative group overflow-hidden rounded-lg"
                    >
                      <img
                        src={getImage1(product.images)}
                        alt={product.title}
                        className="w-[600px] h-[400px] object-cover shadow-2xl shadow-black transition-transform duration-300 "
                      />

                      {/* Black feed overlay at the bottom */}
                      <div className="absolute top-0 left-0 w-full h-20 z-100 bg-gradient-from-t bg-gradient-to-b from-black to-transparent p-4 font-sarvenaz text-xl  opacity-90 flex justify-center items-center">
                        {product.title}
                      </div>
                    </Link>
                  </SwiperSlide>
                ))
              }

            </Swiper>
          </div>
          <div className='mt-8 flex justify-center items-center'>
            <div className='w-full flex flex-col justify-center items-center '>
              <h4 className='font-[paeez] text-5xl text-center text-black'>امکان پیگیری لحظه ای سفارشات</h4>
              <Link className='underline font-[paeez] text-4xl text-center text-black' href={'tel:09010791929'}>برای پیگیری اینجا کلیک کنید</Link>
            </div>
          </div>
        </section>
      </div>

      {/*  Testimonials */}
      <section className='bg-white py-20 relative w-full overflow-hidden md:pt-30 mt-10'>
        <div className='max-w-7xl mx-auto px-4 relative z-20 '>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='text-center mb-16'
          >
            <h2 className='text-5xl font-black text-orange-600 mb-4 font-paeez'>
              مشتریان درباره ما چه می‌گویند؟
            </h2>
          </motion.div>

          <div className='grid md:grid-cols-3 gap-8'>
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -8 }}
                className='relative overflow-hidden bg-white rounded-3xl font-kalameh p-8 border border-gray-200 hover:border-orange-300 hover:shadow-xl transition-all duration-500 group'
              >
                {/* Quote Icon */}
                <div className='absolute top-4 left-4 text-6xl font-serif text-orange-200 group-hover:text-orange-300 transition-colors duration-500'>
                  "
                </div>

                {/* Rating Stars */}
                <div className='flex gap-1 mb-4 relative z-10'>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.2 + i * 0.1 }}
                    >
                      <Star
                        size={20}
                        className='text-yellow-500 fill-yellow-500 drop-shadow-sm'
                      />
                    </motion.div>
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className='text-gray-700 mb-6 leading-relaxed text-sm relative z-10'>
                  {testimonial.text}
                </p>

                {/* Divider */}
                <div className='border-t border-gray-100 pt-5 relative overflow-hidden z-10'>

                  <div className='flex items-center gap-4'>
                    {/* Avatar */}

                    <div className='relative flex-shrink-0'>
                      <div className='w-14 h-14 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl overflow-hidden flex items-center justify-center shadow-lg shadow-orange-200 group-hover:shadow-orange-300 transition-all duration-500'>
                        <User2 className='w-8 h-8 text-white' />
                      </div>
                      <div className='absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center'>
                        <svg className='w-3 h-3 text-white' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={3} d='M5 13l4 4L19 7' />
                        </svg>
                      </div>
                    </div>

                    {/* User Info */}
                    <div className='flex-1 min-w-0'>
                      <p className='font-bold text-gray-900 text-base truncate'>
                        {testimonial.name}
                      </p>
                      <p className='text-sm text-gray-500 truncate'>
                        {testimonial.role}
                      </p>
                    </div>

                  </div>
                </div>

                <div className='absolute top-50 -left-10 blur-2xl w-30 h-30 bg-gray-300 rounded-full font-serif text-orange-200 group-hover:text-orange-300 transition-colors duration-500' />

              </motion.div>
            ))}
          </div>
        </div>
        <div className='absolute inset-0 bg-gradient-to-br ' />
        <div className='absolute lg:bottom-30 lg:right-30 max-lg:top-50 max-lg:inset-0  w-96 h-70 bg-orange-300 rounded-full blur-3xl' />
        <div className='absolute lg:bottom-40 lg:right-80 max-lg:top-120 w-96 h-70 bg-orange-300 rounded-full blur-3xl' />
        <div className='absolute lg:bottom-30 lg:right-140 max-lg:hidden w-96 h-70 bg-orange-300 rounded-full blur-3xl' />
        <div className='absolute lg:bottom-30 lg:right-200 max-xl:hidden w-96 h-70 bg-orange-300 rounded-full blur-3xl' />
        <div className='absolute lg:bottom-30 lg:right-250 max-xl:hidden w-96 h-70 bg-orange-300 rounded-full blur-3xl' />

      </section>

      {/* Original Products Carousel */}
      <div dir='ltr' className='w-full flex justify-center items-center my-10'>
        <Carousel opts={{ align: "start", }} className="w-9/10 max-sm:w-2/3">
          <div className='w-full flex justify-end items-center'>
            <p className='text-black font-[paeez] text-6xl pr-8'>محبوب ها</p>
          </div>
          <CarouselContent className='w-full md:px-5'>
            {/* Skeleton loading state */}
            {(isLoading || isError) && [...Array(6)].map((_, index) => (
              <CarouselItem
                key={`skeleton-${index}`}
                className="w-full max-w-55 mx-2 basis-1/5 max-sm:basis-1/1 max-md:basis-1/2 max-lg:basis-1/3 max-xl:basis-1/4"
              >
                <ProductCardSkeleton />
              </CarouselItem>
            ))}

            {/* Actual data */}
            {!isLoading && data?.data.map((data, index) => (
              <CarouselItem
                key={index}
                className="w-full max-w-55 mx-5 basis-1/5 max-sm:basis-1/1 max-md:basis-1/2 max-lg:basis-1/3 max-xl:basis-1/4"
              >
                <ProductCard data={data} />
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className='bg-black' />
          <CarouselNext className='bg-black' />
        </Carousel>
      </div>


      {/* Story Section */}
      <section className="py-15 lg:py-30 font-kalameh">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden">
                <Image
                  src="/land2.jpg"
                  alt="داستان ما"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-0 max-md:-right-2 w-24 h-24 bg-orange-600 rounded-2xl flex items-center justify-center">
                <Sprout size={40} className="text-white" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl lg:text-4xl font-black text-gray-800 mb-6 font-sarvenaz">
                داستان ما از
                <span className="text-orange-600">  باغ‌های دامغان </span>
                شروع شد
              </h2>

              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  همه چیز از یک باغ کوچک پسته در حومه دامغان شروع شد. جایی که پدران ما
                  با عشق و تلاش، بهترین پسته‌های ایران را پرورش می‌دادند. امروز پس از
                  سه نسل، ما همچنان به همان اصول پایبندیم: کیفیت، صداقت و احترام به مشتری.
                </p>
                <p>
                  دامغان با آب و هوای منحصر به فرد خود، بهترین منطقه برای کشت پسته، بادام،
                  گردو و انواع میوه‌های خشک است. ما با همکاری مستقیم با بیش از ۵۰ کشاورز
                  محلی، تضمین می‌کنیم که محصولاتمان همیشه تازه و درجه یک باشند.
                </p>
                <p>
                  ماموریت ما ساده است: رساندن طعم اصیل خشکبار دامغان به تمام ایرانیان،
                  با بهترین کیفیت و قیمت منصفانه.
                </p>
              </div>

              <div className="mt-6 flex items-center gap-4">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                  <MapPin size={28} className="text-orange-600" />
                </div>
                <div>
                  <p className="font-bold text-gray-800">دفتر مرکزی</p>
                  <p className="text-sm text-gray-600">دامغان، میدان امام خمینی پلاک هشت</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* CTA - Fast Order */}
      <section className='bg-gradient-to-r my-20 from-gray-900 to-gray-800 max-md:py-5 max-md:rounded-none py-10 rounded-2xl font-kalameh relative overflow-hidden'>
        <div className='absolute inset-0'>
          <div className='absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32' />
          <div className='absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full -ml-24 -mb-24' />
        </div>

        <div className='relative z-10 max-w-7xl mx-auto px-4'>
          <div className='grid md:grid-cols-2 gap-8 items-center'>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className='text-4xl font-black text-white mb-4 font-[paeez]'>
                همین حالا سفارش دهید!
              </h3>
              <p className='text-white/80 text-lg mb-8'>
                برای سفارش عمده و جزئی پسته و خشکبار با ما تماس بگیرید یا از طریق سایت اقدام کنید
              </p>
              <div className='flex flex-wrap gap-4'>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href='tel:09010791929'
                  className='bg-white text-orange-600 px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-gray-100 transition-all'
                >
                  <Phone size={20} />
                  0901-079-1929
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href='https://t.me/pestonuts'
                  className='bg-black/20 backdrop-blur-sm text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 border border-white/20 hover:bg-black/30 transition-all'
                >
                  <Send size={20} />
                  تلگرام
                </motion.a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className='hidden md:flex justify-center'
            >
              <div className='relative'>
                <div className='w-64 h-64 bg-white/10 rounded-full flex items-center justify-center'>
                  <div className='w-48 h-48 bg-white/20 rounded-full flex items-center justify-center'>
                    <div className='w-32 h-32 bg-white rounded-full flex items-center justify-center'>
                      <Nut size={60} className='text-orange-600' />
                    </div>
                  </div>
                </div>
                <div className='absolute top-0 right-0 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center animate-pulse'>
                  <BadgeCheck size={24} className='text-white' />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Original Article Carousel */}
      <div dir='ltr' className='w-full flex justify-center items-center '>
        <Carousel opts={{ align: "start" }} className="w-9/10 max-sm:w-2/3">
          <div className='w-full flex justify-end items-center'>
            <p className='text-black font-[paeez] text-6xl pb-7 md:pr-8'>مقاله های پیشنهادی</p>
          </div>

          <CarouselContent className='w-full px-5'>
            {/* Skeleton loading state */}
            {isLoading && [...Array(5)].map((_, index) => (
              <CarouselItem
                dir='rtl'
                key={`skeleton-${index}`}
                className="w-full p-0 flex select-none justify-start items-start rounded-sm shadow-lg overflow-hidden text-black basis-1/5 m-1 max-sm:basis-1/1 max-md:basis-1/2 max-lg:basis-1/3 max-xl:basis-1/4"
              >
                <ArticleCardSkeleton />
              </CarouselItem>
            ))}

            {/* Actual data */}
            {!isLoading && articlesData?.data.map((data, index) => (
              <CarouselItem
                dir='rtl'
                key={index}
                className="w-full p-0 flex select-none justify-start items-start rounded-sm shadow-lg overflow-hidden text-black basis-1/5 m-1 max-sm:basis-1/1 max-md:basis-1/2 max-lg:basis-1/3 max-xl:basis-1/4"
              >
                <ArticleCard data={data} />
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className='bg-black' />
          <CarouselNext className='bg-black' />
        </Carousel>
      </div>

      <section className='relative w-full py-35 overflow-hidden font-kalameh'>
        <div className='absolute inset-0 bg-gradient-to-br ' />
        <div className='absolute lg:bottom-30 lg:right-30 max-lg:top-50 max-lg:inset-0  w-96 h-70 bg-orange-300 rounded-full blur-3xl' />
        <div className='absolute lg:bottom-40 lg:right-80 max-lg:top-120 w-96 h-70 bg-orange-300 rounded-full blur-3xl' />
        <div className='absolute lg:bottom-30 lg:right-140 max-lg:hidden w-96 h-70 bg-orange-300 rounded-full blur-3xl' />
        <div className='absolute lg:bottom-30 lg:right-200 max-xl:hidden w-96 h-70 bg-orange-300 rounded-full blur-3xl' />
        <div className='absolute lg:bottom-30 lg:right-250 max-xl:hidden w-96 h-70 bg-orange-300 rounded-full blur-3xl' />

        <div className='relative z-10 max-w-7xl mx-auto px-4'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='text-center mb-16'
          >
            <h2 className='text-5xl font-black text-orange-600 mb-4 font-paeez'>
              انتخابی که پشیمان نمی‌شوید
            </h2>
            <p className='text-gray-700 text-lg max-w-2xl mx-auto'>
              ما متعهد به ارائه بهترین کیفیت خشکبار از قلب دامغان هستیم
            </p>
          </motion.div>

          <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className='group relative bg-gradient-to-br from-black to-gray-900 border border-gray-800 rounded-tr-3xl rounded-bl-3xl p-3 hover:border-orange-600/50 transition-all duration-500 '
              >
                <div className='flex items-center justify-start gap-3 mb-3'>
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center transform group-hover:rotate-6 transition-transform duration-500 `}>
                    <feature.icon size={30} className='text-white' />
                  </div>
                  <h3 className='text-xl font-bold text-white mb-3'>{feature.title}</h3>

                </div>
                <div>
                  <p className='text-gray-400'>{feature.description}</p>
                </div>

                <div className='absolute top-0 right-0 w-20 h-20 bg-orange-600/5 rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500' />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* <div className='w-full flex justify-center items-center mt-25 max-xl:mt-5'>
        <img src="./landbanner.jpg" alt="img" className='w-full rounded-2xl object-cover' />
      </div> */}

    </div>
  )
}