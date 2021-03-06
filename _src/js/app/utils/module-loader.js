import ContactForm from '../components/ContactForm';
import FixedShare from '../components/FixedShare';
import Navigation from '../components/Navigation';
import Search from '../components/Search';
import ScrollInElem from './ScrollInElem';
import ScrollToElem from './ScrollToElem';

export const modules = [
  {
    name: 'ContactForm',
    class: '.js-contact-form',
    Source: ContactForm,
  },
  {
    name: 'FixedShare',
    class: '.js-fix-share-trigger',
    Source: FixedShare,
  },
  {
    name: 'Navigation',
    class: '.js-navigation',
    Source: Navigation,
  },
  {
    name: 'ScrollInElem',
    class: '.js-scrolls',
    Source: ScrollInElem,
  },
  {
    name: 'ScrollToElem',
    class: '.js-scroll-to',
    Source: ScrollToElem,
  },
  {
    name: 'Search',
    class: '.js-search',
    Source: Search,
  },
];
