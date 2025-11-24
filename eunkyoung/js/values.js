(() => {
    const cards       = document.querySelectorAll(".value-card");
    const detailTitle = document.querySelector(".values-detail-title");
    const detailBody  = document.querySelector(".values-detail-body");

    // 카드나 상세 영역이 없으면 그냥 종료
    if (!cards.length || !detailTitle || !detailBody) return;

    const clearActive = () => {
        cards.forEach(card => card.classList.remove("is-active"));
    };

    const activateCard = (card) => {
        clearActive();
        card.classList.add("is-active");

        detailTitle.textContent = card.dataset.title || "";
        detailBody.textContent  = card.dataset.body  || "";
    };

    cards.forEach(card => {
        // 마우스 호버
        card.addEventListener("mouseenter", () => activateCard(card));

        // 클릭
        card.addEventListener("click", () => activateCard(card));

        // 포커스가 이동했을 때 (키보드 Tab 등)
        card.addEventListener("focus", () => activateCard(card));

        // 키보드로 "선택"했을 때(Enter / Space)
        card.addEventListener("keydown", (event) => {
            const { key } = event;
            if (key === "Enter" || key === " ") {
                event.preventDefault();
                activateCard(card);
            }
        });
    });
})();