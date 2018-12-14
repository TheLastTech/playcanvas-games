export default function ClassToScript(app) {
    return function (ScriptConstructor) {
        let scriptInstance = new ScriptConstructor();
        let script = pc.createScript(scriptInstance.name, app);

        for (let prop in scriptInstance) {
            if (prop === 'name' || prop === 'attributes') continue;

            script.prototype[prop] = scriptInstance[prop];
        }

        for (let staticProp in ScriptConstructor) {
            if (staticProp === 'extendsFrom') continue;
            script[staticProp] = ScriptConstructor[staticProp];
        }

        return scriptInstance;
    }
}
