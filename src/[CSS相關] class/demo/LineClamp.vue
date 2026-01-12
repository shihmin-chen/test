<template>
  <h3>Line Clamp(Ellipsis)</h3>
  <div class="xd-block">
    <p>
      ellipsis multiple text can be difficult, XUI provide simple class
      implementation to utilize <strong>line-clamp</strong> combination.
    </p>
    <div class="group">
      <div v-for="i in 5" :key="i">
        <code class="xd-code">{{ `x-ellipsis--${i}` }}</code>
        <div class="line-test" :class="`x-ellipsis--${i}`">
          {{ longWorld }}
        </div>
      </div>

      <dl class="xd-desc">
        <h4>Note</h4>
        <ul>
          <li>
            <PrismCode lang="plain">x-ellipsis--1</PrismCode>
            is not webkit-box, but normal ellipsis with no-wrap text.
          </li>
          <li>
            <PrismCode lang="css">display: -webkit-box</PrismCode>
            is set for line clamp to work , so if using on a flex container, you
            need to create another wrapper
          </li>
          <li>
            <PrismCode lang="css"> overflow: hidden </PrismCode>
            is set as well, it shouldn't be any problem
          </li>
        </ul>
      </dl>
    </div>
  </div>
</template>

<script lang="ts" setup>
const longWorld =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque semper malesuada condimentum. Suspendisse blandit quis orci sed porta. Donec vel lacus at orci laoreet dignissim. Vivamus maximus hendrerit sem, a auctor felis iaculis a. Integer id velit elit. In sodales, erat at iaculis scelerisque, ipsum justo accumsan eros, quis vehicula neque lectus ac sapien. Pellentesque eleifend, quam vulputate mattis elementum, dolor lacus euismod tellus, nec sollicitudin felis magna eu ligula. Praesent vitae massa vel leo suscipit maximus. Vivamus mollis rhoncus nunc vel bibendum. Nunc egestas sem eget arcu vulputate egestas. Sed nec tempus lorem. Duis nulla lacus, sollicitudin eget fermentum id, pretium in mauris. Duis pretium diam a nisl finibus, id sagittis leo rutrum. Ut nisl mi, eleifend in mauris nec, feugiat sagittis augue.';
</script>

<style scoped>
.line-test {
  width: 350px;
  border: solid #ccc 1px;
}

.group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
