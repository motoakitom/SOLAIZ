// FitText.js: 自動でフォントサイズを親幅に合わせて調整
// .main-copy 要素に適用
(function(){
  function fitText(el, komoji, oomoji) {
    var parent = el.parentElement;
    var maxFont = oomoji || 64; // px
    var minFont = komoji || 18; // px
    function resize() {
      el.style.fontSize = maxFont + 'px';
      var scale = parent.offsetWidth / el.scrollWidth;
      var newSize = Math.max(minFont, Math.min(maxFont, Math.floor(maxFont * Math.min(scale, 1))));
      el.style.fontSize = newSize + 'px';
    }
    resize();
    window.addEventListener('resize', resize);
  }
  document.addEventListener('DOMContentLoaded', function(){
    var el = document.querySelector('.main-copy');
    if(el) fitText(el, 18, 64);
  });
})();
