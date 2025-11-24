// 줄 나누기: <br> 기준으로 텍스트 배열로 변환
function getContentByBr(element) {
    return element.innerHTML
        .split(/<br\s*\/?>/i)
        .map((item) => item.trim())
        .filter((item) => item);
}

// 요소의 font-size / line-height 계산
function getFontStyles(element) {
    const computedStyle = window.getComputedStyle(element);
    const fontSize = computedStyle.fontSize;
    let lineHeight = computedStyle.lineHeight;

    // line-height가 normal이면 대략 1.2배로 계산
    if (lineHeight === "normal") {
        const fontSizeValue = parseFloat(fontSize);
        lineHeight = `${fontSizeValue * 1.2}px`;
    }

    return { fontSize, lineHeight };
}

(() => {
    const targets = document.querySelectorAll(".bbyong");
    if (!targets.length) return;

    // 1) 초기 세팅: 각 .bbyong 요소를 span + br 구조로 재구성
    targets.forEach((tag) => {
        const textArray = getContentByBr(tag);
        const { fontSize, lineHeight } = getFontStyles(tag);

        // 부모의 기본 폰트는 0으로 두고, 자식에 실제 폰트 크기 적용
        tag.style.fontSize = "0";

        // span들을 새로 만들어서 넣기
        tag.innerHTML = "";

        textArray.forEach((line, index) => {
            const span = document.createElement("span");

            span.textContent = line;
            span.style.display = "inline-block";
            span.style.overflow = "hidden";
            span.style.boxSizing = "border-box";
            span.style.height = lineHeight;
            span.style.paddingTop = lineHeight;
            span.style.fontSize = fontSize;
            span.style.transition = `all 1s ease ${0.1 * index}s`;

            // 나중에 paddingTop 되돌릴 때 쓰려고 line-height 저장
            span.dataset.lineHeight = lineHeight;

            tag.appendChild(span);

            // 마지막 줄이 아니면 <br> 추가
            if (index !== textArray.length - 1) {
                tag.appendChild(document.createElement("br"));
            }
        });
    });

    // 2) IntersectionObserver 설정 (100% 화면에 보일 때 실행)
    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                const spans = entry.target.querySelectorAll("span");

                if (entry.isIntersecting) {
                    // 화면에 다 들어왔을 때 → paddingTop 0으로 (글자 내려오기)
                    spans.forEach((span) => {
                        span.style.paddingTop = "0";
                    });
                } else {
                    // 화면에서 나갔을 때 → 다시 위로 숨기기
                    spans.forEach((span) => {
                        const lh = span.dataset.lineHeight || "0px";
                        span.style.paddingTop = lh;
                    });
                }
            });
        },
        {
            threshold: 1, // 요소가 100% 보일 때 트리거 (원래 코드 유지)
        }
    );

    targets.forEach((element) => {
        observer.observe(element);
    });
})();


// function removeSpaces(str) {
//     return str.replace(/\s+/g, '');
// }

// function getContentByBr(element) {
//     const contentArray = element.innerHTML
//       .split(/<br\s*\/?>/i)
//       .map(item => item.trim())
//       .filter(item => item)
//     return contentArray;
// }

// function getFontStyles(element) {
  
//     // 계산된 스타일 가져오기
//     const computedStyle = window.getComputedStyle(element);
  
//     // font-size와 line-height 값 가져오기
//     let fontSize = computedStyle.fontSize;
//     let lineHeight = computedStyle.lineHeight;
  
//     // line-height가 'normal'일 경우 계산 (대략적으로 1.2 배율로 가정)
//     if (lineHeight === 'normal') {
//       const fontSizeValue = parseFloat(fontSize); // '16px' -> 16
//       lineHeight = `${fontSizeValue * 1.2}px`; // 기본적으로 1.2 배율로 계산
//     }
  
//     return { fontSize, lineHeight };
// }

// document.addEventListener("DOMContentLoaded",function(){
    
//     let tags = document.querySelectorAll(".bbyong")
//     if(tags.length){
//         tags.forEach(function(tag,index){
//             let resultContent = ""
//             let textarray = getContentByBr(tag)
//             let originalStyles = getFontStyles(tag)

//             let defaultStyles = {
//                 display:'inline-block',
//                 overflow:'hidden',
//                 height:originalStyles.lineHeight,
//                 boxSizing:'border-box',
//                 paddingTop:originalStyles.lineHeight
//             }

//             // let showStyles = {
//             //     maxHeight:originalStyles.lineHeight
//             // }

//             for(let i=0 ; i<textarray.length ; i++){
//                 resultContent += `<span style="transition:all 1s ease ${0.1*i}s">${textarray[i]}</span>`
//                 if(i!==textarray.length-1){
//                     resultContent += `<br>`
//                 }
//             }
//             tag.innerHTML = resultContent
//             Array.from(tag.children).forEach(child => {
//                 Object.assign(child.style, defaultStyles)
//             });
//         })
//     }

//     tags.forEach(function(tag,index){
//         let originalStyles = getFontStyles(tag)
//         console.log(originalStyles)
//         tag.style.fontSize=0
//         Array.from(tag.children).forEach(function (child, index) {
//             child.style.fontSize = originalStyles.fontSize // 원래 글씨 크기 적용
//         });
//     })

//     // IntersectionObserver 설정
//     const observer = new IntersectionObserver(function (entries) {
//         entries.forEach(entry => {
//             if (entry.isIntersecting) {
//                 // 요소가 화면에 보일 때 span 태그 스타일 변경
//                 Array.from(entry.target.children).forEach(child => {
//                     Object.assign(child.style, {
//                          paddingTop:0,
//                     });
//                 });
//             } else {
//                 // 화면에서 사라질 때 기본 스타일로 되돌림
//                 Array.from(entry.target.children).forEach(child => {
//                     const computedStyle = getComputedStyle(child);
//                     let lineHeight = computedStyle.lineHeight;
    
//                     // "normal"인 경우 계산
//                     if (lineHeight === "normal") {
//                         const fontSize = parseFloat(computedStyle.fontSize); // font-size 가져오기
//                         const defaultLineHeightRatio = 1.2; // 일반적인 비율(조정 가능)
//                         lineHeight = `${fontSize * defaultLineHeightRatio}px`;
//                     }
    
//                     Object.assign(child.style, {
//                         paddingTop: lineHeight, // 계산된 line-height 적용
//                     });
//                 });
//             }
//         })
//     }, { threshold: 1 }) // 요소가 100% 화면에 보이면 트리거

//     // 각 요소에 대해 observer 적용
//     tags.forEach(element => {
//        observer.observe(element);
//     });


// })
