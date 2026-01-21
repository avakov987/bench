
export function proxy(initialState) {
  const target = { ...initialState };
  const listeners = new Set();

  const proxyObj = new Proxy(target, {
    set(targetObj, prop, value) {
      console.log('Setting', prop, 'to', value);
      targetObj[prop] = value;
      listeners.forEach(fn => fn());
      return true;
    }
  });

  // Возвращаем и Proxy, и доступ к listeners
  return {
    state: proxyObj,
    getListeners: () => listeners,
    subscribe: (fn) => {
      listeners.add(fn);
      return () => listeners.delete(fn);
    }
  };
}