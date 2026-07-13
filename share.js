// SNS 공유, URL 복사, 인쇄 도구 모음을 동적으로 초기화하고 바인딩하는 공통 모듈
document.addEventListener('DOMContentLoaded', () => {
  const subVisualWrap = document.querySelector('.sub-visual .wrap');
  if (!subVisualWrap || subVisualWrap.querySelector('.sub-visual-tools')) return;

  // 1. 도구 HTML 동적 생성 및 삽입
  const toolsDiv = document.createElement('div');
  toolsDiv.className = 'sub-visual-tools';
  toolsDiv.innerHTML = `
    <button type="button" class="sv-tool-btn" id="sns-share-trigger" aria-label="SNS 공유 열기" title="SNS 공유">
      <i class="ti ti-share"></i>
    </button>
    <button type="button" class="sv-tool-btn" id="url-copy-trigger" aria-label="URL 복사" title="URL 복사">
      <i class="ti ti-link"></i>
    </button>
    <button type="button" class="sv-tool-btn" id="print-trigger" aria-label="인쇄" title="인쇄">
      <i class="ti ti-printer"></i>
    </button>

    <!-- SNS 공유 토글 패널 -->
    <div class="sns-share-menu" id="sns-share-menu">
      <a href="#" class="sns-item facebook" onclick="shareFacebook(); return false;" title="페이스북 공유"><i class="ti ti-brand-facebook"></i></a>
      <a href="#" class="sns-item blog" onclick="shareNaverBlog(); return false;" title="네이버 블로그 공유">blog</a>
      <a href="#" class="sns-item band" onclick="shareNaverBand(); return false;" title="네이버 밴드 공유">Band</a>
      <a href="#" class="sns-item x-twitter" onclick="shareXTwitter(); return false;" title="X(트위터) 공유"><i class="ti ti-brand-x"></i></a>
      <a href="#" class="sns-item close" id="sns-share-close" title="공유 닫기"><i class="ti ti-x"></i></a>
    </div>
  `;

  // sub-visual wrap 정렬 및 도구 모음 추가
  subVisualWrap.style.display = 'flex';
  subVisualWrap.style.flexDirection = 'column';
  subVisualWrap.style.alignItems = 'center';
  subVisualWrap.appendChild(toolsDiv);

  // 2. 이벤트 바인딩
  const snsTrigger = document.getElementById('sns-share-trigger');
  const snsMenu = document.getElementById('sns-share-menu');
  const snsClose = document.getElementById('sns-share-close');
  const urlCopyBtn = document.getElementById('url-copy-trigger');
  const printBtn = document.getElementById('print-trigger');

  if (snsTrigger && snsMenu && snsClose) {
    snsTrigger.onclick = (e) => {
      e.stopPropagation();
      snsMenu.classList.toggle('is-active');
    };
    snsClose.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      snsMenu.classList.remove('is-active');
    };
    document.addEventListener('click', () => {
      snsMenu.classList.remove('is-active');
    });
    snsMenu.onclick = (e) => {
      e.stopPropagation();
    };
  }

  if (urlCopyBtn) {
    urlCopyBtn.onclick = () => {
      const currentUrl = window.location.href;
      navigator.clipboard.writeText(currentUrl).then(() => {
        alert('URL 주소가 복사되었습니다.');
      }).catch(() => {
        const tempInput = document.createElement('input');
        tempInput.value = currentUrl;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        alert('URL 주소가 복사되었습니다.');
      });
    };
  }

  if (printBtn) {
    printBtn.onclick = () => {
      window.print();
    };
  }

  // SNS 공유 함수 전역 바인딩
  window.shareFacebook = () => {
    const url = encodeURIComponent(window.location.href);
    window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, 'share_facebook', 'width=600,height=400');
  };
  window.shareNaverBlog = () => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);
    window.open('https://share.naver.com/web/shareView.nhn?url=' + url + '&title=' + title, 'share_blog', 'width=600,height=500');
  };
  window.shareNaverBand = () => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);
    window.open('https://band.us/plugin/share?body=' + title + '%0A' + url, 'share_band', 'width=600,height=500');
  };
  window.shareXTwitter = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(document.title);
    window.open('https://twitter.com/intent/tweet?text=' + text + '&url=' + url, 'share_x', 'width=600,height=400');
  };
});
