const planets = [];
function registerPlanet(name, coordinates, situation) {
    planets.push({
        name,
        coordinates,
        situation,
        satellites: []
    });
    alert(`The planet ${name} has been successfully registered.`);
}
function findPlanet(name) {
    const planet = planets.find(planet => planet.name === name);
    return planet ?? false;
}
function updateSituation(situation, planet) {
    planet.situation = situation;
    alert(`The situation of planet ${planet.name} has been updated to ${situation}.`);
}
function registerSatellite(name, planet) {
    planet.satellites.push(name);
    alert(`The satellite ${name} has been added to the planet ${planet.name}.`);
}
function removeSatellite(name, planet) {
    planet.satellites = planet.satellites.filter(satellite => satellite !== name);
    alert(`The satellite ${name} has been removed from the planet ${planet.name}.`);
}
function promptValidSituation() {
    let situation;
    let validSituation = false;
    while (!validSituation) {
        const situationInput = prompt('Enter the planet situation:\n1 - Inhabited\n2 - Habitable\n3 - Uninhabitable\n4 - Unexplored');
        switch (situationInput) {
            case '1':
                situation = 'Inhabited';
                validSituation = true;
                break;
            case '2':
                situation = 'Habitable';
                validSituation = true;
                break;
            case '3':
                situation = 'Uninhabitable';
                validSituation = true;
                break;
            case '4':
                situation = 'Unexplored';
                validSituation = true;
                break;
            default:
                alert('Invalid situation!');
                break;
        }
    }
    return situation;
}
function promptValidPlanet(callback) {
    const planetName = prompt('Enter the planet name:');
    const planet = findPlanet(planetName);
    if (planet) {
        callback(planet);
    }
    else {
        alert('Planet not found! Returning to the menu...');
    }
}
function firstMenuOption() {
    const name = prompt('Enter the planet name:');
    const coordinateA = Number(prompt('Enter the first coordinate:'));
    const coordinateB = Number(prompt('Enter the second coordinate:'));
    const coordinateC = Number(prompt('Enter the third coordinate:'));
    const coordinateD = Number(prompt('Enter the fourth coordinate:'));
    const situation = promptValidSituation();
    const confirmation = confirm(`Confirm the registration of planet ${name}?
    Coordinates: ${coordinateA}.${coordinateB}, ${coordinateC}.${coordinateD}
    Situation: ${situation}`);
    if (confirmation) {
        registerPlanet(name, [coordinateA, coordinateB, coordinateC, coordinateD], situation);
    }
}
function secondMenuOption() {
    promptValidPlanet(planet => {
        const situation = promptValidSituation();
        updateSituation(situation, planet);
    });
}
function thirdMenuOption() {
    promptValidPlanet(planet => {
        const satellite = prompt('Enter the name of the satellite to be added:');
        registerSatellite(satellite, planet);
    });
}
function fourthMenuOption() {
    promptValidPlanet(planet => {
        const satellite = prompt('Enter the name of the satellite to be removed:');
        removeSatellite(satellite, planet);
    });
}
function fifthMenuOption() {
    let list = 'Planets:\n';
    planets.forEach(planet => {
        const [a, b, c, d] = planet.coordinates;
        list += `
            Name: ${planet.name}
            Coordinates: (${a}, ${b}, ${c}, ${d})
            Situation: ${planet.situation}
            Satellites: ${planet.satellites.length}
        `;
        planet.satellites.forEach(satellite => {
            list += `    - ${satellite}\n`;
        });
    });
    alert(list);
}
let userOption = 0;
while (userOption !== 6) {
    const menu = `Menu
    1 - Register a new planet
    2 - Update planet situation
    3 - Add a satellite to the planet
    4 - Remove a satellite from the planet
    5 - List all planets
    6 - Exit
  `;
    userOption = Number.parseInt(prompt(menu));
    switch (userOption) {
        case 1:
            firstMenuOption();
            break;
        case 2:
            secondMenuOption();
            break;
        case 3:
            thirdMenuOption();
            break;
        case 4:
            fourthMenuOption();
            break;
        case 5:
            fifthMenuOption();
            break;
        case 6:
            alert('Closing the system...');
            break;
        default:
            alert('Invalid option! Returning to the main panel...');
            break;
    }
}
