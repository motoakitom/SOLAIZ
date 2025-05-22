'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiUsers } from 'react-icons/fi';
import { Room } from '@/types';

// お部屋データ
const roomsData: Room[] = [
  {
    id: 1,
    name: 'トリプルルーム',
    description: '23.2㎡の広さで1名〜4名様までご利用いただけます。シングルベッド3台を完備（4名様利用時は追加布団）。全室禁煙で、シャワールーム・トイレ付き。タオル・バスタオル・アメニティ完備。',
    price: 5000,
    priceMax: 10500,
    image: '/images/room1.png',
    capacity: 4,
    features: [
      '23.2㎡／1名〜4名',
      'シングルベッド3台／4名の場合は追加布団',
      '全室禁煙',
      'シャワールーム・トイレ付',
      'タオル・バスタオル・アメニティ完備'
    ]
  },
  {
    id: 2,
    name: '4ベッドプライベートルーム',
    description: '34.8㎡の広々としたプライベートルーム。1名〜6名様までご利用可能。シングルベッド4台完備（5名以上は追加布団）。全室禁煙で、シャワールーム・トイレ付き。タオル・バスタオル・アメニティ完備。',
    price: 6000,
    priceMax: 11900,
    image: '/images/room2.png',
    capacity: 6,
    features: [
      '34.8㎡／1名〜6名',
      'お部屋の入り口が外から別のプライベートルーム',
      'シングルベッド4台／5名以上は追加布団',
      '全室禁煙',
      'シャワールーム・トイレ付',
      'タオル・バスタオル・アメニティ完備'
    ]
  }
];

// 部屋カードコンポーネント
interface Room {
  id: number;
  name: string;
  description: string;
  price: number;
  priceMax: number;
  image: string;
  capacity: number;
  features: string[];
}

const RoomCard = ({ room }: { room: Room }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-[var(--card)] rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div className="relative h-64">
        <Image
          src={room.image}
          alt={room.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-[var(--primary)]">{room.name}</h3>
          <div className="flex items-center text-[var(--muted-foreground)]">
            <FiUsers className="mr-1" />
            <span>{room.capacity}名様</span>
          </div>
        </div>
        <p className="text-[var(--muted-foreground)] mb-4">{room.description}</p>
        <div className="space-y-4">
          <div className="space-y-2">
            {room.features.map((feature, index) => (
              <div key={index} className="flex items-start">
                <span className="mr-2">⚪︎</span>
                <p className="text-sm">{feature}</p>
              </div>
            ))}
          </div>
          <div className="pt-4 border-t border-gray-200">
            <p className="text-lg font-semibold">
              ¥{room.price.toLocaleString()}〜{room.priceMax.toLocaleString()}円
              <span className="block text-sm font-normal text-[var(--muted-foreground)]">1泊1人あたり({room.capacity}名利用時)</span>
            </p>
            <p className="text-xs text-gray-500 mt-2">
              ※シーズンやご利用人数により1人あたり金額は異なります。<br />
              ※寝具不要の幼児は無料です。<br />
              ※料金、ご予約はお問い合わせください。
            </p>
            <Link 
              href={`/contact`}
              className="mt-4 inline-block bg-[var(--primary)] text-[var(--foreground)] px-6 py-2 rounded-md hover:bg-opacity-90 transition-colors text-center w-full"
            >
              プラン・ご予約はこちら →
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function Rooms() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen pt-20">
      {/* ヘッダーセクション */}
      <section className="bg-[var(--primary)] text-[var(--foreground)] py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">お部屋</h1>
          <p className="text-xl text-center max-w-3xl mx-auto">
            すべてのお部屋は、心地よい島時間を過ごしていただけるよう、<br />細部までこだわってデザインされています。
          </p>
        </div>
      </section>

      {/* お部屋一覧 */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoaded && roomsData.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        </div>
      </section>

      {/* キャンセルポリシー */}
      <section className="py-16 px-4 bg-sand">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-8 text-center text-[var(--primary)]">キャンセルポリシー</h2>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="space-y-4">
              <p>⚪︎キャンセル料は以下の通り頂戴いたします。</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>当日：宿泊料金の100%</li>
                <li>3日前から：宿泊料金の80%</li>
                <li>7日前から：宿泊料金の50%</li>
                <li>14日前から：宿泊料金の20%</li>
                <li>連絡なしの不泊/不着：宿泊料金の100%</li>
              </ul>
              <p>⚪︎航空・船舶便欠航の場合はキャンセル料はかかりません。</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-midnight-blue to-ocean text-[var(--foreground)]">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">ご予約はお早めに</h2>
          <p className="mb-8 max-w-xl mx-auto">
            石垣島の人気シーズンは予約が集中します。<br />
            特別なご滞在のために、お早めのご予約をおすすめします。
          </p>
          <Link
            href="/reservation"
            className="bg-[var(--card)] text-[var(--primary)] px-8 py-3 rounded-full font-medium hover:bg-opacity-90 transition inline-block"
          >
            空室を確認する
          </Link>
        </div>
      </section>
    </div>
  );
} 