const loop = async () => {
    let result = document.Get
  while (result != 'dead') {
    result = await GetUserChoice()
  }
}

function StartButton(){
    let startbutton = document.getElementById('start')
    startbutton.remove()
    move(newCharacter('./assets/demon_idle.gif')).to(500, 200)
    move(newCharacter('./assets/idle.gif')).to(180, 200)
    HealthBar()
    BossBar()
    SPBar()
    loop().then(() => console.log('Victory'))
}

