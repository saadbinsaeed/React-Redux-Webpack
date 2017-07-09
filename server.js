const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');

const IP = process.env.IP || '0.0.0.0';
const PORT = process.env.PORT || 9000;

const app = new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  host: IP,
  stats: 'errors-only',
  historyApiFallback: true,
  contentBase: 'public',
});

app.listen(PORT, IP, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log(`Listening at http://${IP}:${PORT}`);
});
