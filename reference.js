<!doctype html>
<html>
  <head>
    <title>4 Way Traffic Light</title>
    <style>
      table {
        border-collapse: collapse;
        margin: auto;
        margin-top: 50px;
      }

      td {
        width: 120px;
        height: 120px;
        text-align: center;
      }

      .road {
        background-color: #555;
      }

      .signal {
        background: black;
        width: 40px;
        padding: 10px;
        border-radius: 10px;
        margin: auto;
      }

      .light {
        width: 25px;
        height: 25px;
        border-radius: 50%;
        margin: 5px auto;
        background: grey;
      }

      .red {
        background: red;
      }
      .yellow {
        background: yellow;
      }
      .green {
        background: lime;
      }
    </style>
  </head>
  <body>
    <table border="2">
      <tr>
        <td></td>
        <td class="road">
          <div class="signal" id="north">
            <div class="light" id="n-red"></div>
            <div class="light" id="n-yellow"></div>
            <div class="light" id="n-green"></div>
          </div>
        </td>
        <td></td>
      </tr>

      <tr>
        <td class="road">
          <div class="signal" id="west">
            <div class="light" id="w-red"></div>
            <div class="light" id="w-yellow"></div>
            <div class="light" id="w-green"></div>
          </div>
        </td>

        <td style="background: lightgray"></td>

        <td class="road">
          <div class="signal" id="east">
            <div class="light" id="e-red"></div>
            <div class="light" id="e-yellow"></div>
            <div class="light" id="e-green"></div>
          </div>
        </td>
      </tr>

      <tr>
        <td></td>
        <td class="road">
          <div class="signal" id="south">
            <div class="light" id="s-red"></div>
            <div class="light" id="s-yellow"></div>
            <div class="light" id="s-green"></div>
          </div>
        </td>
        <td></td>
      </tr>
    </table>
  </body>
  <script>
    function resetLights() {
      document.querySelectorAll(".light").forEach((light) => {
        light.classList.remove("red", "yellow", "green");
      });
    }

    function setLight(direction, color) {
      document.getElementById(direction + "-" + color).classList.add(color);
    }

    // Traffic cycle
    function runTraffic() {
      // North & South GREEN
      resetLights();
      setLight("n", "green");
      setLight("s", "green");
      setLight("e", "red");
      setLight("w", "red");

      setTimeout(() => {
        resetLights();
        setLight("n", "yellow");
        setLight("s", "yellow");
        setLight("e", "red");
        setLight("w", "red");
      }, 3000);

      setTimeout(() => {
        resetLights();
        setLight("n", "red");
        setLight("s", "red");
        setLight("e", "green");
        setLight("w", "green");
      }, 5000);

      setTimeout(() => {
        resetLights();
        setLight("n", "red");
        setLight("s", "red");
        setLight("e", "yellow");
        setLight("w", "yellow");
      }, 8000);
    }

    setInterval(runTraffic, 10000);
    runTraffic();
  </script>
</html>
