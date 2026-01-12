import { registerTS } from '@vue/compiler-sfc';
import vue3Jest from '@vue/vue3-jest';
import typescript from 'typescript';

registerTS(() => typescript);
export default vue3Jest;
