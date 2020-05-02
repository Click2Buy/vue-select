<template>
  <div class="vue-select position-relative">
    <!-- Bordered element -->
    <div class="root-form-control form-control noselect" tabindex="0" @click="toggleShowDropdown">
      <div class="d-flex align-items-center justify-content-between flex-nowrap mt-n2 ml-n2">
        <!-- Left content -->
        <div class="mt-2 ml-2 text-nowrap text-truncate">
          <!-- Single -->
          <template v-if="single">
            <slot name="placeholder" :selected-option="selectedOption">
              <template v-if="value === null">
                Select a value...
              </template>
              <template v-else>
                <slot name="option" :option="optionsMap.get(value)">
                  {{ selectedOption.label }}
                </slot>
              </template>
            </slot>
          </template>
          <!-- Multiple -->
          <template v-else>
            <template v-if="!displayTags">
              {{ values.length }} option(s) selected
            </template>
            <template v-else>
              <template v-if="selectedOptions.length === 0">
                No option selected
              </template>
              <div v-else class="d-flex flex-wrap mt-n1 ml-n1">
                <div
                  class="btn-group mt-1 ml-1"
                  v-for="option in selectedOptions"
                  :key="option.value"
                  @click.prevent>
                  <div class="btn btn-xs btn-primary">
                    <slot name="option" :option="option">
                      {{ option.label }}
                    </slot>
                  </div>
                  <div class="btn btn-xs btn-primary" @click.stop="unselectValue(option.value)">
                    &times;
                  </div>
                </div>
              </div>
            </template>
          </template>
        </div>

        <!-- Right caret -->
        <div class="mt-2 ml-2 dropdown-toggle"></div>
      </div>
    </div>

    <!-- Dropdown -->
    <div class="dropdown-menu show w-100" v-show="showDropdown || alwaysOpen">
      <!-- Filter -->
      <template v-if="filterable">
        <div class="px-3 py-2">
          <input
            v-if="filterable"
            type="search"
            v-model="query"
            class="form-control"
            placeholder="Filter...">
        </div>
        <div class="dropdown-divider"></div>
      </template>

      <!-- Select all option -->
      <template v-if="multiple && selectAllOption">
      <div class="dropdown-items">
        <div class="dropdown-item noselect" @click="selectAllClick">
          <div class="custom-control custom-checkbox">
            <input type="checkbox" class="custom-control-input" :checked="allSelected" v-indeterminate="!noneSelected && !allSelected">
            <label class="custom-control-label">
              <template v-if="noneSelected">Select all</template>
              <template v-else-if="allSelected">All {{ values.length }} selected</template>
              <template v-else>{{ values.length }} of {{ filteredOptions.length }} selected</template>
            </label>
          </div>
        </div>
        </div>
        <div class="dropdown-divider"></div>
      </template>

      <!-- Options -->
      <div class="dropdown-items">
        <div
          v-for="option in displayedOptions"
          :key="option.value"
          @click="toggleValue(option.value)"
          class="dropdown-item noselect"
          :class="{ active: isSelected(option.value) && !checkboxesStyle }"
          >
          <template v-if="checkboxesStyle">
            <div class="custom-control custom-checkbox">
              <input type="checkbox" class="custom-control-input" :checked="isSelected(option.value)">
              <label class="custom-control-label">
                <slot name="option" :option="option">
                  {{ option.label }}
                </slot>
              </label>
            </div>
          </template>
          <template v-else>
            <slot name="option" :option="option">
              {{ option.label }}
            </slot>
          </template>
        </div>
        <!-- Text after options -->
        <div
          v-if="pagination && filteredOptions.length > page * pageSize"
          class="dropdown-item noselect"
          @click.stop="page++">
          <div class="mt-n2 ml-n2 d-flex align-items-center justify-content-between flex-wrap">
            <div class="mt-2 ml-2">Show next {{ nextPageSize }} options...</div>
            <!--<div class="mt-2 ml-2">{{ filteredOptions.length - page * pageSize }} option(s) hidden</div>-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import clickOutMixin from 'bootstrap-vue/src/mixins/click-out'

export default {
  name: 'vue-select',
  mixins: [clickOutMixin], // 🙏
  directives: {
    // Directive to put html checkbox in indeterminate state
    indeterminate: function(el, binding) {
      el.indeterminate = Boolean(binding.value)
    }
  },
  props: {
    value: {
      required: true
    },
    options: {
      type: Array,
      required: true
    },
    alwaysOpen: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    pagination: {
      type: Boolean,
      default: false
    },
    pageSize: {
      type: Number,
      default: 20
    },
    filterable: {
      type: Boolean,
      default: false
    },
    filterField: {
      type: String,
      default: 'label'
    },
    checkboxesStyle: {
      type: Boolean,
      default: false
    },
    closeOnSelect: {
      type: Boolean,
      default: false
    },
    displaySelectedOptionsFirst: {
      type: Boolean,
      default: false
    },
    selectAllOption: {
      type: Boolean,
      default: false
    },
    displayTags: {
      type: Boolean,
      default: false
    }
  },
  data: function() {
    return {
      showDropdown: false,
      query: '',
      page: 1
    }
  },
  computed: {
    // Keeping the syntax clean
    values: function() {
      return this.value
    },
    single: function() {
      return !this.multiple
    },
    // Ordered options (put selected options first if prop)
    orderedOptions: function() {
      if (!this.multiple || !this.displaySelectedOptionsFirst) {
        return this.options
      } else {
        // Put selected options first
        return this.selectedOptions.concat(this.options.filter(option => !this.values.includes(option.value)))
      }
    },
    // Filtered options
    filteredOptions: function() {
      return this.filterable ?
        this.orderedOptions.filter(option => option[this.filterField].toLowerCase().indexOf(this.query.toLowerCase()) !== -1) :
        this.orderedOptions
    },
    // Options to display (ordered + filtered + limited)
    displayedOptions: function() {
      return !this.pagination ?
        this.filteredOptions :
        this.filteredOptions.slice(0, this.page * this.pageSize)
    },
    // Check if all options/none are selected
    allSelected: function() {
      return this.values.length === this.filteredOptions.length
    },
    noneSelected: function() {
      return this.values.length === 0
    },
    // Map to get option from value
    optionsMap: function() {
      const optionsMap = new Map()

      this.options.forEach(option => {
        optionsMap.set(option.value, option)
      })

      return optionsMap
    },
    // Selected options from values
    selectedOption: function() {
      return this.single ? this.optionsMap.get(this.value) : null
    },
    selectedOptions: function() {
      return this.multiple ? this.values.map(value => this.optionsMap.get(value)) : null
    },
    // Next page size
    nextPageSize: function() {
      return Math.min(this.filteredOptions.length - this.page * this.pageSize, this.pageSize)
    }
  },
  methods: {
    // Toggle dropdown
    toggleShowDropdown: function() {
      this.showDropdown = !this.showDropdown
      this.listenForClickOut = this.showDropdown
    },
    // Click out
    clickOutHandler(evt) {
      this.toggleShowDropdown()
    },
    // Check if an option is selected
    isSelected: function(value) {
      return this.single ?
        this.value === value :
        this.values.includes(value)
    },
    // Toggle selected status of an option
    toggleValue: function(value) {
      if (this.isSelected(value)) {
        this.unselectValue(value)
      } else {
        this.selectValue(value)
        if (this.closeOnSelect) {
          this.toggleShowDropdown()
        }
      }
    },
    // Select an option
    selectValue: function(value) {
      if (this.single) {
        this.$emit('input', value)
      } else {
        const values = [...this.values]
        values.push(value)
        this.$emit('input', values)
      }
    },
    // Unselect an option
    unselectValue: function(value) {
      if (this.single) {
        this.$emit('input', null)
      } else {
        const values = [...this.values]
        const index = this.values.indexOf(value)
        if (index !== -1) {
          values.splice(index, 1)
        }
        this.$emit('input', values)
      }
    },
    // Click on "select all" option
    selectAllClick: function() {
      this.allSelected ? this.unselectAll() : this.selectAll()
    },
    // Select all options
    selectAll: function() {
      const newValues = this.filteredOptions
        .filter(option => !this.values.includes(option.value))
        .map(option => option.value)
      this.$emit('input', this.values.concat(newValues))
    },
    // Unselect all options
    unselectAll: function() {
      const filteredValues = this.filteredOptions.map(option => option.value)
      this.$emit('input', this.values.filter(value => !filteredValues.includes(value)))
    }
  }
}
</script>

<style lang="scss">
.vue-select {
  .root-form-control {
    height: auto;

    .btn-xs {
      padding: 0.125rem 0.375rem;
      font-size: 0.875rem;
      line-height: 18px;
    }
  }

  .dropdown-menu {
    padding: 0;
  }

  .dropdown-divider {
    margin: 0;
  }

  .dropdown-items {
    max-height: 200px;
    overflow: auto;
    padding: 0.5rem 0;
  }

  .noselect {
    user-select: none;
  }
}
</style>
