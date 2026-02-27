/**
 * Vitest setup file for UI package tests
 * Provides necessary polyfills and global setup
 */

// Mock canvas for jsdom environment (needed for axe-core accessibility tests)
if (typeof HTMLCanvasElement !== 'undefined') {
  // Mock getContext to avoid "Not implemented" errors in jsdom
  HTMLCanvasElement.prototype.getContext = function (
    contextId: string,
    _options?: any,
  ) {
    if (contextId === '2d') {
      return {
        fillRect: () => {},
        clearRect: () => {},
        getImageData: (x: number, y: number, w: number, h: number) => ({
          data: new Array(w * h * 4).fill(0),
        }),
        putImageData: () => {},
        createImageData: () => [],
        setTransform: () => {},
        drawImage: () => {},
        save: () => {},
        fillText: () => {},
        restore: () => {},
        beginPath: () => {},
        moveTo: () => {},
        lineTo: () => {},
        closePath: () => {},
        stroke: () => {},
        translate: () => {},
        scale: () => {},
        rotate: () => {},
        arc: () => {},
        fill: () => {},
        measureText: () => ({ width: 0 }),
        transform: () => {},
        rect: () => {},
        clip: () => {},
      };
    }
    return null;
  };
}
