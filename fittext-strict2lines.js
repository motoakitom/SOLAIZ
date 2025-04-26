// main-copy を必ず2行で収めて全文表示するためのJS
(function(){
  function fitToTwoLines(el, minFont, maxFont) {
    if (!el) return;
    var parent = el.parentElement;
    var br = el.querySelector('br');
    if (!br) return; // <br>必須

    // 一時的に最大フォント
    el.style.fontSize = maxFont + 'px';
    el.style.lineHeight = '1.13';
    el.style.whiteSpace = 'pre-line';
    el.style.wordBreak = 'keep-all';
    el.style.overflowWrap = 'normal';
    el.style.display = 'block';
    el.style.width = '100%';
    el.style.maxWidth = '720px';
    el.style.margin = '0 auto 0.18em auto';
    el.style.textAlign = 'center';
    
    // 2行分の高さを計算
    var lineHeight = parseFloat(window.getComputedStyle(el).lineHeight);
    var targetHeight = lineHeight * 2.2; // 2行＋微調整
    var fontSize = maxFont;
    var tries = 0;
    var fullTextVisible = function() {
      // テキストが省略（...）されていないかチェック
      return el.scrollWidth <= el.offsetWidth && el.scrollHeight <= targetHeight;
    };
    while((el.scrollHeight > targetHeight || !fullTextVisible()) && fontSize > minFont && tries < 60) {
      fontSize -= 1;
      el.style.fontSize = fontSize + 'px';
      tries++;
    }
  }
  function run() {
    var el = document.querySelector('.main-copy');
    if(el) fitToTwoLines(el, 11, 64);
  }
  window.addEventListener('resize', run);
  document.addEventListener('DOMContentLoaded', run);
})();
