export const useCounterStore = defineStore(
  'counter',
  () => {
    const counter = ref(0);

    const increaseCounter = () => {
      counter.value++;
    };

    const decreaseCounter = () => {
      counter.value--;
    };

    return {
      counter,
      increaseCounter,
      decreaseCounter,
    };
  },
  {
    persist: true,
  },
);
