<template>
  <div>
    <h3>Custom table with given data and options</h3>
    <p>
      The table currently using <code class="xd-code">display: grid</code> for
      its appearance. You might encounter several issue when dealing with grid
      layout, read the grid layout carefully and go see the implementation
      <code class="xd-code">XTable.scss</code>
    </p>
    <p>
      We also set some convenient style like min-height 0. To make the
      responsive more easy to implement. If you find out there could be some
      enhancement, create a PR or make an issue ticket.
    </p>

    <h4>selected key: {{ selected }}</h4>
    <div class="x-flex xd-space">
      <XCheckbox v-model="isCursorPointer"
        >Change cursor style to pointer</XCheckbox
      >
    </div>
    <div class="block">
      <XTable
        :data="fakeData"
        :lazy-render="true"
        :options="[
          {
            index: 'chartNo',
            title: 'chart no 111111111111111 aaaaaaaaaaaa',
            align: 'left',
            width: 'minmax(96px, 125px)',
          },
          {
            index: 'encounterNo',
            title: 'ENC no',
            desc: 'custom rendering',
            width: 'minmax(50px, 130px)',
          },
          {
            index: 'encounterDate',
            title: 'Date',
            width: '1fr',
            align: 'left',
          },
        ]"
        interactive
        :interactive-options="{
          rowColor: '#F2F2F2',
          columnColor: '#F2F2F2',
          intersectionColor: '#C2C2C2',
        }"
        key-index="encounterNo"
        :selected="selected"
        :style="{ cursor: isCursorPointer ? 'pointer' : 'default' }"
        @rowClick="handleRowClick"
        @row-double-click="handleDbClick"
      >
        <template #titleCell="{ index, title }">
          <template v-if="index === 'encounterNo'">❤{{ title }}</template>
        </template>
        <template #cell="{ content, index }">
          <template v-if="index === 'chartNo'">
            <XTag theme="primary">{{ content }}</XTag>
          </template>
          <XTooltip v-else-if="index === 'encounterDate'" :content="content">
            <div class="clock">⌚ hover me</div>
          </XTooltip>
          <!-- <template v-else> you don't need to list all possible index, it will fallback to string represent </template> -->
        </template>
      </XTable>
    </div>
    <br />
    <br />

    <h4>Adjust scrollbar position (notice tableStyle props)</h4>
    scrollBarDistance:<XInputText
      v-model="scrollbarDist"
      :inline="true"
    ></XInputText>
    <br />
    Modify data size:
    <XButton @click="addOne">add one</XButton>
    <XButton @click="deleteOne">delete one</XButton>
    <br />
    <XCheckbox v-model="enableShadow">Enable shadow</XCheckbox>

    <div class="x-flex xd-space">
      <label>shadowOptions:</label>
      <XCheckbox v-model="shadowOptions.top" size="sm">top</XCheckbox>
      <XCheckbox v-model="shadowOptions.bottom" size="sm">bottom</XCheckbox>
    </div>
    <XCheckbox v-model="isBordered"
        >Change bordered style</XCheckbox
    >
    <div class="block">
      <XTable
        :data="fakeData"
        :options="[
          {
            index: 'chartNo',
            title: 'ChartNo + DocName',
            width: '30%',
          },
          { index: 'encounterNo', title: 'ENC no', width: '30%' },
          { index: 'encounterDate', title: 'Date', width: '40%' },
        ]"
        :tableStyle="{
          overflow: 'overlay',
          paddingRight: `${scrollbarDist}px`,
          paddingLeft: `${scrollbarDist}px`,
        }"
        :enableShadow="enableShadow"
        :shadowOptions="shadowOptions"
        key-index="encounterNo"
        :bordered="isBordered"
      >
        <template #cell-chartNo="{ item }">
          {{ item.chartNo }} by {{ item.docName }}
        </template>

        <template #cell-encounterNo="{ content }">
          <XTag theme="red"> {{ content }} </XTag>
        </template>

        <template #titleCell-encounterDate> ⏲ </template>
      </XTable>
    </div>

    <h4>Fix column demo:</h4>
    <div :style="{ display: 'flex' }">
      <XInputText v-model="colNum" />
      <XButton @click="fixColTableRef?.scrollToRowStart(colNum)"
        >ScrollStart</XButton
      >
      <XButton @click="fixColTableRef?.scrollToRowCenter(colNum)"
        >ScrollCenter</XButton
      >
    </div>
    <div class="block">
      <XTableDemoFixCol ref="fixColTableRef"></XTableDemoFixCol>
    </div>

    <h4>Category and tree data demo:</h4>
    <div class="block">
      <XTableDemoCategoryTree></XTableDemoCategoryTree>
    </div>

    <dl class="xd-desc">
      <h4>Props</h4>
      <dt>data: Record&lt;string, unknown&gt;</dt>
      <dd>Given any array of data contain Object</dd>
      <dt>options: XTableEntryOption[]</dt>
      <dd>Columns setting</dd>

      <dt>keyIndex: DataKeyIndex</dt>
      <XTag theme="red" outline>Important</XTag>
      <dd>
        How table should generate each row id for keying, duplicate key content
        will make Vue failed to update certain value when table is been mutate.
      </dd>

      <dt>keyIndex: string</dt>
      <XTag outline>Overload</XTag>
      <dd>Use this index to retrieve key from data item</dd>

      <dt>keyIndex: string[]</dt>
      <XTag outline>Overload</XTag>
      <dd>
        Retrieve these indices from item, join them with
        <code class="xd-code">|</code>. Useful when single index will have
        duplicate value.
      </dd>

      <dt>keyIndex: (item: Record&lt;string, unknown&gt;) => string</dt>
      <XTag outline>Overload</XTag>
      <dd>Item will be pass to this function, should return a string</dd>

      <dt>keyIndex: undefined</dt>
      <XTag outline>Overload Fallback</XTag>
      <dd>First column's index in options will be used</dd>

      <dt>interactive:boolean = false</dt>
      <dd>Make hover and click style applied on table</dd>

      <dt>interactiveOptions: XTableInteractiveOptions</dt>
      <dd>
        The color of the row, column, and intersection that is being hovered.
        (null means no change)
      </dd>

      <dt>selected:string</dt>
      <dd>selected row key, if match, show light blue background</dd>

      <dt>defaultSortIndex: string</dt>
      <dd>If provide, will initial sort status to this index</dd>

      <dt>reverseSort: boolean = false</dt>
      <dd>If provide 'true' value, will make results in descending order.</dd>

      <dt>styleOptions: XTableStyleOptions</dt>
      <dd>Some extra style options</dd>

      <dt>childrenKey: string</dt>
      <dd>Children key in data props</dd>

      <dt>decreaseTreeLevel: number</dt>
      <dd>Decrease the indent for each tree level</dd>

      <dt>enableShadow: boolean</dt>
      <dd>Show shadow</dd>

      <dt>
        shadowOptions: XTableShadowOptions (default: { top: true, bottom: true
        })
      </dt>
      <dd>
        Enabled top or bottom shadow respectively. If provide, the options will
        be merged into default value.
      </dd>
      <dt>
        toggleOptions: XTableToggleOptions (default: { isDefaultExpand: false,
        toggleIndex: null})
      </dt>
      <dd>
        toggleIndex decide which column shows the toggle button (null means
        none)<br />Replace the deprecate 'option.toggle'.
      </dd>
      <dt>scrollBarSize: 'md' | 'lg' = 'md'</dt>
      <dd>Size of scroll bar</dd>
      <dt>lazyRender: boolean</dt>
      <dd>Enable this props to let the cells render lazily</dd>

      <h4>Slot</h4>
      <p>
        Slot in table is a little tricky, since we provide only few named slot.
        The idea behind it is the same with ant-design-vue v3. You should treat
        your name slot as a rendering function receive corresponding v-bind
        props. And use template tag to conditionally render any custom cell you
        want with the given index. If XTable detect no valid output from your
        given slot, it will fallback to simple string.
      </p>
      <dt>cell={index:string, content:any, item:any}</dt>
      <dd>
        the cell rendering slot, content will be the actual item finding on your
        object. Entry is the whole item found in the given array, index is the
        indexing string you given in the columns options.
      </dd>
      <dt>titleCell={index:string, content:any, entry:any}</dt>
      <dd>
        the cell rendering slot, content will be the actual item finding on your
        object. Entry is the whole item found in the given array, optionIndex is
        the indexing string you given in the columns options.
      </dd>

      <h4>Dynamic Slot</h4>
      <p>
        As some might miss old fashion auto-defined slot, XTable support of
        dynamic slot registering:
      </p>
      <dt>v-slot:['cell-' + index]={index, content, item, key}</dt>
      <dd>
        Rule of name: <code class="xd-code">cell-[index]</code> where index
        should be replace by your column index string. eg. col option
        <code class="xd-code">{index: 'helloWorld'}</code> become
        <code class="xd-code">
          &lt;template #cell-helloWorld="{content}" /&gt;
        </code>
        <br />
        behind the scene:
        <code class="xd-code"
          >item[index] === content; // key is the generated row key</code
        >
      </dd>
      <dt>v-slot:['titleCell-' + index]={index, title}</dt>
      <dd>
        Same as above but is used for <code class="xd-code">th</code> element
      </dd>

      <h4>Emit</h4>
      <dt>rowClick=[entry&lt;T&gt;, key:string]</dt>
      <dd>emit when row is been click, will emit even interactive is false.</dd>

      <dt>rowDoubleClick=[entry&lt;T&gt;, key:string]</dt>
      <dd>
        emit when row is been double click, will emit even interactive is false.
        Careful, rowClick is not prevent and two rowClick event will emit first.
      </dd>

      <dt>rowContextMenu=[entry&lt;T&gt;, key:string, e:MouseEvent]</dt>
      <dd>
        emit when row is been context menu, will emit even interactive is false.
      </dd>
    </dl>

    <dl class="xd-desc">
      <h4>
        <XTag outline theme="primary">TYPE</XTag> XTableEntryOption&lt;T&gt;
      </h4>
      <dt>index: Extract&lt;keyof T, string&gt; ;</dt>
      <dd>
        Data[index] will be used to retrieve row data, might not need to be
        exist in data. This behavior is useful to create dummy column only to
        manipulate table style or duplicated index retrieving.
      </dd>
      <dt>title?: string</dt>
      <dd>Column Header Name</dd>
      <dt>align?: TableAlign</dt>
      <dd>control justify-content value</dd>
      <dt>width?: string;</dt>
      <dd>
        <a
          href="https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns#values"
          rel="noopener noreferrer"
          target="_blank"
        >
          CSS Grid track value
        </a>
      </dd>
      <dt>sort?: boolean | 'string' | 'number'</dt>
      <dd>
        Provide sorting method, can specified sorted value type
        &apos;number&apos;
      </dd>
      <dt>desc?: string</dt>
      <dd>show tooltip on title hover</dd>
      <dt>cellClass?: string;</dt>
      <dd>extra class assign, space separated</dd>
      <dt>
        cellStyle?: Record&lt;string, string&gt; extends CSSStyleDeclaration
      </dt>
      <dd>extra style assign to cells</dd>
      <dt>headClass?: string;</dt>
      <dd>extra class assign, space separated</dd>
      <dt>
        headStyle?: Record&lt;string, string&gt; extends CSSStyleDeclaration
      </dt>
      <dd>extra style assign to heads</dd>
      <dt>indent?: boolean;</dt>
      <dd>enable indent for tree level</dd>
      <dt>toggle?: boolean; (deprecate)</dt>
      <dd>show toggle button</dd>

      <h4><XTag outline>TS</XTag> Typing options</h4>
      <PrismCode lang="ts" block>{{ XTableOptionSample }}</PrismCode>
    </dl>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { XTable } from './';
import fakeData from './demo/fakedata';
import XTooltip from '../XTooltip/XTooltip.vue';
import XTag from '../XTag/XTag.vue';
import { XButton } from '../XButton';
import { XInputText } from '../XInput';
import { XCheckbox } from '../XCheckbox';

// raw text
import XTableOptionSample from './demo/XTableOptionsSample?raw';
import XTableDemoFixCol from './demo/XTableDemoFixCol.vue';
import XTableDemoCategoryTree from './demo/XTableDemoCategoryTree.vue';

export default defineComponent({
  name: 'XTableDemo',
  tabName: 'XTable',
  components: {
    XButton,
    XTable,
    XTooltip,
    XTag,
    XInputText,
    XCheckbox,
    XTableDemoFixCol,
    XTableDemoCategoryTree,
  },
  setup() {
    const colNum = ref('0');
    const fixColTableRef = ref<InstanceType<typeof XTable> | null>(null);

    const selected = ref<string>();
    const fakeDataRef = reactive(fakeData);

    const scrollbarDist = ref(26);

    const addOne = () => {
      fakeDataRef.push({
        chartNo: 'abc',
        encounterNo: `${+new Date()}`,
        encounterDate: 'igh',
        oeiType: '',
        tag: '',
        patName: '',
        docCode: '',
        docName: '',
        deptCode: '',
      });
    };

    const deleteOne = () => {
      fakeDataRef.pop();
    };

    const enableShadow = ref(true);
    const shadowOptions = ref({ top: true, bottom: true });

    const isCursorPointer = ref(false);
    const isBordered = ref(false);

    return {
      colNum,
      fixColTableRef,
      fakeData: fakeDataRef,
      selected,
      handleRowClick: (item: unknown, key: string) => {
        console.log({ item, key });
        selected.value = key;
      },
      handleDbClick: (item: unknown, key: string) => {
        console.log('double click', { item, key });
      },
      XTableOptionSample,
      addOne,
      deleteOne,
      scrollbarDist,
      enableShadow,
      shadowOptions,
      isCursorPointer,
      isBordered,
    };
  },
});
</script>

<style lang="scss" scoped>
.block {
  margin: 1rem 0;
  height: 300px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 0 8px 0 #2222;
  outline: none;
  overflow: hidden;
}
.clock {
  border-radius: 100px;
  box-shadow: 0 0 8px 0 #2224;
  padding: 0.2rem;
}
</style>
