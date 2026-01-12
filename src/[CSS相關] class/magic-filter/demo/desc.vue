<template>
  <div class="xd-block">
    <a
      class="xd-a"
      href="https://codepen.io/martinridgway/pen/jOqVOgg"
      title="codepen"
    >
      Original Post
    </a>
    <p>
      These icons are background images, all using the same SVG file. They are
      colored using pure CSS.
    </p>
    <div class="grid">
      <div class="grid_item">
        <span>Unfiltered</span>
        <span class="icon_delete"></span>
        <span>#000000</span>
      </div>
      <div class="grid_item">
        <span>to black</span>
        <span class="icon_delete icon_white"></span>
        <span>#ffffff</span>
      </div>
      <div class="grid_item">
        <span>Green</span>
        <span class="icon_delete icon_green"></span>
        <span>#57a40a</span>
      </div>
      <div class="grid_item">
        <span>Blue</span>
        <span class="icon_delete icon_blue"></span>
        <span>#1da2c0</span>
      </div>
      <div class="grid_item">
        <span>Red</span>
        <span class="icon_delete icon_red"></span>
        <span>#ca0000</span>
      </div>
    </div>
    <p>
      <strong>Note:</strong> To preserve the ability to see the icon in browsers
      that are incapable of processing the
      <code class="xd-code">filter</code> CSS property, I have started with a
      pure black icon. As browsers ignore CSS properties they don't understand,
      old versions of IE will simply display the original black icon in all the
      examples below. I've also run the icon through
      <a class="xd-a" href="https://jakearchibald.github.io/svgomg/">SVGOMG</a>
      in order to simplify its source without impacting its display.
    </p>
  </div>
</template>

<style scoped>
.grid_item {
  margin: auto 2rem;
  display: inline-flex;
  flex-direction: column;
  padding: 1rem;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 16px 0 #2223;
  border-radius: 16px;
  gap: 0.5rem;
}
.icon_delete {
  display: inline-block;
  width: 30px;
  height: 30px;
  background: no-repeat 50% 50% url('@xui-assets/icon/eye-hide.svg');
  background-size: cover;
}

.icon_white {
  filter: contrast(0) brightness(0);
}

.icon_green {
  filter: contrast(0) brightness(0) invert(62%) sepia(82%) saturate(4417%)
    hue-rotate(57deg) brightness(98%) contrast(92%);
}

.icon_blue {
  filter: contrast(0) brightness(0) invert(58%) sepia(63%) saturate(551%)
    hue-rotate(144deg) brightness(82%) contrast(93%);
}

.icon_red {
  filter: contrast(0) brightness(0) invert(9%) sepia(73%) saturate(7496%)
    hue-rotate(10deg) brightness(106%) contrast(118%);
}
</style>
