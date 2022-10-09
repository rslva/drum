// Identificar qual tecla foi pressionada e executar o áudio

document.body.addEventListener('keypress', key =>{
    playSound(key.code.toLowerCase());  // tolowercase deixará o código da tecla todo minusculo
});

function playSound(sound){
    let audio = document.querySelector(`#s_${sound}`);   // identificando a tag audio no html

    if(audio){
        audio.currentTime = 0;  // zerar o play antes de tocar novamente, sem esperar o som finalizar 
        audio.play();  // se o audio exister, execute a função 'play'
    };

    let key = document.querySelector(`div[data-key="${sound}"]`);  // selecionando a div de cada tecla no html

    if(key){
        key.classList.add('active');  // se key existir, add a class 'active'

        setTimeout(()=>{   // temporizador q irá remover a class active após 300 milisegundos
            key.classList.remove('active');
        }, 300);
    };
};

// Adicionar um evento de click no botão 'tocar' para fazer a composição

document.querySelector('.composer button').addEventListener('click', ()=>{
    let song = document.querySelector('input').value; // selecionando oq foi digitado no input

    // transformando oq foi digitado em uma lista
    if(song !== ""){ 
        let songArray = song.split(''); /* SPLIT irá transformar a string em array e a divisão será de acordo 
        com o parâmetro informado na função split (no caso o espaço). Cada letra digitada será um item do array */

        playComposition(songArray);
    };
});

// A função playComposition dará um loop no array e de tempos em tempos dar playSound nos itens do array

function playComposition(songArray){
    let wait = 0;

    for(let songItem of songArray){

        setTimeout(()=>{  // setTimeOut dará um intervalo entre itens
            playSound(`key${songItem}`);
        }, wait);

        wait += 250;  // este intervalo irá tocar 4 itens por segundo
        
    };
};

document.querySelectorAll('.key').forEach(item =>{
    item.addEventListener('click', ()=>{
        let clickedKey = item.getAttribute('data-key');
        playSound(clickedKey);
    });
});