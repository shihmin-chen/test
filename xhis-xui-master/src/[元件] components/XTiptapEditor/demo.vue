<template>
  <div class="x-tiptap-editor-demo">
    <div class="x-tiptap-editor-container">
      <XTiptapEditor
        ref="editorRef"
        v-model:data="data"
        :section-options="sectionOptions"
        style="height: 100%;"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import XTiptapEditor from './XTiptapEditor.vue';

export default defineComponent({
  name: 'XTiptapEditorDemo',
  components: {
    XTiptapEditor,
  },
  tabName: 'XTiptapEditor',
  setup() {
    const data = ref([
      {
        key: 'subjective',
        text: '',
      },
      {
        key: 'objective',
        text: '',
      },
      {
        key: 'assessment',
        text: '',
      },
      {
        key: 'plan',
        text: '',
      },
    ]);
    const sectionOptions = [
      {
        key: 'subjective',
        name: 'S',
        grow: true,
      },
      {
        key: 'objective',
        name: 'O',
        grow: true,
      },
      {
        key: 'assessment',
        name: 'A',
      },
      {
        key: 'plan',
        name: 'P',
      },
    ];
    const editorRef = ref<InstanceType<typeof XTiptapEditor>>();

    return {
      data,
      sectionOptions,
      editorRef,
    };
  },
});
</script>

<style lang="scss" scoped>
.x-tiptap-editor-demo {
  display: flex;
  flex-direction: column;
}

.x-tiptap-editor-container {
  height: 418px;
}
</style>
