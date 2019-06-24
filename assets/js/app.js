$('document').ready(function () {

    async function getDetectors() {
        let response = await fetch('https://localhost:44390/api/Detectors');
        let detectors = await response.json();

        detectors.forEach((detector, index) => {
            index++;
            let code = detector.code;
            let desc = detector.description;
            document.querySelector("#title" + index).innerHTML = code.toUpperCase();
            document.querySelector("#desc" + index).innerHTML = desc.toUpperCase();
            document.querySelector("#circle" + index).classList.remove('alarm');
            document.querySelector("#circle" + index).classList.remove('trouble');
            document.querySelector("#circle" + index).classList.remove('pulse');
            document.querySelector("#circle" + index).classList.add(...validateState(detector));
        });

        setTimeout(getDetectors, 3000);
    }

    getDetectors();

    function validateState( detector ) {
        let classNamesArray = [];

        let alarm = 'alarm';
        let trouble = 'trouble';
        let pulse = 'pulse';

        if ( detector.alarm ) {
            classNamesArray.push(alarm);
        }

        if ( detector.trouble ) {
            classNamesArray.push(trouble);
        }

        if ( (detector.alarm || detector.trouble) && !detector.acknowledged ) {
            classNamesArray.push(pulse);
        }
        
        return classNamesArray.length ? classNamesArray : ['default'];
    }

});