/**
 * @date 2020/07/28
 * @author wizard
 */

/**
 * 概念： 在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时。
 */

/**
 * debounce 防抖函数
 * @param fn
 * @param wait
 * @param args
 * @returns {function(...[*]=)}
 */
function debounce(fn, wait, ...args) {
  let timer;
  return () => {
    const context = this;
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, wait);
  };
}

const fn = function () {
  console.log('boom');
};

setInterval(debounce(fn, 500), 1000); // 第一次在1500ms后触发，之后每1000ms触发一次

setInterval(debounce(fn, 2000), 1000); // 不会触发一次（我把函数防抖看出技能读条，如果读条没完成就用技能，便会失败而且重新读条）
