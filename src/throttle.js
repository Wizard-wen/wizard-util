/**
 *
 */

/**
 * 概念： 规定一个单位时间，在这个单位时间内，只能有一次触发事件的回调函数执行，
 * 如果在同一个单位时间内某事件被触发多次，只有一次能生效。
 */

// action 传入函数
// hold 返回参数
// callback 生命周期切片

/**
 *
 * @param action
 * @param gapTime
 * @param scope
 * @returns {function(...[*]=)}
 */
function throttle(action, gapTime, scope) {
  let lastTime = null;
  return () => {
    const nowTime = +new Date();
    if (nowTime - lastTime > gapTime || !lastTime) {
      action.bind(scope);
      lastTime = nowTime;
    }
  };
}

const fn = () => {
  console.log('boom');
};

setInterval(throttle(fn, 1000), 10);
