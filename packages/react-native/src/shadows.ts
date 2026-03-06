import type { ShadowLayer } from '@grundtone/core';

export interface RNShadowStyle {
  shadowColor: string;
  shadowOffset: { width: number; height: number };
  shadowOpacity: number;
  shadowRadius: number;
  elevation: number;
}

/**
 * Convert structured shadow layers to React Native shadow style.
 * RN only supports a single shadow layer — uses the first layer.
 * iOS: shadowColor / shadowOffset / shadowOpacity / shadowRadius
 * Android: elevation (approximated from blur radius)
 */
export function shadowToRN(layers: ShadowLayer[]): RNShadowStyle {
  const layer = layers[0];
  if (!layer) {
    return {
      shadowColor: 'transparent',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0,
      shadowRadius: 0,
      elevation: 0,
    };
  }

  return {
    shadowColor: layer.color,
    shadowOffset: { width: layer.x, height: layer.y },
    shadowOpacity: layer.opacity,
    shadowRadius: layer.blur / 2,
    elevation: Math.ceil(layer.blur / 2),
  };
}
