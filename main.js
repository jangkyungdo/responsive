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

let variable = false;

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

  // 데이터가 중복적으로 들어오는 것을 방지하기 위한 변수
  let variable = false;

  prev.addEventListener("click", () => {
    if (variable) {
      console.log("variable = true");
      return;
    }
    variable = true;

    slideList.style.transitionProperty = "none"; //transtion 충돌로 인한 오류?를 잡기위한 코드, 바로 실행되야하는 부분이 transtion값이 적용이 되여서
    slideList.style.left = "-100%";

    let lastChild = slideList.lastElementChild;
    let cloneLastChild = lastChild.cloneNode(true);
    slideList.prepend(cloneLastChild); //slideList에 복제한 첫번째 자식을 뒤에 다 넣음
    lastChild.remove(); //기존 첫번째 자식은 없앰

    setTimeout(() => {
      slideList.style.transition = "all 800ms";
      slideList.style.left = "0%"; //left 0 으로 만들어줌으로 더이상 왼쪽으로 가지 못하게 막아줌
      variable = false;
    }, 100);
  });

  next.addEventListener("click", () => {
    if (variable) {
      console.log("variable = true");
      return;
    }
    variable = true;

    slideList.style.transition = "all 800ms";
    slideList.style.left = "-100%";

    setTimeout(() => {
      slideList.style.transitionProperty = "none"; //transtion 충돌로 인한 오류?를 잡기위한 코드, 바로 실행되야하는 부분이 transtion값이 적용이 되여서
      let firstChild = slideList.firstElementChild;
      let cloneFirstChild = firstChild.cloneNode(true);
      slideList.append(cloneFirstChild); //sliderBox에 복제한 첫번째 자식을 뒤에 다 넣음
      firstChild.remove(); //기존 첫번째 자식은 없앰
      slideList.style.left = "0%"; //left 0 으로 만들어줌으로 더이상 왼쪽으로 가지 못하게 막아줌
      variable = false;
    }, 800);
  });

  // 슬라이드  코드
  // if (slidebox) {
  //   slideItem.forEach((item, index) => {
  //     item.style.left = `${100 * index}%`;
  //   });

  //   next.addEventListener("click", () => {
  //     if (variable) {
  //       console.log("variable = true");
  //       return;
  //     }
  //     variable = true;

  //     if (current === slideItem.length - 3) {
  //       goToSlide(3);
  //       slideList.style.transition = `300ms`;
  //       setTimeout(() => {
  //         slideList.style.transition = `0s`;
  //         goToSlide(0);
  //       }, 300);
  //     } else {
  //       slideList.style.transition = `300ms`;
  //       goToSlide(current + 1);
  //     }
  //     console.log("variable = false");
  //     variable = false;
  //   });

  //   prev.addEventListener("click", () => {
  //     if (variable) {
  //       console.log("variable = true");
  //       return;
  //     }
  //     variable = true;

  //     if (current === 0) {
  //       goToSlide(-1);
  //       slideList.style.transition = `300ms`;
  //       setTimeout(() => {
  //         slideList.style.transition = `0s`;
  //         goToSlide(2);
  //       }, 300);
  //     } else {
  //       slideList.style.transition = `300ms`;
  //       goToSlide(current - 1);
  //     }
  //     console.log("variable = false");
  //     variable = false;
  //   });
  // }

  function goToSlide(index) {
    slideList.style.left = `${-100 * index}%`;
    current = index;
  }
});
