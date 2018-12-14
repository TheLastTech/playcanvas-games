//See reference project https://playcanvas.com/project/504134/overview/test-es6

import {V} from 'playcanvas-working-vectors';
import delay from 'playcanvas-delay'
import timeout from 'playcanvas-timeout'
import ClassToScript from './pcWrapper.js';



class EyeBall{
    construct() {
        console.log("constructed")
        this.startLogging = false
        timeout(() => this.entity.enabled = true, 1000)
    }

    async initialize() {
        console.log("Starting", this.startLogging)
        await delay(1000)
        console.log("Delayed")
        await delay(20000)
        this.startLogging = true
    }

    update(dt) {
        if (this.startLogging) console.log(this.message, dt, V(this.entity.getPosition()).scale(0.5).data);
    }
}

export default ClassToScript(EyeBall)


