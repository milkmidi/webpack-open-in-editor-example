<script>
/**
 * 本機開發用，點了可以直接開 vsocde
 */
export default {
  name: 'DebugComponent',
  functional: true,
  props: {
    path: {
      type: String,
      required: true,
    },
  },
  render(createElement, { props }) {
    if (process.env.NODE_ENV !== 'development') {
      alert('Development mode only');
      return null;
    }
    const { path } = props;
    const clickHandler = () => fetch(`/__open-in-editor?file=${path}`);
    const fileName:string = path.split('/').pop();
    return createElement('div',
      {
        class: 'debug-component',
        on: {
          click: clickHandler,
        },
      },
      [
        createElement('h1', fileName),
      ]);
  },
};
</script>

<style lang="scss" scoped>
.debug-component {
  cursor: pointer;
  background: #c0392b;
  padding: 10px;
  border-radius: 10px;
  h1 {
    color: white;
    font-size: 20px;
  }
}
</style>
