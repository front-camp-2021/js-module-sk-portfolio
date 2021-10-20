export const index = (fn, delay = 0) => {
    let isCooldown = false;

    return function() {
      if (isCooldown) return;
      isCooldown = true;
      setTimeout(() => isCooldown = false, delay);
      return fn.apply(this, arguments);
    };
}


