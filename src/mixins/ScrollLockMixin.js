import ReactDOM from 'react-dom';

const cancelScrollEvent = (e) => {
  e.stopImmediatePropagation();
  e.preventDefault();
  e.returnValue = false;
  return false;
};

const addScrollEventListener = (elem, handler) => {
  elem.addEventListener('wheel', handler, false);
};

const removeScrollEventListener = (elem, handler) => {
  elem.removeEventListener('wheel', handler, false);
};

const ScrollLockMixin = {
  scrollLock(elem = ReactDOM.findDOMNode(this)) {
    this.scrollElem = elem;
    addScrollEventListener(elem, this.onScrollHandler);
  },

  scrollRelease(elem = this.scrollElem) {
    removeScrollEventListener(elem, this.onScrollHandler);
  },

  onScrollHandler(e) {
    const elem = this.scrollElem;
    const scrollTop = elem.scrollTop;
    const scrollHeight = elem.scrollHeight;
    const height = elem.clientHeight;
    const wheelDelta = e.deltaY;
    const isDeltaPositive = wheelDelta > 0;

    if (isDeltaPositive && wheelDelta > scrollHeight - height - scrollTop) {
      elem.scrollTop = scrollHeight;
      return cancelScrollEvent(e);
    } else if (!isDeltaPositive && -wheelDelta > scrollTop) {
      elem.scrollTop = 0;
      return cancelScrollEvent(e);
    }

    return null;
  }
};

export default ScrollLockMixin;
