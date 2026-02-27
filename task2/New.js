function startTrafficLights(){

    let allSignals = document.querySelectorAll(".traffic-contaier");

    let signalIndex = 0;

    function runSignal(){

        let lights = allSignals[signalIndex].querySelectorAll(".light");

        // Step 1 → RED OFF → GREEN ON
        lights[0].classList.remove("active");
        lights[2].classList.add("active");

        setTimeout(() => {

            // Step 2 → GREEN OFF → YELLOW ON
            lights[2].classList.remove("active");
            lights[1].classList.add("active");

        },3000);


        setTimeout(() => {

            // Step 3 → YELLOW OFF → RED ON
            lights[1].classList.remove("active");
            lights[0].classList.add("active");

            // Move to next signal
            signalIndex = (signalIndex + 1) % allSignals.length;

            runSignal(); // repeat

        },5000);
    }

    runSignal();
}
