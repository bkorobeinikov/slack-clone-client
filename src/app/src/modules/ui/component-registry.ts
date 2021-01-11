const registry: Record<string, unknown> = {};

const componentRegistry = Object.freeze({
    addComponent: (name: string, component: unknown) => {
        registry[name] = component;
    },
    getComponent: (name: string) => {
        return registry[name];
    },
    removeComponent: (name: string) => {
        delete registry[name];
    },
});

export { componentRegistry };
