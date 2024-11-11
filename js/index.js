const btnPlay = document.querySelector('.btn-play');
const btnRestart = document.querySelector('.btn-restart');
const menu = document.querySelector('.field__menu');
const end = document.querySelector('.end');
const andrey = document.querySelector('.andrey');
const dick = document.querySelector('.dick')
const eatingFoodMusic = new Audio('../audio/food_G1U6tlb.mp3')
const gameOverMusic = new Audio('../audio/sound_ErK79lZ.mp3')

let counterText = document.querySelector('.counter')
let position = 20;
let intervalId, intervalIdDick, counter;
let positionDick = Math.floor(Math.random() * 720 + 40);
console.log(counterText.textContent) 

function displacement(direction) {
    if (direction === 'ArrowLeft') {
        position = Math.min(position + 20, 400);
    }
    if (direction === 'ArrowRight') {
        position = Math.max(position - 20, -360);
    }
    andrey.style.left = `calc(50% - ${position}px)`
}

function startMove(e) {
    if (intervalId) return;

    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        intervalId = setInterval(() => displacement(e.key), 40);
    }
}  

function endMove(e) {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      clearInterval(intervalId);
      intervalId = null;
    }
} 

btnPlay.addEventListener('click', () => {
    menu.classList.add('hide');
    startGame();
})

btnRestart.addEventListener('click', () => {
    counter = 0;
    counterText.textContent = '0';
    clearInterval(intervalIdDick);
    clearInterval(intervalId);
    document.removeEventListener('keydown', startMove);
    document.removeEventListener('keyup', endMove);

    dick.style.animation = 'none'; // Остановка анимации
    dick.offsetHeight; // Принудительное перерисовывание для сброса анимации
    dick.style.animation = 'fall 1.25s linear forwards';
    end.style.transform = 'scale(0)';
    startGame();
})


function startGame() {
    counter = 0;
    dick.style.animation = 'fall 1.25s linear forwards'

    dick.style.left = `${positionDick}px`
    intervalIdDick = setInterval(() => {
        checkTouch();
    }, 10)
    
    function checkTouch() {
        let andreyRect = andrey.getBoundingClientRect();
        let dickRect = dick.getBoundingClientRect();
        if (andreyRect.left <= dickRect.right &&
            andreyRect.right >= dickRect.left &&
            andreyRect.top <= dickRect.bottom &&
            andreyRect.bottom >= dickRect.top
        ) {
            eatingFoodMusic.play()
            counter++;
            counterText.textContent = counter;
            updatePositionDick()
        } else if (dickRect.bottom >= 450) {
            gameOverMusic.play()
            clearInterval(intervalIdDick);
            clearInterval(intervalId);
            end.style.transform = 'scale(1)';
            document.removeEventListener('keydown', startMove)
        }
    
        
    }
    
    function updatePositionDick() {
        dick.style.animation = 'none';  // приостановить анимацию
        dick.offsetHeight;
        dick.style.animation = 'fall 1.25s linear forwards'
        positionDick = Math.floor(Math.random() * 720 + 40);
        dick.style.left = `${positionDick}px`
    }
    
    
    document.addEventListener('keydown', startMove)
    document.addEventListener('keyup', endMove)
  
}

