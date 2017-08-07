import emitter from '../utils/emitter';

export default class ScrollInElem {
  constructor(element) {
    this.$elem = element;
    this.topTrigger = this.$elem.dataset.offset;
    this.intTrigger = this.$elem.dataset.intoffset;
    this.triggerLocation = null;
    this.winHeight = window.innerHeight;
    this.enterWindow = this.winHeight - 80;
    this.topOffset = null;

    this.initialize();
  }

  initialize() {
    this._offset();
    this._activate();

    emitter.on('app--scroll', () => {
      this._activate();
    });

    emitter.on('app--resizer', () => {
      this._resizeEvents();
    });
  }

  _offset() {
    if (this.topTrigger) {
      this.triggerLocation = this.winHeight * this.topTrigger;
    } else if (this.intTrigger) {
      this.triggerLocation = this.intTrigger;
    } else {
      this.triggerLocation = this.enterWindow;
    }
  }

  _activate() {
    this.topOffset = this.$elem.getBoundingClientRect().top;

    if (this.topOffset <= this.triggerLocation) {
      this.$elem.classList.add('active');
    }
  }

  _resizeEvents() {
    this.winHeight = window.innerHeight;
    this._offset();
    this._activate();
  }
}
