# Design System Strategy: Kinetic Precision

## 1. Overview & Creative North Star
The fitness industry is often saturated with cluttered, loud, and generic interfaces. For this design system, we are moving in the opposite direction. Our Creative North Star is **"Kinetic Precision."** 

This system treats the UI as a high-performance instrument—think of the cockpit of a luxury electric vehicle or a high-end chronograph. We move beyond "template" looks by embracing deep tonal depth, intentional asymmetry, and an editorial approach to data. Instead of boxes inside boxes, we use layered surfaces and "breathing" white space to guide the eye. The goal is to make the athlete feel they are using a tool that is as disciplined and elite as their own training regimen.

## 2. Colors & Atmospheric Depth
The palette is rooted in a sophisticated charcoal environment, punctuated by "Electric Blue" and "Success Green" to denote action and achievement.

### The "No-Line" Rule
**Explicit Instruction:** Do not use 1px solid borders to define sections. Traditional borders create visual noise that traps the user's eye. Boundaries must be defined solely through background color shifts or subtle tonal transitions. For example, a workout detail card (`surface_container_low`) should sit naturally on the main dashboard background (`surface`), separated by its inherent value change rather than a stroke.

### Surface Hierarchy & Nesting
Treat the interface as a series of physical layers. We use the Material surface tiers to create "nested" depth:
*   **Base Level:** `surface` (#131313) is the canvas.
*   **Secondary Sections:** Use `surface_container_low` for large structural areas.
*   **Interactive Components:** Use `surface_container_high` or `highest` for cards and floating elements. 
This nesting creates a natural hierarchy where the most important information literally feels "closer" to the user.

### The "Glass & Gradient" Rule
To elevate the SaaS experience from functional to premium:
*   **Glassmorphism:** For floating mobile navigation or overlaying charts, use `surface_variant` at 60% opacity with a `backdrop-blur` of 20px. This allows the kinetic energy of the background data to bleed through.
*   **Signature Textures:** For primary CTAs (e.g., "Start Workout"), do not use flat fills. Apply a subtle linear gradient transitioning from `primary_container` (#5f8bff) to `primary` (#b3c5ff) at a 135-degree angle. This adds "soul" and a sense of three-dimensional light.

## 3. Typography
The typography system is a dialogue between two distinct voices: the authoritative **Manrope** for editorial impact and the functional **Inter** for data clarity.

*   **Display & Headlines (Manrope):** Use these for high-motivation moments—PR numbers, workout titles, and "Great Job" hero states. The heavy weights of Manrope convey the "Professional" and "Energetic" pillars of the brand.
*   **Body & Labels (Inter):** Reserved for the "Data-Driven" aspect. Inter’s neutral, high-legibility letterforms are used for workout metrics (Reps, Sets, Heart Rate) and technical descriptions.
*   **Hierarchy Note:** Use `display-lg` for the primary metric of a workout. Shrink the supporting label (e.g., "BPM") to `label-md` to create an intentional, high-contrast scale that feels sophisticated and editorial.

## 4. Elevation & Depth
In this system, depth is a functional tool, not a decorative one. We achieve hierarchy through **Tonal Layering**.

*   **The Layering Principle:** Stack `surface-container` tiers to create lift. A card using `surface_container_lowest` placed on a `surface_container_low` section creates a recessed, "etched" look, perfect for secondary data like historical logs.
*   **Ambient Shadows:** If a card must "float" (e.g., a mobile PR pop-up), use extra-diffused shadows. Set blur values between 40px and 60px with a low opacity (6%). The shadow should be tinted with `surface_tint` rather than pure black to mimic the way light reflects off high-end materials.
*   **The "Ghost Border" Fallback:** If accessibility requirements demand a border, use the **Ghost Border**: the `outline_variant` token at 15% opacity. It should be felt, not seen. 100% opaque borders are strictly forbidden.

## 5. Components

### Buttons
*   **Primary:** High-energy. Gradient of `primary_container` to `primary`. Roundedness: `md` (0.375rem).
*   **Secondary:** Ghost style. No fill, `outline` token at 20% opacity. Text in `on_surface`.
*   **Tertiary:** Text-only using `primary` color, reserved for low-emphasis actions like "View All."

### Cards & Lists
*   **Rule:** Forbid the use of divider lines. 
*   **Separation:** Use vertical white space (Spacing `8` or `10`) or subtle background shifts between `surface_container_low` and `surface_container_high`. 
*   **Content:** Fitness cards should use `headline-sm` for titles and `body-md` for metadata.

### Data Tables & Charts
*   **Charts:** Use `tertiary` (#00e475) for success-related data (PRs, growth) and `primary` for standard activity. Chart grid lines should be `outline_variant` at 10% opacity.
*   **Data Tables:** Backgrounds should alternate between `surface` and `surface_container_low`. Use `label-sm` for headers in all-caps with 0.05rem letter spacing to create a professional, "spec-sheet" feel.

### Status Badges
*   **Active:** `tertiary_container` background with `on_tertiary_container` text.
*   **At Risk:** `error_container` background with `on_error_container` text.
*   **Stopped:** `secondary_container` background with `on_secondary_container` text.
*   **Shape:** Always use `full` (9999px) roundedness for badges to distinguish them from rectangular data cards.

## 6. Do's and Don'ts

### Do
*   **DO** use `display-lg` for large, motivational numbers. Let the data be the hero.
*   **DO** use the Spacing Scale religiously. Consistent gaps (e.g., `spacing.6` for internal padding) are what separate high-end UI from amateur work.
*   **DO** lean into Dark Mode. Use `surface_bright` sparingly as a highlight to guide the eye toward "Start" actions.

### Don't
*   **DON'T** use 1px solid borders for layout containers.
*   **DON'T** use pure black (#000000). Always use the `surface` tokens to maintain the charcoal, premium feel.
*   **DON'T** mix roundedness. Use `md` (0.375rem) for most containers and `full` for interactive pills/badges. 
*   **DON'T** crowd the data. If a chart feels cramped, increase the container to `surface_container_high` and add `spacing.10` of padding.