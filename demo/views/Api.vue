<template>
  <div class="grid grid-cols-4 gap-6">
    <!-- Left col - API doc -->
    <div class="col-span-3 py-4">
      <h4 id="properties">Properties</h4>
      <table class="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Property</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>value</code>
              <div><span class="badge badge-primary">v-model</span></div>
            </td>
            <td><code>Any</code></td>
            <td></td>
            <td>Current value of the select. Should be set to an array when the <code>multiple</code> prop is set</td>
          </tr>
          <tr>
            <td><code>options</code></td>
            <td><code>Array</code></td>
            <td><code>[]</code></td>
            <td>Array of items to render in the component</td>
          </tr>
          <tr>
            <td><code>always-open</code></td>
            <td><code>Boolean</code></td>
            <td><code>false</code></td>
            <td>Keep the dropdown open, for debug/demo purposes</td>
          </tr>
          <tr>
            <td><code>multiple</code></td>
            <td><code>Boolean</code></td>
            <td><code>true</code></td>
            <td>Whether the component should allow to select multiple options</td>
          </tr>
          <tr>
            <td><code>searchable</code></td>
            <td><code>Boolean</code></td>
            <td><code>true</code></td>
            <td>Display the search input to filter options</td>
          </tr>
          <tr>
            <td><code>checkboxes-style</code></td>
            <td><code>Boolean</code></td>
            <td><code>true</code></td>
            <td>Display selected option(s) with a checkbox, instead of the default highlight style</td>
          </tr>
          <tr>
            <td><code>close-on-select</code></td>
            <td><code>Boolean</code></td>
            <td><code>true</code></td>
            <td>Close the dropdown when an option is (un)selected</td>
          </tr>
          <tr>
            <td><code>pagination</code></td>
            <td><code>Boolean</code></td>
            <td><code>true</code></td>
            <td>Paginate options</td>
          </tr>
          <tr>
            <td><code>page-size</code></td>
            <td><code>Int</code></td>
            <td><code>10</code></td>
            <td>Options page size</td>
          </tr>
          <tr>
            <td>
              <code>display-selected-options-first</code>
              <div><span class="badge badge-secondary">multiple only</span></div>
            </td>
            <td><code>Boolean</code></td>
            <td><code>true</code></td>
            <td>Display selected options first in the dropdown</td>
          </tr>
          <tr>
            <td>
              <code>select-all-option</code>
              <div><span class="badge badge-secondary">multiple only</span></div>
            </td>
            <td><code>Boolean</code></td>
            <td><code>true</code></td>
            <td>Enable option on top to (un)select all options</td>
          </tr>
          <tr>
            <td>
              <code>clear-button</code>
              <div><span class="badge badge-secondary">multiple only</span></div>
            </td>
            <td><code>Boolean</code></td>
            <td><code>false</code></td>
            <td>Enable button to clear selection</td>
          </tr>
          <tr>
            <td>
              <code>display-tags</code>
              <div><span class="badge badge-secondary">multiple only</span></div>
            </td>
            <td><code>Boolean</code></td>
            <td><code>true</code></td>
            <td>Display selected options as tags</td>
          </tr>
        </tbody>
      </table>

      <h4 id="slots">Slots</h4>
      <table class="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Slot Name</th>
            <th>Description</th>
            <th>Scope</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>option</code></td>
            <td>Format an option</td>
            <td><code>{ option }</code></td>
          </tr>
          <tr>
            <td><code>placeholder</code></td>
            <td>Format the content of the form control</td>
            <td><code>{ selectedOption }</code></td>
          </tr>
        </tbody>
      </table>

      <h4 id="events">Events</h4>
      <table class="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Event</th>
            <th>Arguments</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>input</code></td>
            <td><code>value</code> - current selected value(s) of the select</td>
            <td>Emitted when the select value changes</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Right col - Table of contents -->
    <nav class="d-none d-xl-block bd-toc w-100">
      <ul class="section-nav">
        <li class="toc-entry toc-h2">
          <a href="#properties" @click="scrollIntoView($event, '#properties')">
            Properties
          </a>
        </li>
        <li class="toc-entry toc-h2">
          <a href="#slots" @click="scrollIntoView($event, '#slots')">
            Slots
          </a>
        </li>
        <li class="toc-entry toc-h2">
          <a href="#events" @click="scrollIntoView($event, '#events')">
            Events
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Api',
  methods: {
    scrollIntoView(evt, href) {
      evt.preventDefault()
      evt.stopPropagation()
      // We use an attribute `querySelector()` rather than `getElementByID()`,
      // as some auto-generated ID's are invalid or not unique
      const id = (href || '').replace(/#/g, '')
      const $el = document.body.querySelector(`[id="${id}"]`)
      if ($el) {
        // Get the document scrolling element
        const scroller = document.scrollingElement || document.documentElement || document.body
        // Scroll heading into view (minus offset to account for nav top height
        scrollTo(scroller, offsetTop($el) - 80, 100, () => {
          // Set a tab index so we can focus header for a11y support
          $el.tabIndex = -1
          // Focus the heading
          $el.focus()
        })
      }
    }
  }
}

// Return an element's offset wrt document element
// https://j11y.io/jquery/#v=git&fn=jQuery.fn.offset
const offsetTop = el => {
  if (!el.getClientRects().length) {
    return 0
  }
  const bcr = el.getBoundingClientRect()
  const win = el.ownerDocument.defaultView
  return bcr.top + win.pageYOffset
}
</script>

<style lang="scss">
// Table of contents
.bd-toc {
  position: -webkit-sticky;
  position: sticky;
  top: 3.5rem;
  height: calc(100vh - 4rem);
  overflow-y: auto;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  font-size: 1rem;
}

.section-nav {
  padding-left: 0;
  border-left: 1px solid #eee;
}

.toc-entry a {
  display: block;
  padding: .125rem 1.5rem;
  color: #77757a;
}
</style>