// visual-marquee.js
document.addEventListener("DOMContentLoaded", () => {
    // .visual-track 이라는 트랙을 전부 찾아서
    document.querySelectorAll(".visual-track").forEach(track => {
        // 안에 있는 콘텐츠를 한 번 더 붙여서 2배로 늘려줌
        // → translateX(-50%)까지만 움직이면 끊김 없이 반복됨
        track.innerHTML += track.innerHTML;
    });
});