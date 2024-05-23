import { beforeEach } from 'vitest';

declare global {
  interface SVGElement {
    getBBox(): DOMRect;
    getComputedTextLength(): number;
  }
}

export default function prepareSvgGetter() {
  beforeEach(() => {
    // Mocking the getBBox method of SVGElement
    window.SVGElement.prototype.getBBox = () => ({
      x: 0,
      y: 0,
      width: 100,
      height: 50,
      bottom: 50,
      left: 0,
      right: 100,
      top: 0,
      toJSON: () => ''
    });
  });

  beforeEach(() => {
    window.SVGElement.prototype.getComputedTextLength = () => -1;
  });
}
