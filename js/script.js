let pontos = 0;
let gameLoop; // Variável global para armazenar o loop do jogo

const pontosElemente = document.getElementById("contador");
const mario = document.querySelector('.mario-bros');
const pipe = document.querySelector('.pipe');
const winerMsgTxtElementes = document.querySelector("[data-winer-msg-txt]");
const restartBottom = document.querySelector("[data-restartBottom]");
const winerMsg = document.querySelector("[data-winermesage]");

const jump = () => {
    if (!mario.classList.contains('jump')) { // Agora verifica se o Mario já está pulando
        mario.classList.add('jump');

        setTimeout(() => {
            mario.classList.remove('jump');
        }, 900);
    }
};

const startLoop = () => {
    gameLoop = setInterval(() => {
        const pipeposition = pipe.offsetLeft;
        const marioposition = +window.getComputedStyle(mario).bottom.replace('px', '');

        if (pipeposition <= 129 && pipeposition > 0 && marioposition < 95) {
            
            pipe.style.animation = 'none';
            pipe.style.left = `${pipeposition}px`;

            mario.style.animation = 'none';
            mario.style.bottom = `${marioposition}px`;
            
            mario.src = '/img/game-over.png';
            mario.style.width = '75px';
            mario.style.marginLeft = '50px';

            winerMsgTxtElementes.innerText = `Pontuação: ${pontos}`;
            winerMsg.classList.add("shouWiner-msg");

            clearInterval(gameLoop); // Para o loop quando perde
            
        } else {
            pontos += 1;
            pontosElemente.innerText = `Pontos: ${pontos}`;
        }
    }, 10);
};

const startGame = () => {
    clearInterval(gameLoop); // Para qualquer loop antigo antes de reiniciar

    pipe.style.animation = "none"; // Remove a animação para reiniciar corretamente
    setTimeout(() => {
        pipe.style.animation = "pipe-animation 1.9s infinite linear"; // Reativa a animação do pipe
    }, 100); // Pequeno delay para garantir que a animação reinicie corretamente
    pipe.style.left = '';
    
    mario.src = '/img/mario.gif';
    mario.style.width = '150px';
    mario.style.marginLeft = '0';
    mario.style.bottom = '0';

    winerMsg.classList.remove("shouWiner-msg");

    pontos = 0;

    startLoop(); // Reinicia o loop do jogo

};

document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
        jump();
    }
});
// função para faser o jogo reiniciar quando clicar no botão
restartBottom.addEventListener("click", startGame);

// Inicia o jogo ao carregar a página
startGame();
