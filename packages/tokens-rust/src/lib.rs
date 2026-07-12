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
//! use grundtone_tokens::{Rgba, DARK};
//!
//! let bg = Rgba::parse(DARK.background).unwrap();
//! // tauri::WebviewWindowBuilder::new(...)
//! //     .background_color(tauri::window::Color(bg.r, bg.g, bg.b, bg.a))
//! ```
//!
//! With the `serde` feature, [`RuntimeColors`] deserializes a JSON object of
//! camelCase color slots — the same shape `createTheme`'s color presets use,
//! which is what a Studio-published per-tenant brand exposes. That lets a
//! desktop shell theme its native chrome from a runtime brand, not just the
//! compiled-in defaults.

mod generated;

pub use generated::*;

/// An 8-bit RGBA quadruple parsed from a grundtone color token. Token values
/// are `#rrggbb`/`#rgb` hex (alpha = 255) or `rgba(r,g,b,a)` with a 0–1
/// float alpha (e.g. `modalBackdrop`, `focusRing`).
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct Rgba {
    pub r: u8,
    pub g: u8,
    pub b: u8,
    pub a: u8,
}

impl Rgba {
    /// Parse any grundtone color token value. Returns `None` for anything
    /// outside the `#rrggbb` / `#rgb` / `rgba(r,g,b,a)` forms.
    pub fn parse(value: &str) -> Option<Rgba> {
        let value = value.trim();
        if let Some(hex) = value.strip_prefix('#') {
            return Self::parse_hex(hex);
        }
        if let Some(body) = value
            .strip_prefix("rgba(")
            .or_else(|| value.strip_prefix("rgb("))
        {
            return Self::parse_rgba_body(body.strip_suffix(')')?);
        }
        None
    }

    fn parse_hex(hex: &str) -> Option<Rgba> {
        match hex.len() {
            6 => {
                let r = u8::from_str_radix(&hex[0..2], 16).ok()?;
                let g = u8::from_str_radix(&hex[2..4], 16).ok()?;
                let b = u8::from_str_radix(&hex[4..6], 16).ok()?;
                Some(Rgba { r, g, b, a: 255 })
            }
            3 => {
                let d = |i: usize| u8::from_str_radix(&hex[i..=i], 16).ok().map(|v| v * 17);
                Some(Rgba {
                    r: d(0)?,
                    g: d(1)?,
                    b: d(2)?,
                    a: 255,
                })
            }
            _ => None,
        }
    }

    fn parse_rgba_body(body: &str) -> Option<Rgba> {
        let mut parts = body.split(',').map(str::trim);
        let r: u8 = parts.next()?.parse().ok()?;
        let g: u8 = parts.next()?.parse().ok()?;
        let b: u8 = parts.next()?.parse().ok()?;
        let a = match parts.next() {
            Some(alpha) => {
                let f: f32 = alpha.parse().ok()?;
                if !(0.0..=1.0).contains(&f) {
                    return None;
                }
                (f * 255.0).round() as u8
            }
            None => 255,
        };
        if parts.next().is_some() {
            return None;
        }
        Some(Rgba { r, g, b, a })
    }

    /// `(r, g, b, a)` — convenient for APIs that take a tuple.
    pub fn tuple(self) -> (u8, u8, u8, u8) {
        (self.r, self.g, self.b, self.a)
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
    /// compiled-in defaults for the chosen mode via
    /// [`RuntimeColors::with_defaults`] — every generated slot is covered
    /// through [`super::Colors::slot`].
    #[derive(Debug, Clone, Default, serde::Deserialize)]
    #[serde(transparent)]
    pub struct RuntimeColors(pub HashMap<String, String>);

    impl RuntimeColors {
        /// Look up a camelCase slot, e.g. `"primary"` or `"surfaceRaised"`.
        pub fn get(&self, slot: &str) -> Option<&str> {
            self.0.get(slot).map(String::as_str)
        }

        /// Resolve a slot with fallback to the compiled-in defaults. `None`
        /// only for slot names grundtone doesn't define at all.
        pub fn with_defaults(&self, slot: &str, mode: super::Mode) -> Option<String> {
            if let Some(v) = self.get(slot) {
                return Some(v.to_string());
            }
            mode.colors().slot(slot).map(str::to_string)
        }
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
            Rgba::parse("#0059b3"),
            Some(Rgba {
                r: 0,
                g: 0x59,
                b: 0xb3,
                a: 255
            })
        );
    }

    #[test]
    fn parses_three_digit_hex() {
        assert_eq!(
            Rgba::parse("#fff"),
            Some(Rgba {
                r: 255,
                g: 255,
                b: 255,
                a: 255
            })
        );
    }

    #[test]
    fn parses_rgba_with_float_alpha() {
        assert_eq!(
            Rgba::parse("rgba(0,89,179,0.25)"),
            Some(Rgba {
                r: 0,
                g: 89,
                b: 179,
                a: 64
            })
        );
        assert_eq!(
            Rgba::parse("rgba(255, 255, 255, 0.95)"),
            Some(Rgba {
                r: 255,
                g: 255,
                b: 255,
                a: 242
            })
        );
    }

    #[test]
    fn rejects_garbage() {
        assert_eq!(Rgba::parse("0059b3"), None);
        assert_eq!(Rgba::parse("#12345"), None);
        assert_eq!(Rgba::parse("#zzzzzz"), None);
        assert_eq!(Rgba::parse("rgba(1,2)"), None);
        assert_eq!(Rgba::parse("rgba(0,0,0,1.5)"), None);
        assert_eq!(Rgba::parse("rgba(0,0,0,0.5,9)"), None);
    }

    #[test]
    fn every_generated_color_parses() {
        // The contract test: EVERY token value the codegen emits, in both
        // modes, must stay inside the space Rgba::parse (and thus Tauri's
        // color APIs) can consume. Iterates the generated slot map so new
        // slots are covered automatically.
        for colors in [LIGHT, DARK] {
            for name in Colors::SLOT_NAMES {
                let value = colors.slot(name).expect("SLOT_NAMES entry must resolve");
                assert!(
                    Rgba::parse(value).is_some(),
                    "token {name} = {value:?} is not parseable"
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
        // Fallback covers every generated slot, not a curated subset.
        for name in Colors::SLOT_NAMES {
            assert!(
                brand.with_defaults(name, Mode::Dark).is_some(),
                "slot {name} must fall back to defaults"
            );
        }
        assert_eq!(
            brand.with_defaults("background", Mode::Dark).as_deref(),
            Some(DARK.background)
        );
        assert_eq!(brand.with_defaults("notASlot", Mode::Dark), None);
    }
}
