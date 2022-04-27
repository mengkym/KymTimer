<template>
  <div class="Drawer-menu">
    <div
      class="Drawer-menu-wrapper"
      title="Timer Configuration"
      @click="setDrawerComponent('appDrawerTimer')"
      :class="{ 'is-active': currentDrawer === 'appDrawerTimer' }"
    >
      <div class="Drawer-menu-button">
        <div class="Icon-wrapper">
          <svg
            version="1.2"
            baseProfile="tiny"
            id="timer-icon"
            class="Icon"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 20 20"
            width="18"
            xml:space="preserve"
          >
            <g>
              <path
                fill="var(--color-background-lightest)"
                d="M10,0C4.5,0,0,4.5,0,10s4.5,10,10,10c5.5,0,10-4.5,10-10S15.5,0,10,0z M10,18c-4.4,0-8-3.6-8-8s3.6-8,8-8
                s8,3.6,8,8S14.4,18,10,18z"
              />
              <path
                fill="var(--color-background-lightest)"
                d="M10.5,5H9v6l5.3,3.1l0.8-1.2l-4.5-2.7V5z"
              />
            </g>
          </svg>
        </div>
      </div>
    </div>
    <div
      class="Drawer-menu-wrapper"
      title="Options"
      @click="setDrawerComponent('appDrawerSettings')"
      :class="{ 'is-active': currentDrawer === 'appDrawerSettings' }"
    >
      <div class="Drawer-menu-button">
        <svg
          version="1.2"
          baseProfile="tiny"
          id="settings-icon"
          class="Icon"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 19.5 20"
          width="18"
          xml:space="preserve"
        >
          <path
            fill="var(--color-background-lightest)"
            d="M17.2,11c0-0.3,0.1-0.6,0.1-1s0-0.7-0.1-1l2.1-1.6c0.2-0.1,0.2-0.4,0.1-0.6l-2-3.5C17.3,3.1,17,3,16.8,3.1
            l-2.5,1c-0.5-0.4-1.1-0.7-1.7-1l-0.4-2.7C12.2,0.2,12,0,11.7,0h-4C7.5,0,7.3,0.2,7.2,0.4L6.9,3.1c-0.6,0.3-1.2,0.6-1.7,1l-2.5-1
            C2.4,3,2.2,3.1,2.1,3.3l-2,3.5C-0.1,6.9,0,7.2,0.2,7.4L2.3,9c0,0.3-0.1,0.6-0.1,1s0,0.7,0.1,1l-2.1,1.6C0,12.8-0.1,13,0.1,13.3
            l2,3.5c0.1,0.2,0.4,0.3,0.6,0.2l2.5-1c0.5,0.4,1.1,0.7,1.7,1l0.4,2.6c0,0.2,0.2,0.4,0.5,0.4h4c0.3,0,0.5-0.2,0.5-0.4l0.4-2.6
            c0.6-0.3,1.2-0.6,1.7-1l2.5,1c0.2,0.1,0.5,0,0.6-0.2l2-3.5c0.1-0.2,0.1-0.5-0.1-0.6L17.2,11z M9.7,13.5c-1.9,0-3.5-1.6-3.5-3.5
            s1.6-3.5,3.5-3.5s3.5,1.6,3.5,3.5S11.7,13.5,9.7,13.5z"
          />
        </svg>
      </div>
    </div>
    <div
      class="Drawer-menu-wrapper"
      title="Themes"
      @click="setDrawerComponent('appDrawerTheme')"
      :class="{ 'is-active': currentDrawer === 'appDrawerTheme' }"
    >
      <div class="Drawer-menu-button">
        <div class="Icon-wrapper">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 0 24 24"
            width="24"
            id="theme-icon"
            class="Icon"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path
              fill="var(--color-background-lightest)"
              d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"
            />
          </svg>
        </div>
      </div>
    </div>
     <div
      class="Drawer-menu-wrapper"
      title="Charts"
      @click="setDrawerComponent('appDrawerChart')"
      :class="{ 'is-active': currentDrawer === 'appDrawerChart' }"
    >
      <div class="Drawer-menu-button">
        <div class="Icon-wrapper">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            id="chart-icon"
            class="Icon"
            width="16"
            height="16"
            viewBox="0 0 1024 1024"
          >
            <path
              fill="var(--color-background-lightest)"
              d="M95.743954 952.636499h914.090232a14.360374 14.360374 0 0 1 14.165326 13.775231v43.812551a14.019041 14.019041 0 0 1-14.140945 13.775231H38.521886a14.238469 14.238469 0 0 1-14.140945-14.140945V38.521886A14.360374 14.360374 0 0 1 38.156172 24.380941h43.812551c7.631234 0 13.775232 6.436568 13.775231 14.140945v914.114613zM163.839922 402.529332c0-20.284943 14.969898-36.79084 35.206078-36.790839h69.071206c19.455991 0 35.206078 16.993516 35.206078 36.81522v438.369315c0.097524 9.801138-3.535236 19.309705-10.215614 26.209511a33.840746 33.840746 0 0 1-24.990464 10.60571H199.070381c-19.382848-0.219428-35.011031-16.505897-35.206078-36.815221V402.529332z m209.212853-269.482538c0-19.6998 14.994279-35.49865 35.206078-35.49865h69.071205a35.596174 35.596174 0 0 1 35.206079 35.49865v709.192805c0.097524 9.508567-3.63276 18.627039-10.215614 25.307416A34.303984 34.303984 0 0 1 477.37882 877.713868h-69.071205c-19.358467 0-35.108555-15.920754-35.206078-35.596174V133.022413z m232.594175 415.378088c0-20.089895 14.945517-36.400745 35.157316-36.400745h69.022444c19.455991 0 35.181698 15.701326 35.181697 36.400745v292.912622c0.097524 9.801138-3.63276 19.1878-10.288757 25.990083A33.621317 33.621317 0 0 1 709.729186 877.713868h-68.998063a33.645698 33.645698 0 0 1-24.89294-10.410662 37.205316 37.205316 0 0 1-10.313138-25.990083V548.400501h0.097524z m209.115329-196.388478c0-19.334086 14.969898-35.059793 35.206078-35.059793h69.071205c19.455991 0 35.206078 16.091421 35.206079 35.059793v490.642052c0 19.334086-14.994279 35.059793-35.206079 35.059793h-69.071205a35.376745 35.376745 0 0 1-35.206078-35.059793V352.012023z"
            />
          </svg>
        </div>
      </div>
    </div>
    <div
      class="Drawer-menu-wrapper"
      title="About"
      @click="setDrawerComponent('appDrawerAbout')"
      :class="{ 'is-active': currentDrawer === 'appDrawerAbout' }"
    >
      <div class="Drawer-menu-button">
        <div class="Icon-wrapper">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            id="about-icon"
            class="Icon"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path fill="none" d="M0 0h24v24H0V0z" />
            <path
              fill="var(--color-background-lightest)"
              d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
            />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Drawer-menu',

  computed: {
    currentDrawer() {
      return this.$store.getters.currentDrawer
    }
  },

  methods: {
    setDrawerComponent(component) {
      const payload = {
        key: 'currentDrawer',
        val: component
      }
      this.$store.dispatch('setViewState', payload)
    }
  }
}
</script>

<style lang="scss" scoped>
.Drawer-menu {
  background-color: var(--color-background);
  display: flex;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 36px;
}

.Drawer-menu-wrapper {
  align-items: center;
  display: flex;
  flex: 1 1 auto;
  justify-content: center;
  position: relative;
  transition: $transitionDefault;
  height: 100%;
  &:hover {
    background-color: var(--color-background-light);
  }
  &::after {
    background-color: var(--color-accent);
    content: '';
    margin: 0 auto;
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    transition: $transitionSnappy;
    width: 0;
    height: 2px;
  }
  &.is-active::after {
    width: 33%;
  }
}

.Drawer-menu-button {
  align-items: center;
  display: flex;
  justify-content: center;
  width: 45px;
  height: 100%;
  &.is-active {
    border-bottom: 4px solid var(--color-accent);
  }
}
</style>
