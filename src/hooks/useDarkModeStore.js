import {create} from 'zustand';

const useDarkModeStore = create(set => ({
  isEnabled: false,
  toggleSwitch: () => {
    set(state => ({
      isEnabled: !state.isEnabled,
    }));
  },
}));

export default useDarkModeStore;
