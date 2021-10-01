//On va définir les variables: const => éléments ne doivent pas être changés
const guessedWord = document.getElementById("word");
const wrongLetters = document.getElementById("wrong-letters");
const playAgainBtn = document.getElementById("playagain-button");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");

//On va définir le corps du pendu => querySelectorAll permet de sélectionner toutes les classes "figure-part"
const figurePart = document.querySelectorAll("figure-part");

//Création de la liste des mots
words = [
  "application",
  "programmation",
  "interface",
  "composante",
  "ordinateur",
  "javascript",
];

//Sélectionner un mot pour jouer => on veut que le choix des mots par le serveur soit aléatoire (Math.random) par rapport au nombre de mots (words.length)
//Math.floor => il va arrondir au nombre le plus bas
let selectedWord = words[Math.floor(Math.random() * words.length)];

//Créer une variable pour contenir (tableau) toutes les mauvaises lettres et une variable pour contenir toutes les lettres du mot à trouver
const rightLettersArr = [];
const wrongLettersArr = [];

//Afficher le mot caché en laissant apparaître les lignes
function displayWord() {
  guessedWord.innerHTML = `
            ${selectedWord
              .split("") //On veut chaque des lettres séparées (split)
              .map(
                //On va passé les lettres une à la fois (map)
                //Si (?) ça inclue la bonne lettre, on marque la lettre sinon (:) on le laisse vide (' ')
                (letter) => ` 
                            <span class="letter">
                             ${rightLettersArr.includes(letter) ? letter : ""} 
                            </span>
                        `
              )
              //Une fois les lettres trouvées, on va les rassembler(join)
              .join("")} 
    `;
  const internalWord = guessedWord.innerText.replace(/\n/g, "");
  console.log(guessedWord.innerText, internalWord);

  //On compare le guessedWord avec le mot à trouver
  if (internalWord === selectedWord) {
    finalMessage.innerText = "Congratulations! You won!";
    popup.style.display = "flex";
  }
}

//MAUVAISES LETTRES

function updateWrongLetter() {
  wrongLetters.innerHTML = `
      ${wrongLettersArr.map((letter) => `<span>${letter}</span>`)}`;
}

//On veut afficher le pendu; il y a 6 parties donc les parties vont aller de 0-5
figurePart.forEach((part, index) => {
  let errors = wrongLettersArr.length;

  //Si l'index est plus petit que le nombre d'erreurs
  if ((index = errors)) {
    part.style.display = "block";
  } else {
    part.style.display = "none";
  }
});

//On veut vérifier si on a perdu
if (wrongLettersArr.length === figurePart.length) {
  finalMessage.innerText = "You lose!";
  popup.style.display = "flex";
}

//AFFICHER LA NOTIFICATION

function displayNotification() {
  notification.classList.add("display");

  setTimeout(() => {
    notification.classList.remove("display");
  }, 2000);
}

//EVENT LISTENERS

//On aimerait que l'utilisateur tape  les lettres sur le clavier(keydown) (EventListeners)
//window => constante qui permet de taper n'importe où sur la page/la fenêtre
//e => la touche qui est utilisé sur le clavier
window.addEventListener("keydown", (e) => {
  //console.log(e.keycode) => keycode => clavier virtuel où les lettres sont remplacées par des nombres (ex. 'a' = 65 et 'z' = 90).
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key; //key = a

    //console.log(letter);
    if (selectedWord.includes(letter)) {
      //Si la lettre fait partie du mot sélectionné

      //Si la lettre n'a pas encore été pesée, on va l'inclure dans les bonnes lettres et on va afficher le mot
      if (!rightLettersArr.includes(letter)) {
        rightLettersArr.push(letter);

        displayWord();

        //Si la lettre a déjà été mise, on affiche la notification
      } else {
        displayNotification();
      }
    } else {
      //Si la lettre ne fait pas partie du mot sélectionné
      if (!wrongLettersArr.includes(letter)) {
        //Si la lettre ne fait pas partie du array, on le rajoute
        wrongLettersArr.push(letter);

        updateWrongLetter();
      } else {
        //Si la lettre fait partie du array
        displayNotification();
      }
    }
  }
});

//Rejouer et redémarrer
playAgainBtn.addEventListener("click", () => {
  //vider les arrays
  rightLettersArr.splice(0);
  wrongLettersArr.splice(0);

  selectedWord = words[Math.floor(Math.random() * words.length)];

  displayWord();

  updateWrongLetter();

  popup.style.display = "none";
});
displayWord();
