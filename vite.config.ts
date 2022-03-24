import path from "path"
import { defineConfig } from "vite"
import reactRefresh from "@vitejs/plugin-react-refresh"
import visualizer from "rollup-plugin-visualizer"

function pathAlias(source, target) {
  return {
    find: source,
    replacement: path.resolve(__dirname, "node_modules/" + target),
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    reactRefresh(),
    {
      ...visualizer({
        filename: "./dist/stats.html",
        template: "treemap",
        sourcemap: true,
      }),
      apply: "build",
      enforce: "post",
    },
  ],
  resolve: {
    alias: [
      { find: "@", replacement: path.resolve(__dirname, "src") },
      { find: "~antd", replacement: path.resolve(__dirname, "node_modules/antd") },
      // {
      //   find: "~antd/lib/style/themes/default",
      //   replacement: path.resolve(__dirname, "node_modules/antd/es/style/themes/default.less"),
      // },
      // pathAlias("@antv/g2/lib", "@antv/g2/esm"),
      // pathAlias("@antv/g2plot/lib", "@antv/g2plot/esm"),
      // pathAlias("@antv/g-canvas/lib", "@antv/g-canvas/esm"),
      // pathAlias("@antv/g-math/lib", "@antv/g-math/esm"),
      // pathAlias("@antv/g-svg/lib", "@antv/g-svg/esm"),
      // pathAlias("@antv/util/lib", "@antv/util/esm"),
    ],
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          hack: `true;@import "${require.resolve("antd/es/style/color/colorPalette.less")}";`,
          "@primary-color": "#41adff",
        },
      },
    },
  },

  optimizeDeps: {},
  build: { sourcemap: true },
})
