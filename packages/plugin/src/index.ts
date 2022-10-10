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

const getStoryPathFromScriptPath = (scriptPath: string, buildMode: boolean) => {
    return resolve(
        process.cwd(),
        scriptPath
            .substring(0, scriptPath.length - ".js".length)
            .substring(((buildMode ? "virtual:" : "/") + "__nanostory_script/").length)
    );
};

const getStoryNameFromIframePath = (iframePath: string, buildMode: boolean) => {
    return iframePath
        .substring(0, iframePath.length - ".html".length)
        .substring(`${buildMode ? "" : "/"}__nanostory_iframe/`.length);
};

type PathModifierConfig = {
    prefix: string;
    extension: string;
    buildPrefix?: string;
    isBuildMode: boolean;
};

type PathModifier = {
    get: (storyPath: string) => string;
    is: (storyPath: string) => boolean;
};

const createPathModifier = ({ prefix, extension, isBuildMode, buildPrefix = "" }: PathModifierConfig): PathModifier => {
    const fullPrefix = (isBuildMode ? buildPrefix : "/") + prefix;

    return {
        get: (storyPath) => fullPrefix + `/${storyPath}.${extension}`,
        is: (storyPath) => {
            return storyPath.startsWith(fullPrefix);
        },
    };
};

export default function nanostoryPlugin(config: NanostoryPluginConfig = {}): Plugin {
    const storyPattern = config.storyPattern ?? "**/*.(stories|story).{ts,tsx,js,jsx}";
    const storyRoot = config.storyRoot ?? process.cwd();
    let iframePath: PathModifier;
    let scriptPath: PathModifier;
    let isBuildMode = false;

    return {
        name: "nanostory",
        async config(config, env) {
            isBuildMode = env.command === "build";

            iframePath = createPathModifier({
                isBuildMode,
                extension: "html",
                prefix: "__nanostory_iframe",
            });

            scriptPath = createPathModifier({
                isBuildMode,
                extension: "js",
                prefix: "__nanostory_script",
                buildPrefix: "virtual:",
            });

            if (isBuildMode) {
                if (config.build === undefined) {
                    config.build = {};
                }

                if (config.build.rollupOptions === undefined) {
                    config.build.rollupOptions = {};
                }

                const entries = await glob(storyPattern, { cwd: storyRoot });

                config.build.rollupOptions.input = [
                    resolve(process.cwd(), "index.html"),
                    ...entries.map((entry) => iframePath.get(entry)),
                ];

                config.appType = "mpa";
            }

            return config;
        },
        resolveId(module) {
            if (scriptPath.is(module)) {
                return "\0" + module;
            }

            if (iframePath.is(module)) {
                return module;
            }

            if (module.includes("nanostory_entry.js")) {
                return (isBuildMode ? "\0" : "") + module;
            }
        },
        async load(module) {
            if (iframePath.is(module)) {
                return "";
            }

            const realModule = module.substring(1);

            if (scriptPath.is(realModule)) {
                return singleStoryScript.replace(
                    "{{ story }}",
                    normalizePath(getStoryPathFromScriptPath(realModule, isBuildMode))
                );
            }

            if (module.includes("nanostory_entry.js")) {
                const entries = await glob(storyPattern, { cwd: storyRoot });

                const stories = entries.reduce((acc, entry) => acc + `'${entry}': '${iframePath.get(entry)}',\n`, "");

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
                if (ctx.originalUrl?.startsWith("/__nanostory_iframe")) {
                    return htmlTemplate.replace(
                        "{{ entry }}",
                        scriptPath.get(getStoryNameFromIframePath(ctx.originalUrl, isBuildMode))
                    );
                }

                if (iframePath.is(ctx.filename)) {
                    return htmlTemplate.replace(
                        "{{ entry }}",
                        scriptPath.get(getStoryNameFromIframePath(ctx.filename, isBuildMode))
                    );
                }

                return htmlTemplate.replace("{{ entry }}", (isBuildMode ? "virtual:" : "/") + "nanostory_entry.js");
            },
        },
    };
}
