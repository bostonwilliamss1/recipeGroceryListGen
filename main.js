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
  
    // メニューを開く関数 (Opeinig the menu)
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
  });