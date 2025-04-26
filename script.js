// パララックス・ヒーロー背景（PC・スマホ両対応）
function updateHeroParallax() {
  const heroBg = document.querySelector('.hero-bg');
  if(heroBg) {
    const offset = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
    // 縦方向だけ動くパララックス
    heroBg.style.backgroundPosition = `center calc(50% + ${offset * 0.22}px)`;
  }
}
window.addEventListener('scroll', updateHeroParallax, { passive: true });
window.addEventListener('touchmove', updateHeroParallax, { passive: true });

document.addEventListener('DOMContentLoaded', function() {
  console.log('DOMContentLoaded fired');
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  console.log('menuToggle:', menuToggle, 'navLinks:', navLinks);

  function closeMenu() {
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  }
  function openMenu() {
    navLinks.classList.add('open');
    document.body.style.overflow = 'hidden';
    const firstLink = navLinks.querySelector('a');
    if (firstLink) firstLink.focus();
  }
  function toggleMenu() {
    if (navLinks.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', toggleMenu);
    menuToggle.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleMenu();
      }
    });
  }

  // メニュー内リンククリックで閉じる
  if (navLinks) {
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });
  }
  // メニュー外クリックで閉じる
  document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('open') && !navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) {
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
      menuToggle.focus();
    }
  });

  // Focus trap for navLinks when open (mobile accessibility)
  navLinks.addEventListener('keydown', (e) => {
    if (!navLinks.classList.contains('open')) return;
    const focusable = navLinks.querySelectorAll('a');
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });
});
// サブメニュー開閉
const submenuParents = document.querySelectorAll('.nav-links .has-submenu');
submenuParents.forEach(parent => {
  const submenuLink = parent.querySelector('a');
  submenuLink.addEventListener('click', function(e) {
    // モバイルやキーボード操作対応
    if(window.innerWidth <= 900 || e.pointerType === 'touch' || e.type === 'keydown') {
      e.preventDefault();
      parent.classList.toggle('open');
    }
  });
  submenuLink.addEventListener('keydown', function(e) {
    if(e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      parent.classList.toggle('open');
    }
  });
});
// サブメニュー外クリックで閉じる
window.addEventListener('click', function(e) {
  submenuParents.forEach(parent => {
    if(!parent.contains(e.target)) {
      parent.classList.remove('open');
    }
  });
});

// 予約フォーム：チェックイン初期値を常に明日の日付に

// --- カスタムカレンダー ---
window.addEventListener('DOMContentLoaded', () => {
  fetch('footer.html').then(res => res.text()).then(data => {
    document.getElementById('footer').innerHTML = data;
    // フッター挿入後に年号をセット
    const year = new Date().getFullYear();
    const copy = document.getElementById('footer-copyright');
    if (copy) {
      copy.textContent = `© ${year} SOLAIZ ISHIGAKI ISLAND. All rights reserved.`;
    }
  });
  const checkinInput = document.querySelector("input[name='checkin']");
  const checkoutInput = document.querySelector("input[name='checkout']");
  const calendarDiv = document.getElementById('custom-calendar');
  if (!calendarDiv || !checkinInput || !checkoutInput) return;
  // カレンダー描画用関数
  function renderCalendar(targetDate, selectedDate, onSelect, minDate) {
    calendarDiv.innerHTML = '';
    const year = targetDate.getFullYear();
    const month = targetDate.getMonth();
    const today = new Date();
    const isToday = (y, m, d) => y === today.getFullYear() && m === today.getMonth() && d === today.getDate();
    const isSelected = (y, m, d) => selectedDate && y === selectedDate.getFullYear() && m === selectedDate.getMonth() && d === selectedDate.getDate();
    // ヘッダー
    const header = document.createElement('div');
    header.className = 'custom-calendar-header';
    const prevBtn = document.createElement('button');
    prevBtn.className = 'custom-calendar-nav';
    prevBtn.innerHTML = '‹';
    prevBtn.onclick = () => renderCalendar(new Date(year, month - 1, 1), selectedDate, onSelect, minDate);
    const nextBtn = document.createElement('button');
    nextBtn.className = 'custom-calendar-nav';
    nextBtn.innerHTML = '›';
    nextBtn.onclick = () => renderCalendar(new Date(year, month + 1, 1), selectedDate, onSelect, minDate);
    const monthLabel = document.createElement('span');
    monthLabel.className = 'custom-calendar-month';
    monthLabel.textContent = `${year}年${month + 1}月`;
    header.appendChild(prevBtn);
    header.appendChild(monthLabel);
    header.appendChild(nextBtn);
    calendarDiv.appendChild(header);
    // 曜日
    const weekdays = ['日', '月', '火', '水', '木', '金', '土'];
    const weekdaysRow = document.createElement('div');
    weekdaysRow.className = 'custom-calendar-weekdays';
    weekdays.forEach(wd => {
      const span = document.createElement('span');
      span.textContent = wd;
      weekdaysRow.appendChild(span);
    });
    calendarDiv.appendChild(weekdaysRow);
    // 日付
    const days = document.createElement('div');
    days.className = 'custom-calendar-days';
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();
    // 空白
    for(let i=0; i<firstDay; i++) {
      const blank = document.createElement('div');
      days.appendChild(blank);
    }
    for(let d=1; d<=lastDate; d++) {
      const dayBtn = document.createElement('button');
      dayBtn.className = 'custom-calendar-day';
      dayBtn.type = 'button';
      if (isToday(year, month, d)) dayBtn.classList.add('today');
      if (isSelected(year, month, d)) dayBtn.classList.add('selected');
      dayBtn.textContent = d;
      const thisDate = new Date(year, month, d);
      // 選択不可日
      if (minDate && thisDate < minDate) {
        dayBtn.classList.add('disabled');
        dayBtn.disabled = true;
      } else {
        dayBtn.onclick = () => onSelect(new Date(year, month, d));
      }
      days.appendChild(dayBtn);
    }
    calendarDiv.appendChild(days);
  }
  // チェックイン・チェックアウト選択状態
  let calendarMode = 'checkin';
  let calendarDate = new Date();
  let selectedCheckin = null;
  let selectedCheckout = null;
  // inputクリックでカレンダーを表示し、選択モード切替
  checkinInput.addEventListener('focus', () => {
    calendarMode = 'checkin';
    calendarDate = checkinInput.value ? new Date(checkinInput.value) : new Date();
    selectedCheckin = checkinInput.value ? new Date(checkinInput.value) : null;
    selectedCheckout = checkoutInput.value ? new Date(checkoutInput.value) : null;
    renderCalendar(calendarDate, selectedCheckin, (date) => {
      checkinInput.value = date.toISOString().slice(0,10);
      selectedCheckin = date;
      // チェックアウトがチェックインより前ならリセット
      if(selectedCheckout && selectedCheckout <= selectedCheckin) {
        selectedCheckout = null;
        checkoutInput.value = '';
      }
      calendarDiv.style.display = 'block';
    });
    calendarDiv.style.display = 'block';
  });
  checkoutInput.addEventListener('focus', () => {
    calendarMode = 'checkout';
    calendarDate = checkoutInput.value ? new Date(checkoutInput.value) : new Date();
    selectedCheckin = checkinInput.value ? new Date(checkinInput.value) : null;
    selectedCheckout = checkoutInput.value ? new Date(checkoutInput.value) : null;
    renderCalendar(calendarDate, selectedCheckout, (date) => {
      if(selectedCheckin && date <= selectedCheckin) return;
      checkoutInput.value = date.toISOString().slice(0,10);
      selectedCheckout = date;
      calendarDiv.style.display = 'block';
    }, selectedCheckin ? new Date(selectedCheckin.getTime() + 24*60*60*1000) : null);
    calendarDiv.style.display = 'block';
  });
  // カレンダー以外クリックで非表示
  document.addEventListener('mousedown', (e) => {
    if (calendarDiv && !calendarDiv.contains(e.target) && e.target !== checkinInput && e.target !== checkoutInput) {
      calendarDiv.style.display = 'none';
    }
  });
  // 初期表示は非表示
  calendarDiv.style.display = 'none';

  const checkinDate = new Date();
  checkinDate.setDate(checkinDate.getDate() + 1);
  const yyyy = checkinDate.getFullYear();
  const mm = String(checkinDate.getMonth() + 1).padStart(2, '0');
  const dd = String(checkinDate.getDate()).padStart(2, '0');
  const checkinStr = `${yyyy}-${mm}-${dd}`;
  checkinInput.value = checkinStr;
  checkinInput.min = checkinStr;

  // チェックアウトはチェックインの3日後
  const checkoutDate = new Date(checkinDate);
  checkoutDate.setDate(checkoutDate.getDate() + 3);
  const yyyy2 = checkoutDate.getFullYear();
  const mm2 = String(checkoutDate.getMonth() + 1).padStart(2, '0');
  const dd2 = String(checkoutDate.getDate()).padStart(2, '0');
  const checkoutStr = `${yyyy2}-${mm2}-${dd2}`;
  checkoutInput.value = checkoutStr;
  checkoutInput.min = checkoutStr;

  // 日付サマリー表示
  const summaryDiv = document.querySelector('.reserve-date-summary');
  if (summaryDiv) {
    summaryDiv.textContent = `ご予約日: チェックイン ${checkinStr} ／ チェックアウト ${checkoutStr}`;
  }

  // FAQの開閉処理
  const faqQuestions = document.querySelectorAll('.faq-q');
  if (faqQuestions.length > 0) {
    faqQuestions.forEach(q => {
      q.addEventListener('click', function() {
        const a = this.nextElementSibling;
        if (a && a.style.display === 'block') {
          a.style.display = 'none';
        } else if (a) {
          a.style.display = 'block';
        }
      });
      // 初期状態は閉じる
      const a = q.nextElementSibling;
      if (a) a.style.display = 'none';
    });
  }
});
