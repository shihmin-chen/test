// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../shim-components.d.ts" />

import { createApp } from 'vue';
import App from './App.vue';
import { PrismCode } from '@asus-aics/prism-code';
import { XNotificationsNewModule } from '../src/components/XNotificationNew';

const app = createApp(App);

app.component('PrismCode', PrismCode);
app.use(XNotificationsNewModule);
app.mount('#app');
