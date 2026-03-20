export const componentExamples: Record<string, string> = {
  'c-tabs-underline': `<div class="tabs tabs--underline">
  <div class="tabs__list" role="tablist">
    <button class="tabs__tab tabs__tab--active" role="tab" aria-selected="true">Oversigt</button>
    <button class="tabs__tab" role="tab" aria-selected="false">Detaljer</button>
    <button class="tabs__tab" role="tab" aria-selected="false">Historik</button>
  </div>
  <div class="tabs__panel" role="tabpanel"><p>Oversigt over systemets status.</p></div>
</div>`,

  'c-tabs-segment': `<div class="tabs tabs--segment">
  <div class="tabs__list" role="tablist">
    <button class="tabs__tab tabs__tab--active" role="tab" aria-selected="true">Vue</button>
    <button class="tabs__tab" role="tab" aria-selected="false">Nuxt</button>
    <button class="tabs__tab" role="tab" aria-selected="false">React Native</button>
  </div>
  <div class="tabs__panel" role="tabpanel"><p>Vue 3 komponentbibliotek.</p></div>
</div>`,

  'c-tabs-pill': `<div class="tabs tabs--pill">
  <div class="tabs__list" role="tablist">
    <button class="tabs__tab tabs__tab--active" role="tab" aria-selected="true">Alle</button>
    <button class="tabs__tab" role="tab" aria-selected="false">Atoms</button>
    <button class="tabs__tab" role="tab" aria-selected="false">Molecules</button>
  </div>
  <div class="tabs__panel" role="tabpanel"><p>Viser alle komponenter.</p></div>
</div>`,
  'c-external-link': `<div class="flex flex-col gap-2">
  <a href="#" class="external-link">Read more on borger.dk</a>
  <a href="#" class="external-link">Self-service guide (pdf)</a>
</div>`,

  'c-function-link': `<div class="flex flex-col gap-2">
  <button type="button" class="function-link"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/></svg> Add another person</button>
  <button type="button" class="function-link"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M5 1a2 2 0 0 0-2 2v1h10V3a2 2 0 0 0-2-2zm6 4H5v7a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2z"/></svg> Print receipt</button>
</div>`,

  'c-display-text': `<div class="flex flex-col gap-1">
  <p class="body-text-sm text-secondary">Your tax statement</p>
  <p class="display-text">23,450 kr</p>
</div>`,

  'c-facit': `<div class="flex flex-col gap-1" style="max-width: 280px">
  <div class="flex justify-between body-text"><span>Subtotal</span><span>1,200 kr</span></div>
  <div class="flex justify-between body-text"><span>VAT (25%)</span><span>300 kr</span></div>
  <hr style="margin: var(--space-xs) 0" />
  <div class="flex justify-between body-text"><span>Total</span><span class="facit">1,500 kr</span></div>
</div>`,

  'c-error-text': `<div class="flex flex-col gap-1" style="max-width: 360px">
  <label style="font-size: var(--font-size-lg); font-weight: var(--font-weight-medium)">Email</label>
  <input type="email" value="user@" style="padding: var(--space-sm) var(--space-md); border: 2px solid var(--color-error); border-radius: var(--radius-md); font-size: var(--font-size-base)" />
  <p class="error-text">Please enter a valid email address, e.g. name@example.com</p>
</div>`,

  'c-error-text-required': `<div class="flex flex-col gap-1" style="max-width: 360px">
  <label style="font-size: var(--font-size-lg); font-weight: var(--font-weight-medium)">Phone number</label>
  <input type="tel" style="padding: var(--space-sm) var(--space-md); border: 2px solid var(--color-error); border-radius: var(--radius-md); font-size: var(--font-size-base)" />
  <p class="error-text">Please enter your phone number</p>
</div>`,

  'c-caption': `<figure style="max-width: 360px">
  <div style="width: 100%; aspect-ratio: 16/9; background: var(--color-surface-alt); border-radius: var(--radius-md)"></div>
  <figcaption class="caption" style="margin-top: var(--space-xs)">Grundtone color palette in light and dark mode.</figcaption>
</figure>`,

  'c-body-text': `<div class="flex flex-col gap-2">
  <p class="body-text">Body text — standard (1rem / 16px, normal weight)</p>
  <p class="body-text-sm">Small body text — secondary text (0.875rem / 14px)</p>
  <p class="body-text-bold">Bold body text — emphasized text (1rem / 16px, bold)</p>
</div>`,

  'c-body-text-usage': `<div class="flex flex-col gap-2">
  <p class="body-text">Fill out the form below to create your account. You can always change your details later under <span class="body-text-bold">Settings</span>.</p>
  <p class="body-text-sm text-secondary">All fields marked with * are required.</p>
</div>`,

  'c-help-text': `<div class="flex flex-col gap-1" style="max-width: 360px">
  <label style="font-size: var(--font-size-lg); font-weight: var(--font-weight-medium)">Social security number</label>
  <p class="help-text">We need your social security number to verify your identity.</p>
  <input type="text" placeholder="000000-0000" style="padding: var(--space-sm) var(--space-md); border: 1px solid var(--color-border); border-radius: var(--radius-md); font-size: var(--font-size-base)" />
</div>`,

  'c-help-text-field': `<div class="flex flex-col gap-1" style="max-width: 360px">
  <label style="font-size: var(--font-size-lg); font-weight: var(--font-weight-medium)">Email</label>
  <input type="email" placeholder="you@email.com" style="padding: var(--space-sm) var(--space-md); border: 1px solid var(--color-border); border-radius: var(--radius-md); font-size: var(--font-size-base)" />
  <p class="help-text">We will send a confirmation to this address.</p>
</div>`,

  'c-skip-link': `<div style="position: relative; height: 60px; overflow: hidden; background: var(--color-surface); border-radius: 8px">
  <a href="#" class="skip-link" style="left: 1rem">Skip to content</a>
</div>`,

  'c-prose': `<div class="prose" style="font-size: var(--font-size-sm)">
  <h2 style="margin-top: 0">Heading Level 2</h2>
  <p>Paragraph with <code>inline code</code> and normal text content for demonstration.</p>
  <h3>Heading Level 3</h3>
  <ul>
    <li>First list item</li>
    <li>Second list item</li>
  </ul>
</div>`,

  'c-select-basic': `<div class="input-field" style="max-width: 360px">
  <label class="input-label" for="preview-region">Region <span class="input-label__required">*</span></label>
  <select id="preview-region" class="select select--md" required>
    <option value="" disabled selected>Vælg...</option>
    <option value="hovedstaden">Hovedstaden</option>
    <option value="midtjylland">Midtjylland</option>
    <option value="nordjylland">Nordjylland</option>
    <option value="sjaelland">Sjælland</option>
    <option value="syddanmark">Syddanmark</option>
  </select>
</div>`,

  'c-select-error': `<div class="input-field" style="max-width: 360px">
  <label class="input-label" for="preview-err-sel">Region</label>
  <p id="preview-err-sel-desc" class="input-error" role="alert">Du skal vælge en region</p>
  <select id="preview-err-sel" class="select select--md select--error" aria-invalid="true" aria-describedby="preview-err-sel-desc" required>
    <option value="" disabled selected>Vælg...</option>
    <option value="hovedstaden">Hovedstaden</option>
    <option value="midtjylland">Midtjylland</option>
  </select>
</div>`,

  'c-select-sizes': `<div class="flex flex-col gap-2" style="max-width: 360px">
  <select class="select select--sm">
    <option value="" disabled selected>Small</option>
    <option>Option A</option>
  </select>
  <select class="select select--md">
    <option value="" disabled selected>Medium</option>
    <option>Option A</option>
  </select>
  <select class="select select--lg">
    <option value="" disabled selected>Large</option>
    <option>Option A</option>
  </select>
</div>`,

  'c-accordion-default': `<div class="accordion" role="region" aria-label="FAQ">
  <div class="accordion__item">
    <button class="accordion__header" aria-expanded="false">
      <span class="accordion__icon" aria-hidden="true"></span>
      <span class="accordion__heading">Hvad er design tokens?</span>
    </button>
  </div>
  <div class="accordion__item accordion__item--open">
    <button class="accordion__header" aria-expanded="true">
      <span class="accordion__icon" aria-hidden="true"></span>
      <span class="accordion__heading">Understøtter Grundtone dark mode?</span>
    </button>
    <div class="accordion__panel" role="region">
      <div class="accordion__body">
        <p>Ja — tema-switching sker via CSS custom properties.</p>
      </div>
    </div>
  </div>
</div>`,

  'c-accordion-bordered': `<div class="accordion accordion--bordered" role="region" aria-label="Settings">
  <div class="accordion__item">
    <button class="accordion__header" aria-expanded="false">
      <span class="accordion__icon" aria-hidden="true"></span>
      <span class="accordion__heading">Konfiguration</span>
    </button>
  </div>
  <div class="accordion__item accordion__item--open">
    <button class="accordion__header" aria-expanded="true">
      <span class="accordion__icon" aria-hidden="true"></span>
      <span class="accordion__heading">Prefix-system</span>
    </button>
    <div class="accordion__panel" role="region">
      <div class="accordion__body">
        <p>Alle klasser prefixes med <code>gt-</code> som default.</p>
      </div>
    </div>
  </div>
</div>`,

  'c-accordion-card': `<div class="accordion accordion--card" role="region" aria-label="Platforms">
  <div class="accordion__item accordion__item--open">
    <button class="accordion__header" aria-expanded="true">
      <span class="accordion__icon" aria-hidden="true"></span>
      <span class="accordion__heading">Vue 3</span>
    </button>
    <div class="accordion__panel" role="region">
      <div class="accordion__body">
        <p>Fuld komponentbibliotek med Composition API og TypeScript.</p>
      </div>
    </div>
  </div>
  <div class="accordion__item">
    <button class="accordion__header" aria-expanded="false">
      <span class="accordion__icon" aria-hidden="true"></span>
      <span class="accordion__heading">React Native</span>
    </button>
  </div>
</div>`,

  'c-badge-variants': `<div class="flex flex-wrap items-center gap-2">
  <span class="badge badge--neutral badge--md">Neutral</span>
  <span class="badge badge--info badge--md">Information</span>
  <span class="badge badge--success badge--md">Godkendt</span>
  <span class="badge badge--warning badge--md">Afventer</span>
  <span class="badge badge--error badge--md">Afvist</span>
</div>`,

  'c-badge-dot': `<div class="flex flex-wrap items-center gap-2">
  <span class="badge badge--success badge--md"><span class="badge__dot" aria-hidden="true"></span>Aktiv</span>
  <span class="badge badge--warning badge--md"><span class="badge__dot" aria-hidden="true"></span>Afventer</span>
  <span class="badge badge--error badge--md"><span class="badge__dot" aria-hidden="true"></span>Offline</span>
  <span class="badge badge--neutral badge--md"><span class="badge__dot" aria-hidden="true"></span>Kladde</span>
</div>`,

  'c-badge-sizes': `<div class="flex flex-wrap items-center gap-2">
  <span class="badge badge--info badge--sm">Small</span>
  <span class="badge badge--info badge--md">Medium</span>
  <span class="badge badge--success badge--sm"><span class="badge__dot" aria-hidden="true"></span>Small dot</span>
  <span class="badge badge--success badge--md"><span class="badge__dot" aria-hidden="true"></span>Medium dot</span>
</div>`,

  'c-details-default': `<details class="details details--default">
  <summary class="details__summary">
    <span class="details__arrow" aria-hidden="true"></span>
    What are design tokens?
  </summary>
  <div class="details__content">
    <div class="details__body">
      <p>Design tokens are the smallest building blocks of a design system — named values for colors, spacing, typography, and more.</p>
    </div>
  </div>
</details>`,

  'c-details-subtle': `<details class="details details--subtle">
  <summary class="details__summary">
    <span class="details__arrow" aria-hidden="true"></span>
    Read more about theming
  </summary>
  <div class="details__content">
    <div class="details__body">
      <p>Theme switching happens via CSS custom properties. All colors are defined as semantic tokens.</p>
    </div>
  </div>
</details>`,

  'c-details-card': `<details class="details details--card">
  <summary class="details__summary">
    <span class="details__arrow" aria-hidden="true"></span>
    Do I need @grundtone/core?
  </summary>
  <div class="details__content">
    <div class="details__body">
      <p>Yes — core contains TypeScript types, theme presets, and the icon registry. All other packages depend on core.</p>
    </div>
  </div>
</details>`,

  'c-anchor-links-basic': `<nav class="anchor-links" aria-label="Indholdsfortegnelse">
  <p class="anchor-links__heading">Indhold på siden</p>
  <ol class="anchor-links__list">
    <li class="anchor-links__item">
      <a href="#intro" class="anchor-links__link">Introduktion</a>
    </li>
    <li class="anchor-links__item">
      <a href="#features" class="anchor-links__link">Funktioner</a>
    </li>
    <li class="anchor-links__item">
      <a href="#install" class="anchor-links__link">Installation</a>
    </li>
  </ol>
</nav>`,

  'c-anchor-links-active': `<nav class="anchor-links" aria-label="Indholdsfortegnelse">
  <p class="anchor-links__heading">Indhold på siden</p>
  <ol class="anchor-links__list">
    <li class="anchor-links__item">
      <a href="#intro" class="anchor-links__link">Introduktion</a>
    </li>
    <li class="anchor-links__item">
      <a href="#features" class="anchor-links__link anchor-links__link--active" aria-current="true">Funktioner</a>
    </li>
    <li class="anchor-links__item">
      <a href="#install" class="anchor-links__link">Installation</a>
    </li>
  </ol>
</nav>`,

  'c-cookie-message-basic': `<div class="cookie-message cookie-message--static" role="region" aria-label="Cookiemeddelelse">
  <div class="cookie-message__content">
    <p class="cookie-message__heading">Vi bruger cookies</p>
    <div class="cookie-message__body">
      <p>Vi bruger cookies til at forbedre din oplevelse. <a href="#">Læs mere</a>.</p>
    </div>
    <div class="cookie-message__actions">
      <button type="button" class="gt-btn gt-btn--primary gt-btn--sm">Acceptér</button>
    </div>
  </div>
  <button type="button" class="cookie-message__close" aria-label="Luk">&times;</button>
</div>`,

  'c-cookie-message-actions': `<div class="cookie-message cookie-message--static" role="region" aria-label="Cookiemeddelelse">
  <div class="cookie-message__content">
    <p class="cookie-message__heading">Cookies på dette site</p>
    <div class="cookie-message__body">
      <p>Vi bruger cookies til statistik og personalisering.</p>
    </div>
    <div class="cookie-message__actions">
      <button type="button" class="gt-btn gt-btn--primary gt-btn--sm">Acceptér alle</button>
      <button type="button" class="gt-btn gt-btn--secondary gt-btn--sm">Afvis alle</button>
      <button type="button" class="gt-btn gt-btn--tertiary gt-btn--sm">Cookie-indstillinger</button>
    </div>
  </div>
  <button type="button" class="cookie-message__close" aria-label="Luk">&times;</button>
</div>`,

  'c-cookie-message-static': `<div class="cookie-message cookie-message--static" role="region" aria-label="Cookiemeddelelse">
  <div class="cookie-message__content">
    <div class="cookie-message__body">
      <p>Vi bruger kun funktionelt nødvendige cookies.</p>
    </div>
    <div class="cookie-message__actions">
      <button type="button" class="gt-btn gt-btn--primary gt-btn--sm">OK</button>
    </div>
  </div>
</div>`,

  'c-alert-info': `<div class="alert alert--info" role="status">
  <div class="alert__content">
    <div class="alert__body">
      <p>This is an informational message.</p>
    </div>
  </div>
</div>`,

  'c-alert-success': `<div class="alert alert--success" role="status">
  <div class="alert__content">
    <div class="alert__body">
      <p>Your changes have been saved successfully.</p>
    </div>
  </div>
</div>`,

  'c-alert-warning': `<div class="alert alert--warning" role="status">
  <div class="alert__content">
    <p class="alert__heading">Attention</p>
    <div class="alert__body">
      <p>Your session will expire in 5 minutes.</p>
    </div>
  </div>
</div>`,

  'c-alert-error': `<div class="alert alert--error" role="alert">
  <div class="alert__content">
    <p class="alert__heading">Form errors</p>
    <div class="alert__body">
      <p>Please fix the following errors before submitting.</p>
    </div>
    <div class="alert__footer">
      <p>Fix the errors and try again.</p>
    </div>
  </div>
</div>`,

  'c-card-default': `<article class="card max-w-sm">
  <div class="card__media">
    <div class="w-full h-full bg-surface-alt"></div>
  </div>
  <div class="card__content">
    <span class="card__subheading">Guide</span>
    <h3 class="card__title">Design Tokens</h3>
    <div class="card__body">
      <p>Learn how design tokens power the entire Grundtone system.</p>
    </div>
  </div>
</article>`,

  'c-card-nav': `<a href="#" class="card card--nav max-w-sm">
  <div class="card__content">
    <span class="card__subheading">Documentation</span>
    <h3 class="card__title">Getting Started</h3>
    <div class="card__body">
      <p>Set up Grundtone in your project in under 5 minutes.</p>
    </div>
  </div>
</a>`,

  'c-card-bordered': `<article class="card card--bordered max-w-sm">
  <div class="card__content">
    <h3 class="card__title">Bordered Card</h3>
    <div class="card__body">
      <p>A card with a subtle border instead of elevation.</p>
    </div>
  </div>
</article>`,

  'c-card-flat': `<article class="card card--flat max-w-sm">
  <div class="card__content">
    <h3 class="card__title">Flat Card</h3>
    <div class="card__body">
      <p>No background, no border — just structure and spacing.</p>
    </div>
  </div>
</article>`,

  'c-card-horizontal': `<article class="card card--horizontal max-w-xl">
  <div class="card__media">
    <div class="w-full h-full aspect-video bg-surface-alt"></div>
  </div>
  <div class="card__content">
    <span class="card__subheading">Feature</span>
    <h3 class="card__title">Horizontal Layout</h3>
    <div class="card__body">
      <p>Image on the left, content on the right.</p>
    </div>
  </div>
</article>`,

  'c-card-with-buttons': `<article class="card max-w-sm">
  <div class="card__media">
    <div class="w-full h-full bg-surface-alt"></div>
  </div>
  <div class="card__content">
    <span class="card__subheading">Course</span>
    <h3 class="card__title">Introduction to Design Tokens</h3>
    <div class="card__body">
      <p>Learn the fundamentals of design tokens and how to apply them.</p>
    </div>
    <div class="card__footer">
      <button type="button" class="gt-btn gt-btn--primary gt-btn--sm">Enrol</button>
      <a href="#" class="gt-btn gt-btn--outlined gt-btn--sm">Read more</a>
    </div>
  </div>
</article>`,

  'c-meta': `<div class="meta text-sm text-secondary">
  <span class="badge badge--info badge--sm">Design</span>
  <time>1 March 2026</time>
  <span>&middot;</span>
  <span>6 min read</span>
</div>`,

  'c-meta-in-card': `<article class="card max-w-sm">
  <div class="card__media">
    <div class="w-full h-full bg-surface-alt"></div>
  </div>
  <div class="card__content">
    <div class="meta text-sm text-secondary">
      <span class="badge badge--info badge--sm">Design</span>
      <time>1 March 2026</time>
      <span>&middot;</span>
      <span>6 min read</span>
    </div>
    <h3 class="card__title">Design Tokens in Practice</h3>
    <div class="card__body">
      <p>How to leverage tokens across platforms.</p>
    </div>
  </div>
</article>`,

  'c-breadcrumb': `<nav aria-label="Breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb__item">
      <a href="#" class="breadcrumb__link">Home</a>
    </li>
    <li class="breadcrumb__item">
      <span class="breadcrumb__separator" aria-hidden="true">/</span>
      <a href="#" class="breadcrumb__link">Blog</a>
    </li>
    <li class="breadcrumb__item">
      <span class="breadcrumb__separator" aria-hidden="true">/</span>
      <span class="breadcrumb__current" aria-current="page">Current Page</span>
    </li>
  </ol>
</nav>`,

  'c-back-link': `<a href="#" class="back-link" style="font-size: var(--font-size-sm); color: var(--color-primary); font-weight: var(--font-weight-medium)">&larr; All posts</a>`,

  'c-lead': `<div>
  <h2 style="font-size: var(--font-size-2xl); font-weight: var(--font-weight-bold); margin: 0 0 var(--space-sm)">Page Title</h2>
  <p class="lead">A short introductory paragraph that sets the context for the content below.</p>
</div>`,

  'c-lead-prose': `<div class="prose">
  <p>This first paragraph is automatically styled as a lead inside .prose — no extra class needed.</p>
  <p>Subsequent paragraphs use the normal body text size and line height.</p>
</div>`,

  'c-header': `<header class="header">
  <a href="#">Brand</a>
  <nav>
    <a href="#">About</a>
    <a href="#">Blog</a>
  </nav>
</header>`,

  'c-footer': `<footer class="footer text-xs text-tertiary text-center">
  <p>&copy; 2026 Example. All rights reserved.</p>
</footer>`,

  'c-date-input-basic': `<div class="input-field" style="max-width: 360px">
  <label class="input-label" id="preview-bday-label">Fødselsdato</label>
  <p class="input-help" id="preview-bday-hint">For eksempel: 27 03 1990</p>
  <div class="date-input" role="group" aria-labelledby="preview-bday-label" aria-describedby="preview-bday-hint">
    <div class="date-input__field">
      <label class="date-input__label" for="preview-bday-day">Dag</label>
      <input id="preview-bday-day" class="input input--md date-input__input--day" type="text" inputmode="numeric" pattern="[0-9]*" maxlength="2" autocomplete="bday-day" />
    </div>
    <div class="date-input__field">
      <label class="date-input__label" for="preview-bday-month">Måned</label>
      <input id="preview-bday-month" class="input input--md date-input__input--month" type="text" inputmode="numeric" pattern="[0-9]*" maxlength="2" autocomplete="bday-month" />
    </div>
    <div class="date-input__field">
      <label class="date-input__label" for="preview-bday-year">År</label>
      <input id="preview-bday-year" class="input input--md date-input__input--year" type="text" inputmode="numeric" pattern="[0-9]*" maxlength="4" autocomplete="bday-year" />
    </div>
  </div>
</div>`,

  'c-date-input-error': `<div class="input-field" style="max-width: 360px">
  <label class="input-label" id="preview-err-date-label">Startdato</label>
  <p id="preview-err-date-desc" class="input-error" role="alert">Datoen kan ikke være i fremtiden</p>
  <div class="date-input" role="group" aria-labelledby="preview-err-date-label" aria-describedby="preview-err-date-desc">
    <div class="date-input__field">
      <label class="date-input__label" for="preview-err-day">Dag</label>
      <input id="preview-err-day" class="input input--md input--error date-input__input--day" type="text" inputmode="numeric" pattern="[0-9]*" maxlength="2" aria-invalid="true" />
    </div>
    <div class="date-input__field">
      <label class="date-input__label" for="preview-err-month">Måned</label>
      <input id="preview-err-month" class="input input--md input--error date-input__input--month" type="text" inputmode="numeric" pattern="[0-9]*" maxlength="2" aria-invalid="true" />
    </div>
    <div class="date-input__field">
      <label class="date-input__label" for="preview-err-year">År</label>
      <input id="preview-err-year" class="input input--md input--error date-input__input--year" type="text" inputmode="numeric" pattern="[0-9]*" maxlength="4" aria-invalid="true" />
    </div>
  </div>
</div>`,

  'c-input-sizes': `<div class="flex flex-col gap-2" style="max-width: 360px">
  <input class="input input--sm" placeholder="Small input" />
  <input class="input input--md" placeholder="Medium input" />
  <input class="input input--lg" placeholder="Large input" />
</div>`,

  'c-input-label': `<div class="input-field" style="max-width: 360px">
  <label class="input-label" for="preview-name">Full name <span class="input-label__required">*</span></label>
  <input id="preview-name" class="input input--md" type="text" placeholder="John Doe" required aria-required="true" />
  <p class="input-help">Enter your full legal name</p>
</div>`,

  'c-input-error': `<div class="input-field" style="max-width: 360px">
  <label class="input-label" for="preview-user">Username</label>
  <input id="preview-user" class="input input--md input--error" type="text" value="admin" aria-invalid="true" aria-describedby="preview-user-err" />
  <p id="preview-user-err" class="input-error" role="alert">Username is already taken</p>
</div>`,

  'c-input-states': `<div class="flex flex-col gap-3" style="max-width: 360px">
  <div class="input-field">
    <label class="input-label" for="preview-dis">Disabled</label>
    <input id="preview-dis" class="input input--md" disabled value="Cannot edit" />
  </div>
  <div class="input-field">
    <label class="input-label" for="preview-ro">Readonly</label>
    <input id="preview-ro" class="input input--md" readonly value="Read only value" />
  </div>
</div>`,
};
