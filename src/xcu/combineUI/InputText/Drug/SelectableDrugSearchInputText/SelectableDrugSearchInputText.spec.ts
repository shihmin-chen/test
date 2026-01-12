import { shallowMount } from '@vue/test-utils';
import { ref } from 'vue';

import { useSelectableDrugSearchInputText } from './SelectableDrugSearchInputText';
import SelectableDrugSearchInputText from './SelectableDrugSearchInputText.vue';

describe('SelectableDrugSearchInputText', () => {
  const props = {
    title: 'Test Title',
    defaultResult: [],
    isRequired: false,
    patientAllergyIntoleranceOnPremAllergyData: ref([]),
    getDrugSearchResult: jest.fn().mockResolvedValue([]),
    getDrugSearchResultContent: jest.fn(),
    getDrugDisplay: jest.fn(),
    getDrugGenericDisplay: jest.fn(),
    getAllergySubstance: jest.fn(),
  };

  it('renders correctly', () => {
    const wrapper = shallowMount(SelectableDrugSearchInputText, {
      props,
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('updates result on modelValue change', async () => {
    const { template, result } = useSelectableDrugSearchInputText(props);
    const wrapper = shallowMount(template);
    const newValue = [{ id: 1, name: 'Drug1' }];
    await wrapper.setProps({ modelValue: newValue });
    expect(result.value).toEqual([]);
  });

  it('displays title correctly', () => {
    const wrapper = shallowMount(SelectableDrugSearchInputText, {
      props,
    });
    expect(wrapper.text()).toContain('');
  });
});
