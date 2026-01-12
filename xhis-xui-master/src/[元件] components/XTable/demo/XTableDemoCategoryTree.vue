<template>
  <div class="x-demo-table-small-block">
    <XTable
      :data="data"
      :options="options"
      :customCategoryOptions="customCategoryOptions"
      keyIndex="id"
      childrenKey="children"
      :decreaseTreeLevel="1"
      :toggleOptions="{
        isDefaultExpand: true,
        toggleIndex: 'id',
      }"
    >
    </XTable>
  </div>
</template>

<script lang="ts" setup>
import { XTable } from '..';
import { XTableEntryOption } from '../XTableConfig';

const data = [
  {
    id: 'c1',
    name: 'Meat',
    categoryHeader: true,
    children: [
      {
        id: 'm1',
        name: 'Beef',
        price: 500,
        children: [
          {
            id: 'm1.1',
            name: 'Wagyu',
            price: 1500,
            children: [],
          },
        ],
      },
      {
        id: 'm2',
        name: 'Pork',
        price: 300,
        children: [],
      },
    ],
  },
  {
    id: 'c2',
    name: 'Vegetable',
    categoryHeader: true,
    children: [
      {
        id: 'v1',
        name: 'Cabbage',
        price: 120,
        children: [],
      },
      {
        id: 'v2',
        name: 'Brocoli',
        price: 150,
        children: [],
      },
    ],
  },
  {
    id: 'c3',
    name: 'Fruit',
    categoryHeader: true,
    children: [
      {
        id: 'f1',
        name: 'Grape',
        price: undefined,
        children: [
          {
            id: 'f1.1',
            name: 'Kyoho',
            price: 120,
            children: [
              {
                id: 'f1.1.1',
                name: 'Kyoho (defective)',
                price: 70,
                children: [],
              },
            ],
          },
          {
            id: 'f1.2',
            name: 'New Pione',
            price: 90,
            children: [],
          },
        ],
      },
      {
        id: 'f2',
        name: 'Apple',
        price: 100,
        children: [
          {
            id: 'f2.1',
            name: 'Braeburn',
            price: 130,
            children: [],
          },
        ],
      },
      {
        id: 'f3',
        name: 'Banana',
        price: 80,
        children: [],
      },
    ],
  },
];
const options: XTableEntryOption[] = [
  {
    index: 'id',
    title: 'ID',
    width: 'min-content',
  },
  {
    index: 'name',
    title: 'Name',
    align: 'left',
    width: '1fr',
    indent: true,
    cellClass: 'x-ellipsis--1',
  },
  {
    index: 'price',
    title: 'Price',
    align: 'right',
    width: '120px',
  },
];
const customCategoryOptions = {
  isHeader: (item: Record<string, unknown>) => item.categoryHeader,
  tdClass: (item: Record<string, unknown>, index: string) => {
    const cssClasses = [];
    if (item.categoryHeader) {
      cssClasses.push('x-demo-table-custom-category');
      switch (index) {
        case 'name':
          cssClasses.push('x-demo-table-custom-category--span');
          break;
        case 'price':
          cssClasses.push('x-demo-table-custom-category--hide');
          break;
      }
    }
    return cssClasses.join(' ');
  },
};
</script>

<style lang="scss">
.x-demo-table-custom-category {
  position: sticky;
  top: 40px; // thead height (if not set noHeader)
  height: 48px;
  margin: 2px 0;
  background: var(--xv-neutral--50);
  --x-table-border: none;

  &--span {
    grid-column-start: span 2; // name + price column
  }
  &--hide {
    display: none;
  }
}

.x-demo-table-small-block {
  width: 600px;
  height: 300px;
}
.x-demo-table-nowrap {
  white-space: nowrap;
}

.x-demo-table-first {
  // Use sticky to make sure no performance issue
  position: sticky;
  // if more then one col, you will need to add fixed width for it
  left: 0;
  // Provide bg color to cover other cells
  background-color: aliceblue;
  border-color: #ddd;
  border-right: solid 1px #ddd;
  // elevate the z index to prevent any rendering context covering issue
  z-index: 1;
}
</style>
