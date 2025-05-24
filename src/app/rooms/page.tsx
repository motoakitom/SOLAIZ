'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiUsers } from 'react-icons/fi';
import { Room } from '@/types';
import RoomCard from '@/components/RoomCard';

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

export default function Rooms() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen pt-20 bg-[var(--background)]">
      {/* ヒーローセクション */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--primary)]/80 to-[var(--primary)]/60">
          <div className="absolute inset-0 bg-noise opacity-10"></div>
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              お部屋・プラン
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              島の自然を感じる、くつろぎの空間。
              <br className="hidden md:block" />
              すべてのお部屋は、心地よい島時間を過ごしていただけるよう、
              細部までこだわってデザインされています。
            </p>
          </motion.div>
        </div>
      </section>

      {/* お部屋一覧 */}
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--heading)] mb-4">
              お部屋のご案内
            </h2>
            <div className="w-20 h-1 bg-[var(--accent)] mx-auto mb-6"></div>
            <p className="text-[var(--muted-foreground)] max-w-2xl mx-auto">
              リラックスできる空間とこだわりのインテリアで、
              特別なひとときをお過ごしいただけます。
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {isLoaded && roomsData.map((room, index) => (
              <motion.div
                key={room.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <RoomCard {...room} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* キャンセルポリシー */}
      <section className="py-16 md:py-24 px-4 bg-[var(--muted)]">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--heading)] mb-4">
              キャンセルポリシー
            </h2>
            <div className="w-20 h-1 bg-[var(--accent)] mx-auto mb-6"></div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-[var(--card)] rounded-xl p-8 shadow-sm border border-[var(--border)]"
          >
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-[var(--heading)]">キャンセル料金について</h3>
                <p className="text-[var(--muted-foreground)]">
                  ご予約のキャンセルは、以下のキャンセル料が発生いたします。
                </p>
                <div className="bg-[var(--muted)] rounded-lg p-6">
                  <ul className="space-y-3">
                    <li className="flex justify-between py-2 border-b border-[var(--border)]">
                      <span>当日</span>
                      <span className="font-medium">宿泊料金の100%</span>
                    </li>
                    <li className="flex justify-between py-2 border-b border-[var(--border)]">
                      <span>3日前〜前日</span>
                      <span className="font-medium">宿泊料金の80%</span>
                    </li>
                    <li className="flex justify-between py-2 border-b border-[var(--border)]">
                      <span>7日前〜4日前</span>
                      <span className="font-medium">宿泊料金の50%</span>
                    </li>
                    <li className="flex justify-between py-2 border-b border-[var(--border)]">
                      <span>14日前〜8日前</span>
                      <span className="font-medium">宿泊料金の20%</span>
                    </li>
                    <li className="flex justify-between py-2">
                      <span>連絡なしの不泊/不着</span>
                      <span className="font-medium text-[var(--accent)]">宿泊料金の100%</span>
                    </li>
                  </ul>
                </div>
                <p className="text-sm text-[var(--muted-foreground)] mt-4">
                  ※航空・船舶便欠航の場合はキャンセル料はかかりません。
                  <br />
                  ※天候不良によるキャンセルの場合も、上記キャンセルポリシーが適用されます。
                </p>
              </div>
              
              <div className="mt-8 p-6 bg-[var(--muted)] rounded-lg">
                <h4 className="font-semibold text-[var(--heading)] mb-3">ご注意事項</h4>
                <ul className="space-y-2 text-sm text-[var(--muted-foreground)]">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>チェックインは15:00〜19:00、チェックアウトは〜10:00となります。</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>全室禁煙です。喫煙所は別途ご案内いたします。</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>ペット同伴でのご宿泊はお断りしております。</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white">
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