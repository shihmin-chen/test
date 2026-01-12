import { nanoid } from 'nanoid';
import { Fragment, ShallowReactive, defineComponent, h, ref, shallowReactive } from 'vue';

interface DialogTemplateProps<DialogArgs = undefined, DialogResult = undefined> {
  /** The argument of dialog. */
  dialogArgs?: DialogArgs;
  /** The promise instance. */
  promise: Promise<DialogResult> | undefined;
  /** Resolve for the promise. */
  resolve: (dialogResult?: DialogResult) => void;
}

interface TransientDialogTemplateProps<DialogArgs = undefined, DialogResult = undefined>
  extends DialogTemplateProps<DialogArgs, DialogResult> {
  /** Unique key of request. */
  requestKey: string;
}

export interface UseTransientDialogRequestOptions {
  requestKey?: string;
}

export type useTransientDialogRequestType<DialogArgs, DialogResult> = (
  dialogArgs: DialogArgs,
  options?: UseTransientDialogRequestOptions
) => Promise<DialogResult>;

/**
 * Creates a template for rendering a transient dialog for each request.
 * ref: `createTemplatePromise` in vueuse
 *
 * @example
 * In DialogComponent.vue
 * ```js
 * defineProps<DialogArgs>();
 * defineEmits<{resolve: [dialogResult: DialogResult]}>();
 * ```
 *
 * In ParentComponent.vue
 * ```html
 * <TransientDialogTemplate v-slot="{ dialogArgs, resolve }">
 *   <DialogComponent v-bind="dialogArgs" @resolve="resolve" />
 * </TransientDialogTemplate>
 * ```
 * ```js
 * const { TransientDialogTemplate, request } = useTransientDialog<DialogArgs, DialogResult>();
 * const run = async (dialogArgs: DialogArgs) => { const result = await request(dialogArgs); }
 * ```
 */
export const useTransientDialog = <DialogArgs = undefined, DialogResult = undefined>() => {
  const instances = ref<ShallowReactive<TransientDialogTemplateProps<DialogArgs, DialogResult>>[]>([]);

  const TransientDialogTemplate = defineComponent((_, { slots }) => {
    const renderList = () =>
      instances.value.map((templateProps) =>
        h(Fragment, { key: templateProps.requestKey }, slots.default?.(templateProps))
      );
    return renderList;
  });

  const request: useTransientDialogRequestType<DialogArgs, DialogResult> = async (
    dialogArgs: DialogArgs,
    options: UseTransientDialogRequestOptions = {}
  ): Promise<DialogResult> => {
    const { requestKey = nanoid() } = options;
    const templateProps = shallowReactive<TransientDialogTemplateProps<DialogArgs, DialogResult>>({
      dialogArgs,
      promise: undefined,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      resolve: () => void 0,
      requestKey,
    });
    instances.value.push(templateProps);

    templateProps.promise = new Promise<DialogResult>((_resolve) => {
      templateProps.resolve = (v) => {
        return _resolve(v as DialogResult);
      };
    }).finally(() => {
      templateProps.promise = undefined;
      const index = instances.value.findIndex((instance) => instance.requestKey === templateProps.requestKey);
      if (index === -1) {
        return;
      }
      instances.value.splice(index, 1);
    });
    return templateProps.promise;
  };

  return {
    TransientDialogTemplate,
    request,
  };
};
