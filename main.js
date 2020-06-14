"use strict";
const next = document.querySelector(".next");
const prev = document.querySelector(".prev");
const slidebox = document.querySelector(".slide__box");
const slideList = document.querySelector(".slide__list");
const slideItem = document.querySelectorAll(".slide__item");
const slideContainer = document.querySelector(".slide__container");

let slideHeight = 0;
let current = 0;

const toggleBtn = document.querySelector(".navbar__toggle--btn");
const menu = document.querySelector(".navbar__menu");

const arrow = document.querySelector(".arrowup--btn");
const nav = document.querySelector("#navbar");
const navHeight = nav.getBoundingClientRect().height;

console.log(navHeight);
document.addEventListener("DOMContentLoaded", () => {
  // 클릭 이벤트 코드
  toggleBtn.addEventListener("click", () => {
    menu.classList.toggle("active");
    menu.style.top = `${navHeight}px`;
  });

  // scroll 이벤트
  document.addEventListener("scroll", () => {
    const arrowHeight = 200;

    if (arrowHeight < window.scrollY) {
      arrow.classList.add("active");
    } else {
      arrow.classList.remove("active");
    }
  });

  arrow.addEventListener("click", () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  });

  // 슬라이드  코드
  if (slidebox) {
    // slide가 있을때 동작
    for (let i = 0; i < slideItem.length; i++) {
      if (slideHeight < slideItem[i].offsetHeight) {
        slideHeight = slideItem[i].offsetHeight;
      }
    }

    // slideContainer.style.height = slideHeight + "px";
    // slidebox.style.height = slideHeight + "px";
    // slideList.style.height = slideHeight + "px";

    // slideItem(li) left값을 준다. li가로정렬
    // for (let i = 0; i < slideItem.length; i++) {
    //   slideItem[i].style.left = `${100 * i}%`;
    // }
    slideItem.forEach((item, index) => {
      item.style.left = `${100 * index}%`;
    });

    next.addEventListener("click", () => {
      if (current === slideItem.length - 2) {
        goToSlide(current + 1);
        slideList.style.transition = `300ms`;
        setTimeout(() => {
          slideList.style.transition = `0s`;
          goToSlide(1);
        }, 300);
      } else {
        slideList.style.transition = `300ms`;
        goToSlide(current + 1);
      }
    });

    prev.addEventListener("click", () => {
      if (current === 1) {
        slideList.style.transition = `300ms`;
        // goToSlide(0);
        goToSlide(0);
        setTimeout(() => {
          slideList.style.transition = `0s`;
          goToSlide(3);
        }, 300);
      } else {
        slideList.style.transition = `300ms`;
        goToSlide(current - 1);
      }
    });
  }

  function goToSlide(index) {
    slideList.style.left = `${-100 * index}%`;
    current = index;
  }
});

// const slide = document.querySelector(".slide__list");
// const slideItem = document.querySelector(".slide__item");

// const slideWidth = slideItem.getBoundingClientRect().width;

// document.addEventListener("DOMContentLoaded", function () {
//   let current = 0;
//   if (slide) {
//     setInterval(function () {
//       /* 일정한 시간 간격으로 작업을 수행하는 함수 */
//       slide.style.transition = "1s";
//       slide.style.transform =
//         "translateX(-" + slideWidth * (current + 1) + "px")";

//       current++;

//       if (current === 2) {
//         current = -1;
//       }
//     }, 3000);
//   }
//   // DOMContentLoaded 이벤트는 초기 HTML 문서를 완전히 불러오고 분석했을 때 발생한다.
// });

// const arrowUpBtn = document.querySelector(".arrowup--btn");
// const header = document.querySelector("#main");
// const headerHeight = header.getBoundingClientRect().height;

// document.addEventListener("scroll", () => {
//   if (window.scrollY > headerHeight) {
//     arrowUpBtn.classList.add("visible");
//   } else {
//     arrowUpBtn.classList.remove("visible");
//   }
// });

// arrowUpBtn.addEventListener("click", () => {
//   header.scrollIntoView({ behavior: "smooth" });
// });
