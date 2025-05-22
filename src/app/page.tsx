'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiMapPin, FiCalendar, FiHome } from 'react-icons/fi';

// アニメーションコンポーネント
const AnimatedSection = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start({
        y: 0,
        opacity: 1,
        transition: { duration: 0.5, delay },
      });
    }
  }, [controls, inView, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ y: 50, opacity: 0 }}
      animate={controls}
      className="w-full"
    >
      {children}
    </motion.div>
  );
};

// 部屋カード
const RoomCard = ({ name, price, image, description }: { name: string, price: number, image: string, description?: string }) => (
  <div className="flex-shrink-0 w-72 bg-[var(--card)] text-[var(--card-foreground)] rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
    <div className="relative h-48">
      <Image
        src={image}
        alt={name}
        fill
        className="object-cover"
      />
    </div>
    <div className="p-4">
      <h3 className="text-lg font-bold mb-2 text-[var(--heading)]">{name}</h3>
      {description && <p className="text-[var(--card-foreground)] mb-3 text-sm">{description}</p>}
      {price > 0 && <p className="text-[var(--muted-foreground)] mb-3">¥{price.toLocaleString()}/泊〜</p>}
      <Link href="/rooms" className="text-[var(--primary)] hover:text-[var(--secondary)] transition-colors inline-flex items-center">
        詳細を見る
      </Link>
    </div>
  </div>
);

export default function Home() {
  // 仮のデータ
  const featuredRooms = [
    {
      id: 1,
      name: 'トリプルルーム',
      price: 0,
      image: '/images/room1.png',
      description: '最大4名様までご利用可能。シングルベッド3台、4名様の場合はお布団にて対応。お部屋のレイアウトは部屋ごとに異なります。カップル・お子様連れのご家族、グループ様まで様々なニーズに対応。シャワールーム・トイレ付き。',
    },
    {
      id: 2,
      name: '4ベッドプライベートルーム',
      price: 0,
      image: '/images/room2.png',
      description: '最大6名様までご利用可能な4ベッドルーム。5名様以上の場合はお布団にて対応。お庭からの専用出入り口があるプライベートタイプ。シャワールーム・トイレ付き。',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* ヒーローセクション */}
      <section id="hero" aria-label="メインビジュアル" className="relative h-screen -mt-16 pt-16">
        <div className="absolute inset-0 bg-black/30 z-0" />
        <div className="relative h-full w-full">
          <Image
            src="/images/hero-bg.jpg"
            alt="石垣島の美しい海"
            fill
            priority
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 pt-16" style={{backgroundImage: 'url(/images/hero.jpeg)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
          <motion.div className="space-y-8 -translate-y-12">
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-5xl md:text-6xl text-center font-kaisei !text-white"
            >
              空と水に触れて
            </motion.h1>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl max-w-2xl px-8 md:px-12 leading-relaxed tracking-wide !font-light"
            >
              豊かな自然、透きとおる空と海、魅力あふれる石垣島。その中でも絶景の川平湾すぐ近くの別荘物件をフルリフォームして、ここだけの時間が流れる空間を創りました。
            </motion.p>
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex justify-center"
            >
              <Link 
                href="/reservation" 
                className="bg-[var(--card)] text-[var(--primary)] px-8 py-3 rounded-full font-medium hover:bg-opacity-90 transition"
              >
                予約する
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 特徴セクション */}
      <section id="features" aria-label="SOLAIZの特徴" className="py-20 px-4 bg-[var(--background)]">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <AnimatedSection delay={0.1}>
              <div className="text-center">
                <div className="bg-[var(--primary)] text-[var(--primary-foreground)] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiMapPin size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-[var(--heading)]">最高のロケーション</h3>
                <p className="text-[var(--foreground)]">
                  石垣島の美しいビーチから徒歩圏内に位置し、自然に囲まれた静かな環境で特別な時間をお過ごしいただけます。
                </p>
              </div>
            </AnimatedSection>
            
            <AnimatedSection delay={0.2}>
              <div className="text-center">
                <div className="bg-[var(--primary)] text-[var(--primary-foreground)] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiHome size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-[var(--heading)]">快適な空間</h3>
                <p className="text-[var(--foreground)]">
                  昔からの雰囲気を残しつつ、快適な空間でSOLAIZだけの時間をお過ごしいただけます。心と体をリフレッシュさせる、時間を忘れて過ごす心地よい空間。敷地内プールやジャグジー、スチームバス（Newto蒸気浴®︎）などのサービスも完備。
                </p>
              </div>
            </AnimatedSection>
            
            <AnimatedSection delay={0.3}>
              <div className="text-center">
                <div className="bg-[var(--primary)] text-[var(--primary-foreground)] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiCalendar size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-[var(--heading)]">特別な体験</h3>
                <p className="text-[var(--foreground)]">
                  自然あふれる石垣島で満喫できるアクティビティや、旅の楽しみ方をご提案します。日常をわすれる美しい自然空間でお気に入りの場所を見つけて、ここだけのお時間をお過ごしください。
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* お部屋セクション */}
      <section id="rooms" aria-label="お部屋のご案内" className="py-20 px-4 bg-[var(--muted)]">
        <div className="container mx-auto">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-[var(--heading)]">
              お部屋
            </h2>
            <p className="text-center text-[var(--muted-foreground)] mb-12 max-w-3xl mx-auto">
              30年近く前から川平の地に建つ別荘物件をフルリフォームした、ここだけの宿泊体験をお過ごしください。全室オーシャンビューで、石垣島の豊かな自然と海の恵みを感じることができます。
            </p>
          </AnimatedSection>
          
          <div className="flex overflow-x-auto pb-6 gap-6 scrollbar-hide">
            {featuredRooms.map((room, index) => (
              <AnimatedSection key={room.id} delay={0.1 * index}>
                <RoomCard {...room} />
              </AnimatedSection>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link 
              href="/rooms" 
              className="inline-block border-2 border-midnight-blue text-[var(--primary)] px-6 py-2 rounded-full hover:bg-[var(--primary)] hover:text-[var(--foreground)] transition-colors"
            >
              すべてのお部屋を見る
            </Link>
          </div>
        </div>
      </section>

      {/* アクセスセクション */}
      <section id="access" aria-label="アクセス情報" className="py-20 px-4 bg-[var(--background)]">
        <div className="container mx-auto">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-[var(--heading)]">
              アクセス
            </h2>
            <p className="text-center text-[var(--muted-foreground)] mb-12 max-w-3xl mx-auto">
              石垣空港から車で約30分。静かな環境にありながら、川平湾や西表島、竹富島、波照間島など人気スポットへのアクセスも便利です。
            </p>
          </AnimatedSection>
          
          <AnimatedSection delay={0.1}>
            <div className="bg-[var(--card)] rounded-lg shadow-md overflow-hidden max-w-4xl mx-auto">
              <div className="h-96 relative">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d58124.22559035857!2d124.14150649985564!3d24.424261674720363!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e6!4m5!1s0x345fe3e11fb1b66b%3A0x3783993534aa9b5d!2z5rKW57iE55yM55-z5Z6j5biC55m95L-d77yR77yZ77yW77yQ4oiS77yR77yU77yT4oiS77yRIOefs-Weo-epuua4r--8iOWNl-OBrOWztiDnn7PlnqPnqbrmuK_vvIkgKElTRyk!3m2!1d24.3959677!2d124.24576409999999!4m5!1s0x345fddc1083715d5%3A0xc08d1fc66bbfa3ce!2z44CSOTA3LTA0NTMg5rKW57iE55yM55-z5Z6j5biC5bed5bmz77yY77yT77yV4oiS77yR!3m2!1d24.462676!2d124.14147009999999!5e0!3m2!1sja!2sjp!4v1747221882109!5m2!1sja!2sjp" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-[var(--heading)]">SOLAIZ Ishigaki</h3>
                <p className="text-[var(--card-foreground)]">〒907-0453 石垣県石垣市川平835-1</p>
                <p className="text-[var(--muted-foreground)] mt-2">TEL: 0980-XX-XXXX</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* お問い合わせセクション */}
      <section id="contact" aria-label="お問い合わせ" className="py-20 px-4 bg-[var(--muted)]">
        <div className="container mx-auto text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[var(--primary-foreground)]">
              あなただけの島時間を、SOLAIZで
            </h2>
            <p className="mb-8 max-w-2xl mx-auto text-lg text-[var(--primary-foreground)]">
              石垣島の豊かな自然と海、そしてスタッフの魅力ある日常を感じながら、忘れられない旅の思い出を。
            </p>
            <Link 
              href="/reservation" 
              className="bg-[var(--accent)] text-[var(--accent-foreground)] px-8 py-3 rounded-full font-medium hover:opacity-90 transition-opacity inline-block"
            >
              今すぐ予約する
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* CTAセクション */}
      <section id="cta" aria-label="今すぐ予約" className="py-20 px-4 bg-[var(--primary)]">
        <div className="container mx-auto text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[var(--primary-foreground)]">
              あなただけの島時間を、SOLAIZで
            </h2>
            <p className="mb-8 max-w-2xl mx-auto text-lg text-[var(--primary-foreground)]">
              石垣島の豊かな自然と海、そしてスタッフの魅力ある日常を感じながら、忘れられない旅の思い出を。
            </p>
            <Link 
              href="/reservation" 
              className="bg-[var(--accent)] text-[var(--accent-foreground)] px-8 py-3 rounded-full font-medium hover:opacity-90 transition-opacity inline-block"
            >
              今すぐ予約する
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
