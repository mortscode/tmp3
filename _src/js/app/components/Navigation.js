import emitter from "../utils/emitter";

export default class Navigation {
  constructor(element) {
    this.$navigation = element;
    this.$body = document.body;
    this.$navOpen = document.querySelector(".js-nav-open");
    this.navCloseArray = Array.from(
      this.$navigation.querySelectorAll(".js-nav-close")
    );

    this.initialize();
  }

  initialize() {
    this._bindEvents();
  }

  _bindEvents() {
    this.$navOpen.addEventListener("click", () => {
      this._openNav();
    });

    this.navCloseArray.forEach(elem => {
      elem.addEventListener("click", () => {
        this._closeNav();
      });
    });
  }

  _attachEvents() {
    window.addEventListener("keyup", this._keyUpHandler.bind(this));
  }

  _detachEvents() {
    window.removeEventListener("keyup", this._keyUpHandler);
  }

  _keyUpHandler(event) {
    if (event.keyCode === 27) {
      this._closeNav();
    }
  }

  _openNav() {
    this.$navigation.classList.add("-active");
    this.$body.classList.add("no-scroll");
    this._attachEvents();
    emitter.fire("app--nav-open");
  }

  _closeNav() {
    this.$navigation.classList.remove("-active");
    this.$body.classList.remove("no-scroll");
    this._detachEvents();
    emitter.fire("app--nav-closed");
  }
}
