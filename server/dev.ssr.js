const webpack = require("webpack");
const axios = require("axios");
const MemoryFS = require("memory-fs");
const fs = require("fs");
const path = require("path");
const send = require("koa-send");
const Router = require("koa-router");

const webpackConfig = require("@vue/cli-service/webpack.config");
const { createBundleRenderer } = require("vue-server-renderer");

const serverCompiler = webpack(webpackConfig);
const mfs = new MemoryFS();

serverCompiler.outputFileSystem = mfs;

let bundle;
serverCompiler.watch({}, (err, stats) => {
  if (err) {
    throw err;
  }
  stats = stats.toJson();
  stats.errors.forEach(error => console.error(error));
  stats.warnings.forEach(warn => console.warn(warn));
  const bundlePath = path.join(
    webpackConfig.output.path,
    "vue-ssr-server-bundle.json"
  );
  bundle = JSON.parse(mfs.readFileSync(bundlePath, "utf-8"));
  console.log("new bundle generated");
});

const handleRequest = async ctx => {
  if (!bundle) {
    ctx.body = "等待webpack打包完成后在访问在访问";
    return;
  }
  const url = ctx.path;
  if (url.includes("favicon.ico")) {
    return await send(ctx, url, { root: path.resolve(__dirname, "../public") });
  }

  const clientManifestResp = await axios.get(
    "http://localhost:8080/vue-ssr-client-manifest.json"
  );
  const clientManifest = clientManifestResp.data;

  const renderer = createBundleRenderer(bundle, {
    runInNewContext: false,
    template: fs.readFileSync(
      path.resolve(__dirname, "../index.template.html"),
      "utf-8"
    ),
    clientManifest: clientManifest
  });
  const html = await renderToString(ctx, renderer);
  ctx.body = html;
};
function renderToString(context, renderer) {
  return new Promise((resolve, reject) => {
    renderer.renderToString(context, (err, html) => {
      err ? reject(err) : resolve(html);
    });
  });
}

const router = new Router();

router.get("*", handleRequest);

module.exports = router;
