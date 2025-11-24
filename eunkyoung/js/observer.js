(() => {
    if (!("IntersectionObserver" in window)) return;

    const TARGET_SELECTOR = ".ltr, .utd, .dtu, .rtl-deco";
    const OBSERVER_OPTIONS = {
        threshold: 0.1, 
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const { target, isIntersecting } = entry;

            if (isIntersecting) {
                
                target.classList.add("on");
            } else {
                
                target.classList.remove("on");
            }
        });
    }, OBSERVER_OPTIONS);

    document.querySelectorAll(TARGET_SELECTOR).forEach((el) => {
        observer.observe(el);
    });
})();



// document.addEventListener("DOMContentLoaded",()=>{

//     // 선택한 태그가 화면에 들어오고 나가는 것을 감지하여 화면에 들어오면 보이게하고 화면 밖으로 나가면 안보이게 하는 소스
//     const observer = new IntersectionObserver((entries)=>{
//         entries.forEach(entry=>{
//             if(entry.isIntersecting){
//                 // 태그가 화면에 들어왔을 때
//                 entry.target.classList.add("on")
//             }else{
//                 // 태그가 화면밖으로 나갔을 때
//                 entry.target.classList.remove("on")
//             }
//         })
//     },{
//         threshold:0.1 // 태그가 화면에 10%이상 보일 때 트리거
//     })
//     document.querySelectorAll(".ltr,.utd,.dtu").forEach(tag=>{observer.observe(tag)})

// })