import {TweenLite, Power2} from 'gsap';
import scrollTo from "gsap/ScrollToPlugin"; // eslint-disable-line

export default class ScrollToElem {
  constructor(element) {
    this.$elem = element;
    this.targetName = this.$elem.dataset.scrollTarget;
    this.$target = document.querySelector(
      `.js-scroll-target-${this.targetName}`,
    );
    this.speed = this.$elem.dataset.scrollSpeed | 1;
    this.bindEvents();

    console.log(this.$elem, this.$target);
  }

  bindEvents() {
    this.$elem.addEventListener('click', () => {
      this.scrollToElem();
    });
  }

  scrollToElem() {
    TweenLite.to(window, this.speed, {
      scrollTo: this.$target,
      ease: Power2.easeOut,
      autoKill: false,
    });
  }
}
