<template>
  <div>
    <div class="chunk-group">
      <div>
        <label>Menu min width:</label>
        <XInputText v-model="baseAttrs.minWidth" />
        <label>Menu max width:</label
        ><XInputText v-model="baseAttrs.maxWidth" />
      </div>
      <div v-for="size in ['md', 'sm']" :key="size" class="chunk">
        <div>
          <PrismCode
            lang="html"
            :code="`<XList size='${size}'> ... </XList>`"
          ></PrismCode>
        </div>
        <XList
          :size="(size as 'md' | 'sm')"
          class="list-container"
          v-bind="baseAttrs"
        >
          <XListItem divider :interactive="false"
            >plain item 不 interactive 啦</XListItem
          >
          <XListItem keyboardActive
            >interactive item: keyboard-active 啦</XListItem
          >
          <XListItem>interactive item 啦</XListItem>
          <XListItem selected>interactive item: selected 啦</XListItem>
          <XListItem>
            <XListItemIcon icon="avatar" />
            icon 加上文字
          </XListItem>
          <XListItem>
            <XListItemIcon icon="calendar" />
            再一個 icon 加上文字
            <XListItemIcon position="back" icon="arrow-right" />
          </XListItem>
          <XListItem disabled>
            <XListItemIcon icon="calendar" />
            Disabled item
            <XListItemIcon position="back" icon="arrow-right" />
          </XListItem>
        </XList>
      </div>
      <div class="chunk">
        <div class="chunk-title">With subheader and divider</div>
        <div class="list-container">
          <XList size="md" subheader="Section 1">
            <XListItem selected>
              <XListItemIcon icon="calendar" />
              A for Apple
            </XListItem>
            <XListItem>
              <XListItemIcon icon="calendar" />
              P for Pikachu
            </XListItem>
          </XList>
          <XDivider />
          <XList size="md" subheader="Section 2">
            <XListItem> C for Cat </XListItem>
            <XListItem> D for Doraemon </XListItem>
          </XList>
        </div>
      </div>
      <div class="chunk">
        <div class="chunk-title">Different way to add text in list item</div>
        <XList class="list-container" v-bind="baseAttrs">
          <XListItem interactive>Directly add in default slot</XListItem>
          <XListItem interactive>
            <XListItemText primary="Use XListItemText" />
          </XListItem>
          <XListItem interactive>
            <XListItemText
              primary="XListItemText"
              secondary="Can have secondary text"
            />
          </XListItem>
        </XList>
      </div>
      <div class="chunk">
        <div class="chunk-title">Different way to set list item size</div>
        <XList size="md" class="list-container" v-bind="baseAttrs">
          <XListItem interactive
            ><XListItemIcon icon="avatar" /> When set size on XList</XListItem
          >
          <XListItem interactive
            ><XListItemIcon icon="avatar" />All list item will be set as
            corresponding size</XListItem
          >
        </XList>
        <XList class="list-container" v-bind="baseAttrs">
          <XListItem size="md" interactive
            >Or you can set size on each components</XListItem
          >
          <XListItem size="sm" interactive>This is sm XListItem</XListItem>
          <XListItem size="md" interactive
            ><XListItemIcon icon="avatar" size="md" /><XListItemText
              size="sm"
              primary="This is md icon with sm text"
          /></XListItem>
        </XList>
      </div>
      <div class="chunk">
        <XList class="list-container">
          <template v-for="i in [...Array(5).keys()]" :key="i">
            <XListItem interactive>
              <XListItemIcon
                icon="add"
                color="var(--xv-status--primary)"
                width="15"
                height="15"
              />
              <XListItemText primary="客製化 item" secondary="secondary text" />
              <div style="margin-left: auto; display: flex; gap: 4px">
                <XTag theme="red">啦</XTag>
                <XTag outline>C</XTag>
                <XTag theme="red" outline>GG</XTag>
              </div>
            </XListItem>
            <XDivider v-if="i !== 4" />
          </template>
        </XList>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import XDivider from '../XDivider/XDivider.vue';
import XList from './XList.vue';
import XListItem from './XListItem.vue';
import XListItemText from './XListItemText.vue';
import XListItemIcon from './XListItemIcon.vue';
import XInputText from '../XInput/XInputText.vue';
import XTag from '../XTag/XTag.vue';

export default defineComponent({
  name: 'XListDemo',
  tabName: 'XList',
  components: {
    XDivider,
    XList,
    XListItem,
    XListItemText,
    XListItemIcon,
    XTag,
    XInputText,
  },
  setup() {
    const baseAttrs = reactive({
      minWidth: '12rem',
      maxWidth: '16rem',
    });
    return {
      baseAttrs,
    };
  },
});
</script>

<style lang="scss" scoped>
.chunk-group {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.list-container {
  border: solid 1px rgb(38, 38, 38, 0.2);
}

.chunk {
  &-title {
    font-size: 20px;
    font-weight: 600;
  }
  display: inline-flex;
  min-width: 400px;
  flex-basis: 30%;
  padding: 0.5rem;
  flex-direction: column;
  gap: 0.5rem;
  outline: solid 1px #2221;
}
</style>
