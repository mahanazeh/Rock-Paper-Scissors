
document.querySelector('.rules-btn').addEventListener('click', (e) =>{
    e.preventDefault();
    document.querySelector('.rules-popup').classList.toggle('rules-popup--active');
    document.querySelector('.overlay').classList.toggle('overlay--active');
  });
  document.querySelector('.close-icon').addEventListener('click', () =>{
    document.querySelector('.rules-popup').classList.remove('rules-popup--active');
    document.querySelector('.overlay').classList.toggle('overlay--active');
  });
  
  let gameItemsCont = Array.from(document.querySelectorAll("div[class^='game-body__circle-container'"));
  let x;
  let Arr = [];
  let stateFlag = false;
  let score = document.querySelector('.header__value');
  
  setScore(state = 'init', tar = score);
  
  
  gameItemsCont.forEach((e) =>{
  
    e.addEventListener('click', function(){
        // Store The Clicked Item in Variable
        x = e;
        
        move( stateFlag, gameItemsCont, X = x, tmpArr = Arr);
       
        stateFlag = true;
      
    });
  
  });
  
  
  
  function move(stateFlag, gameItemsCont, X, tmpArr){
  
    if (stateFlag === true){ 
    }
    else{
       
        document.querySelector('.bg-triangle').classList.add('bg-triangle--s2');
        document.querySelector('.choosed-item--com__bg-circle').classList.add('choosed-item--com__bg-circle--s2');
        
        
        gameItemsCont.filter((e)=>{
          
            if(X !== gameItemsCont[gameItemsCont.indexOf(e)]){
             
                tmpArr.push(e);
            }
        });
       
        let comItem = tmpArr[Math.floor(Math.random())];
        
        X.classList.add('choosed-item--user');
        tmpArr.forEach((e) =>{
            e.classList.add('unchoosed-item');
        });
        
        setTimeout(()=>{
            comItem.classList.remove('unchoosed-item');
            comItem.classList.add('choosed-item--com');
        }, 1000)
        setTimeout(()=>{
            document.querySelector('.choosed-item--com__bg-circle').classList.remove('choosed-item--com__bg-circle--s2');
        }, 1000)
      
        let headingUser = document.createElement('h3');
        let headingUserContent = document.createTextNode('You Picked');
        headingUser.classList.add('you-picked');
        headingUser.append(headingUserContent);
        X.append(headingUser);
        let headingCom = document.createElement('h3');
        let headingComContent = document.createTextNode('The house Picked');
        headingCom.append(headingComContent);
        headingCom.classList.add('you-picked');
        comItem.append(headingCom);
  
        // Check for The Winning Item
  
        if(X.className.includes('paper')){
            if(comItem.className.includes('rock')){
                // WIN
                gameOver(state = 'win', hUser1=headingUser, hCom1=headingCom);
                
                setTimeout(()=>{setScore(state = 'win', tar = score);}, 1500)
  
                setTimeout(()=>{highlightEffect(X=X);}, 1250);
            }else{
                //LOSE
                gameOver(state = 'lose', hUser1=headingUser, hCom1=headingCom);
                setTimeout(()=>{setScore(state = 'lose', tar = score);}, 1500)
                // Add Highlight Effect 
                setTimeout(()=>{highlightEffect(X=comItem);}, 1250);
            }
  
  
  
  
  
        }else if(X.className.includes('rock')){
  
            if(comItem.className.includes('scissors')){
                // WIN
                gameOver(state = 'win', hUser1=headingUser, hCom1=headingCom);
                setTimeout(()=>{setScore(state = 'win', tar = score);}, 1500);
                // Add Highlight Effect For Choosed Item
                setTimeout(()=>{highlightEffect(X=X);}, 1250);
            }else{
                //LOSE
                gameOver(state = 'lose', hUser1=headingUser, hCom1=headingCom);
                setTimeout(()=>{setScore(state = 'lose', tar = score);}, 1500);
                // Add Highlight Effect For Choosed Item
                setTimeout(()=>{highlightEffect(X=comItem);}, 1250);
            }
  
  
        }else if(X.className.includes('scissors')){
            if(comItem.className.includes('rock')){
                //LOSE
                gameOver(state = 'lose', hUser1=headingUser, hCom1=headingCom);
                setTimeout(()=>{setScore(state = 'lose', tar = score);}, 1500);
                // Add Highlight Effect For Choosed Item
                setTimeout(()=>{highlightEffect(X=comItem);}, 1250);
            }else{
                // WIN
                gameOver(state = 'win', hUser1=headingUser, hCom1=headingCom);
                setTimeout(()=>{setScore(state = 'win', tar = score);}, 1500);
                // Add Highlight Effect For Choosed Item
                setTimeout(()=>{highlightEffect(X=X);}, 1250);
            }
        }
    }
  }
  
  
  
  
  
  
  function highlightEffect(X){
    let c1 = document.createElement('div');
    let c2 = document.createElement('div');
    let c3 = document.createElement('div');
    X.append(c1);
    X.append(c2);
    X.append(c3);
    c1.classList.add('circle');
    c1.classList.add('circle--1');
    c2.classList.add('circle');
    c2.classList.add('circle--2');
    c3.classList.add('circle');
    c3.classList.add('circle--3');
  }
  
  
  
  function gameOver(state, hUser1, hCom1){
    let heading = document.createElement('h2');
    let playAgain = document.createElement('button');
    let gameOverCont  = document.createElement('div');
    let playAgainSen = document.createTextNode('Play Again');
    let win = document.createTextNode('You Win');
    let lose = document.createTextNode('You Lose');
    heading.classList.add('gameoversen');
    playAgain.classList.add('btn');
    gameOverCont.classList.add('game-over-container')
    playAgain.append(playAgainSen);
    if(state == 'win'){
        heading.append(win);
    }else if(state == 'lose'){
        heading.append(lose);
    }
    gameOverCont.append(heading);
    gameOverCont.append(playAgain);
    setTimeout(()=>{
        document.querySelector('main').insertBefore(gameOverCont, document.querySelector('.rules-btn'));
        document.querySelector('.choosed-item--user').classList.add('choosed-item--user--s4');
        document.querySelector('.choosed-item--com').classList.add('choosed-item--com--s4');
        Array.from(document.querySelectorAll('.game-body__big-circle')).forEach((e)=>{
            e.classList.add('game-body__big-circle--s4');
        });
        Array.from(document.querySelectorAll('.game-body__tiny-circle')).forEach((e)=>{
            e.classList.add('game-body__tiny-circle--s4');
        });
  
    }, 1500)
    playAgain.addEventListener('click', ()=>{initGame(btn=playAgain, heading=heading, hUser=hUser1, hCom=hCom1, gmovCon=gameOverCont)});
  }
  
  function initGame(btn,heading,hUser,hCom,gmovCon){
    document.querySelector('.bg-triangle').classList.remove('bg-triangle--s2');
    document.querySelector('.choosed-item--com__bg-circle').classList.remove('choosed-item--com__bg-circle--s2');
    document.querySelector('.choosed-item--user').classList.remove('choosed-item--user--s4');
    document.querySelector('.choosed-item--com').classList.remove('choosed-item--com--s4');
    Array.from(document.querySelectorAll('.game-body__big-circle')).forEach((e)=>{
        e.classList.remove('game-body__big-circle--s4');
    });
    Array.from(document.querySelectorAll('.game-body__tiny-circle')).forEach((e)=>{
        e.classList.remove('game-body__tiny-circle--s4');
    });
    gameItemsCont.forEach((e)=>{
        if(e.className.includes('choosed-item--user')){
            for(let i = 1; i <= 3; i++){
                document.querySelector(`.circle--${i}`).remove();
            }
            e.classList.remove('choosed-item--user');
        }else if(e.className.includes('choosed-item--com')){
            e.classList.remove('choosed-item--com');
        }else{
            e.classList.remove('unchoosed-item');
        }
    });
    btn.remove();
    heading.remove();
    gmovCon.remove();
    hUser.remove();
    hCom.remove();
    stateFlag = false;
    Arr = [];
  }
  
  
  function setScore(state, tar){
    if(state == 'win'){
        tar.textContent++;
    }else if(state == 'lose'){
        if(tar.textContent > 0){
            tar.textContent--;
        }
    }else if(state == 'init'){
        tar.textContent = 0;
    }
  }
  