//https://forum.playcanvas.com/t/ive-finally-figured-out-how-to-use-es6-classes-with-playcanvas/5471
export default function (ClassType,name) {
    const instance = new ClassType();
    const script = pc.createScript(name);
    console.log(`add ${name} to the registry`)
    const attributes = [];

    // Add public attributes accessible in the editor
    if (instance.attributes) {
        for (let attr in instance.attributes) {
            attributes.push(attr)
            script.attributes.add(attr, instance.attributes[attr])
        }
    }
    // Add instance properties and methods to prototype
    for (let prop in instance) {
        if (prop === 'attributes' || prop === 'name' || attributes.includes(prop)) {
            // do nothing
        } else {
            script.prototype[prop] = instance[prop];
        }
    }

    // Add static properties
    for (let prop in ClassType) {
        script[prop] = ClassType[prop];
    }
}
