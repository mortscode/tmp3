import emitter from '../utils/emitter';

const SELECTORS = {
  FIXNAV: '.js-fix-nav',
};

export default class HomePosts {
  constructor(elem) {
    this.$elem = elem;
    this.elemBottom;
    this.navItemsArr = Array.from(document.querySelectorAll(SELECTORS.FIXNAV));
    this.revealFooter = false;
    this.winHeight = window.innerHeight;
    this.initialize();
  }

  initialize() {
    this._handleLocation();

    emitter.on('app--scroll', () => {
      this._handleLocation();
    });

    emitter.on('app--resizer', () => {
      this._resizeEvents();
    });
  }

  _updateLocation() {
    this.elemBottom = this.$elem.getBoundingClientRect().bottom;
    this.revealFooter =
      this.elemBottom <= this.winHeight && window.innerWidth <= 500;
  }

  _handleLocation() {
    this._updateLocation();
    this.revealFooter ? this._hideItems() : this._showItems();
  }

  _hideItems() {
    this.navItemsArr.forEach(item => {
      item.classList.add('hide');
    });
  }

  _showItems() {
    this.navItemsArr.forEach(item => {
      item.classList.remove('hide');
    });
  }

  _resizeEvents() {
    this.winHeight = window.innerHeight;
    this._handleLocation();
  }
}
