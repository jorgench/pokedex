import Vue from 'vue';
import Toast from './PToast';

const ToastProgramatic = {
  open(params) {
    let newParams;

    if (typeof params === 'string') {
      newParams = {
        message: params,
      };
    }

    if (params.parent) {
      delete params.parent;
    }

    if (typeof params === 'object') newParams = params;

    const vm = typeof window !== 'undefined' && window.Vue ? window.Vue : Vue;
    const ToastComponent = vm.extend(Toast);

    return new ToastComponent({
      el: document.createElement('div'),
      propsData: newParams,
    });
  },
};

const ToastPlugin = {
  install(Vue) {
    Vue.prototype.$toast = ToastProgramatic;
  },
};

export default ToastPlugin;
