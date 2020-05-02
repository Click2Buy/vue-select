# vue-select

Opinionated select and multiselect Vue component with Bootstrap 4 styles

TODO: screenshot

## Install

`npm install --save @click2buy/vue-select`

## Usage

```html
<template>
  <div>
    <vue-select v-model="value" />
  </div>
</template>

<script>
import VueSelect from '@click2buy/vue-select'

export default {
  components: { VueSelect },
  data: function() {
    return {
      value: null
    }
  }
}
</script>
```

## Thanks

- [Bootstrap-vue](https://bootstrap-vue.js.org/)

We love this project, but it does not provide an advanced multiselect. This component was built to fill this gap.

This component uses its clickout mixin 🙏 and our documentation is organized based on theirs.

- [Bootstrap-multiselect](https://github.com/davidstutz/bootstrap-multiselect) - Our choice before switching to Vue
- [vue-multiselect](https://vue-multiselect.js.org/) - Our first choice when switching to Vue
- [React-select](https://react-select.com/) - What we hoped to find for Vue
- [Google Material Design](https://material.io/components/selection-controls#checkboxes) - Inspiration for the indeterminate checkbox
- [vue-slick-carousel](https://github.com/gs-shop/vue-slick-carousel) - Well organized/maintained repository
- [Bulbapedia](https://bulbapedia.bulbagarden.net/wiki/Main_Page) - Pokémon icon images for the demo

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```
