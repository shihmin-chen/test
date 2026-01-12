<template>
  <h3>Simple Tooltip</h3>
  <dl class="xd-desc">
    <h4>x-aria-tooltip</h4>
    <div class="x-flex-center">
      <XIconButton class="x-aria-tooltip" aria-label="Hello Tooltip">
        <img src="@xui-assets/icon/eye-show.svg" alt="" />
      </XIconButton>

      <XTag
        theme="green"
        class="x-aria-tooltip x-aria-tooltip--bottom"
        aria-label="Why are we still here, just to suffer."
      >
        Benedict "Kazuhira" Miller
      </XTag>

      <XTag
        theme="red"
        class="x-aria-tooltip x-aria-tooltip--right"
        aria-label="Why are we still here, just to suffer."
      >
        right hand side
      </XTag>
    </div>

    <h4>When to use</h4>
    <p>
      If including a full tippy.js tooltip solution for a simple title seems to
      be overkill, and interactive with overflow is not the concern. CSS based
      tooltip will be the best choice.
    </p>

    <h4>Position Override Classes</h4>
    <dt>x-aria-tooltip--bottom</dt>
    <dd>Bottom placement</dd>
    <dt>x-aria-tooltip--right</dt>
    <dd>RHS placement</dd>

    <h4>Attribute</h4>
    <dt><PrismCode lang="ts"> aria-label:string </PrismCode>(Required)</dt>
    <dd>Tooltip will use this attr for content</dd>
    <dt><PrismCode lang="ts"> disabled:boolean </PrismCode></dt>
    <dd>
      Disabled state will be honored. No tooltip will be shown if disabled state
      is true
    </dd>

    <h4>Interaction</h4>
    <dt>hover, focus-visible</dt>
    <dd>Show tooltip on top of the button</dd>

    <h4>Element Style Requirement</h4>
    <dt><PrismCode lang="css"> position: relative </PrismCode> (included)</dt>
    <dd>tooltip position is calculate by it's parent position.</dd>
    <dt><PrismCode lang="css"> overflow: visible </PrismCode> (included)</dt>
    <dd>tooltip is part of the element, overflow must need to be visible</dd>
    <dt><PrismCode lang="css"> ::before, ::after </PrismCode></dt>
    <dd>
      Both of these pseudo element is used by tooltip. You might overwrite some
      of the attribute for customization.
    </dd>

    <h4>CSS Variable</h4>
    <dt><PrismCode lang="css"> --x-atp-bg: #131414 </PrismCode></dt>
    <dd>background color</dd>
    <dt><PrismCode lang="css">--x-atp-color: white</PrismCode></dt>
    <dd>text color</dd>
    <dt><PrismCode lang="css">--x-atp-p: 6px 12px</PrismCode></dt>
    <dd>padding</dd>
    <dt><PrismCode lang="css">--x-atp-bs: 0px 4px 8px 2px #0001</PrismCode></dt>
    <dd>box-shadow (tip not included)</dd>
    <dt><PrismCode lang="css">--x-atp-w: max-content</PrismCode></dt>
    <dd>width</dd>
    <dt><PrismCode lang="css">--x-atp-z-index: 50000</PrismCode></dt>
    <dd>z-index</dd>

    <h4>Limitation</h4>
    <dt>Overflow</dt>
    <dd>
      This tooltip is implement by css only for performance issue. It does not
      consider any overflow clipping issue. You might also need to elevate the
      z-index for occlusion issue.
    </dd>
    <dt>Interaction in tooltip</dt>
    <dd>
      Not doable since they are pseudo element, hover does not count on them
    </dd>
  </dl>
</template>

<script lang="ts" setup>
import XIconButton from '../../components/XIconButton/XIconButton.vue';
import XTag from '../../components/XTag/XTag.vue';
</script>
