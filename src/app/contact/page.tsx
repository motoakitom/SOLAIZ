'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiSend, FiPhone, FiMail, FiMapPin, FiCheckCircle } from 'react-icons/fi';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    checkInDate: '',
    nights: '',
    adults: '',
    children: '',
    infants: '',
    roomType: ''
  });
  const [isPrivacyAgreed, setIsPrivacyAgreed] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isPrivacyAgreed) {
      setFormError('プライバシーポリシーに同意する必要があります');
      return;
    }
    
    setIsLoading(true);
    setFormError('');
    
    // 仮の送信処理（実際にはサーバーサイドの処理が必要です）
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        checkInDate: '',
        nights: '',
        adults: '',
        children: '',
        infants: '',
        roomType: ''
      });
      setIsPrivacyAgreed(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen pt-20 pb-16">
      {/* ヘッダーセクション */}
      <section className="bg-midnight-blue text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">お問い合わせ</h1>
          <p className="text-xl text-center max-w-3xl mx-auto">
            ご質問やご予約に関するお問い合わせは、こちらのフォームからお願いいたします。
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* 左側：フォーム */}
              <div className="md:col-span-2">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white p-6 md:p-8 rounded-lg shadow-md"
                >
                  {isSubmitted ? (
                    <div className="text-center py-8">
                      <FiCheckCircle className="mx-auto text-green-500 mb-4" size={60} />
                      <h2 className="text-2xl font-bold mb-2">お問い合わせありがとうございます</h2>
                      <p className="text-gray-600 mb-6">
                        お問い合わせを受け付けました。<br />
                        内容を確認の上、担当者より折り返しご連絡いたします。
                      </p>
                      <button
                        onClick={() => setIsSubmitted(false)}
                        className="bg-midnight-blue text-white px-6 py-2 rounded-md hover:bg-opacity-90 transition-colors"
                      >
                        新しいお問い合わせをする
                      </button>
                    </div>
                  ) : (
                    <>
                      <h2 className="text-2xl font-bold mb-6">お問い合わせフォーム</h2>
                      <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">お名前 *</label>
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-midnight-blue focus:border-transparent"
                              required
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">メールアドレス *</label>
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-midnight-blue focus:border-transparent"
                              required
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">電話番号</label>
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-midnight-blue focus:border-transparent"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">お問い合わせ種別 *</label>
                            <select
                              name="subject"
                              value={formData.subject}
                              onChange={handleChange}
                              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-midnight-blue focus:border-transparent"
                              required
                            >
                              <option value="">お選びください</option>
                              <option value="予約について">予約について</option>
                              <option value="施設・設備について">施設・設備について</option>
                              <option value="料金について">料金について</option>
                              <option value="キャンセルについて">キャンセルについて</option>
                              <option value="その他">その他</option>
                            </select>
                          </div>
                        </div>
                        
                        <div className="mb-6">
                          <label className="block text-sm font-medium text-gray-700 mb-1">お問い合わせ内容 *</label>
                          <p className="text-sm text-gray-500 mb-2">
                            こちらにお問い合わせ内容を入力してください。宿泊のお問い合わせの際は、「チェックイン日」、「宿泊数」、「宿泊人数（大人、小学生以下の子ども、寝具不要の添い寝の幼児のそれぞれ）」、「部屋タイプのご希望（お任せの場合は不要）」のご記入をお願いいたします。
                          </p>
                          <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows={5}
                            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-midnight-blue focus:border-transparent"
                            required
                            placeholder="お問い合わせ内容をご記入ください"
                          ></textarea>
                        </div>
                        
                        <div className="mb-6 p-4 bg-gray-50 rounded-md">
                          <h3 className="text-lg font-semibold mb-3">宿泊情報（宿泊予定の方のみ）</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">チェックイン日</label>
                              <input
                                type="date"
                                name="checkInDate"
                                value={formData.checkInDate}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-midnight-blue focus:border-transparent"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">宿泊数</label>
                              <select
                                name="nights"
                                value={formData.nights}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-midnight-blue focus:border-transparent"
                              >
                                <option value="">選択してください</option>
                                {Array.from({ length: 14 }, (_, i) => i + 1).map(num => (
                                  <option key={num} value={num}>{num}泊</option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">大人（中学生以上）</label>
                              <select
                                name="adults"
                                value={formData.adults}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-midnight-blue focus:border-transparent"
                              >
                                <option value="">-</option>
                                {Array.from({ length: 10 }, (_, i) => i + 1).map(num => (
                                  <option key={num} value={num}>{num}名</option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">小学生以下</label>
                              <select
                                name="children"
                                value={formData.children}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-midnight-blue focus:border-transparent"
                              >
                                <option value="">-</option>
                                {Array.from({ length: 10 }, (_, i) => i).map(num => (
                                  <option key={num} value={num}>{num}名</option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">添い寝の幼児</label>
                              <select
                                name="infants"
                                value={formData.infants}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-midnight-blue focus:border-transparent"
                              >
                                <option value="">-</option>
                                {Array.from({ length: 5 }, (_, i) => i).map(num => (
                                  <option key={num} value={num}>{num}名</option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">ご希望の部屋タイプ</label>
                            <select
                              name="roomType"
                              value={formData.roomType}
                              onChange={handleChange}
                              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-midnight-blue focus:border-transparent"
                            >
                              <option value="">お任せ</option>
                              <option value="トリプルルーム">トリプルルーム</option>
                              <option value="4ベッドプライベートルーム">4ベッドプライベートルーム</option>
                            </select>
                          </div>
                        </div>
                        
                        <div className="mb-6">
                          <div className="flex items-start">
                            <div className="flex items-center h-5">
                              <input
                                id="privacy-policy"
                                name="privacy-policy"
                                type="checkbox"
                                checked={isPrivacyAgreed}
                                onChange={(e) => setIsPrivacyAgreed(e.target.checked)}
                                className="h-4 w-4 text-midnight-blue focus:ring-midnight-blue border-gray-300 rounded"
                              />
                            </div>
                            <div className="ml-3">
                              <label htmlFor="privacy-policy" className="text-sm text-gray-700">
                                <a href="/privacy" className="text-midnight-blue hover:underline">プライバシーポリシー</a>に同意する
                              </label>
                            </div>
                          </div>
                          {formError && (
                            <p className="mt-2 text-sm text-red-600">{formError}</p>
                          )}
                        </div>
                        
                        <div className="text-center">
                          <button
                            type="submit"
                            className="inline-flex items-center justify-center bg-midnight-blue text-white px-8 py-3 rounded-md hover:bg-opacity-90 transition-colors"
                            disabled={isLoading}
                          >
                            {isLoading ? (
                              <>
                                <span className="animate-spin mr-2">⟳</span>
                                送信中...
                              </>
                            ) : (
                              <>
                                <FiSend className="mr-2" />
                                送信する
                              </>
                            )}
                          </button>
                        </div>
                      </form>
                    </>
                  )}
                </motion.div>
              </div>
              
              {/* 右側：連絡先情報 */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white p-6 md:p-8 rounded-lg shadow-md h-fit"
              >
                <h2 className="text-xl font-bold mb-6">お問い合わせ先</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <FiMapPin className="text-midnight-blue mt-1 mr-3 flex-shrink-0" size={20} />
                    <div>
                      <h3 className="font-semibold mb-1">住所</h3>
                      <p className="text-gray-600">
                        〒907-0453<br />
                        沖縄県石垣市川平835-1<br />
                        SOLAIZ hotels & resorts
                      </p>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-semibold mb-3">キャンセルポリシー</h3>
                    <div className="text-sm text-gray-600 space-y-2">
                      <p>キャンセル料は以下の通り頂戴いたします。</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>当日：宿泊料金の100%</li>
                        <li>3日前から：宿泊料金の80%</li>
                        <li>7日前から：宿泊料金の50%</li>
                        <li>14日前から：宿泊料金の20%</li>
                        <li>連絡なしの不泊/不着：宿泊料金の100%</li>
                      </ul>
                      <p>※航空・船舶便欠航の場合はキャンセル料はかかりません。</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <FiPhone className="text-midnight-blue mt-1 mr-3 flex-shrink-0" size={20} />
                    <div>
                      <h3 className="font-semibold mb-1">お電話</h3>
                      <p className="text-gray-600">
                        <a href="tel:0980XXXXXX" className="hover:text-midnight-blue">
                          0980-XX-XXXX
                        </a>
                        <br />
                        <span className="text-sm">（受付時間：9:00〜18:00）</span>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <FiMail className="text-midnight-blue mt-1 mr-3 flex-shrink-0" size={20} />
                    <div>
                      <h3 className="font-semibold mb-1">メール</h3>
                      <p className="text-gray-600">
                        <a href="mailto:info@solaiz.jp" className="hover:text-midnight-blue">
                          info@solaiz.jp
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h3 className="font-semibold mb-2">営業時間</h3>
                  <p className="text-gray-600 mb-2">
                    フロント：24時間<br />
                    チェックイン：15:00〜19:00<br />
                    チェックアウト：11:00まで
                  </p>
                  <p className="text-sm text-gray-500">
                    ※19:00以降のチェックインをご希望の場合は、事前にご連絡ください。
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 