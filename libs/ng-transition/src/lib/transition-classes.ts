//
// Based off of the source/logic from the `utils.js` file of the Alpine.js project:
// https://github.com/alpinejs/alpine/blob/master/src/utils.js
//

import { AnimationFrameRef, GetComputedStyleRef, TimeoutRef } from '@hickorytechnology/ng-refs';

interface Stages {
  start: () => void;
  during: () => void;
  end: () => void;
  hide: () => void;
  cleanup: () => void;
}

export function transitionClasses(
  animationFrameRef: AnimationFrameRef,
  getComputedStyleRef: GetComputedStyleRef,
  timeoutRef: TimeoutRef,
  el: HTMLElement,
  classesDuring: string[],
  classesStart: string[],
  classesEnd: string[],
  done: () => unknown
) {
  if (!el) {
    return;
  }
  transition(animationFrameRef, getComputedStyleRef, timeoutRef, el, {
    start() {
      el.classList.add(...classesStart);
    },
    during() {
      el.classList.add(...classesDuring);
    },
    end() {
      el.classList.remove(...classesStart);
      el.classList.add(...classesEnd);
    },
    hide() {
      done();
    },
    cleanup() {
      el.classList.remove(...classesDuring);
      el.classList.remove(...classesEnd);
    }
  });
}

export function transition(
  animationFrameRef: AnimationFrameRef,
  getComputedStyleRef: GetComputedStyleRef,
  timeoutRef: TimeoutRef,
  el: HTMLElement,
  stages: Stages
) {
  stages.start();
  stages.during();

  animationFrameRef.nativeRequest(() => {
    // Note: Safari's transitionDuration property will list out comma separated
    // transition durations for every single transition property. Let's grab the
    // first one and call it a day.
    const { transitionDuration } = getComputedStyleRef.native(el);
    const durationString = transitionDuration
      .replace(/,.*/, '')
      .replace('s', '');
    const duration = Number(durationString) * 1000;

    animationFrameRef.nativeRequest(() => {
      stages.end();

      timeoutRef.nativeSet(() => {
        stages.hide();

        // Adding an "isConnected" check, in case the callback
        // removed the element from the DOM.
        if (el.isConnected) {
          stages.cleanup();
        }
      }, duration);
    });
  });
}
