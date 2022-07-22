//declaration of main functions
function HealthBar(){
    let HPbar = document.getElementById('HeroHP')
    HPbar.style.display = 'flex'
    HPbar.style.position = 'absolute'
    HPbar.style.zIndex = '2'
    move(HPbar).to(280, 350)
    return HPbar   
}
function BossBar(){
let Bossbar = document.getElementById('DemonHP')
Bossbar.style.display = 'flex'
Bossbar.style.position = 'absolute'
Bossbar.style.zIndex = '2'
move(Bossbar).to(850, 520)
return Bossbar 
}
function SPBar(){
    let SPbar = document.getElementById('HeroSP')
    SPbar.style.display = 'flex'
    SPbar.style.position = 'absolute'
    SPbar.style.zIndex = '2'
    move(SPbar).to(280, 327)
    return SPbar 
    }
//battle stat parameters declaritions(global)
var HeroHP = 999
var DemonHP = 3999
var SP = 100
var dmg = 0
var cost = 0

function SPstat(){    
    let k = Math.round(SP)
    setTimeout(function(){
        document.getElementById('Herosp').style.width = k + '%'; 
        document.getElementById('sp').textContent = k + '%'}, 0)
    }

function SPgain(){
    if(Math.random() < 0.99 && SP < 100){
        SP += 10
        SPstat()
    }
    if(SP<=0){skill.remove();ultimate.remove()}
    if(SP<20){skill.remove()}
    return SP
}
function SPclear(){
    SP = 0
    if (SP < 0 ){
        SP = 0
        SPstat()
    }
    SPstat()
    skill.remove();
    ultimate.remove();
    return SP
}
function SPcost(){
    SP -= 20
    if (SP < 0 ){
        SP = 0
        SPstat()
    }
    SPstat()
    if(SP<=0){skill.remove();ultimate.remove()}
    if(SP<20){skill.remove()}
    return SP
}

function DMstat(){    
    let z = Math.round(DemonHP/3999*100)
    setTimeout(function(){
        document.getElementById('Demonhp').style.width = z + '%'; 
        document.getElementById('dhp').textContent = z + '%'}, 0)
    }
function HPstat(){    
        let z = Math.round(HeroHP/999*100)
        setTimeout(function(){
            document.getElementById('Herohp').style.width = z + '%'; 
            document.getElementById('hhp').textContent = z + '%'}, 0)
        }
function HeroAttack(){
    dmg = Math.floor(Math.random() * 51)+299
    DemonHP -= dmg
    if (DemonHP < 0 ){
        DemonHP = 0
    }
    DMstat()
    return DemonHP
}

function HeroSkill(){
    dmg = Math.floor(Math.random() * 100)+500
    DemonHP -= dmg
    if (DemonHP < 0 ){
        DemonHP = 0
    }
    DMstat()
    return DemonHP  
}
function HeroUltimate(){
    dmg = Math.round(SP*(Math.floor(Math.random() * 5)+18))
    DemonHP -= dmg
    if (DemonHP < 0 ){
        DemonHP = 0
    }
    DMstat()
    return DemonHP  
}
function DemonAttack(){
    dmg = Math.floor(Math.random() * 34)+66
    HeroHP -= dmg
    if (HeroHP < 0 ){
        HeroHP = 0
    }
    HPstat()
    // const effect0 = newEffect(600,600,3)
    // const effect1 = newEffect(700,600,4)
    // const effect2 = newEffect(800,600,5)
    // async function moveEffect(){
    //     await Promise.all[
    //         effect0.LowLeft(1800,'./assets/effect/fire_strike_2.gif',2000,'./assets/effect/fire_explosion.gif'),
    //         effect1.LowLeft(2000,'./assets/effect/fire_strike_2.gif',2000,'./assets/effect/fire_explosion.gif'),
    //         effect2.LowLeft(1800,'./assets/effect/fire_strike_2.gif',2000,'./assets/effect/fire_explosion.gif')
    //     ]
    // }
    // moveEffect()
    return HeroHP  
}
function DemonSkill(){
    dmg = Math.floor(Math.random() * 41)+129
    HeroHP -= dmg
    if (HeroHP < 0 ){
        HeroHP = 0
    }
    HPstat()
    return HeroHP    
}
function DemonUltimate(){
    dmg = Math.floor(Math.random() * 51)+229
    HeroHP -= dmg
    if (HeroHP < 0 ){
        HeroHP = 0
    }
    HPstat()
    return HeroHP     
}

///Skill effect

async function GetUserChoice(){
    let PlayDiv = document.createElement('div')
    let attack = document.createElement('input')
    PlayDiv.style.position = 'relative'
    PlayDiv.style.zIndex = '2'
    attack.setAttribute('type', 'image');
    attack.src = "./assets/test.png"
    attack.style.position = 'relative'
    attack.style.zIndex = '2'
    attack.id = 'attack'
    attack.setAttribute('title', 'Heroic Strike'); 
    move(attack).to(400, 330)
    let skill = document.createElement('input')
    skill.setAttribute('type', 'image');
    skill.src = "./assets/test.png"
    skill.style.position = 'relative'
    skill.style.zIndex = '2'
    skill.id = 'skill'
    skill.setAttribute('title', 'Blade Storm'); 
    move(skill).to(400, 250)
    let ultimate = document.createElement('input')
    ultimate.setAttribute('type', 'image');
    ultimate.src = "./assets/test.png"
    ultimate.style.position = 'relative'
    ultimate.style.zIndex = '2'
    ultimate.id = 'ultimate'
    ultimate.setAttribute('title', 'Light of the Dawn');
    move(ultimate).to(400, 170)
    PlayDiv.append(attack,skill,ultimate)
    document.body.append(PlayDiv)
// the resolve function here is inspirated by Captain Anonymous https://codepen.io/anon/pen/jzpZMa?editors=0011
    return new Promise(function(resolve){attack.addEventListener('click', function(){
            HeroAttack()
            DemonAttack()
            SPgain()
            let i = Math.random()
            if(i<0.12){
                DemonSkill()
            }
            if(i>0.9 && i<1){
                DemonUltimate()
            }
            resolve(DemonHP <= 0 || HeroHP <= 0? 'dead': 'no')
            PlayDiv.remove()
        })
        skill.addEventListener('click', function(){
            HeroSkill()
            DemonAttack()
            SPcost()
            if(i<0.16){
                DemonSkill()
            }
            if(i>0.9 && i<1){
                DemonUltimate()
            }
            resolve(DemonHP <= 0 || HeroHP <= 0? 'dead': 'no')
            PlayDiv.remove()
        })
        ultimate.addEventListener('click', function(){
            HeroUltimate()
            DemonAttack()
            SPclear()
            if(i<0.16){
                DemonSkill()
            }
            if(i>0.9 && i<1){
                DemonUltimate()
            }
            PlayDiv.remove();
            resolve(DemonHP <= 0 || HeroHP <= 0? 'dead': 'no')
        })
    }
    )
}

function newCharacter(url){
    let image = document.createElement('img')
    image.src = url
    image.style.position = 'relative'
    image.style.zIndex = '2'
    document.body.append(image)
    return image
}

function move(element) {
    element.style.position = 'fixed'
    function moveToCoordinates(left, bottom) {
        element.style.left = left + 'px'
        element.style.bottom = bottom + 'px'
    } 
    function moveCharacter(){ 
        if(direction === 'left'){
            x-=1
        }
        if(direction === 'up'){
            y+=1
        }
        if(direction === 'right'){
            x+=1
        }
        if(direction === 'down'){
            y-=1
        }
        element.style.left = x + 'px'
        element.style.bottom = y + 'px'
    }
        
        setInterval(moveCharacter, 1)
        return {
            to: moveToCoordinates
        }
    }

    function newImage(url){
        let effect = document.createElement('img')
        effect.src = url
        effect.style.position = 'relative'
        effect.style.zIndex = '2'
        document.body.append(effect)
        return effect
    }

    function newEffect(x, y, q) {
        let element = newImage('./assets/effect/fire_strike_2.gif')
        element.style.zIndex = q;
        element.style.position = 'absolute'
        let direction = null;
        function moveCharacter() {
            if (direction === 'left') {
                x -= 1
            }
            if (direction === 'up') {
                y += 1
            }
            if (direction === 'right') {
                x += 1
            }
            if (direction === 'down') {
                y -= 1
            }
            if (direction === 'upleft') {
                x -= 1
                y += 1
            }
            if (direction === 'upright') {
                x += 1
                y += 1
            }
            if (direction === 'lowleft') {
                x -= 1
                y -= 1
            }
            if (direction === 'lowright') {
                x += 1
                y -= 1
            }
            element.style.left = x + 'px'
            element.style.bottom = y + 'px'
        }
    
        setInterval(moveCharacter, 1)
        async function UpRight(time,url,time2,url2) {
            direction = 'upright'
            element.src = url
            await sleep(time)
            stop(time2,url2)
        }
        async function LowRight(time,url,time2,url2) {
            direction = 'lowright'
            element.src = url
            await sleep(time)
            stop(time2,url2)
        }
        async function UpLeft(time,url,time2,url2) {
            direction = 'upleft'
            element.src = url
            await sleep(time)
            stop(time2,url2)
        }
        async function LowLeft(time,url,time2,url2) {
            direction = 'lowleft'
            element.src = url
            await sleep(time)
            stop(time2,url2)
        }
        async function GoRight(time,url,time2,url2) {
            direction = 'right'
            element.src = url
            await sleep(time)
            stop(time2,url2)
        }
    
        async function GoUp(time,url,time2,url2) {
            direction = 'up'
            element.src = url
            await sleep(time)
            stop(time2,url2)
        }
    
        async function GoLeft(time,url,time2,url2) {
            direction = 'left'
            element.src = url
            await sleep(time)
            stop(time2,url2)
        }
    
        async function GoDown(time,url,time2,url2) {
            direction = 'down'
            element.src = url
            await sleep(time)
            stop(time2,url2)
        }
    
        async function stop(time2,url2) {
            direction = null
            element.src = url2
            await sleep(time2)
            element.remove()
        }
    
        return {
            element: element,
            UpRight: UpRight,
            UpLeft: UpLeft,
            LowRight: LowRight,
            LowLeft: LowLeft,
            GoRight: GoRight,
            GoLeft: GoLeft,
            GoUp: GoUp,
            GoDown: GoDown,
            stop: stop
        }
    }

function sleep(time){
    return new Promise(resolve => {
        setTimeout(resolve, time)
    })  
}
