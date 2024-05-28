const line = document.querySelector('.line');

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        line.setAttribute('appear', "");
        line.addEventListener('animationend', () => {
            aniText('MEGAHRY.2L');
            gameListAn();
        }, {once: true});
    }, 500);
});

const textDiv = document.querySelector('.headingCon');
function aniText(text, i = 0) {
    if (i === 0) {
        textDiv.textContent = '';
        textDiv.classList.add('ready');
    }
    textDiv.textContent += text[i];
    if (i < text.length - 1) {
        setTimeout(() => aniText(text, i + 1), 60);
    } else {
        return
    };
};

const games = document.querySelectorAll('.game');
const gameList = document.querySelector('.gameList');
let delay = -50;

function gameListAn() {
    gameList.style.visibility = 'visible';
    gameList.classList.add('ready');
    setTimeout(() => {
        for (let i = 0; i < games.length; i++) {
            delay = delay + 75;
            setTimeout(() => {
                games[i].setAttribute('appear', "");
                games[i].addEventListener('animationend', () => {
                    games[i].classList.add('ready');
                    games[i].addEventListener('click', openMenu, false);
                }, {once: true});
            }, delay);
        }
    }, 500);
};


const gameStatsArray = {
    maxwell: {
        name: 'Legenda o Maxwellovi',
        description: 'RPG webová hra s příběhem.<br>Probojuj se až 10 zónami plných nepřátel.<br>Staň se nejsilnějším!',
        img: './Assets-Library/legendOfMaxwellLarge.png',
        link: 'https://tucnuc.github.io/Legend-of-Maxwell/menu.html',
        creator: 'Dev: Adam Černý'
    },
    chess: {
        name: 'Magchess',
        description: 'Máš rád šachy? Tak si pojď zahrát!<br>Hraj s kamarádem nebo proti počítači.',
        img: './Assets-Library/magchessLarge.png',
        link: 'https://m-brachtl.github.io/chess_web/index.html',
        creator: 'Dev: Matěj Brachtl'
    }
}
const gameStatsKeys = Object.keys(gameStatsArray);

const blur = document.getElementById('blur');
const menu = document.getElementById('menu');
const background = document.querySelector('.background');
const body = document.body;

const menuHeading = document.querySelector('.menuHeading');
const menuBackgroundImg = document.getElementById('menuBackgroundImg');
const menuDescription = document.querySelector('.menuDescription');
const gameLinkBtn = document.querySelector('.gameLinkBtn');
const creator = document.querySelector('.creator');

let isMenuOpening = false;

function openMenu(event) {
    console.log(event.target.id);
    event.stopPropagation();

    let specificGame = event.target.id ? document.getElementById(event.target.id) : event.target.parentNode;
    let indexOfGame = gameStatsKeys.indexOf(specificGame.id);
    let gameStats = gameStatsArray[gameStatsKeys[indexOfGame]];

    if (indexOfGame !== -1) {
        isMenuOpening = true;
        menu.classList.add('closableMenu')

        menuHeading.innerHTML = gameStats.name;
        menuBackgroundImg.src = gameStats.img;
        menuDescription.innerHTML = gameStats.description;
        gameLinkBtn.href = gameStats.link;
        creator.innerHTML = gameStats.creator;

        blur.style.display = 'block';
        blur.setAttribute('appear', "");
        background.style.display = 'block';
        background.setAttribute('appear', "");
        body.style.overflow = 'hidden';

        background.addEventListener('animationend', () => {
            if (isMenuOpening) {
                setTimeout(() => {
                    menu.style.display = 'flex';
                    menu.setAttribute('appear', "");
                }, 250);
            }
        });

        let windowClickHandler = () => {
            if (menu.classList.contains('closableMenu')) {
                isMenuOpening = false;

                background.removeAttribute('appear');
                background.style.display = 'none';

                blur.setAttribute('disappear', "")
                menu.setAttribute('disappear', "")
        
                let animationEndHandler = () => {
                    blur.removeAttribute('appear');
                    menu.removeAttribute('appear');
                    menu.removeAttribute('disappear')
                    blur.removeAttribute('disappear')
                    menu.style.display = 'none';
                    blur.style.display = 'none';
                    menu.classList.remove('closableMenu')
                    menu.removeEventListener('animationend', animationEndHandler)
                    body.style.overflow = '';
                }
        
                menu.addEventListener('animationend', animationEndHandler)
                window.removeEventListener('click', windowClickHandler)
            }
        }
        window.addEventListener('click', windowClickHandler)
    } else {
        console.error('Game not found:', event.target.id);
    }
}