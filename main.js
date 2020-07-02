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

    slideList.style.transition = "none"; // transition 효과를 없애고 위치만 -100% 이동시킨다.
    slideList.style.left = "-100%"; // 맨 앞에 복제한 자식이 있기때문에 위치를 고정할수있다.

    // 마지막 자식을 복사해서 맨 앞에 넣고 첫번째 자식을 삭제
    let lastChild = slideList.lastElementChild;
    let cloneLastChild = lastChild.cloneNode(true);

    slideList.prepend(cloneLastChild); //부모의 첫자식 노드 앞에 삽입한다.
    lastChild.remove();

    // 0.1초 뒤 transition효과로 자연스럽게 -100%에서 0%로 위치 이동
    setTimeout(() => {
      slideList.style.transition = "all 800ms";
      slideList.style.left = "0%";
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
      slideList.style.transition = "none"; // -100%에서 다시 0%로 움직일때 움직임을 자연스럽게 하기위해
      slideList.style.left = "0%"; //left 0 으로 만들어줌으로 더이상 왼쪽으로 가지 못하게 막아줌

      let firstChild = slideList.firstElementChild; // firstElementChild는 차이 텍스트, 주석 요소를 무시한다. firstChild는 무시하지않는다.
      let cloneFirstChild = firstChild.cloneNode(true); // 복제할 대상이 node, 그 노드의 메소드를 호출, true 해당 node의 children까지 복제, 해당 node만 복제하려면 false

      slideList.append(cloneFirstChild); //복제한 첫번째 자식을 뒤에 다 넣음
      firstChild.remove();
      variable = false;
    }, 800);
  });
});
