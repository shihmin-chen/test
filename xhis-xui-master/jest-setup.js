import '@testing-library/jest-dom';
import crypto from 'crypto';

// to dismiss yjs array pass into prop warning ( Invalid prop: type check failed for prop "modelValue". Expected Array, got Array)
Array.isArray = function (arg) {
  return Object.prototype.toString.call(arg) === '[object Array]';
};

Object.defineProperty(globalThis.self, 'crypto', {
  value: {
    getRandomValues: (arr) => crypto.randomBytes(arr.length),
  },
});

globalThis.TokenUrl = process.env.TOKEN_URL || '';
globalThis.Url = process.env.URL || '';
globalThis.Password = process.env.PASSWORD || '';
globalThis.Username = process.env.USERNAME || '';
