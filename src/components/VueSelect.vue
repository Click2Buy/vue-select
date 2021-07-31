<template>
  <div class="vue-select position-relative">
    <!-- Bordered element -->
    <div class="root-form-control form-control noselect" tabindex="0" @click="toggleShowDropdown">
      <div class="d-flex align-items-center justify-content-between flex-nowrap mt-n2 ml-n2">
        <!-- Left content -->
        <div class="flex-fill mt-2 ml-2 text-nowrap text-truncate">
          <!-- Single -->
          <template v-if="single">
            <slot name="placeholder" :selected-option="value">
              <template v-if="value === null">
                Select a value...
              </template>
              <template v-else>
                <slot name="option" :option="value">
                  {{ value.label }}
                </slot>
              </template>
            </slot>
          </template>
          <!-- Multiple -->
          <template v-else>
            <template v-if="!displayTags">
              <slot name="values" :values="values" :reset="unselectAll">
                <div class="d-flex align-items-center justify-content-between mt-n2 ml-n2">
                  <div class="text-nowrap text-truncate mt-2 ml-2">
                    {{ values.length }} option(s) selected
                  </div>
                  <a href="#" class="text-secondary mt-2 ml-2" @click.prevent="unselectAll" v-if="clearButton && values.length > 0">
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-times-circle fa-w-16"><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z" class=""></path></svg>
                  </a>
                </div>
              </slot>
            </template>
            <template v-else>
              <template v-if="values.length === 0">
                No option selected
              </template>
              <div v-else class="d-flex flex-wrap mt-n1 ml-n1">
                <div
                  class="btn-group mt-1 ml-1"
                  v-for="option in values"
                  :key="option[optionKey]"
                  @click.prevent>
                  <div class="btn btn-xs btn-primary">
                    <slot name="option" :option="option">
                      {{ option.label }}
                    </slot>
                  </div>
                  <div class="btn btn-xs btn-primary" @click.stop="unselectOption(option)">
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
            @input="onInput"
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
          v-for="{ option, selected } in displayedOptionsWithSelected"
          :key="option[optionKey]"
          @click="toggleOption({ option, selected })"
          class="dropdown-item noselect"
          :class="{ active: selected && !checkboxesStyle }"
          >
          <template v-if="checkboxesStyle">
            <div class="custom-control custom-checkbox">
              <input type="checkbox" class="custom-control-input" :checked="selected">
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
import { clickOutMixin } from 'bootstrap-vue/src/mixins/click-out'

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
    // v-model
    value: {
      required: true
    },
    // List of options (non-async usage)
    options: {
      type: Array,
      required: true,
      default: []
    },
    // Option key - should return a unique value when accessed on each option
    optionKey: {
      type: String,
      default: 'value'
    },
    // Async function to load options (WIP)
    loadOptions: {
      type: Function
    },
    // Features
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
    clearButton: {
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
      page: 1,
      internalOptions: this.options,
      optionsLoading: false
    }
  },
  computed: {
    // Aliases to keep the syntax clean
    values: function() {
      return this.value
    },
    single: function() {
      return !this.multiple
    },
    // Ordered options (put selected options first if prop)
    orderedOptions: function() {
      if (this.single || !this.displaySelectedOptionsFirst) {
        return this.internalOptions
      } else {
        // Put selected options first
        const remainingOptions = this.internalOptions.filter(option => !this.values.map(option => option[this.optionKey]).includes(option[this.optionKey]))
        return this.values.concat(remainingOptions)
      }
    },
    // Filtered options
    filteredOptions: function() {
      return this.filterable ?
        this.orderedOptions.filter(option => option[this.filterField].toLowerCase().indexOf(this.query.toLowerCase()) !== -1) :
        this.orderedOptions
    },
    // Options to display (ordered + filtered + paginated)
    displayedOptions: function() {
      return !this.pagination ?
        this.filteredOptions :
        this.filteredOptions.slice(0, this.page * this.pageSize)
    },
    // Options to display with selected boolean
    displayedOptionsWithSelected: function() {
      return this.displayedOptions.map(option => ({
        option,
        selected: this.single ?
          this.value[this.optionKey] === option[this.optionKey] :
          this.values.map(option => option[this.optionKey]).includes(option[this.optionKey])
      }))
    },
    // Check if all options/none are selected
    allSelected: function() {
      return this.values.length === this.filteredOptions.length
    },
    noneSelected: function() {
      return this.values.length === 0
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
    clickOutHandler: function() {
      this.toggleShowDropdown()
    },
    // Toggle selected status of an option
    toggleOption: function({ option, selected }) {
      if (selected) {
        this.unselectOption(option)
      } else {
        this.selectOption(option)
        if (this.closeOnSelect) {
          this.toggleShowDropdown()
        }
      }
    },
    // Select an option
    selectOption: function(option) {
      if (this.single) {
        this.$emit('input', option)
      } else {
        this.$emit('input', this.values.concat(option))
      }
    },
    // Unselect an option
    unselectOption: function(option) {
      if (this.single) {
        this.$emit('input', null)
      } else {
        const index = this.values.map(option => option[this.optionKey]).indexOf(option[this.optionKey])
        if (index !== -1) {
          let options = this.values.slice()
          options.splice(index, 1)
          this.$emit('input', options)
        }
      }
    },
    // Click on "select all" option
    selectAllClick: function() {
      this.allSelected ? this.unselectAll() : this.selectAll()
    },
    // Select all options
    selectAll: function() {
      const newOptions = this.filteredOptions.filter(option => !this.values.includes(option))
      this.$emit('input', this.values.concat(newOptions))
    },
    // Unselect all options
    unselectAll: function() {
      const options = this.values.filter(option => !this.filteredOptions.includes(option))
      this.$emit('input', options)
    },
    // Filter input
    onInput: function(inputValue) {
      /* TODO: debounce
      if (this.debounce) {
        clearTimeout(this.timeoutInstance)
        this.timeoutInstance = setTimeout(this.research, this.debounce)
      } else {
        this.research()
      }*/

      //this.updateOptions(this.query)
    },
    // Update options using loadOptions prop
    async updateOptions(query) {
      this.optionsLoading = true
      const options = await this.loadOptions(query)
      this.optionsLoading = false
      this.internalOptions = options
    }
  }
  // TODO: watch options prop to update internalOptions
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
