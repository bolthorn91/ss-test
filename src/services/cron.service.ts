import certificationScript from "../scripts/certification.script";

class CronService {
    constructor() {
        certificationScript.initializeCertification();
    }
}

export default new CronService;