//! # grundtone-tokens
//!
//! grundtone design tokens for the **native side** of Tauri apps — the same
//! single source of truth (`@grundtone/core`) that themes the Vue/React
//! Native/email surfaces, code-generated into typed Rust constants.
//!
//! The webview already gets grundtone through the normal CSS pipeline; this
//! crate exists for everything the webview can't reach: the window's
//! background color at creation time (kills the white flash before first
//! paint in dark mode), tray and native-menu styling, and titlebar theming.
//!
//! ```no_run
//! use grundtone_tokens::{DARK, Rgb};
//!
//! let bg = Rgb::parse(DARK.background).unwrap();
//! // tauri::WebviewWindowBuilder::new(...)
//! //     .background_color(tauri::window::Color(bg.r, bg.g, bg.b, 255))
//! ```
//!
//! With the `serde` feature, [`Colors`] can also be deserialized from a JSON
//! object of camelCase color slots — the same shape `createTheme`'s color
//! presets use, which is what a Studio-published per-tenant brand exposes.
//! That lets a desktop shell theme its native chrome from a runtime brand,
//! not just the compiled-in defaults.

mod generated;

pub use generated::*;

/// An 8-bit RGB triple parsed from a `#rrggbb` token value.
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct Rgb {
    pub r: u8,
    pub g: u8,
    pub b: u8,
}

impl Rgb {
    /// Parse a `#rrggbb` or `#rgb` hex color. Returns `None` for anything
    /// else — grundtone token values are always one of those two forms.
    pub fn parse(hex: &str) -> Option<Rgb> {
        let hex = hex.strip_prefix('#')?;
        match hex.len() {
            6 => {
                let r = u8::from_str_radix(&hex[0..2], 16).ok()?;
                let g = u8::from_str_radix(&hex[2..4], 16).ok()?;
                let b = u8::from_str_radix(&hex[4..6], 16).ok()?;
                Some(Rgb { r, g, b })
            }
            3 => {
                let d = |i: usize| u8::from_str_radix(&hex[i..=i], 16).ok().map(|v| v * 17);
                Some(Rgb {
                    r: d(0)?,
                    g: d(1)?,
                    b: d(2)?,
                })
            }
            _ => None,
        }
    }

    /// `(r, g, b)` — convenient for APIs that take a tuple.
    pub fn tuple(self) -> (u8, u8, u8) {
        (self.r, self.g, self.b)
    }
}

/// Theme mode, mirroring grundtone's `mode` token.
#[derive(Debug, Clone, Copy, PartialEq, Eq, Default)]
pub enum Mode {
    #[default]
    Light,
    Dark,
}

impl Mode {
    /// The compiled-in default [`Colors`] for this mode.
    pub fn colors(self) -> Colors {
        match self {
            Mode::Light => LIGHT,
            Mode::Dark => DARK,
        }
    }
}

#[cfg(feature = "serde")]
mod runtime {
    use std::collections::HashMap;

    /// A runtime brand: owned color values deserialized from the camelCase
    /// JSON shape grundtone uses everywhere (createTheme presets, Studio
    /// published tokens). Slots missing from the JSON fall back to the
    /// compiled-in defaults for the chosen mode via [`RuntimeColors::with_defaults`].
    #[derive(Debug, Clone, Default, serde::Deserialize)]
    #[serde(transparent)]
    pub struct RuntimeColors(pub HashMap<String, String>);

    impl RuntimeColors {
        /// Look up a camelCase slot, e.g. `"primary"` or `"surfaceRaised"`.
        pub fn get(&self, slot: &str) -> Option<&str> {
            self.0.get(slot).map(String::as_str)
        }

        /// Resolve a slot with fallback to the compiled-in defaults.
        pub fn with_defaults(&self, slot: &str, mode: super::Mode) -> Option<String> {
            if let Some(v) = self.get(slot) {
                return Some(v.to_string());
            }
            default_slot(mode.colors(), slot).map(str::to_string)
        }
    }

    /// Map a camelCase slot name onto the generated struct. Only the slots a
    /// native shell realistically themes with are mapped; extend as needed.
    fn default_slot(c: super::Colors, slot: &str) -> Option<&'static str> {
        Some(match slot {
            "primary" => c.primary,
            "background" => c.background,
            "backgroundAlt" => c.background_alt,
            "surface" => c.surface,
            "surfaceRaised" => c.surface_raised,
            "text" => c.text,
            "textInverse" => c.text_inverse,
            _ => return None,
        })
    }
}

#[cfg(feature = "serde")]
pub use runtime::RuntimeColors;

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn parses_six_digit_hex() {
        assert_eq!(
            Rgb::parse("#0059b3"),
            Some(Rgb {
                r: 0,
                g: 0x59,
                b: 0xb3
            })
        );
    }

    #[test]
    fn parses_three_digit_hex() {
        assert_eq!(
            Rgb::parse("#fff"),
            Some(Rgb {
                r: 255,
                g: 255,
                b: 255
            })
        );
    }

    #[test]
    fn rejects_garbage() {
        assert_eq!(Rgb::parse("0059b3"), None);
        assert_eq!(Rgb::parse("#12345"), None);
        assert_eq!(Rgb::parse("#zzzzzz"), None);
    }

    #[test]
    fn every_generated_color_parses() {
        // The codegen emits whatever core holds — this is the contract test
        // that all token values stay in the #rrggbb/#rgb space Rgb::parse
        // (and thus Tauri's color APIs) can consume.
        for colors in [LIGHT, DARK] {
            for value in [
                colors.primary,
                colors.background,
                colors.surface,
                colors.surface_raised,
                colors.text,
                colors.border_light,
                colors.focus,
                colors.neutral,
            ] {
                assert!(
                    Rgb::parse(value).is_some(),
                    "token value {value:?} is not parseable hex"
                );
            }
        }
    }

    #[test]
    fn modes_resolve_to_distinct_palettes() {
        assert_ne!(
            Mode::Light.colors().background,
            Mode::Dark.colors().background
        );
    }

    #[cfg(feature = "serde")]
    #[test]
    fn runtime_colors_deserialize_and_fall_back() {
        let brand: RuntimeColors = serde_json::from_str(r##"{"primary": "#996600"}"##).unwrap();
        assert_eq!(brand.get("primary"), Some("#996600"));
        assert_eq!(
            brand.with_defaults("background", Mode::Dark).as_deref(),
            Some(DARK.background)
        );
    }
}
