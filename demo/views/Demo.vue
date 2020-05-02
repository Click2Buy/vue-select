<template>
  <div class="py-4">
    <div class="grid grid-cols-10 gap-6">
      <!-- Props -->
      <div class="col-span-2">
        <h4>Properties</h4>
        <div class="form-group">
          <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" id="alwaysOpen" v-model="alwaysOpen">
            <label class="form-check-label" for="alwaysOpen">Always open</label>
          </div>
        </div>
        <div class="form-group">
          <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" id="filterable" v-model="filterable">
            <label class="form-check-label" for="filterable">Filterable</label>
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
            <input class="form-check-input" type="checkbox" id="displayTags" v-model="displayTags">
            <label class="form-check-label" for="displayTags">Display tags</label>
          </div>
        </div>
      </div>

      <!-- Single -->
      <div class="col-span-4">
        <h4>Single</h4>
        <div class="form-group">
          <samp>v-model</samp>
          <div>
            <code>{{ JSON.stringify(value) }}</code>
          </div>
        </div>
        <div class="form-group">
          <label>Favorite pokémon</label>
          <!-- Actual component -->
          <vue-select
            v-model="value"
            :options="options"
            :always-open="alwaysOpen"
            :multiple="false"
            :filterable="filterable"
            filter-field="name"
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

      <!-- Multiple -->
      <div class="col-span-4">
        <h4>Multiple</h4>
        <div class="form-group">
          <samp>v-model</samp>
          <div>
            <code>{{ JSON.stringify(valueMultiple) }}</code>
          </div>
        </div>
        <div class="form-group">
          <label>Pokémon team</label>
          <!-- Actual component -->
          <vue-select
            v-model="valueMultiple"
            :options="options"
            :always-open="alwaysOpen"
            :multiple="true"
            :filterable="filterable"
            filter-field="name"
            :checkboxes-style="checkboxesStyle"
            :close-on-select="closeOnSelect"
            :pagination="pagination"
            :page-size="parseInt(pageSize)"
            :displaySelectedOptionsFirst="displaySelectedOptionsFirst"
            :select-all-option="selectAllOption"
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
    </div>
  </div>
</template>

<script>
export default {
  name: 'Demo',
  data: function() {
    return {
      options: Object.freeze([
        { value: 1, name: 'Bulbasaur', iconUrl: 'https://cdn.bulbagarden.net/upload/e/ec/001MS.png' },
        { value: 2, name: 'Ivysaur', iconUrl: 'https://cdn.bulbagarden.net/upload/6/6b/002MS.png' },
        { value: 3, name: 'Venusaur', iconUrl: 'https://cdn.bulbagarden.net/upload/e/e5/003XYMS.png' },
        { value: 4, name: 'Charmander', iconUrl: 'https://cdn.bulbagarden.net/upload/b/bb/004MS.png' },
        { value: 5, name: 'Charmeleon', iconUrl: 'https://cdn.bulbagarden.net/upload/d/dc/005MS.png' },
        { value: 6, name: 'Charizard', iconUrl: 'https://cdn.bulbagarden.net/upload/6/62/006XYMS.png' },
        { value: 7, name: 'Squirtle', iconUrl: 'https://cdn.bulbagarden.net/upload/9/92/007MS.png' },
        { value: 8, name: 'Wartortle', iconUrl: 'https://cdn.bulbagarden.net/upload/f/f3/008MS.png' },
        { value: 9, name: 'Blastoise', iconUrl: 'https://cdn.bulbagarden.net/upload/5/59/009XYMS.png' },
        { value: 10, name: 'Caterpie', iconUrl: 'https://cdn.bulbagarden.net/upload/6/69/010MS.png' },
        { value: 11, name: 'Metapod', iconUrl: 'https://cdn.bulbagarden.net/upload/c/ce/011MS.png' },
        { value: 12, name: 'Butterfree', iconUrl: 'https://cdn.bulbagarden.net/upload/1/14/012MS.png' }
      ]),
      value: 11,
      valueMultiple: [1, 4, 7],
      alwaysOpen: false,
      filterable: true,
      checkboxesStyle: false,
      selectAllOption: true,
      closeOnSelect: false,
      displayTags: false,
      pagination: false,
      pageSize: 10,
      displaySelectedOptionsFirst: false
    }
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

.grid-cols-10 {
  grid-template-columns: repeat(10, minmax(0, 1fr));
}

.gap-6 {
  gap: 1.5rem;
}

.col-span-2 {
  grid-column: span 2 / span 2;
}

.col-span-3 {
  grid-column: span 3 / span 3;
}

.col-span-4 {
  grid-column: span 4 / span 4;
}

// Pokemon icon
.pokemon-icon {
  margin: -14px -2px -10px -6px;
  width: 40px;
  height: 40px;
}
</style>