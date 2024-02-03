// src/script.js

document.addEventListener('DOMContentLoaded', (event) => {
  // ナビゲーションリンクにクリックイベントを追加
  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        targetElement.scrollIntoView({ behavior: 'smooth' });
    });
  });
});
