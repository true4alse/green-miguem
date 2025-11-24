document.addEventListener("DOMContentLoaded",()=>{

    const header = document.querySelector("header")

    let lastScrollTop = 0
    window.addEventListener("scroll",()=>{
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop // 브라우저의 호환성을 생각하여 스크롤바가 내려온 길이를 계산

        if(scrollTop < lastScrollTop){
            // 마우스 휠을 위로 굴렸을 때
            console.log("마우스 휠 위로 굴림")
            btnTop.classList.remove("fadeout")
        }else{
            // 마우스 휠을 아래로 굴렸을 때
            console.log("마우스 휠 아래로 굴림")
            btnTop.classList.add("fadeout")
        }
        lastScrollTop = scrollTop
    })
})
