import emitter from '../utils/emitter';

const SELECTORS = {
  FEATURE_IMAGE: '.js-feature-image',
  FEATURE_TITLE: '.js-feature-title',
};

export default class FixedShare {
  constructor(elem) {
    this.$elem = elem;
    this.featureImage = this.$elem.querySelector(SELECTORS.FEATURE_IMAGE);
    this.imageHeight = this.featureImage.clientHeight;
    this.imageBottom;
    this.featureTitle = this.$elem.querySelector(SELECTORS.FEATURE_TITLE);
    this.titleHeight = this.featureTitle.clientHeight;
    this.winHeight;
    this.releaseTitle = false;
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
    this.winHeight = window.innerHeight;
    this.imageBottom =
      this.featureImage.getBoundingClientRect().top + this.imageHeight;
    const titleOffset = this.winHeight - this.titleHeight;
    this.releaseTitle = this.imageBottom <= titleOffset;
  }

  _handleLocation() {
    this._updateLocation();
    this.releaseTitle ? this._releaseTitle() : this._fixTitle();
  }

  _releaseTitle() {
    this.featureTitle.classList.remove('-fixed');
  }

  _fixTitle() {
    this.featureTitle.classList.add('-fixed');
  }

  _resizeEvents() {
    this.winHeight = window.innerHeight;
    this._handleLocation();
  }
}
