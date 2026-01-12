<template>
  <div>
    <XButton class="demo-btn" @click="showDialogue">Show Dialogue 1</XButton>
    <XButton class="demo-btn" @click="showDialogue2">Show Dialogue 2</XButton>
    <XButton class="demo-btn" @click="showDialogue3">
      Show Dialogue 1 and 3 with same id, only dialogue 1 will be shown
    </XButton>
    <XButton class="demo-btn" @click="showDialogue4"
      >Show Dialogue 4, top: '5%', left: '50%', mask: false
    </XButton>
    <dl class="xd-desc">
      <h4>Install</h4>
      <PrismCode block>{{ installCode }}</PrismCode>
      <h4>Prop</h4>
      <dt>id: string (default: '')</dt>
      <dd>The identity of modal which being able to launch from emitter.</dd>
      <dd>
        If id is provided, only one of the dialogues with same id will be shown
        at the same time.
      </dd>
      <dd>the <b>'show'</b> property should by bind using <b>'v-model'</b></dd>
      <dt>appendTo: string (default: 'body')</dt>
      <dd>The html element that XDialogue append to.</dd>
      <dt>show: boolean (default: false)</dt>
      <dd>The controller to show/hide XDialogue.</dd>
      <dt>height: number (default: 300)</dt>
      <dd>The height of XDialogue.</dd>
      <dt>width: number (default: 500)</dt>
      <dd>The width of XDialogue.</dd>
      <dt>top: string (default: `calc(50vh - ${props.height / 2}px)`)</dt>
      <dd>The top position of XDialogue.</dd>
      <dt>left: string (default: `calc(50vw - ${props.width / 2}px)`</dt>
      <dd>The left position of XDialogue.</dd>
      <dt>transition: string (default: '', it means no transition)</dt>
      <dd>
        The transition CSS property is a shorthand property for
        transition-property, transition-duration, transition-timing-function,
        and transition-delay.
      </dd>
      <dt>mask: boolean (default: true)</dt>
      <dd>Whether to mask background.</dd>
      <dt>closeOnBackdrop: boolean (default: false)</dt>
      <dd>Whether the dialogue can be closed by clicking the backdrop.</dd>
      <dd>
        When setting this property to <b>'true'</b>, the <b>'show'</b> property
        should by bind using <b>'v-model'</b>.
      </dd>
    </dl>

    <XDialogue id="single-dialogue" v-model:show="show">
      <div class="dialogue-container">
        First dialogue with id 'single-dialogue'
        <XButton class="x-button" @click="closeDialogue"
          >Close Dialogue</XButton
        >
      </div>
    </XDialogue>

    <XDialogue id="single-dialogue" v-model:show="show3">
      <div class="dialogue-container">
        Second dialogue with id 'single-dialogue'
        <XButton class="x-button" @click="closeDialogue3"
          >Close Dialogue</XButton
        >
      </div>
    </XDialogue>

    <XDialogue
      id="single-dialogue"
      v-model:show="show2"
      :close-on-backdrop="true"
    >
      <div class="dialogue-container">
        <XButton class="x-button" @click="closeDialogue2"
          >Close Dialogue</XButton
        >
        <p>You can also close this dialogue by clicking the backdrop.</p>
      </div>
    </XDialogue>

    <XDialogue
      id="single-dialogue"
      v-model:show="show4"
      top="5%"
      left="50%"
      :mask="false"
    >
      <div class="dialogue-container">
        top: '5%', left: '50%', mask: false
        <XButton class="x-button" @click="closeDialogue4"
          >Close Dialogue</XButton
        >
      </div>
    </XDialogue>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import XButton from '../XButton/XButton.vue';
import XDialogue from './XDialogue.vue';
import { DialoguePlugin } from './DialoguePlugin';
DialoguePlugin.install();

export default defineComponent({
  name: 'XDialogueDemo',
  tabName: 'XDialogue',
  components: { XDialogue, XButton },

  setup() {
    const installCode = `import { DialoguePlugin } from '@asus-aics/xui';\n\nconst app = createApp(App);\napp.use(DialoguePlugin);\napp.mount('#app');`;

    const show = ref(false);
    const showDialogue = () => {
      show.value = true;
    };
    const closeDialogue = () => {
      show.value = false;
    };

    const show2 = ref(false);
    const showDialogue2 = () => {
      show2.value = true;
    };
    const closeDialogue2 = () => {
      show2.value = false;
    };

    const show3 = ref(false);
    const showDialogue3 = () => {
      show.value = true;
      show3.value = true;
    };
    const closeDialogue3 = () => {
      show3.value = false;
    };

    const show4 = ref(false);
    const showDialogue4 = () => {
      show4.value = true;
    };
    const closeDialogue4 = () => {
      show4.value = false;
    };

    return {
      show,
      showDialogue,
      closeDialogue,
      show2,
      showDialogue2,
      closeDialogue2,
      show3,
      showDialogue3,
      closeDialogue3,
      show4,
      showDialogue4,
      closeDialogue4,
      installCode,
    };
  },
});
</script>

<style scoped>
.demo-btn {
  margin: 1rem;
}
.dialogue-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 120px 0;
}
</style>
