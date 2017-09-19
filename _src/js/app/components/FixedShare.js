import emitter from '../utils/emitter';

const SELECTORS = {
  FIX_SHARE: '.js-fix-share',
};

export default class FixedShare {
  constructor(elem) {
    this.$elem = elem;
    this.elemTop;
    this.fixShare = document.querySelector(SELECTORS.FIX_SHARE);
    this.revealShare = false;
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
    this.elemTop = this.$elem.getBoundingClientRect().top;
    this.revealShare = this.elemTop <= 0;
  }

  _handleLocation() {
    this._updateLocation();
    this.revealShare ? this._showShare() : this._hideShare();
  }

  _hideShare() {
    this.fixShare.classList.remove('-active');
  }

  _showShare() {
    this.fixShare.classList.add('-active');
  }

  _resizeEvents() {
    this._handleLocation();
  }
}
