import emitter from '../utils/emitter';

export default class Search {
  constructor(elem) {
    this.$search = elem;
    this.$searchOpen = document.querySelector('.js-search-open');
    this.$searchClose = this.$search.querySelector('.js-search-close');
    this.$searchInput = this.$search.querySelector('.js-search-input');
    this.$searchForm = this.$search.querySelector('.js-search-form');
    this.searchOpen = false;
    this.disableSearch = false;
    this.isMobileWidth = window.innerWidth <= 500;
    this.$body = document.body;
    this.hotKeysArr = [91, 93, 224, 17];
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

    this.$searchForm.addEventListener('focus', () => {
      emitter.fire('app--search-focus');
    });

    this.$searchForm.addEventListener('blur', () => {
      emitter.fire('app--search-blur');
    });

    this.$searchForm.addEventListener('submit', () => {
      this._handleSubmit();
    });

    window.addEventListener('keydown', this._inputHandler.bind(this));
    window.addEventListener('keyup', this._hotkeyUpHandler.bind(this));
  }

  _attachEvents() {
    window.addEventListener('keyup', this._escapeHandler.bind(this));
  }

  _detachEvents() {
    window.removeEventListener('keyup', this._escapeHandler.bind(this));
  }

  _handleSubmit() {
    console.log('seraching dude');
    this.$search.classList.add('-searching');
  }

  _inputHandler(event) {
    const hotKeyDown = this.hotKeysArr.includes(event.keyCode);
    if (hotKeyDown) {
      this.hotkeyPressed = true;
    }

    if (this.disableSearch || this.hotkeyPressed || this.isMobileWidth) {
      return;
    } else if (!this.searchOpen && event.keyCode >= 65 && event.keyCode <= 90) {
      this._openSearch();
    } else {
      return;
    }
  }

  _escapeHandler(event) {
    if (this.searchOpen && event.keyCode === 27) {
      this._closeSearch();
    }
  }

  _hotkeyUpHandler(event) {
    const hotKeyUp = this.hotKeysArr.includes(event.keyCode);
    if (hotKeyUp) {
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
