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

  let variable = false;

  // 슬라이드  코드
  if (slidebox) {
    slideItem.forEach((item, index) => {
      item.style.left = `${100 * index}%`;
    });

    next.addEventListener("click", () => {
      if (variable) {
        console.log("variable = true");
        return;
      }
      variable = true;

      if (current === slideItem.length - 3) {
        goToSlide(3);
        slideList.style.transition = `300ms`;
        setTimeout(() => {
          slideList.style.transition = `0s`;
          goToSlide(0);
        }, 300);
      } else {
        slideList.style.transition = `300ms`;
        goToSlide(current + 1);
      }
      console.log("variable = false");
      variable = false;
    });

    prev.addEventListener("click", () => {
      if (variable) {
        console.log("variable = true");
        return;
      }
      variable = true;

      if (current === 0) {
        goToSlide(-1);
        slideList.style.transition = `300ms`;
        setTimeout(() => {
          slideList.style.transition = `0s`;
          goToSlide(2);
        }, 300);
      } else {
        slideList.style.transition = `300ms`;
        goToSlide(current - 1);
      }
      console.log("variable = false");
      variable = false;
    });
  }

  function goToSlide(index) {
    slideList.style.left = `${-100 * index}%`;
    current = index;
  }
});
