const registry: { [name: string]: any } = {};

const componentRegistry = Object.freeze({
    addComponent: (name: string, component: any) => {
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
