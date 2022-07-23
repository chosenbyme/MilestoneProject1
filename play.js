// the loop function here is inspirated by Captain Anonymous https://codepen.io/anon/pen/jzpZMa?editors=0011
const loop = async () => {
    let result = document.Get
  while (result != 'dead') {
    result = await GetUserChoice()
    if(DemonHP <= 0 && HeroHP > 0 ){
        Win()
      }
    if(DemonHP > 0 && HeroHP <= 0 ){
        Lose()
    }
    if(DemonHP <= 0 && HeroHP <= 0){
        Wasted()
    }
  }
}

function StartButton(){
    document.getElementById('start').remove()
    let start = document.createElement('div')
    start.textContent = 'Defeat the Demon! Use what you can!'
    start.id = 'tip'
    setTimeout(() => {start.remove()
    }, 3000);
    document.body.append(start)
    let d = newCharacter('./assets/demon_idle.gif')
    d.id = 'Demon'
    let h = newCharacter('./assets/idle.gif')
    h.id = 'Hero'
    move(d).to(500, 200)
    move(h).to(180, 200)
    HealthBar()
    BossBar()
    SPBar()
    loop()
}

function Win(){
    let end = document.createElement('img')
    end.src = './assets/victory.png'
    end.id = 'end'
    end.style.position = 'absolute'
    end.style.zIndex = '10'
    document.body.append(end)
}
function Lose(){
    let end = document.createElement('img')
    end.src = './assets/lose.png'
    end.id = 'end'
    end.style.position = 'absolute'
    end.style.zIndex = '10'
    document.body.append(end)
    document.getElementById('again').style.display = 'block'
}
function Wasted(){
    let end = document.createElement('img')
    end.src = './assets/lose.png'
    end.id = 'end'
    end.style.position = 'absolute'
    end.style.zIndex = '10'
    document.body.append(end)
    document.getElementById('again').style.display = 'block'
}
