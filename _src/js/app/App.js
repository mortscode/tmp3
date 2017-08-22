import $ from 'properjs-hobo';
import lazySizes from 'lazysizes';
import avoidOrphan from './utils/avoid-orphan';
import emitter from './utils/emitter';
import {modules} from './utils/module-loader';
import resizer from './utils/resizer';
import scroller from './utils/scroller';

export default class App {
  constructor() {
    this.orphanArray = Array.from(
      document.querySelectorAll('.js-avoid-orphan'),
    );
    this.moduleInstances = this.getInstances();
    this.initialize();
  }

  initialize() {
    this._lazyConfig();
    lazySizes.init();
    this._bindEvents();
    this._mapOrphans();
    this._printRecipe();
  }

  _lazyConfig() {
    document.addEventListener('lazybeforeunveil', e => {
      const bg = e.target.getAttribute('data-bg');
      if (bg) {
        e.target.style.backgroundImage = 'url(' + bg + ')';
      }
    });

    window.lazySizes.config = {
      loadMode: 2,
    };
  }

  _bindEvents() {
    scroller.on('scroll', () => {
      emitter.fire('app--scroll');
    });

    resizer.on('resize', () => {
      emitter.fire('app--resizer');
    });
  }

  _mapOrphans() {
    this.orphanArray.map(orphan => {
      avoidOrphan(orphan);
    });
  }

  _printRecipe() {
    $('.js-print-recipe').on('click', e => {
      e.preventDefault();
      window.print();
    });
  }

  getInstances() {
    return modules.map(module => {
      const elements = Array.from(document.querySelectorAll(module.class));
      const references = elements.map(el => {
        return new module.Source(el);
      });

      return {
        name: module.name,
        ref: references,
      };
    });
  }

  tearDown() {
    this.moduleInstances.forEach(item => {
      item.ref.forEach(ref => {
        if (ref.teardown) {
          ref.teardown();
        }
      });
    });
  }
}
