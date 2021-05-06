import babel from "rollup-plugin-babel";
import localResolve from "rollup-plugin-node-resolve";
import cleanup from "rollup-plugin-cleanup";

const domains = ["common", "listing", "order", "product", "user"];

const configs = domains.map((domain) => {
  return {
    input: `src/${domain}/index.ts`,
    output: {
      file: `${domain}.js`,
      format: "cjs",
    },
    plugins: [
      localResolve({
        extensions: [".js", ".ts"],
      }),
      babel({
        exclude: "node_modules/**",
        extensions: [".js", ".ts"],
      }),
      cleanup({
        extensions: ["js", "ts"],
        sourcemap: false,
      }),
    ],
  };
});

export default configs;
