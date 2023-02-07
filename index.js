//total hours in the year
const totalHours = 15 * 5 * 4 * 9;
const tubeCost = 7;
const MIN = 100;
const MAX = 200;

var totalCost = 0;
var totalBrokenTubes = 0;

//returns between 100 and 200
function rand() {
  return Math.floor(Math.random() * (MAX - MIN + 1)) + MIN;
}

function setTubeUnits() {
  return {
    tubes: [rand(), rand(), rand(), rand()],
    healthyTubes: 4,
  };
}

const tubeUnits = [undefined, undefined, undefined, undefined];

function init() {
  tubeUnits.forEach((unit, index) => {
    tubeUnits[index] = setTubeUnits();
    totalCost += tubeCost * 4; // first 16 tubes
  });
}

function replaceAll(unit) {
  for (let index = 0; index < unit.tubes.length; index++) {
    unit.tubes[index] = rand();
  }
}

function runHour(unit) {
  return new Promise((resolve) => {
    let tubes = unit.tubes;
    for (let index = 0; index < tubes.length; index++) {
      tubes[index]--;
      if (tubes[index] === 0) {
        unit.healthyTubes -= 1;
        totalBrokenTubes += 1;
      }
      if (unit.healthyTubes == 2) {
        replaceAll(unit); //replace all 4 tubes in the unit
        unit.healthyTubes = 4;
        totalCost += tubeCost * 4;
      }
    }
    resolve();
  });
}

init();

(async () => {
  for (let hour = 0; hour < totalHours; hour++) {
    await runHour(tubeUnits[0]);
    await runHour(tubeUnits[1]);
    await runHour(tubeUnits[2]);
    await runHour(tubeUnits[3]);
  }
})().then(() => {
  console.log(`Total broken tubes: ${totalBrokenTubes}`);
  console.log(
    `Total cost in 1 year per classroom: $${totalCost} approximately.`
  );
});

// The total cost could differ in each classroom, since the random function will not always return
// same value
