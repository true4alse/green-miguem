document.addEventListener("DOMContentLoaded", () => {
    setupInfiniteDrag(".exp-wrapper", ".exp-logos");          // EXPERIENCE 섹션
    setupInfiniteDrag(".skills-showcase", ".skills-track");   // SKILLS 섹션
});

function setupInfiniteDrag(wrapperSelector, trackSelector) {
    const wrapper = document.querySelector(wrapperSelector);
    const track = document.querySelector(trackSelector);
    if (!wrapper || !track) return;   // 해당 섹션이 없으면 그냥 건너뜀

    // 카드 복제해서 무한 루프용 트랙 만들기
    const originalCards = Array.from(track.children);
    const originalWidth = track.scrollWidth; // 복제 전 길이(기준 길이)

    // 원본 카드 한 번 더 붙여서 2배 길이 만들기
    originalCards.forEach(card => {
        const clone = card.cloneNode(true);
        track.appendChild(clone);
    });

    let isDragging = false;
    let startX = 0;
    let currentX = 0;   // 현재 translateX 값(px)

    // [-originalWidth, 0] 안에서만 움직이게 감싸는 함수
    function setTranslate(x) {
        const loopWidth = originalWidth; // 기준 길이
        if (loopWidth <= 0) return;

        // x를 기준 길이 안에서 감싸기 (모듈러 연산)
        x = x % loopWidth;
        if (x > 0) x -= loopWidth; // 항상 0 이하로 맞춤

        currentX = x;
        track.style.transform = `translateX(${x}px)`;
    }

    // 기본 드래그 이미지(썸네일) 뜨는 거 막기
    wrapper.addEventListener("dragstart", (e) => e.preventDefault());

    // 마우스 드래그 시작
    wrapper.addEventListener("mousedown", (e) => {
        isDragging = true;
        wrapper.classList.add("is-dragging");
        startX = e.clientX - currentX;
    });

    // 마우스 드래그 종료
    const stopDrag = () => {
        isDragging = false;
        wrapper.classList.remove("is-dragging");
    };

    wrapper.addEventListener("mouseup", stopDrag);
    wrapper.addEventListener("mouseleave", stopDrag);

    // 마우스 이동
    wrapper.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.clientX - startX;
        setTranslate(x);
    });

    // 터치 시작
    wrapper.addEventListener("touchstart", (e) => {
        isDragging = true;
        const touch = e.touches[0];
        startX = touch.clientX - currentX;
    }, { passive: true });

    // 터치 종료
    wrapper.addEventListener("touchend", () => {
        isDragging = false;
    });

    // 터치 이동
    wrapper.addEventListener("touchmove", (e) => {
        if (!isDragging) return;
        const touch = e.touches[0];
        const x = touch.clientX - startX;
        setTranslate(x);
    }, { passive: true });

    // 초기 위치
    setTranslate(0);
}