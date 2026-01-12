<template>
  <NodeViewWrapper
    class="section-node-view-wrapper flex flex-col gap-2"
    :class="{ 'flex-grow': node?.attrs.sectionOption.grow }"
  >
    <div
      v-if="!isFirstSection && !isSingleSection"
      class="m-t-2 h-1px bg-[var(--xv-text--dividing-line)]"
    ></div>
    <div
      v-if="!isSingleSection"
      class="section-node-view-title cursor-pointer hover:bg-[var(--xv-container--surface-hovered)]"
      contenteditable="false"
      @mousedown.prevent="focus()"
    >
      <span class="xv-title--title-sm color-[var(--xv-status--primary)]">{{
        title
      }}</span>
    </div>
    <NodeViewContent
      :name="node?.attrs.name"
      class="xv-paragraph--paragraph-lg section-node-view-content color-[var(--xv-text--high-emphasis-text)]"
    />
    <div
      v-if="isSingleSection && node.childCount <= 1"
      class="xv-paragraph--paragraph-lg section-node-view-placeholder color-[var(--xv-text--placeholder-text)]"
    ></div>
  </NodeViewWrapper>
</template>

<script setup lang="ts">
import { NodeViewContent, NodeViewProps, NodeViewWrapper } from '@tiptap/vue-3';
import { Node as ProseMirrorNode } from 'prosemirror-model';
import { Selection } from 'prosemirror-state';
import { computed } from 'vue';

import { MULTI_SECTION_TEMPLATE_NODES } from '../constants';

// props
const props = defineProps({
  node: {
    type: Object,
    required: true,
  },
}) as NodeViewProps;

// sections
const sectionKeys = computed(() => {
  // WORKAROUND: 目前這樣做，會在每次輸入時也重新計算，比較浪費。應找個方式更好的只監聽 section nodes 的變化。
  const { doc } = props.editor.state;

  // 找到所有 section 節點
  const sectionNodes: ProseMirrorNode[] = [];
  doc.descendants((node: ProseMirrorNode) => {
    if (node.type.name === MULTI_SECTION_TEMPLATE_NODES.SECTION_NODE.NAME) {
      sectionNodes.push(node);
    }
  });

  // 整理成 section keys
  const result = sectionNodes.map((node) => node.attrs.key);
  return result;
});

// title
const title = computed(() => `${props.node.attrs.name}:`);

// border
const isFirstSection = computed(
  () => sectionKeys.value.indexOf(props.node?.attrs.key) === 0,
);

// single section
// TODOITEM: 目前病程紀錄在只有一個 section 的類別時，是不顯示 title 的，目前把這個邏輯插在這邊，之後可能改為讓使用 `XTiptapEditor` 的地方決定使用哪種 template 比較好。
const isSingleSection = computed(() => sectionKeys.value.length === 1);

// focus
const calculateFocusPosition = () => {
  const { doc } = props.editor.state;

  // 將游標位置設置到該 section 的最後位置
  let position: unknown;
  doc.descendants((node, pos) => {
    if (
      node.type.name === MULTI_SECTION_TEMPLATE_NODES.SECTION_NODE.NAME &&
      node.attrs.key === props.node?.attrs.key
    ) {
      const endPos = pos + node.nodeSize - 2; // 計算段落節點內的最後位置 (size 減 1 是為了轉為最後位置的 index，再減 1 是為了設置到 `</p> 標籤之前`)
      const selection = Selection.near(doc.resolve(endPos));
      position = selection?.head;
      // TODOITEM: break?
    }
  });

  return position as number;
};
const focus = () => {
  const position = calculateFocusPosition();
  if (position) {
    props.editor?.commands.focus(position);
  }
};
</script>

<style lang="scss" scoped>
.section-node-view-wrapper {
  &.has-focus .section-node-view-title {
    background-color: var(--xv-primary--50);
  }
}

/**
 * WORKAROUND:
 * 這邊的做法如果能改成在 placeholder extension 那邊的 `emptyEditorClass` config 設置應該比較好，
 * 但那邊的 class 會套到 note view 這層，而由於希望將 placeholder 顯示到和 content 相同位置，所以這邊令塞一個 div 來顯示。
 */
div.is-empty > .section-node-view-placeholder::before {
  margin-top: -38px;
  content: '請輸入'; // attr(data-placeholder)
  float: left;
  height: 0;
  pointer-events: none;
}
</style>
