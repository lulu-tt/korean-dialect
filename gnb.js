document.addEventListener('DOMContentLoaded', () => {
  const gnbContainer = document.getElementById('gnb-common');
  if (!gnbContainer) return;

  // 1. GNB 마크업 동적 삽입
  gnbContainer.innerHTML = `
<div class="gov-banner">
  <div class="wrap gov-banner__inner">
    <span class="gov-banner__icon">🇰🇷</span>
    <span class="gov-banner__text">이 누리집은 대한민국 공식 전자정부 누리집입니다.</span>
  </div>
</div>

<header class="topbar">
  <div class="wrap topbar__inner">
    <div class="brand" onclick="location.href='./index.html'" style="cursor:pointer;">
      <img src="./logo_korean_horizontal.png" alt="문화체육관광부 국립국어원" class="brand__logo-org">
      <img src="./logo_dialect.png" alt="지역어 종합 정보 Center for Korean Dialects" class="brand__logo-svc">
    </div>

    <button type="button" class="navtoggle" id="navToggle" aria-expanded="false" aria-controls="navDrawer" aria-label="전체 메뉴 열기">
      <i class="ti ti-menu-2" aria-hidden="true"></i>
    </button>

    <div class="navdrawer" id="navDrawer">
      <nav class="nav" aria-label="주요 메뉴">
        <div class="nav__item">
          <button type="button" class="nav__link-btn" onclick="toggleMegaMenu(this, 'menu-search')">
            지역어 검색 <i class="ti ti-chevron-down nav__arrow"></i>
          </button>
        </div>
        <div class="nav__item">
          <button type="button" class="nav__link-btn" onclick="toggleMegaMenu(this, 'menu-map')">
            지역어 지도 <i class="ti ti-chevron-down nav__arrow"></i>
          </button>
        </div>
        <div class="nav__item">
          <button type="button" class="nav__link-btn" onclick="toggleMegaMenu(this, 'menu-archive')">
            지역어 자료관 <i class="ti ti-chevron-down nav__arrow"></i>
          </button>
        </div>
        <div class="nav__item">
          <button type="button" class="nav__link-btn" onclick="toggleMegaMenu(this, 'menu-board')">
            알림마당 <i class="ti ti-chevron-down nav__arrow"></i>
          </button>
        </div>
        <div class="nav__item">
          <button type="button" class="nav__link-btn" onclick="toggleMegaMenu(this, 'menu-about')">
            누리집소개 <i class="ti ti-chevron-down nav__arrow"></i>
          </button>
        </div>
      </nav>

      <div class="topbar__actions util-links">
        <a href="./login.html" class="util-link">들어가기</a>
        <span class="util-divider">|</span>
        <a href="./register.html" class="util-link">회원가입</a>
      </div>
    </div>
  </div>

  <!-- 메가메뉴 패널 1: 지역어 검색 -->
  <div id="menu-search" class="mega-menu">
    <div class="mega-menu__inner">
      <div class="mega-menu__title">지역어 검색</div>
      <div class="mega-menu__grid">
        <div class="mega-menu__item"><a href="./dialect_search_prototype.html" class="mega-menu__link">통합자료검색</a></div>
        <div class="mega-menu__item"><a href="#" class="mega-menu__link">어휘조사자료</a></div>
        <div class="mega-menu__item"><a href="#" class="mega-menu__link">구술발화조사자료</a></div>
      </div>
    </div>
  </div>

  <!-- 메가메뉴 패널 2: 지역어 지도 -->
  <div id="menu-map" class="mega-menu">
    <div class="mega-menu__inner">
      <div class="mega-menu__title">지역어 지도</div>
      <div class="mega-menu__grid">
        <div class="mega-menu__item"><a href="./dialect_map.html" class="mega-menu__link">지역어 지도</a></div>
        <div class="mega-menu__item"><a href="./dialect_map_compare.html" class="mega-menu__link">지역어 지도 비교</a></div>
        <div class="mega-menu__item"><a href="#" class="mega-menu__link">나만의 지도 제작</a></div>
        <div class="mega-menu__item"><a href="./dialect_awareness.html" class="mega-menu__link">지역어 현황(기상도)</a></div>
      </div>
    </div>
  </div>

  <!-- 메가메뉴 패널 3: 지역어 자료관 -->
  <div id="menu-archive" class="mega-menu">
    <div class="mega-menu__inner">
      <div class="mega-menu__title">지역어 자료관</div>
      <div class="mega-menu__grid">
        <div class="mega-menu__item"><a href="./literature_dialect.html" class="mega-menu__link">문학 속 지역어</a></div>
        <div class="mega-menu__item"><a href="./region_culture.html" class="mega-menu__link">사진으로 보는 생활어</a></div>
        <div class="mega-menu__item"><a href="#" class="mega-menu__link">자료실</a></div>
        <div class="mega-menu__item"><a href="#" class="mega-menu__link">Open API</a></div>
      </div>
    </div>
  </div>

  <!-- 메가메뉴 패널 4: 알림마당 -->
  <div id="menu-board" class="mega-menu">
    <div class="mega-menu__inner">
      <div class="mega-menu__title">알림마당</div>
      <div class="mega-menu__grid">
        <div class="mega-menu__item"><a href="./notice.html" class="mega-menu__link">공지사항</a></div>
        <div class="mega-menu__item"><a href="./faq.html" class="mega-menu__link">도움말(FAQ)</a></div>
        <div class="mega-menu__item"><a href="#" class="mega-menu__link">의견제시</a></div>
      </div>
    </div>
  </div>

  <!-- 메가메뉴 패널 5: 누리집소개 -->
  <div id="menu-about" class="mega-menu">
    <div class="mega-menu__inner">
      <div class="mega-menu__title">누리집소개</div>
      <div class="mega-menu__grid">
        <div class="mega-menu__item"><a href="./index.html" class="mega-menu__link">소개</a></div>
        <div class="mega-menu__item"><a href="#" class="mega-menu__link">사업연혁</a></div>
      </div>
    </div>
  </div>
</header>
  `;

  // 2. 현재 페이지 경로를 검사하여 특정 탭 활성화 처리
  const currentPath = window.location.pathname;
  let activeMenuId = "";

  if (currentPath.includes('dialect_search_prototype.html')) {
    activeMenuId = "menu-search";
  } else if (currentPath.includes('dialect_map.html') || currentPath.includes('dialect_map_compare.html') || currentPath.includes('dialect_awareness.html')) {
    activeMenuId = "menu-map";
  } else if (currentPath.includes('region_culture.html') || currentPath.includes('literature_dialect.html')) {
    activeMenuId = "menu-archive";
  } else if (currentPath.includes('notice.html') || currentPath.includes('faq.html')) {
    activeMenuId = "menu-board";
  }

  // 현재 페이지에 해당하는 탭만 표시(밑줄)하고, 메가메뉴 패널은 접힌 상태로 둔다
  if (activeMenuId) {
    const btn = document.querySelector(`button[onclick*="${activeMenuId}"]`);
    if (btn) {
      btn.classList.add('is-active');
    }
  }

  // 3. 모바일 햄버거 메뉴 토글 (전역 메뉴를 화면 하단 드로어로 여닫기)
  const navToggle = document.getElementById('navToggle');
  const topbar = document.querySelector('.topbar');
  if (navToggle && topbar) {
    navToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      const isOpen = topbar.classList.toggle('nav-open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      navToggle.innerHTML = isOpen
        ? '<i class="ti ti-x" aria-hidden="true"></i>'
        : '<i class="ti ti-menu-2" aria-hidden="true"></i>';
    });
  }
});

// GNB 메가메뉴 토글 제어 함수 (전역 노출 - 마우스 호버 대신 클릭 토글 방식으로 변경)
window.toggleMegaMenu = function(btnEl, menuId) {
  const allMenus = document.querySelectorAll('.mega-menu');
  const allBtns = document.querySelectorAll('.nav__link-btn');
  const targetMenu = document.getElementById(menuId);

  if (!targetMenu) return;

  const isOpen = targetMenu.classList.contains('show');

  // 모든 메뉴 패널을 닫고, 화살표 아이콘 및 active 상태 초기화
  allMenus.forEach(menu => menu.classList.remove('show'));
  allBtns.forEach(b => {
    b.classList.remove('is-active');
    const arrow = b.querySelector('.nav__arrow');
    if (arrow) {
      arrow.classList.remove('ti-chevron-up');
      arrow.classList.add('ti-chevron-down');
    }
  });

  // 메뉴가 닫혀있었던 상태라면 열어줌
  if (!isOpen) {
    targetMenu.classList.add('show');
    if (btnEl) {
      btnEl.classList.add('is-active');
      const arrow = btnEl.querySelector('.nav__arrow');
      if (arrow) {
        arrow.classList.remove('ti-chevron-down');
        arrow.classList.add('ti-chevron-up');
      }
    }
  }
};

// 외부 영역 클릭 시 열려 있는 GNB 메가메뉴 및 모바일 드로어 닫기 처리
document.addEventListener('click', function(event) {
  const isInsideTopbar = event.target.closest('.topbar');
  if (!isInsideTopbar) {
    const allMenus = document.querySelectorAll('.mega-menu');
    const allBtns = document.querySelectorAll('.nav__link-btn');

    allMenus.forEach(menu => menu.classList.remove('show'));
    allBtns.forEach(b => {
      b.classList.remove('is-active');
      const arrow = b.querySelector('.nav__arrow');
      if (arrow) {
        arrow.classList.remove('ti-chevron-up');
        arrow.classList.add('ti-chevron-down');
      }
    });

    const topbar = document.querySelector('.topbar');
    const navToggle = document.getElementById('navToggle');
    if (topbar) topbar.classList.remove('nav-open');
    if (navToggle) {
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.innerHTML = '<i class="ti ti-menu-2" aria-hidden="true"></i>';
    }
  }
});
