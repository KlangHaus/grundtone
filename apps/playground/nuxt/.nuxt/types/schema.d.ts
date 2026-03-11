import {
  RuntimeConfig as UserRuntimeConfig,
  PublicRuntimeConfig as UserPublicRuntimeConfig,
} from 'nuxt/schema';
import { NuxtModule, ModuleDependencyMeta } from '@nuxt/schema';
interface SharedRuntimeConfig {
  app: {
    buildId: string;

    baseURL: string;

    buildAssetsDir: string;

    cdnURL: string;
  };

  nitro: {
    envPrefix: string;
  };
}
interface SharedPublicRuntimeConfig {
  grundtone: {
    theme: {
      light: {
        mode: string;

        colors: {
          primary: string;

          primaryLight: string;

          primaryDark: string;

          onPrimary: string;

          secondary: string;

          secondaryLight: string;

          secondaryDark: string;

          success: string;

          successLight: string;

          successDark: string;

          warning: string;

          warningLight: string;

          warningDark: string;

          error: string;

          errorLight: string;

          errorDark: string;

          info: string;

          infoLight: string;

          infoDark: string;

          background: string;

          backgroundAlt: string;

          surface: string;

          surfaceAlt: string;

          surfaceRaised: string;

          surfaceOverlay: string;

          modalBackdrop: string;

          text: string;

          textSecondary: string;

          textTertiary: string;

          textInverse: string;

          textPlaceholder: string;

          textDisabled: string;

          borderLight: string;

          borderMedium: string;

          borderStrong: string;

          borderInverse: string;

          focus: string;

          focusRing: string;

          neutral: string;
        };

        spacing: {
          xs: string;

          sm: string;

          md: string;

          lg: string;

          xl: string;

          '2xl': string;

          '3xl': string;

          '4xl': string;
        };

        typography: {
          fontFamily: {
            base: string;

            heading: string;

            mono: string;
          };

          fontSize: {
            xs: string;

            sm: string;

            base: string;

            lg: string;

            xl: string;

            '2xl': string;

            '3xl': string;

            '4xl': string;

            '5xl': string;
          };

          fontWeight: {
            thin: number;

            light: number;

            normal: number;

            medium: number;

            semibold: number;

            bold: number;

            extrabold: number;
          };

          lineHeight: {
            none: number;

            tight: number;

            snug: number;

            normal: number;

            relaxed: number;

            loose: number;
          };
        };

        shadows: {
          xs: string;

          sm: string;

          md: string;

          lg: string;

          xl: string;

          '2xl': string;

          inner: string;

          none: string;
        };

        shadowDefinitions: {
          xs: Array<{}>;

          sm: Array<{}>;

          md: Array<{}>;

          lg: Array<{}>;

          xl: Array<{}>;

          '2xl': Array<{}>;

          inner: Array<{}>;
        };

        radius: {
          none: string;

          xs: string;

          sm: string;

          md: string;

          lg: string;

          xl: string;

          '2xl': string;

          '3xl': string;

          full: string;
        };

        transitions: {
          duration: {
            fast: string;

            base: string;

            slow: string;
          };

          timing: {
            ease: string;

            easeIn: string;

            easeOut: string;

            easeInOut: string;

            linear: string;
          };
        };

        zIndex: {
          dropdown: number;

          sticky: number;

          fixed: number;

          modalBackdrop: number;

          modal: number;

          popover: number;

          tooltip: number;

          toast: number;
        };
      };

      dark: {
        mode: string;

        colors: {
          primary: string;

          primaryLight: string;

          primaryDark: string;

          onPrimary: string;

          secondary: string;

          secondaryLight: string;

          secondaryDark: string;

          success: string;

          successLight: string;

          successDark: string;

          warning: string;

          warningLight: string;

          warningDark: string;

          error: string;

          errorLight: string;

          errorDark: string;

          info: string;

          infoLight: string;

          infoDark: string;

          background: string;

          backgroundAlt: string;

          surface: string;

          surfaceAlt: string;

          surfaceRaised: string;

          surfaceOverlay: string;

          modalBackdrop: string;

          text: string;

          textSecondary: string;

          textTertiary: string;

          textInverse: string;

          textPlaceholder: string;

          textDisabled: string;

          borderLight: string;

          borderMedium: string;

          borderStrong: string;

          borderInverse: string;

          focus: string;

          focusRing: string;

          neutral: string;
        };

        spacing: {
          xs: string;

          sm: string;

          md: string;

          lg: string;

          xl: string;

          '2xl': string;

          '3xl': string;

          '4xl': string;
        };

        typography: {
          fontFamily: {
            base: string;

            heading: string;

            mono: string;
          };

          fontSize: {
            xs: string;

            sm: string;

            base: string;

            lg: string;

            xl: string;

            '2xl': string;

            '3xl': string;

            '4xl': string;

            '5xl': string;
          };

          fontWeight: {
            thin: number;

            light: number;

            normal: number;

            medium: number;

            semibold: number;

            bold: number;

            extrabold: number;
          };

          lineHeight: {
            none: number;

            tight: number;

            snug: number;

            normal: number;

            relaxed: number;

            loose: number;
          };
        };

        shadows: {
          xs: string;

          sm: string;

          md: string;

          lg: string;

          xl: string;

          '2xl': string;

          inner: string;

          none: string;
        };

        shadowDefinitions: {
          xs: Array<{}>;

          sm: Array<{}>;

          md: Array<{}>;

          lg: Array<{}>;

          xl: Array<{}>;

          '2xl': Array<{}>;

          inner: Array<{}>;
        };

        radius: {
          none: string;

          xs: string;

          sm: string;

          md: string;

          lg: string;

          xl: string;

          '2xl': string;

          '3xl': string;

          full: string;
        };

        transitions: {
          duration: {
            fast: string;

            base: string;

            slow: string;
          };

          timing: {
            ease: string;

            easeIn: string;

            easeOut: string;

            easeInOut: string;

            linear: string;
          };
        };

        zIndex: {
          dropdown: number;

          sticky: number;

          fixed: number;

          modalBackdrop: number;

          modal: number;

          popover: number;

          tooltip: number;

          toast: number;
        };
      };
    };

    components: boolean;

    composables: boolean;

    prefix: string;
  };
}
declare module '@nuxt/schema' {
  interface ModuleDependencies {
    ['@grundtone/nuxt']?:
      | ModuleDependencyMeta<
          typeof import('@grundtone/nuxt').default extends NuxtModule<infer O>
            ? O | false
            : Record<string, unknown>
        >
      | false;
    ['@nuxt/devtools']?:
      | ModuleDependencyMeta<
          typeof import('@nuxt/devtools').default extends NuxtModule<infer O>
            ? O | false
            : Record<string, unknown>
        >
      | false;
    ['@nuxt/telemetry']?:
      | ModuleDependencyMeta<
          typeof import('@nuxt/telemetry').default extends NuxtModule<infer O>
            ? O | false
            : Record<string, unknown>
        >
      | false;
  }
  interface NuxtOptions {
    /**
     * Configuration for `@grundtone/nuxt`
     */
    ['grundtone']: typeof import('@grundtone/nuxt').default extends NuxtModule<
      infer O,
      unknown,
      boolean
    >
      ? O | false
      : Record<string, any> | false;
    /**
     * Configuration for `@nuxt/devtools`
     */
    ['devtools']: typeof import('@nuxt/devtools').default extends NuxtModule<
      infer O,
      unknown,
      boolean
    >
      ? O | false
      : Record<string, any> | false;
    /**
     * Configuration for `@nuxt/telemetry`
     */
    ['telemetry']: typeof import('@nuxt/telemetry').default extends NuxtModule<
      infer O,
      unknown,
      boolean
    >
      ? O | false
      : Record<string, any> | false;
  }
  interface NuxtConfig {
    /**
     * Configuration for `@grundtone/nuxt`
     */
    ['grundtone']?: typeof import('@grundtone/nuxt').default extends NuxtModule<
      infer O,
      unknown,
      boolean
    >
      ? Partial<O> | false
      : Record<string, any> | false;
    /**
     * Configuration for `@nuxt/devtools`
     */
    ['devtools']?: typeof import('@nuxt/devtools').default extends NuxtModule<
      infer O,
      unknown,
      boolean
    >
      ? Partial<O> | false
      : Record<string, any> | false;
    /**
     * Configuration for `@nuxt/telemetry`
     */
    ['telemetry']?: typeof import('@nuxt/telemetry').default extends NuxtModule<
      infer O,
      unknown,
      boolean
    >
      ? Partial<O> | false
      : Record<string, any> | false;
    modules?: (
      | undefined
      | null
      | false
      | NuxtModule<any>
      | string
      | [NuxtModule | string, Record<string, any>]
      | ['@grundtone/nuxt', Exclude<NuxtConfig['grundtone'], boolean>]
      | ['@nuxt/devtools', Exclude<NuxtConfig['devtools'], boolean>]
      | ['@nuxt/telemetry', Exclude<NuxtConfig['telemetry'], boolean>]
    )[];
  }
  interface RuntimeConfig extends UserRuntimeConfig {}
  interface PublicRuntimeConfig extends UserPublicRuntimeConfig {}
}
declare module 'nuxt/schema' {
  interface ModuleDependencies {
    ['@grundtone/nuxt']?:
      | ModuleDependencyMeta<
          typeof import('@grundtone/nuxt').default extends NuxtModule<infer O>
            ? O | false
            : Record<string, unknown>
        >
      | false;
    ['@nuxt/devtools']?:
      | ModuleDependencyMeta<
          typeof import('@nuxt/devtools').default extends NuxtModule<infer O>
            ? O | false
            : Record<string, unknown>
        >
      | false;
    ['@nuxt/telemetry']?:
      | ModuleDependencyMeta<
          typeof import('@nuxt/telemetry').default extends NuxtModule<infer O>
            ? O | false
            : Record<string, unknown>
        >
      | false;
  }
  interface NuxtOptions {
    /**
     * Configuration for `@grundtone/nuxt`
     * @see https://www.npmjs.com/package/@grundtone/nuxt
     */
    ['grundtone']: typeof import('@grundtone/nuxt').default extends NuxtModule<
      infer O,
      unknown,
      boolean
    >
      ? O | false
      : Record<string, any> | false;
    /**
     * Configuration for `@nuxt/devtools`
     * @see https://www.npmjs.com/package/@nuxt/devtools
     */
    ['devtools']: typeof import('@nuxt/devtools').default extends NuxtModule<
      infer O,
      unknown,
      boolean
    >
      ? O | false
      : Record<string, any> | false;
    /**
     * Configuration for `@nuxt/telemetry`
     * @see https://www.npmjs.com/package/@nuxt/telemetry
     */
    ['telemetry']: typeof import('@nuxt/telemetry').default extends NuxtModule<
      infer O,
      unknown,
      boolean
    >
      ? O | false
      : Record<string, any> | false;
  }
  interface NuxtConfig {
    /**
     * Configuration for `@grundtone/nuxt`
     * @see https://www.npmjs.com/package/@grundtone/nuxt
     */
    ['grundtone']?: typeof import('@grundtone/nuxt').default extends NuxtModule<
      infer O,
      unknown,
      boolean
    >
      ? Partial<O> | false
      : Record<string, any> | false;
    /**
     * Configuration for `@nuxt/devtools`
     * @see https://www.npmjs.com/package/@nuxt/devtools
     */
    ['devtools']?: typeof import('@nuxt/devtools').default extends NuxtModule<
      infer O,
      unknown,
      boolean
    >
      ? Partial<O> | false
      : Record<string, any> | false;
    /**
     * Configuration for `@nuxt/telemetry`
     * @see https://www.npmjs.com/package/@nuxt/telemetry
     */
    ['telemetry']?: typeof import('@nuxt/telemetry').default extends NuxtModule<
      infer O,
      unknown,
      boolean
    >
      ? Partial<O> | false
      : Record<string, any> | false;
    modules?: (
      | undefined
      | null
      | false
      | NuxtModule<any>
      | string
      | [NuxtModule | string, Record<string, any>]
      | ['@grundtone/nuxt', Exclude<NuxtConfig['grundtone'], boolean>]
      | ['@nuxt/devtools', Exclude<NuxtConfig['devtools'], boolean>]
      | ['@nuxt/telemetry', Exclude<NuxtConfig['telemetry'], boolean>]
    )[];
  }
  interface RuntimeConfig extends SharedRuntimeConfig {}
  interface PublicRuntimeConfig extends SharedPublicRuntimeConfig {}
}
declare module 'vue' {
  interface ComponentCustomProperties {
    $config: UserRuntimeConfig;
  }
}
