/// <reference types="vite/client" />

declare module "*.svg" {
    export const ReactComponent: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}
