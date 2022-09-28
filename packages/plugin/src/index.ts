import { Plugin } from "vite";
import glob from "fast-glob";

const storyHtmlTemplate = `
<!DOCTYPE html>
<html lang="en">
    <head>  
        <meta charset="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>nanostory</title>
    </head>
    <body>
        <div id="root"></div>
        <script type="module" src="{{ entry }}"></script>
    </body>
</html>
`;

const nanostoryEntry = `
import { renderNanostory } from "@nanostory/core";

renderNanostory({
    stories: {{ stories }},
});
`;

const nanostoryStory = `
const main = async () => {
    const url = new URL(window.location.href);
    const storyFile = await import(/* @vite-ignore */ url.searchParams.get('filename'));
    const story = storyFile[url.searchParams.get('variant') ?? 'default'];

    const rootDiv = document.getElementById('root');
    story(rootDiv);
}

main();
`;

export default function nanostoryPlugin(): Plugin {
    const entryFilename = "/nanostory-entry.tsx";
    const storyFilename = "/nanostory-story.tsx";

    return {
        name: "transform-file",
        load: async (module) => {
            if (module === entryFilename) {
                const entries = await glob("**/*.stories.tsx", { cwd: process.cwd() });

                return nanostoryEntry.replace("{{ stories }}", JSON.stringify(entries));
            }

            if (module === storyFilename) {
                return nanostoryStory;
            }
        },
        transformIndexHtml: {
            enforce: "pre",
            transform: (_, ctx) => {
                return storyHtmlTemplate.replace(
                    "{{ entry }}",
                    ctx.originalUrl?.startsWith("/__nanostory_iframe") ? storyFilename : entryFilename
                );
            },
        },
    };
}
