import { createPinia, setActivePinia } from 'pinia';
import {
  //  beforeEach,
  describe,
  // expect,
  it,
} from 'vitest';

// import { useAccessStore } from '../modules/access';

describe('useAccessStore', () => {
  it('app Name with test', () => {
    setActivePinia(createPinia());
    // let referenceStore = usePreferenceStore();

    // beforeEach(() => {
    //   referenceStore = usePreferenceStore();
    // });

    // expect(referenceStore.appName).toBe('vben-admin');
    // referenceStore.setAppName('vbenAdmin');
    // expect(referenceStore.getAppName).toBe('vbenAdmin');
  });
});
