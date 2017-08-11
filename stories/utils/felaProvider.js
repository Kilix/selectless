import { createRenderer } from 'fela';
import webPresets from 'fela-preset-web';

export default () => {
  const renderer = createRenderer({ plugins: [...webPresets] });
  renderer.renderStatic(
    {
      boxSizing: 'border-box',
    },
    '*'
  );
  return renderer;
};
