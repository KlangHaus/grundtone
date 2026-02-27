export const gridExamples: Record<string, string> = {
  'holy-grail': `<div class="grid-holy-grail">
  <header class="grid-header">Header</header>
  <nav class="grid-nav">Nav</nav>
  <main class="grid-main">Main</main>
  <aside class="grid-aside">Aside</aside>
  <footer class="grid-footer">Footer</footer>
</div>`,
  basic: `<div class="grid grid-cols-3 gap-4">
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
  <div>5</div>
  <div>6</div>
</div>`,
  'col-span': `<div class="grid grid-cols-12 gap-4">
  <div class="col-span-8">Main content (8 cols)</div>
  <div class="col-span-4">Sidebar (4 cols)</div>
</div>`,
  'row-span': `<div class="grid grid-cols-3 grid-rows-3 gap-4">
  <div class="row-span-2">A (2 rows)</div>
  <div>B</div>
  <div>C</div>
  <div>D</div>
  <div>E</div>
  <div>F</div>
</div>`,
  'col-row-span': `<div class="grid grid-cols-4 grid-rows-3 gap-4">
  <div class="col-span-2 row-span-2">Wide + tall</div>
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
  <div>5</div>
</div>`,
  'sidebar-left': `<div class="grid-sidebar-left">
  <aside>Sidebar (auto width)</aside>
  <main>Main content (flexible)</main>
</div>`,
  'sidebar-right': `<div class="grid-sidebar-right">
  <main>Main content</main>
  <aside>Sidebar</aside>
</div>`,
  'auto-fit': `<div class="grid-auto-fit gap-4">
  <div>Card 1</div>
  <div>Card 2</div>
  <div>Card 3</div>
</div>`,
  cards: `<div class="grid-cards gap-6">
  <div class="card">Card 1</div>
  <div class="card">Card 2</div>
  <div class="card">Card 3</div>
</div>`,
  responsive: `<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
  <div>5</div>
  <div>6</div>
</div>`,
  'responsive-col-span': `<div class="grid grid-cols-12 gap-4">
  <div class="col-span-full md:col-span-8 lg:col-span-6">Responsive width</div>
  <div class="col-span-full md:col-span-4 lg:col-span-6">Fills rest</div>
</div>`,
};
