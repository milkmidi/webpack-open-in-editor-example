/**
 * 本機開發用，點了可以直接開 vscode
 */
interface Props {
  path: string
}
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
      alert('👿 Development mode only');
      return null;
    }
    const { path }:Props = props;
    const click = () => fetch(`/__open-in-editor?file=${path}`);
    const fileName:string = path.split('/').pop();
    return createElement('div',
      {
        class: '🤜😝🤛',
        style: {
          cursor: 'pointer',
          background: '#c0392b',
          padding: '10px',
          borderRadius: '10px',
          color: 'white',
          fontSize: '24px',
        },
        on: { click },
      },
      [fileName]);
  },
};
