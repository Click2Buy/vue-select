<template>
  <div class="pt-4" style="padding-bottom: 10rem;">
    <div class="row">
      <!-- Props -->
      <div class="col-12 col-md-3">
        <h4>Properties</h4>
        <div class="form-group">
          <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" id="alwaysOpen" v-model="alwaysOpen">
            <label class="form-check-label" for="alwaysOpen">Always open</label>
          </div>
        </div>
        <div class="form-group">
          <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" id="searchable" v-model="searchable">
            <label class="form-check-label" for="searchable">Searchable</label>
          </div>
        </div>
        <div class="form-group">
          <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" id="checkboxesStyle" v-model="checkboxesStyle">
            <label class="form-check-label" for="checkboxesStyle">"Checkboxes" style</label>
          </div>
        </div>
        <div class="form-group">
          <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" id="closeOnSelect" v-model="closeOnSelect">
            <label class="form-check-label" for="closeOnSelect">Close on select</label>
          </div>
        </div>
        <div class="form-group">
          <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" id="pagination" v-model="pagination">
            <label class="form-check-label" for="pagination">Pagination</label>
          </div>
        </div>
        <div class="form-group" v-if="pagination">
          <label for="pageSize">Page size</label>
          <input type="number" class="form-control d-inline ml-2" id="pageSize" v-model="pageSize" style="max-width: 80px;">
        </div>
        <p><span class="badge badge-secondary">multiple only</span></p>
        <div class="form-group">
          <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" id="displaySelectedOptionsFirst" v-model="displaySelectedOptionsFirst">
            <label class="form-check-label" for="displaySelectedOptionsFirst">Display selected options first</label>
          </div>
        </div>
        <div class="form-group">
          <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" id="selectAllOption" v-model="selectAllOption">
            <label class="form-check-label" for="selectAllOption">"Select all" option</label>
          </div>
        </div>
        <div class="form-group">
          <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" id="clearButton" v-model="clearButton">
            <label class="form-check-label" for="clearButton">Clear button</label>
          </div>
        </div>
        <div class="form-group">
          <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" id="displayTags" v-model="displayTags">
            <label class="form-check-label" for="displayTags">Display tags</label>
          </div>
        </div>
      </div>

      <div class="col-12 col-md-9">
        <!-- Single -->
        <h4>Single</h4>

        <div class="form-group row">
          <label class="col-12">Favorite pokémon</label>
          <div class="col-12 col-md-6">
            <vue-select
              v-model="value"
              :options="options"
              :always-open="alwaysOpen"
              :multiple="false"
              :searchable="searchable"
              search-field="name"
              :checkboxes-style="checkboxesStyle"
              :close-on-select="closeOnSelect"
              :pagination="pagination"
              :page-size="parseInt(pageSize)">
              <template v-slot:option="{ option }">
                <img :src="option.iconUrl" class="pokemon-icon">
                {{ option.name }}
              </template>
            </vue-select>
          </div>
        </div>

        <div class="form-group">
          <samp>v-model</samp>
          <div>
            <code>{{ JSON.stringify(value) }}</code>
          </div>
        </div>

        <hr>

        <!-- Multiple -->
        <h4>Multiple</h4>

        <div class="form-group row">
          <label class="col-12">Pokémon team</label>
          <div class="col-12 col-md-6">
            <vue-select
              v-model="valueMultiple"
              :options="options"
              :always-open="alwaysOpen"
              :multiple="true"
              :searchable="searchable"
              search-field="name"
              :checkboxes-style="checkboxesStyle"
              :close-on-select="closeOnSelect"
              :pagination="pagination"
              :page-size="parseInt(pageSize)"
              :displaySelectedOptionsFirst="displaySelectedOptionsFirst"
              :select-all-option="selectAllOption"
              :clear-button="clearButton"
              :display-tags="displayTags">
              <template v-slot:option="{ option }">
                <img :src="option.iconUrl" class="pokemon-icon">
                {{ option.name }}
              </template>
              <!--<template v-slot:placeholder="{ selectedOption }">
                <template v-if="!selectedOption">
                  Select an option pliz
                </template>
                <template v-else>
                  Selected: {{ selectedOption.name }}
                </template>
              </template>-->
            </vue-select>
          </div>
        </div>

        <div class="form-group">
          <samp>v-model</samp>
          <div>
            <code>{{ JSON.stringify(valueMultiple) }}</code>
          </div>
        </div>

        <hr>

        <!-- Async -->
        <h4>Async</h4>

        <div class="form-group row">
          <label class="col-12">Pokémon team</label>
          <div class="col-12 col-md-6">
            <vue-select
              v-model="asyncValue"
              :options="asyncOptions"
              async
              :options-loading="asyncOptionsLoading"
              @search="loadOptionsDebounced"
              :always-open="alwaysOpen"
              :multiple="true"
              :searchable="searchable"
              search-field="name"
              :checkboxes-style="checkboxesStyle"
              :close-on-select="closeOnSelect"
              :pagination="pagination"
              :page-size="parseInt(pageSize)"
              :displaySelectedOptionsFirst="displaySelectedOptionsFirst"
              :select-all-option="selectAllOption"
              :clear-button="clearButton"
              :display-tags="displayTags">
              <template v-slot:option="{ option }">
                <img :src="option.iconUrl" class="pokemon-icon">
                {{ option.name }}
              </template>
            </vue-select>
          </div>
        </div>

        <div class="form-group">
          <samp>v-model</samp>
          <div>
            <code>{{ JSON.stringify(asyncValue) }}</code>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import debounce from 'lodash-es/debounce'

export default {
  name: 'Demo',
  data: function() {
    const options = Object.freeze([
      { value: 1, name: 'Bulbasaur', iconUrl: 'https://www.serebii.net/pokedex-xy/icon/001.png' },
      { value: 2, name: 'Ivysaur', iconUrl: 'https://www.serebii.net/pokedex-xy/icon/002.png' },
      { value: 3, name: 'Venusaur', iconUrl: 'https://www.serebii.net/pokedex-xy/icon/003.png' },
      { value: 4, name: 'Charmander', iconUrl: 'https://www.serebii.net/pokedex-xy/icon/004.png' },
      { value: 5, name: 'Charmeleon', iconUrl: 'https://www.serebii.net/pokedex-xy/icon/005.png' },
      { value: 6, name: 'Charizard', iconUrl: 'https://www.serebii.net/pokedex-xy/icon/006.png' },
      { value: 7, name: 'Squirtle', iconUrl: 'https://www.serebii.net/pokedex-xy/icon/007.png' },
      { value: 8, name: 'Wartortle', iconUrl: 'https://www.serebii.net/pokedex-xy/icon/008.png' },
      { value: 9, name: 'Blastoise', iconUrl: 'https://www.serebii.net/pokedex-xy/icon/009.png' },
      { value: 10, name: 'Caterpie', iconUrl: 'https://www.serebii.net/pokedex-xy/icon/010.png' },
      { value: 11, name: 'Metapod', iconUrl: 'https://www.serebii.net/pokedex-xy/icon/011.png' },
      { value: 12, name: 'Butterfree', iconUrl: 'https://www.serebii.net/pokedex-xy/icon/012.png' },
      { value: 13, name: 'Weedle', iconUrl: 'https://www.serebii.net/pokedex-xy/icon/013.png' },
      { value: 14, name: 'Kakuna', iconUrl: 'https://www.serebii.net/pokedex-xy/icon/014.png' },
      { value: 15, name: 'Beedrill', iconUrl: 'https://www.serebii.net/pokedex-xy/icon/015.png' }
    ])

    return {
      options,
      value: options[0],
      valueMultiple: [options[0], options[3], options[6]],
      asyncOptions: [],
      asyncOptionsLoading: false,
      asyncValue: [options[0], options[3], options[6]],
      alwaysOpen: false,
      searchable: true,
      checkboxesStyle: false,
      selectAllOption: true,
      closeOnSelect: false,
      clearButton: false,
      displayTags: false,
      pagination: false,
      pageSize: 10,
      displaySelectedOptionsFirst: false
    }
  },
  methods: {
    loadOptions: async function(query) {
      this.asyncOptionsLoading = true
      await new Promise(r => setTimeout(r, 500))
      this.asyncOptions = !query ? this.options : this.options.filter(option => option.name.toLowerCase().indexOf(query.toLowerCase()) !== -1)
      this.asyncOptionsLoading = false
    },
    loadOptionsDebounced: debounce(function(query) {
      this.loadOptions(query)
    }, 250)
  }
}
</script>

<style lang="scss">
// Tailwind.css style grid
.grid {
  display: grid;
}

.grid-cols-4 {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.gap-6 {
  gap: 1.5rem;
}

.col-span-3 {
  grid-column: span 3 / span 3;
}

// Pokemon icon
.pokemon-icon {
  margin: -14px -2px -10px -6px;
  width: 40px;
  height: 40px;
}
</style>