// Humbergur menu js

document.addEventListener('DOMContentLoaded', () => {
  const menuTrigger = document.querySelector('.menu-trigger');
  const nav = document.querySelector('nav');
  const overlay = document.querySelector('.overlay');

  // メニュートリガーのクリックイベント (Menu Trigger Click Event)
  menuTrigger.addEventListener('click', () => {
    if (menuTrigger.classList.contains('active')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // オーバーレイのクリックイベント (Overlay click event)
  overlay.addEventListener('click', () => {
    if (overlay.classList.contains('open')) {
      closeMenu();
    }
  });

  // ナビゲーションリンクをクリックしたときもメニューを閉じるようにする
  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  // メニューを開く関数 (Opening the menu)
  function openMenu() {
    menuTrigger.classList.add('active');
    nav.classList.add('open');
    overlay.classList.add('open');
  }

  // メニューを閉じる関数 (Closing the menu)
  function closeMenu() {
    menuTrigger.classList.remove('active');
    nav.classList.remove('open');
    overlay.classList.remove('open');
  }

  // 画面サイズが変わったときの処理 (Window resize handling)
  window.addEventListener('resize', () => {
    // If screen becomes larger than 576px and menu is open, close it
    if (window.innerWidth > 576 && menuTrigger.classList.contains('active')) {
      closeMenu();
    }
  });
});