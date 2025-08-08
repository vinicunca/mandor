import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
  clean: true,
  declaration: true,
  entries: [
    './src/postcss.config',
  ],
  rollup: {
    emitCJS: true,
  },
});
