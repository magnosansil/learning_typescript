const spaceships = [];
function addSpaceship(name, pilot, crewLimit) {
    const spaceship = {
        name,
        pilot,
        crewLimit,
        crew: [],
        inMission: false
    };
    spaceships.push(spaceship);
    alert(`The spaceship ${spaceship.name} was registered.`);
}
function findSpaceship(name) {
    let spaceship;
    spaceship = spaceships.find(ship => ship.name === name);
    return spaceship;
}
function addCrewMember(member, spaceship) {
    if (spaceship.crew.length >= spaceship.crewLimit) {
        alert(`${member} can't be registered. Limit reached.`);
    }
    else {
        spaceship.crew.push(member);
        alert(`${member} was added to the crew of ${spaceship.name}`);
    }
}
function sendInMission(spaceship) {
    if (spaceship.inMission) {
        alert(`${spaceship.name} can't be sent. Spaceship is already on mission.`);
    }
    else if (spaceship.crew.length < Math.floor(spaceship.crewLimit / 3)) {
        alert(`${spaceship.name} can't be sent. Insufficient crew.`);
    }
    else {
        spaceship.inMission = true;
        alert(`${spaceship.name} was sent on mission!`);
    }
}
function firstMenuOption() {
    const name = prompt('What is the name of the ship to be registered?');
    const pilot = prompt(`What is the name of ${name}'s pilot?`);
    const crewLimit = Number(prompt(`How many crew members does ${name} suport?`));
    const confirmation = confirm(`Confirm spaceship registration: ${name}\nPilot: ${pilot}\nCrew Limit: ${crewLimit}`);
    if (confirmation) {
        addSpaceship(name, pilot, crewLimit);
    }
    else {
        alert('Unregistered spaceship.');
    }
}
function secondMenuOption() {
    const member = prompt("What is the crew member's name?");
    const spaceshipName = prompt(`Which ship should ${member} be assigned to?`);
    const spaceship = findSpaceship(spaceshipName);
    if (spaceship) {
        const confirmation = confirm(`Can you confirm ${member}'s inclusion in the ${spaceship.name} crew?`);
        if (confirmation) {
            addCrewMember(member, spaceship);
        }
    }
}
function thirdMenuOption() {
    const spaceshipName = prompt('What is the name of the spaceship being sent?');
    const spaceship = findSpaceship(spaceshipName);
    if (spaceship) {
        const confirmation = confirm(`Do you confirm sending ${spaceship.name} on a mission?`);
        if (confirmation) {
            sendInMission(spaceship);
        }
    }
}
function fourthMenuOption() {
    let list = 'Registered spaceships:\n';
    if (spaceships.length == 0) {
        list = 'There are no registered ships.';
    }
    spaceships.forEach((spaceship) => {
        list += `
            Spaceship: ${spaceship.name}
            Pilot: ${spaceship.pilot}
            In mission? ${spaceship.inMission ? 'Sim' : 'Não'}
            Maximum crew size: ${spaceship.crewLimit}
            Crew: ${spaceship.crew.length}
        `;
        spaceship.crew.forEach(member => {
            list += `    - ${member}\n`;
        });
    });
    alert(list);
}
/**
 * Menu
 */
let userOption = 0;
while (userOption !== 5) {
    const menu = `Main Panel
        1 - Register a new ship
        2 - Add crew member
        3 - Send ship on mission
        4 - List registered ships
        5 - Close
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
            alert('Shutting down the system......');
            break;
        default:
            alert('Invalid option! Returning to the main panel...');
            break;
    }
}
