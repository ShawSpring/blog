/**
 * 第一次触发 window 上的点击事件时进行激活
 * @type {import('astro').ClientDirective}
 */
export default (load, opts, el) => {
  //console.log('hydrate: ',el) // <astro-island ... />
    el.addEventListener('click', async () => {
    //window.addEventListener('click', async () => {
      const hydrate = await load()
      await hydrate()
    }, { once: true })
  }