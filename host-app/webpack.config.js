import { createWebpackConfig } from './webpack.common.js';

export default createWebpackConfig({
  name: 'host',
  entry: './src/index.tsx',
  devServerPort: 8080,
  remotes: {
    webComponents: 'webComponents@http://localhost:8085/remoteEntry.js',
    dataSelector: 'dataSelector@http://localhost:8081/remoteEntry.js',
    themeSelector: 'themeSelector@http://localhost:8082/remoteEntry.js',
    cardList: 'cardList@http://localhost:8083/remoteEntry.js',
    shared: 'shared@http://localhost:8084/remoteEntry.js',
  },
});
