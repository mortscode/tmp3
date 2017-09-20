import emitter from '../utils/emitter';

export default class Search {
  constructor(elem) {
    this.$search = elem;
    this.$searchOpen = document.querySelector('.js-search-open');
    this.$searchClose = this.$search.querySelector('.js-search-close');
    this.$searchInput = this.$search.querySelector('.js-search-input');
    this.searchOpen = false;
    this.disableSearch = false;
    this.isMobileWidth = window.innerWidth <= 500;
    this.$body = document.body;
    this.hotkeyPressed = false;

    this.initialize();
  }

  initialize() {
    this._bindEvents();

    emitter.on('app--nav-open', () => {
      this.disableSearch = true;
    });

    emitter.on('app--nav-closed', () => {
      this.disableSearch = false;
    });

    emitter.on('app--search-lock', () => {
      this.disableSearch = true;
    });

    emitter.on('app--search-unlock', () => {
      this.disableSearch = false;
    });
  }

  _bindEvents() {
    this.$searchOpen.addEventListener('click', () => {
      this._openSearch();
    });

    this.$searchClose.addEventListener('click', () => {
      this._closeSearch();
    });

    window.addEventListener('keydown', this._inputHandler.bind(this));
    window.addEventListener('keyup', this._hotkeyHandler.bind(this));
  }

  _attachEvents() {
    window.addEventListener('keyup', this._escapeHandler.bind(this));
  }

  _detachEvents() {
    window.removeEventListener('keyup', this._escapeHandler.bind(this));
  }

  _inputHandler(event) {
    if (event.keyCode === 91) {
      this.hotkeyPressed = true;
    }

    if (this.disableSearch || this.hotkeyPressed || this.isMobileWidth) {
      return;
    }

    if (!this.searchOpen && event.keyCode >= 65 && event.keyCode <= 90) {
      this._openSearch();
    }
  }

  _escapeHandler(event) {
    if (this.searchOpen && event.keyCode === 27) {
      this._closeSearch();
    }
  }

  _hotkeyHandler(event) {
    if (event.keyCode === 91) {
      this.hotkeyPressed = false;
    }
  }

  _openSearch() {
    this.$searchInput.focus();
    this.$search.classList.add('-active');
    this.$body.classList.add('no-scroll');
    this._attachEvents();
    this.searchOpen = true;
  }

  _closeSearch() {
    this.$search.classList.remove('-active');
    this.$body.classList.remove('no-scroll');
    this._detachEvents();
    this.searchOpen = false;
    setTimeout(() => {
      this.$searchInput.value = '';
    }, 500);
  }
}
