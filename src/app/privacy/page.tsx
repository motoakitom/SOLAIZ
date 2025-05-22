'use client';

import { motion } from 'framer-motion';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen pt-20 pb-16">
      {/* ヘッダーセクション */}
      <section className="bg-midnight-blue text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">プライバシーポリシー</h1>
          <p className="text-xl text-center max-w-3xl mx-auto">
            SOLAIZ hotels & resorts の個人情報保護方針
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-6 md:p-8 rounded-lg shadow-md"
          >
            <div className="prose max-w-none">
              <p className="text-gray-700 mb-6">
                SOLAIZ hotels & resorts [みらくる株式会社]（以下「当ホテル」といいます。）は、当ホテルの提供するサービス（以下「本サービス」といいます。）における、ユーザーについての個人情報を含む利用者情報の取扱いについて、以下のとおりプライバシーポリシー（以下「本ポリシー」といいます。）を定めます。
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800">1. 収集する利用者情報及び収集方法</h2>
              <p className="text-gray-700 mb-4">
                本ポリシーにおいて、「利用者情報」とは、ユーザーの識別に係る情報、通信サービス上の行動履歴、その他ユーザーまたはユーザーの端末に関連して生成または蓄積された情報であって、本ポリシーに基づき当ホテルが収集するものを意味するものとします。本サービスにおいて当ホテルが収集する利用者情報は、その収集方法に応じて、以下のようなものとなります。
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-2 text-gray-800">(1) ユーザーからご提供いただく情報</h3>
              <p className="text-gray-700 mb-4">
                本サービスを利用するために、または本サービスの利用を通じてユーザーからご提供いただく情報は以下のとおりです。
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
                <li>氏名、生年月日、性別、職業等プロフィールに関する情報</li>
                <li>メールアドレス、電話番号、住所等連絡先に関する情報</li>
                <li>入力フォームその他当ホテルが定める方法を通じてユーザーが入力または送信する情報</li>
              </ul>

              <h3 className="text-xl font-semibold mt-6 mb-2 text-gray-800">(2) ユーザーが本サービスの利用において、他のサービスと連携を許可することにより、当該他のサービスからご提供いただく情報</h3>
              <p className="text-gray-700 mb-4">
                ユーザーが、本サービスを利用するにあたり、ソーシャルネットワーキングサービス等の他のサービスとの連携を許可した場合には、その許可の際にご同意いただいた内容に基づき、以下の情報を当該外部サービスから収集します。
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
                <li>当該外部サービスでユーザーが利用するID</li>
                <li>その他当該外部サービスのプライバシー設定によりユーザーが連携先に開示を認めた情報</li>
              </ul>

              <h2 className="text-2xl font-bold mt-12 mb-4 text-gray-800">2. 利用目的</h2>
              <p className="text-gray-700 mb-4">
                本サービスのサービス提供にかかわる利用者情報の具体的な利用目的は以下のとおりです。
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
                <li>本サービスに関する登録の受付、本人確認、ユーザー認証、ユーザー設定の記録、利用料金の決済計算等本サービスの提供、維持、保護及び改善のため</li>
                <li>ユーザーのトラフィック測定及び行動測定のため</li>
                <li>広告の配信、表示及び効果測定のため</li>
                <li>本サービスに関するご案内、お問い合わせ等への対応のため</li>
                <li>本サービスに関する当ホテルの規約、ポリシー等（以下「規約等」といいます。）に違反する行為に対する対応のため</li>
                <li>本サービスに関する規約等の変更などを通知するため</li>
              </ul>

              <h2 className="text-2xl font-bold mt-12 mb-4 text-gray-800">3. 通知・公表または同意取得の方法、利用中止要請の方法</h2>
              <p className="text-gray-700 mb-4">
                以下の利用者情報については、その収集が行われる前にユーザーの同意を得るものとします。
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
                <li>位置情報</li>
              </ul>
              <p className="text-gray-700 mb-4">
                ユーザーは、本サービスの所定の設定を行うことにより、利用者情報の全部または一部についてその収集又は利用の停止を求めることができ、この場合、当ホテルは速やかに、当ホテルの定めるところに従い、その利用を停止します。なお利用者情報の項目によっては、その収集または利用が本サービスの前提となるため、当ホテル所定の方法により本サービスを退会した場合に限り、当ホテルはその収集又は利用を停止します。
              </p>

              <h2 className="text-2xl font-bold mt-12 mb-4 text-gray-800">4. 外部送信、第三者提供、情報収集モジュールの有無</h2>
              <p className="text-gray-700 mb-4">
                本サービスでは、以下の提携先が、ユーザーの端末にCookieを保存し、これを利用して利用者情報を蓄積及び利用している場合があります。
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
                <li>提携先：matomo</li>
                <li>上記提携先のプライバシーポリシーのURL：<a href="https://matomo.org/privacy-policy/" target="_blank" rel="noopener noreferrer" className="text-midnight-blue hover:underline">https://matomo.org/privacy-policy/</a></li>
                <li>上記提携先のオプトアウト（無効化）URL：<a href="https://matomo.org/privacy-policy/" target="_blank" rel="noopener noreferrer" className="text-midnight-blue hover:underline">https://matomo.org/privacy-policy/</a></li>
                <li>利用目的：本サイトの閲覧状況及び当ホテルサイトを含む広告効果等の情報を解析するため</li>
              </ul>

              <h2 className="text-2xl font-bold mt-12 mb-4 text-gray-800">5. 第三者提供</h2>
              <p className="text-gray-700 mb-4">
                当ホテルは、利用者情報のうち、個人情報については、あらかじめユーザーの同意を得ないで、第三者に提供しません。但し、次に掲げる必要があり第三者に提供する場合はこの限りではありません。
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
                <li>当ホテルが利用目的の達成に必要な範囲内において個人情報の取扱いの全部または一部を委託する場合</li>
                <li>合併その他の事由による事業の承継に伴って個人情報が提供される場合</li>
                <li>第4項の定めに従って、提携先または情報収集モジュール提供者へ個人情報が提供される場合</li>
                <li>国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合であって、ユーザーの同意を得ることによって当該事務の遂行に支障を及ぼすおそれがある場合</li>
                <li>その他、個人情報の保護に関する法律（以下「個人情報保護法」といいます。）その他の法令で認められる場合</li>
              </ul>

              <h2 className="text-2xl font-bold mt-12 mb-4 text-gray-800">6. 個人情報の開示等</h2>
              <p className="text-gray-700 mb-4">
                当ホテルは、ユーザーご本人または代理人から、個人情報保護法の定めに基づき個人情報の利用目的の通知、開示、内容の訂正、追加又は削除、利用の停止、消去及び第三者への提供停止、第三者提供記録の開示（以下、「開示等」）を求められたときは、ユーザーご本人またはその代理人からのご請求であることを確認の上で、ユーザーまたはその代理人に対し、遅滞なく開示を行います（当該個人情報が存在しないときにはその旨を通知いたします。）。但し、個人情報保護法その他の法令により、当ホテルが開示の義務を負わない場合は、この限りではありません。なお、個人情報の開示につきましては、手数料（1件あたり1,000円）を頂戴しておりますので、あらかじめ御了承ください。
              </p>

              <h2 className="text-2xl font-bold mt-12 mb-4 text-gray-800">7. お問い合わせ窓口</h2>
              <p className="text-gray-700 mb-4">
                ご意見、ご質問、苦情のお申出その他利用者情報の取扱いに関するお問い合わせは、下記の窓口までお願いいたします。
              </p>
              <div className="bg-gray-50 p-6 rounded-lg mt-6">
                <h3 className="text-xl font-semibold mb-4">SOLAIZ hotels & resorts（みらくる株式会社）</h3>
                <div className="space-y-2 text-gray-700">
                  <p>〒386-0041 長野県上田市秋和725-2（本社）</p>
                  <p>〒907-0453 沖縄県石垣市川平835-1（事業所）</p>
                  <p>電話: 070-1075-6890</p>
                  <p>受付時間: 10:00〜18:00（土日祝日を除く）</p>
                  <p>メール: <a href="mailto:solaiz@mira-kuru.co.jp" className="text-midnight-blue hover:underline">solaiz@mira-kuru.co.jp</a></p>
                  <p>個人情報取扱責任者: 中澤 創</p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200 text-right">
                <p className="text-sm text-gray-500">制定日: 2022年11月24日</p>
                <p className="text-sm text-gray-500">最終更新日: 2023年5月22日</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
