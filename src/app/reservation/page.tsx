'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiCheck, FiCalendar, FiUsers, FiCreditCard } from 'react-icons/fi';
import { Room } from '@/types';
import Link from 'next/link';

// カレンダー日付選択コンポーネント
const DateRangePicker = ({ onSelect }: { onSelect: (startDate: Date, endDate: Date) => void }) => {
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  const handleDateChange = () => {
    if (startDate && endDate) {
      onSelect(new Date(startDate), new Date(endDate));
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <FiCalendar className="mr-2" /> 宿泊日を選択
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">チェックイン</label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-midnight-blue focus:border-transparent"
              value={startDate}
              onChange={(e) => {
                setStartDate(e.target.value);
                if (endDate && new Date(e.target.value) > new Date(endDate)) {
                  setEndDate('');
                }
              }}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">チェックアウト</label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-midnight-blue focus:border-transparent"
              value={endDate}
              onChange={(e) => {
                setEndDate(e.target.value);
                handleDateChange();
              }}
              min={startDate || new Date().toISOString().split('T')[0]}
              disabled={!startDate}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// 部屋選択カード
const RoomSelectCard = ({ room, selected, onSelect }: { room: Room, selected: boolean, onSelect: () => void }) => {
  return (
    <div 
      className={`p-4 border rounded-lg cursor-pointer transition-all ${selected ? 'border-midnight-blue bg-blue-50' : 'border-gray-200 hover:border-midnight-blue'}`}
      onClick={onSelect}
    >
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-semibold">{room.name}</h4>
          <p className="text-sm text-gray-600 mt-1 flex items-center">
            <FiUsers className="mr-1" size={14} /> 最大{room.capacity}名
          </p>
        </div>
        <div className="text-right">
          <p className="font-bold">¥{room.price.toLocaleString()}</p>
          <p className="text-xs text-gray-500">1泊あたり</p>
        </div>
      </div>
      {selected && (
        <div className="mt-2 flex items-center text-midnight-blue text-sm">
          <FiCheck className="mr-1" /> 選択中
        </div>
      )}
    </div>
  );
};

// 仮のデータ
const roomsData: Room[] = [
  {
    id: 1,
    name: 'オーシャンビュースイート',
    description: '広々とした空間で、大きな窓からは美しい海を一望できます。キングサイズベッドと高級アメニティを備えた、最上級のお部屋です。',
    price: 28000,
    image: '/images/room1.jpg',
    capacity: 2,
  },
  {
    id: 2,
    name: 'ガーデンデラックス',
    description: '緑豊かな庭園に面したお部屋。自然の中でリラックスできる、落ち着いた雰囲気が特徴です。ダブルベッドを備えています。',
    price: 21000,
    image: '/images/room2.jpg',
    capacity: 2,
  },
  {
    id: 3,
    name: 'スタンダードルーム',
    description: 'シンプルながらも快適な空間。ツインベッドを備え、ビーチへのアクセスも便利です。リーズナブルに島の滞在を楽しめます。',
    price: 18000,
    image: '/images/room3.jpg',
    capacity: 2,
  },
  {
    id: 4,
    name: 'ファミリールーム',
    description: '家族での滞在に最適な広々とした空間。クイーンベッドとソファベッドを備え、4名様までご利用いただけます。',
    price: 24000,
    image: '/images/room1.jpg',
    capacity: 4,
  },
];

export default function Reservation() {
  const searchParams = useSearchParams();
  const initialRoomId = searchParams.get('room') ? parseInt(searchParams.get('room') as string) : null;
  
  const [selectedRoomId, setSelectedRoomId] = useState<number | null>(initialRoomId);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [step, setStep] = useState(1);
  const [guestInfo, setGuestInfo] = useState({
    name: '',
    email: '',
    phone: '',
    guests: 1,
    specialRequests: ''
  });

  const handleDateSelect = (start: Date, end: Date) => {
    setStartDate(start);
    setEndDate(end);
  };

  const handleRoomSelect = (roomId: number) => {
    setSelectedRoomId(roomId);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setGuestInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNextStep = () => {
    if (step === 1 && selectedRoomId && startDate && endDate) {
      setStep(2);
    } else if (step === 2 && guestInfo.name && guestInfo.email && guestInfo.phone) {
      // 通常はここで予約処理を行います
      setStep(3);
    }
  };

  const calculateTotalPrice = () => {
    if (!selectedRoomId || !startDate || !endDate) return 0;
    
    const room = roomsData.find(r => r.id === selectedRoomId);
    if (!room) return 0;
    
    const nights = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    return room.price * nights;
  };

  const selectedRoom = roomsData.find(room => room.id === selectedRoomId);

  return (
    <div className="min-h-screen pt-20 pb-16">
      {/* ヘッダーセクション */}
      <section className="bg-midnight-blue text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">ご予約</h1>
          <p className="text-center max-w-3xl mx-auto">
            石垣島での特別な滞在を、簡単にご予約いただけます。
          </p>
          
          {/* ステップ表示 */}
          <div className="max-w-3xl mx-auto mt-8 px-4">
            <div className="flex justify-between relative">
              {/* ステップ1 */}
              <div className={`relative z-10 flex-1 max-w-[180px] ${step >= 1 ? 'text-white' : 'text-gray-400'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 transition-all duration-300 ${
                  step >= 1 
                    ? 'bg-white text-midnight-blue shadow-lg scale-110' 
                    : 'bg-gray-600/50 text-gray-300'
                }`}>
                  <span className="font-medium">1</span>
                </div>
                <p className="text-sm font-medium text-white">日程・お部屋選択</p>
              </div>
              
              {/* ステップ2 */}
              <div className={`relative z-10 flex-1 max-w-[180px] ${step >= 2 ? 'text-white' : 'text-gray-400'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 transition-all duration-300 ${
                  step >= 2 
                    ? 'bg-white text-midnight-blue shadow-lg scale-110' 
                    : step > 2 
                      ? 'bg-gray-400/50 text-white' 
                      : 'bg-gray-600/50 text-gray-300'
                }`}>
                  <span className="font-medium">2</span>
                </div>
                <p className={`text-sm font-medium ${step >= 2 ? 'text-white' : 'text-gray-300'}`}>お客様情報入力</p>
              </div>
              
              {/* ステップ3 */}
              <div className={`relative z-10 flex-1 max-w-[180px] ${step >= 3 ? 'text-white' : 'text-gray-400'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 transition-all duration-300 ${
                  step >= 3 
                    ? 'bg-white text-midnight-blue shadow-lg scale-110' 
                    : 'bg-gray-600/50 text-gray-300'
                }`}>
                  <span className="font-medium">3</span>
                </div>
                <p className={`text-sm font-medium ${step >= 3 ? 'text-white' : 'text-gray-300'}`}>完了</p>
              </div>
              
              {/* 進捗バー */}
              <div className="absolute top-5 left-0 right-0 h-1 bg-gray-600/50 -z-0">
                <div 
                  className="h-full bg-white transition-all duration-500 ease-out" 
                  style={{ width: step === 1 ? '0%' : step === 2 ? '50%' : '100%' }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-5xl mx-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* 左側：日付選択 */}
              <div className="md:col-span-2">
                <DateRangePicker onSelect={handleDateSelect} />
                
                {startDate && endDate && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    className="mt-6 bg-white p-6 rounded-lg shadow-md"
                  >
                    <h3 className="text-xl font-semibold mb-4">お部屋を選択</h3>
                    <div className="space-y-3">
                      {roomsData.map(room => (
                        <RoomSelectCard 
                          key={room.id}
                          room={room}
                          selected={selectedRoomId === room.id}
                          onSelect={() => handleRoomSelect(room.id)}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
              
              {/* 右側：予約概要 */}
              <div>
                <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
                  <h3 className="text-xl font-semibold mb-4">予約概要</h3>
                  
                  {selectedRoom && startDate && endDate ? (
                    <div>
                      <p className="font-bold text-lg mb-1">{selectedRoom.name}</p>
                      <p className="text-sm text-gray-600 mb-4">
                        {startDate.toLocaleDateString()} 〜 {endDate.toLocaleDateString()}
                        <br />
                        {Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))}泊
                      </p>
                      <div className="border-t pt-4 mt-4">
                        <div className="flex justify-between mb-2">
                          <span>料金</span>
                          <span>¥{calculateTotalPrice().toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between font-bold text-lg mt-4">
                          <span>合計</span>
                          <span>¥{calculateTotalPrice().toLocaleString()}</span>
                        </div>
                      </div>
                      <button
                        onClick={handleNextStep}
                        className="w-full bg-midnight-blue text-white py-3 rounded-md mt-6 hover:bg-opacity-90 transition-colors"
                      >
                        次へ進む
                      </button>
                    </div>
                  ) : (
                    <p className="text-gray-500">
                      日程とお部屋を選択すると、予約内容が表示されます。
                    </p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-5xl mx-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* 左側：お客様情報フォーム */}
              <div className="md:col-span-2">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-6">お客様情報</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">お名前 *</label>
                      <input
                        type="text"
                        name="name"
                        value={guestInfo.name}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-midnight-blue focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">メールアドレス *</label>
                      <input
                        type="email"
                        name="email"
                        value={guestInfo.email}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-midnight-blue focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">電話番号 *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={guestInfo.phone}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-midnight-blue focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">宿泊人数</label>
                      <select
                        name="guests"
                        value={guestInfo.guests}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-midnight-blue focus:border-transparent"
                      >
                        {selectedRoom && [...Array(selectedRoom.capacity)].map((_, i) => (
                          <option key={i+1} value={i+1}>{i+1}名</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">特別リクエスト</label>
                      <textarea
                        name="specialRequests"
                        value={guestInfo.specialRequests}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-midnight-blue focus:border-transparent"
                        placeholder="到着時間や食事のアレルギーなど、特別なご要望がございましたらお知らせください。"
                      ></textarea>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t">
                    <h4 className="font-semibold mb-4 flex items-center">
                      <FiCreditCard className="mr-2" /> お支払い方法
                    </h4>
                    <p className="text-gray-700 mb-4">
                      現地フロントでのお支払いとなります。<br />
                      クレジットカード、現金がご利用いただけます。
                    </p>
                    <div className="flex gap-2">
                      <img src="/images/visa.svg" alt="Visa" className="h-8" />
                      <img src="/images/mastercard.svg" alt="Mastercard" className="h-8" />
                      <img src="/images/amex.svg" alt="American Express" className="h-8" />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* 右側：予約概要 */}
              <div>
                <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
                  <h3 className="text-xl font-semibold mb-4">予約概要</h3>
                  
                  {selectedRoom && startDate && endDate && (
                    <div>
                      <p className="font-bold text-lg mb-1">{selectedRoom.name}</p>
                      <p className="text-sm text-gray-600 mb-4">
                        {startDate.toLocaleDateString()} 〜 {endDate.toLocaleDateString()}
                        <br />
                        {Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))}泊
                      </p>
                      <div className="border-t pt-4 mt-4">
                        <div className="flex justify-between mb-2">
                          <span>料金</span>
                          <span>¥{calculateTotalPrice().toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between font-bold text-lg mt-4">
                          <span>合計</span>
                          <span>¥{calculateTotalPrice().toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="mt-6 space-y-3">
                        <button
                          onClick={handleNextStep}
                          className="w-full bg-midnight-blue text-white py-3 rounded-md hover:bg-opacity-90 transition-colors"
                          disabled={!guestInfo.name || !guestInfo.email || !guestInfo.phone}
                        >
                          予約を確定する
                        </button>
                        <button
                          onClick={() => setStep(1)}
                          className="w-full bg-white text-midnight-blue border border-midnight-blue py-3 rounded-md hover:bg-gray-50 transition-colors"
                        >
                          戻る
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiCheck size={40} className="text-green-600" />
              </div>
              <h2 className="text-2xl font-bold mb-4">ご予約ありがとうございます</h2>
              <p className="text-gray-700 mb-6">
                ご予約内容の確認メールを {guestInfo.email} に送信しました。<br />
                ご不明点がございましたら、お気軽にお問い合わせください。
              </p>
              
              {selectedRoom && startDate && endDate && (
                <div className="bg-gray-50 p-4 rounded-md text-left mb-6">
                  <h3 className="font-semibold mb-2">予約内容</h3>
                  <div className="text-sm text-gray-700">
                    <p><span className="font-medium">予約番号:</span> RSV-{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}</p>
                    <p><span className="font-medium">お部屋:</span> {selectedRoom.name}</p>
                    <p><span className="font-medium">チェックイン:</span> {startDate.toLocaleDateString()}</p>
                    <p><span className="font-medium">チェックアウト:</span> {endDate.toLocaleDateString()}</p>
                    <p><span className="font-medium">宿泊人数:</span> {guestInfo.guests}名</p>
                    <p><span className="font-medium">合計金額:</span> ¥{calculateTotalPrice().toLocaleString()}</p>
                  </div>
                </div>
              )}
              
              <div className="flex justify-center">
                <Link 
                  href="/"
                  className="bg-midnight-blue text-white px-6 py-2 rounded-md hover:bg-opacity-90 transition-colors"
                >
                  トップページへ戻る
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
} 