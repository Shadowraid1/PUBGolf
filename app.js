const teams = ["Team Tipico", "Team Rente in Sicht"];
const tasks = [
    "Trinkt ein Bier in unter 4 Schlücken!",
    "Bestelle dem gegnerischen Team etwas zu trinken",
    "Finde ein ungewöhnliches Weihnachtsmarkt-Essen und esse es! Das komischste gegessene Essen gewinnt! Zeit 10 Minuten",
    "Fotografiert den lustigsten Weihnachtspulli, den Ihr findet! Zeit 10 Minuten",
    "Kauft ein Soplica für das gegnerische Team, wer den Geschmack zuerst errät, bekommt einen Punkt!",
    "Wer das hässlichste Weihnachtsgeschenk für unter 5€ kauft, gewinnt! Zeit 10 Minuten!",
    "Beerpong time!!! Suche eine Bar oder die Wohnung auf und spiele eine Runde!",
    "Trinke ein Bier ohne deine Hände zu benutzen -> Teamarbeit ist gefragt!",
    "Münzwurf: Das führende Team darf wählen, Verlierer zahlt eine Runde!",
    "Geht auf den Weihnachtsmarkt, teilt euch auf und bestellt ein Getränk für euren Partner. Sollte es das gleiche sein, bekommen die Gegner einen Punkt! (Achtung: keine Absprache und kein Glühwein)",
    "Du musst etwas aus der Bar finden, das keinem anderen Spieler zuvor aufgefallen ist. Spielt abwechselnd, das Team, welches es zuerst errät, bekommt den Punkt! (Ich sehe was, das du nicht siehst)",
    "Money Money Money: Beide Teams geben heimlich Trinkgeld. Welches Team das größte gibt, gewinnt!",
    "Insta King: Teilt euch auf und macht ein 'besoffenes Foto'. Alle Gegenstände sind erlaubt. Das Team mit dem besten Foto gewinnt!",
    "Fli Fla Flu: Verlierer zahlt und bekommt einen Punkt! (Battle Royale)",
    "10 Minuten Zeit: Wer findet die meisten Zwerge? (Selfies mit ihnen) gewinnt!",
    "Auf Ex: Das nächste Getränk muss auf Ex geleert werden!"
];
const penalties = [
    "Du bist endlich Tinitus frei alle wollen mit dir Feiern gib eine Shot runde aus!",
    "Jaskuka! Sucht ein öffentlichen Platz auf und haltet 45 Sekunden lang Jaskuka Achtung sollte einer aus dem Team die Balance verlieren geht der Spaß von vorne los.",
    "Hot dog pause ALLE ab zum Zapka verlierendes Team zahlt",
    "Sucht eine Karaoke bar auf und singt ein Weihnachtslied",
    "Yoga Pause macht 1 Minute auf der Straße Yoga",
    "Schön würzig dein nächstes Getränk gibt es mit einer Prise Pfeffer",
    "Geldsegen Hey Ihr Großverdiener die nächste Runde geht auf euch",
    "Doppelter Shot Fehler bestelle in der nächsten Runde dein Getränk zweimal",
    "Dance off führt ein Tanz battel gegeneinander auf (30 Sekunden)",
    "20 Kniebeugen an Ort und Stelle runter mit euch!",
    "Geteiltes Leid ist halbes Leid jedes Team würfelt (nehmt Siri keiner hat ein Würfel dabei) die Anzahl der nächsten Shots aus",
    "Happy Birthday alle gratulieren dir, das gegnerische Team bekommt einen Punkt.",
    "Mister International sprecht die nächsten 10 Minuten mit französischem Akzent",
    "Viva la Mexico Tequila für alle!!",
    "Faultier euer nächstes Bier muss mit einem Löffel getrunken werden",
    "Pinguin-Walk: Lauf wie ein Pinguin zur nächsten Bar",
    "Social battery auf zur Shotbar! Gebt einer fremden Gruppe einen Shot aus und macht ein Erinnerungsbild mit ihnen"
];

let scores = { "Team Tipico": 0, "Team Rente in Sicht": 0 };
let usedTasks = [];
let usedPenalties = [];
let roundCount = 0;
let isButtonPressed = false;
let showingPenalty = false;
let quizStarted = false;
let quizQuestions = [
    { question: "Was ist 2 + 2?", answer: "4" },
    { question: "Was ist die Hauptstadt von Frankreich?", answer: "Paris" },
    { question: "Wie viele Kontinente gibt es?", answer: "7" },
    { question: "Wer schrieb 'Hamlet'?", answer: "Shakespeare" },
    { question: "Wie heißt der höchste Berg der Welt?", answer: "Mount Everest" },
    { question: "Was ist der chemische Name von Wasser?", answer: "H2O" },
    { question: "Welches Element hat das Symbol 'O'?", answer: "Sauerstoff" }
];
let currentQuestionIndex = 0;

const chanceCard = document.getElementById("chanceCard");
const startBtn = document.getElementById("startBtn");
const roundLabel = document.getElementById("roundLabel");
const controls = document.getElementById("controls");
const scoreBoard = document.getElementById("scoreBoard");

const redTeamBtn = document.createElement("button");
redTeamBtn.textContent = "Team Tipico drückt!";
redTeamBtn.className = "btn primary";
redTeamBtn.style.display = "none";
redTeamBtn.addEventListener("click", () => handleButtonPress("Team Tipico"));

const blueTeamBtn = document.createElement("button");
blueTeamBtn.textContent = "Team Rente in Sicht drückt!";
blueTeamBtn.className = "btn primary";
blueTeamBtn.style.display = "none";
blueTeamBtn.addEventListener("click", () => handleButtonPress("Team Rente in Sicht"));

const bothTeamsBtn = document.createElement("button");
bothTeamsBtn.textContent = "Beide Teams Punkten";
bothTeamsBtn.className = "btn secondary";
bothTeamsBtn.style.display = "none";
bothTeamsBtn.addEventListener("click", bothTeamsScore);

const nextTaskBtn = document.createElement("button");
nextTaskBtn.textContent = "Nächste Aufgabe";
nextTaskBtn.className = "btn secondary small";
nextTaskBtn.style.display = "none";
nextTaskBtn.addEventListener("click", showNextCard);

controls.appendChild(redTeamBtn);
controls.appendChild(blueTeamBtn);
controls.appendChild(bothTeamsBtn);
controls.appendChild(nextTaskBtn);

startBtn.addEventListener("click", startGame);

function startGame() {
    startBtn.style.display = "none";
    redTeamBtn.style.display = "block";
    blueTeamBtn.style.display = "block";
    bothTeamsBtn.style.display = "block";
    nextTaskBtn.style.display = "block";
    isButtonPressed = false;
    roundCount = 0;
    redTeamBtn.disabled = false;
    blueTeamBtn.disabled = false;
    showNextCard();
}

function handleButtonPress(team) {
    if (isButtonPressed) return;

    isButtonPressed = true;

    if (team === "Team Tipico") {
        scores["Team Rente in Sicht"]++;
    } else {
        scores["Team Tipico"]++;
    }

    // Timeout to give a short delay before proceeding to the next round
    setTimeout(nextRound, 1000);
}

function nextRound() {
    roundCount++;
    if (roundCount === 11) {
        startQuiz();
        return;
    }
    updateScoreBoard();
    showNextCard();

    isButtonPressed = false;
    redTeamBtn.disabled = false;
    blueTeamBtn.disabled = false;
}

function showNextCard() {
    roundLabel.textContent = `Runde ${roundCount + 1}`;

    if (showingPenalty) {
        if (penalties.length === 0) {
            chanceCard.textContent = "Alle Strafkarten wurden genutzt!";
            penalties.push(...usedPenalties); // Refill the penalties
            usedPenalties = [];
        } else {
            const penalty = getRandomItemAndRemove(penalties);
            chanceCard.textContent = `Strafe: ${penalty}`;
            usedPenalties.push(penalty); // Add to used penalties
        }
    } else {
        if (tasks.length === 0) {
            // Alle Aufgaben wurden erledigt, das Spiel beenden und den Gewinner anzeigen
            const winner = scores["Team Tipico"] < scores["Team Rente in Sicht"] ? "Team Tipico" : "Team Rente in Sicht";
            const loser = scores["Team Tipico"] >= scores["Team Rente in Sicht"] ? "Team Tipico" : "Team Rente in Sicht";
            chanceCard.textContent = `${loser} hat das Spiel verloren! ${winner} ist der Gewinner!🍺`;

            tasks.push(...usedTasks); // Refill the tasks
            usedTasks = [];
            endGame(); // Beendet das Spiel, wenn keine Aufgaben mehr übrig sind
            return;
        } else {
            const task = getRandomItemAndRemove(tasks);
            chanceCard.textContent = `Aufgabe: ${task}`;
            usedTasks.push(task); // Add to used tasks
        }
    }

    // Wechseln zwischen Aufgaben und Strafen
    showingPenalty = !showingPenalty;
}

function endGame() {
    alert("Alle Aufgaben wurden erledigt! Das Spiel ist zu Ende.");
    // Zeige den endgültigen Punktestand
    updateScoreBoard();
}

function startQuiz() {
    if (quizStarted) return; // Sicherstellen, dass das Quiz nicht doppelt startet

    alert("Quiz Time bestellt ein neues Getränk!");
    setTimeout(() => {
        quizStarted = true;
        currentQuestionIndex = 0;
        showNextQuestion();
    }, 2000);
}

function showNextQuestion() {
    if (currentQuestionIndex >= quizQuestions.length) {
        alert("Das Quiz ist vorbei! Weiter geht's mit den Aufgaben.");
        quizStarted = false;
        return;
    }

    const question = quizQuestions[currentQuestionIndex];
    const userAnswer = prompt(question.question);

    if (userAnswer.toLowerCase() === question.answer.toLowerCase()) {
        alert("Richtig der Gegner lässt eine Shot Runde springen!");
        scores["Team Tipico"]++; // Beispiel für Punktevergabe, je nach Team
    } else {
        alert(`Falsch du zahlst eine Shot Runde! Die richtige Antwort ist: ${question.answer}`);
    }

    currentQuestionIndex++;
    showNextQuestion(); // Rekursion für die nächste Frage
}

function getRandomItemAndRemove(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    const item = array[randomIndex];
    array.splice(randomIndex, 1);
    return item;
}

function updateScoreBoard() {
    scoreBoard.innerHTML = `
        <h2>Aktueller Punktestand:</h2>
        <p>Team Tipico: ${scores["Team Tipico"]}</p>
        <p>Team Rente in Sicht: ${scores["Team Rente in Sicht"]}</p>
    `;
}

function bothTeamsScore() {
    scores["Team Tipico"]++;
    scores["Team Rente in Sicht"]++;
    updateScoreBoard();
    nextRound();
}
