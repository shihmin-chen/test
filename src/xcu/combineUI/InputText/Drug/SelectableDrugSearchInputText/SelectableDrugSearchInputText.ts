import { h, ref, Ref } from 'vue';

import { MaybeRefOrComputed } from '../../../../type';
import SelectableDrugSearchInputText from './SelectableDrugSearchInputText.vue';

export interface SelectableDrugSearchInputTextProps<
  OnPremAllergySchema,
  SearchResultType,
  SearchResultContentType,
> {
  title?: MaybeRefOrComputed<string>;
  defaultResult?: SearchResultContentType[];
  isRequired?: MaybeRefOrComputed<boolean>;
  patientAllergyIntoleranceOnPremAllergyData: MaybeRefOrComputed<
    OnPremAllergySchema[]
  >;
  getDrugSearchResult: (searchText: string) => Promise<SearchResultType[]>;
  getDrugSearchResultContent: (
    data: SearchResultType,
  ) => SearchResultContentType;
  getDrugDisplay: (data: SearchResultContentType) => string;
  getDrugGenericDisplay: (data: SearchResultContentType) => string;
  getAllergySubstance: (item: OnPremAllergySchema) => string;
}

export const useSelectableDrugSearchInputText = <
  OnPremAllergySchema,
  SearchResultType,
  SearchResultContentType,
>(
  props: SelectableDrugSearchInputTextProps<
    OnPremAllergySchema,
    SearchResultType,
    SearchResultContentType
  >,
) => {
  const result = ref<SearchResultContentType[] | undefined>(
    props.defaultResult,
  ) as Ref<SearchResultContentType[] | undefined>;
  // h function
  const TemplateRender = () => {
    return h(SelectableDrugSearchInputText, {
      ...props,
      // @ts-expect-error: modelValue
      'onUpdate:modelValue': (value: SearchResultContentType[]) => {
        result.value = value;
      },
    });
  };

  const template = TemplateRender();
  return { template, result };
};
