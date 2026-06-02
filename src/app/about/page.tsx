'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import {
  Leaf,
  Truck,
  Shield,
  Star,
  Users,
  Award,
  ChevronLeft,
  BadgeCheck,
  Heart,
  Package,
  Clock,
  Sprout,
  Phone,
  Mail,
  MapPin
} from 'lucide-react'
import Link from 'next/link'
import { useProducts } from '@/hook/useProduct'
import ProductCard from '@/components/ProductCard/ProductCard'

const stats = [
  {
    icon: Users,
    label: 'مشتریان راضی',
    value: '۱۰,۰۰۰+',
    suffix: 'نفر',
    color: 'from-orange-400 to-orange-600'
  },
  {
    icon: Package,
    label: 'سفارشات موفق',
    value: '۲۵,۰۰۰+',
    suffix: 'سفارش',
    color: 'from-amber-400 to-amber-600'
  },
  {
    icon: Clock,
    label: 'سابقه فعالیت',
    value: '۱۵+',
    suffix: 'سال',
    color: 'from-yellow-400 to-yellow-600'
  },
  {
    icon: Truck,
    label: 'ارسال به سراسر ایران',
    value: '۳۱',
    suffix: 'استان',
    color: 'from-orange-500 to-red-500'
  },
]

const features = [
  {
    icon: Sprout,
    title: 'محصولات ارگانیک',
    description: 'تمام محصولات ما از بهترین باغات دامغان، بدون استفاده از سموم شیمیایی و کاملاً طبیعی برداشت می‌شوند.',
    color: 'bg-green-50 text-green-600'
  },
  {
    icon: Shield,
    title: 'تضمین کیفیت',
    description: 'ما کیفیت را تضمین می‌کنیم. در صورت نارضایتی، تا ۷ روز پس از خرید، وجه شما بازگردانده می‌شود.',
    color: 'bg-blue-50 text-blue-600'
  },
  {
    icon: Truck,
    title: 'ارسال سریع',
    description: 'سفارشات شما در سریع‌ترین زمان ممکن به سراسر ایران ارسال می‌شود. تحویل ۲ تا ۴ روزه در تهران و مراکز استان‌ها.',
    color: 'bg-orange-50 text-orange-600'
  },
  {
    icon: Award,
    title: 'محصولات درجه یک',
    description: 'دانه‌های درشت، تازه و مرغوب. ما تنها بهترین‌ها را برای شما انتخاب می‌کنیم.',
    color: 'bg-purple-50 text-purple-600'
  },
  {
    icon: Leaf,
    title: 'تازگی و طعم اصیل',
    description: 'محصولات ما مستقیماً از باغ به دست شما می‌رسد تا طعم واقعی خشکبار دامغان را تجربه کنید.',
    color: 'bg-teal-50 text-teal-600'
  },
  {
    icon: Heart,
    title: 'رضایت مشتری',
    description: 'رضایت شما اولویت ماست. تیم پشتیبانی ما همیشه آماده پاسخگویی به سوالات شماست.',
    color: 'bg-rose-50 text-rose-600'
  },
]

const teamMembers = [
  {
    name: 'فاطمه صادقین',
    role: 'مدیر تولید و کنترل کیفیت',
    image: '/team3.jpg',
    description: 'متخصص فرآوری خشکبار'
  },
  {
    name: 'متین پیرمحمدی',
    role: 'مدیر عامل و بنیان‌گذار',
    image: '/team1.jpg',
    description: 'با 5 سال تجربه در صنعت خشکبار'
  },
  {
    name: 'مهدی نقیان',
    role: 'مدیر فروش و بازاریابی',
    image: '/team2.jpg',
    description: 'کارشناس ارشد بازرگانی'
  },
]

const products = [
  { name: 'پسته اکبری', image: '/images/products/peste-akbari.jpg', grade: 'درجه یک' },
  { name: 'بادام کاغذی', image: '/images/products/badam.jpg', grade: 'اعلا' },
  { name: 'گردوی دامغان', image: '/images/products/gerdoo.jpg', grade: 'ممتاز' },
  { name: 'برگه زردآلو', image: '/images/products/barge.jpg', grade: 'صادراتی' },
  { name: 'انجیر خشک', image: '/images/products/anjir.jpg', grade: 'درجه یک' },
  { name: 'کشمش پلویی', image: '/images/products/keshmesh.jpg', grade: 'اعلا' },
]

export default function AboutPage() {
  const { data, isLoading, isError } = useProducts({ page: 1, limit: 5 });

  return (
    <div className="min-h-screen bg-white font-kalameh">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br rounded-b-4xl from-orange-700 via-orange-400 to-orange-900 text-white overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/10 rounded-full -ml-36 -mb-36" />
        <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-white/5 rounded-full" />


        <div className="max-w-7xl mx-auto px-4 py-20 lg:py-32 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm mb-6"
              >
                <BadgeCheck size={16} />
                <span>بزرگترین تامین‌کننده خشکبار دامغان</span>
              </motion.div>

              <h1 className="text-4xl lg:text-6xl font-black mb-6 font-sarvenaz leading-tight">
                طعم واقعی
                <span className="block text-amber-200">خشکبار دامغان</span>
                را با ما تجربه کنید
              </h1>

              <p className="text-lg lg:text-xl text-white/90 mb-8 leading-relaxed">
                ما در قلب دامغان، شهر باغ‌های پسته و بادام، بهترین و تازه‌ترین خشکبار را
                مستقیماً از کشاورزان محلی تهیه و به دست شما می‌رسانیم.
                کیفیت، تازگی و اصالت، سه اصل جدایی‌ناپذیر ماست.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link href={'/products'}>
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-orange-600 cursor-pointer px-8 py-4 rounded-xl font-bold text-lg hover:bg-amber-50 transition-all duration-300 shadow-xl flex items-center gap-2"
                  >
                    مشاهده محصولات
                    <ChevronLeft size={20} />
                  </motion.span>
                </Link>

                <Link href="tel:09010791929" >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white/20 backdrop-blur-sm cursor-pointer text-white px-8 py-4 rounded-xl font-bold text-lg border-2 border-white/30 hover:bg-white/30 transition-all duration-300"
                  >
                    تماس با ما
                  </motion.button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative w-full aspect-square">
                <Image
                  src="/land3.jpg"
                  alt="خشکبار دامغان"
                  fill
                  className="object-cover rounded-3xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-orange-900/20 to-transparent rounded-3xl" />
              </div>

              {/* Floating Cards */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3"
              >
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <Star size={24} className="text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-800">کیفیت تضمینی</p>
                  <p className="text-xs text-gray-500">گواهی ارگانیک</p>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3"
              >
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Truck size={24} className="text-orange-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-800">ارسال فوری</p>
                  <p className="text-xs text-gray-500">به سراسر ایران</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative -mt-10 z-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 hover:border-orange-200 transition-all duration-300"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
                  <stat.icon size={24} className="text-white" />
                </div>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-3xl font-black text-gray-800">{stat.value}</span>
                  <span className="text-sm text-gray-500">{stat.suffix}</span>
                </div>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      {/* Features Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-black text-gray-800 mb-4 font-sarvenaz">
              چرا
              <span className="text-orange-600">   پستوناتس </span>
              ؟
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              ما به کیفیت محصولاتمان افتخار می‌کنیم و همیشه در تلاشیم تا بهترین تجربه را برای شما رقم بزنیم
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <div className={`w-14 h-14 ${feature.color} rounded-xl flex items-center justify-center mb-4`}>
                  <feature.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Showcase */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-black text-gray-800 mb-4 font-sarvenaz">
              محصولات
              <span className="text-orange-600"> محبوب</span>
            </h2>
            <p className="text-gray-600">
              برخی از بهترین محصولات ما که بیشترین طرفدار را دارند
            </p>
          </motion.div>

          <div dir='ltr' className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-full">
            {data?.data.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group cursor-pointer"
              >
                <ProductCard data={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section (Optional) */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-black text-gray-800 mb-4 font-sarvenaz">
              تیم
              <span className="text-orange-600"> ما</span>
            </h2>
            <p className="text-gray-600">
              افرادی که با عشق و تخصص، بهترین خشکبار را به شما تقدیم می‌کنند
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="text-center"
              >
                <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden border-4 border-orange-200 shadow-xl">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h3>
                <p className="text-orange-600 font-semibold mb-2">{member.role}</p>
                <p className="text-sm text-gray-500">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-orange-500 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24" />

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-5xl font-black mb-6 font-sarvenaz">
              آماده‌اید طعم واقعی خشکبار رو بچشید؟
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              همین حالا سفارش دهید و از تازگی و کیفیت محصولات ما لذت ببرید.
              ارسال رایگان برای سفارشات بالای ۵۰۰ هزار تومان!
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link href={'/products'}>
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-orange-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-amber-50 transition-all duration-300 shadow-xl"
                >
                  مشاهده فروشگاه
                </motion.span>
              </Link>

              <Link href="tel:09010791929" >
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold text-lg border-2 border-white/30 hover:bg-white/30 transition-all duration-300"
                >
                  مشاوره رایگان
                </motion.span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Info */}
     
    </div>
  )
}