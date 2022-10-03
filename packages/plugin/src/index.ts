import { normalizePath, Plugin } from "vite";
import glob from "fast-glob";
import { resolve } from "path";
import { htmlTemplate } from "./htmlTemplate";

const entryPointScript = `
import { renderNanostory } from "@nanostory/core";

renderNanostory({
    stories: {{ stories }},
});
`;

const singleStoryScript = `
import * as variants from "{{ story }}";

const main = async () => {
    const url = new URL(window.location.href);
    const story = variants[url.searchParams.get('variant') ?? 'default'];

    const rootDiv = document.getElementById('root');
    story(rootDiv);
}

main();
`;

type NanostoryPluginConfig = {
    storyPattern?: string;
    storyRoot?: string;
};

const getStoryIframePath = (storyPath: string, buildMode: boolean) => {
    return (buildMode ? "" : "/") + "__nanostory_iframe/" + storyPath + ".html";
};

const isStoryIframePath = (storyPath: string, buildMode: boolean) => {
    return storyPath.startsWith((buildMode ? "" : "/") + "__nanostory_iframe");
};

const getStoryScriptPath = (storyPath: string, buildMode: boolean) => {
    return (buildMode ? "virtual:" : "/") + "__nanostory_script/" + storyPath + ".js";
};

const isStoryScriptPath = (storyPath: string, buildMode: boolean) => {
    return storyPath.startsWith((buildMode ? "virtual:" : "/") + "__nanostory_script");
};

const getStoryPathFromScriptPath = (scriptPath: string, buildMode: boolean) => {
    return resolve(
        process.cwd(),
        scriptPath
            .substring(0, scriptPath.length - ".js".length)
            .substring(((buildMode ? "virtual:" : "/") + "__nanostory_script/").length)
    );
};

const getStoryNameFromIframePath = (iframePath: string) => {
    return iframePath.substring(0, iframePath.length - ".html".length).substring("__nanostory_iframe/".length);
};

export default function nanostoryPlugin(config: NanostoryPluginConfig = {}): Plugin {
    const storyPattern = config.storyPattern ?? "**/*.(stories|story).{ts,tsx,js,jsx}";
    const storyRoot = config.storyRoot ?? process.cwd();
    let buildMode = false;

    return {
        name: "nanostory",
        async config(config, env) {
            if (env.command === "build") {
                buildMode = true;

                if (config.build === undefined) {
                    config.build = {};
                }

                if (config.build.rollupOptions === undefined) {
                    config.build.rollupOptions = {};
                }

                const entries = await glob(storyPattern, { cwd: storyRoot });

                config.build.rollupOptions.input = [
                    resolve(process.cwd(), "index.html"),
                    ...entries.map((entry) => getStoryIframePath(entry, buildMode)),
                ];
            }

            config.appType = "mpa";

            return config;
        },
        resolveId(module) {
            if (isStoryScriptPath(module, buildMode)) {
                return "\0" + module;
            }

            if (isStoryIframePath(module, buildMode)) {
                return module;
            }

            if (module.includes("nanostory_entry.js")) {
                return (buildMode ? "\0" : "") + module;
            }
        },
        async load(module) {
            if (isStoryIframePath(module, buildMode)) {
                return "";
            }

            const realModule = buildMode ? module.substring(1) : module;

            if (isStoryScriptPath(realModule, buildMode)) {
                return singleStoryScript.replace(
                    "{{ story }}",
                    normalizePath(getStoryPathFromScriptPath(realModule, buildMode))
                );
            }

            if (module.includes("nanostory_entry.js")) {
                const entries = await glob(storyPattern, { cwd: storyRoot });

                const stories = entries.reduce(
                    (acc, entry) => acc + `'${entry}': '${getStoryIframePath(entry, buildMode)}',\n`,
                    ""
                );

                return entryPointScript.replace("{{ stories }}", `{\n${stories}\n}`);
            }
        },
        configureServer: (server) => {
            server.middlewares.use((req, res, next) => {
                if (req.url?.startsWith("/__nanostory_iframe")) {
                    req.url = req.url + "/";
                }

                next();
            });
        },
        transformIndexHtml: {
            enforce: "pre",
            transform: (_, ctx) => {
                if (isStoryIframePath(ctx.filename, buildMode)) {
                    return htmlTemplate.replace(
                        "{{ entry }}",
                        getStoryScriptPath(getStoryNameFromIframePath(ctx.filename), buildMode)
                    );
                }

                return htmlTemplate.replace("{{ entry }}", (buildMode ? "virtual:" : "/") + "nanostory_entry.js");
            },
        },
    };
}
