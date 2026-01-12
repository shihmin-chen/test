<template>
  <div class="header">
    <a class="xd-a header-link" href="./" title="xHIS UI">
      <img
        src="@xui-assets/favicon.ico"
        alt="favicon"
        height="24"
        style="margin-right: 0.5rem"
      />
      <h1>xHIS UI</h1>
    </a>
    <div class="x-flex-center">
      <span class="version">version: {{ version }}</span>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
const version = __XUI_VERSION__;
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.5rem;
  background-color: #efeef2;
  z-index: 1;

  &-link {
    display: inline-flex;
    align-items: center;
    appearance: none;
    text-decoration: none;
    > h1 {
      margin: 0;
      text-align: left;
      color: #262626;
      font-size: 1rem;
      font-weight: 600;
      letter-spacing: 0.1em;
    }

    &:hover,
    &:active {
      background-color: #2221;
    }
  }
}

.version {
  font-size: small;
  color: #2226;
}
</style>
