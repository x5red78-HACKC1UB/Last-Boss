//Global Variables :p
const game=document.getElementById('gamecanvas');
const ctx=game ? game.getContext('2d'):null;
const start_button=document.getElementById('start');
const laserimg=document.querySelectorAll('img[src*="/lasers/"]');
const img = new Image();
img.src = "lasers/laser1.svg";
let direction="up";
let dashallowed=true;
let isDashing=false;
 let dashX=0;
let dashY=0;
let phase=1;
let attackchosen=null;
let player={
    x:60,
    y:60,
    width:20,
    height:20,
    speed:5,
    health:10,
    velocityY:0,
    grounded:false,
};
let gravitypower=0.25;
const bouncegravitypower=0.3;
const bounceDamping=0.95;
const floor=window.innerHeight;
let keys={
    a:false,
    s:false,
    w:false,
    d:false,
    arrowleft:false,
    arrowright:false,
    arrowup:false,
    arrowdown:false,
}
let mode="normal";
let laserRequested = false;
const dashTime=(ms)=>new Promise((resolve) => setTimeout(resolve, ms));

// keys for different modes
if(mode==="normal"){
    keys={
    a:false,
    s:false,
    w:false,
    d:false,
    arrowleft:false,
    arrowright:false,
    arrowup:false,
    arrowdown:false,
}
} else{
    if (mode==="gravity") {
        keys={
    a:false,
    w:false,
    d:false,
    arrowleft:false,
    arrowright:false,
    arrowup:false,
}
    }
}
if(mode==="bounce"){
    player={
    x:60,
    y:60,
    width:20,
    height:20,
    speed:10,
    health:10,
    velocityY:0,
    grounded:false,
    }
}
//border
function border() {
    player.x = Math.max(0, Math.min(player.x, game.width - player.width)); //stops the player from escaping
    player.y = Math.max(0, Math.min(player.y, game.height - player.height));
}
//KEYS
window.addEventListener('keydown',(event)=>{ //key input
const key=event.key.toLowerCase();
if(event.code==='Space'){
    dash();
    event.preventDefault();
}
if (key === '1') {
    player.health = Math.max(0, player.health - 1);
    event.preventDefault();
}
if (key === '2') {
    player.health = Math.max(0, player.health + 1);
    event.preventDefault();
}
if (key === '6') {
    boss();
    event.preventDefault();
}
if (key === '7') {
  laserRequested=true;
    event.preventDefault();
}
if (key === '5') {
    if (mode === "normal") {
        mode = "gravity";
    } else if (mode === "gravity") {  
        mode = "bounce";
    } else {
        mode = "normal";
    }
    player.velocityY = 0;
    player.grounded = false;
    event.preventDefault();
}
if(key in keys){
    keys[key]=true;
    event.preventDefault();  
}
});     //Key up
window.addEventListener('keyup',(event)=>{
const key=event.key.toLowerCase();
if(key in keys){
    keys[key]=false;
    event.preventDefault();
}
});
//MOVEMENT
function movementupdate() {
    if (isDashing) return;

    if (keys.a) { player.x -= player.speed; dashX=-50; }
    if (keys.d) { player.x += player.speed; dashX=50;} //movement code
    if (keys.arrowleft) { player.x -= player.speed; dashX=-50}
    if (keys.arrowright) { player.x += player.speed; dashX=50 }

    if (mode === "gravity") {
        if ((keys.w || keys.arrowup) && player.grounded) {
            player.velocityY = -15;
            player.grounded = false;
        }
    } else {
        if (mode==="normal") {
        if (keys.w || keys.arrowup) { player.y -= player.speed; dashY=-50; }
        if (keys.s || keys.arrowdown) { player.y += player.speed;  dashY=50; }
    }else{
        if (keys.w || keys.arrowup) { player.y -= player.speed; dashY=-50;}
        if (keys.s || keys.arrowdown) { player.y += player.speed; dashY=50; }
    }
}
}
// DASH!!!!!!  wait, like geometry dash?
function dash() {
    if(!dashallowed)return;
    if (mode !== "normal") return;

    const dashDistance=250;
    const dashSteps=10;
    dashX=0;
    dashY=0;
    if (keys.a || keys.arrowleft) dashX=-dashDistance;
    if (keys.d || keys.arrowright) dashX=dashDistance;
    if (keys.w || keys.arrowup) dashY=-dashDistance;
    if (keys.s || keys.arrowdown) dashY=dashDistance;
    if (dashX===0 && dashY===0) dashY=-dashDistance;

    dashallowed=false;
    isDashing=true;
    let distance=0;
    const dashInterval=setInterval(() => {
        player.x += dashX / dashSteps;
        player.y += dashY / dashSteps;
        distance += dashDistance / dashSteps;
        border();

        if (distance >= dashDistance) {
            clearInterval(dashInterval);
            isDashing=false;
            dashX=0;
            dashY=0;
            setTimeout(() => { dashallowed=true; }, 500);
        }
    }, 16);
}


//start button ...
start_button.addEventListener('click', startgame);

//RESIZE WINDOW!!!!!
function resize() {
    if (!game) return;

    const resizeCanvas = () => {
        game.width = window.innerWidth;
        game.height = window.innerHeight; //Window resizing
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
}

function draw(type){ //Massive img loader DRAW
    switch(type){
        case "player10":
            ctx.fillStyle="white"
            ctx.fillRect(player.x,player.y,player.width,player.height)
            break;
        case "player9":
            ctx.fillStyle="rgb(199, 199, 199)";
            ctx.fillRect(player.x,player.y,player.width,player.height)
            break;
        case "player8":
            ctx.fillStyle="rgb(173, 171, 171)"
            ctx.fillRect(player.x,player.y,player.width,player.height)
            break;
        case "player7":
            ctx.fillStyle="rgb(156, 156, 156)"
            ctx.fillRect(player.x,player.y,player.width,player.height)
            break;
        case "player6":
            ctx.fillStyle="rgb(129, 129, 129)"
            ctx.fillRect(player.x,player.y,player.width,player.height)
            break;
        case "player5":
            ctx.fillStyle="rgb(103, 103, 103)"
            ctx.fillRect(player.x,player.y,player.width,player.height)
            break;
        case "player4":
            ctx.fillStyle="rgb(81, 81, 81)"
            ctx.fillRect(player.x,player.y,player.width,player.height)
            break;
        case "player3":
            ctx.fillStyle="rgb(60,60,60)"
            ctx.fillRect(player.x,player.y,player.width,player.height)
            break;
        case "player2":
            ctx.fillStyle="rgb(40,40,40)"
            ctx.fillRect(player.x,player.y,player.width,player.height)
            break;
        case "player1":
            ctx.fillStyle="rgb(20,20,20)"
            ctx.fillRect(player.x,player.y,player.width,player.height)
            break;
        case "player0":
            ctx.fillStyle="black"
            ctx.fillRect(player.x,player.y,player.width,player.height)
            break;


        case "gravity10":
            ctx.fillStyle="rgb(13, 0, 255)"
            ctx.fillRect(player.x,player.y,player.width,player.height)
            break;
        case "gravity9":
            ctx.fillStyle="rgb(12, 1, 216)";
            ctx.fillRect(player.x,player.y,player.width,player.height)
            break;
        case "gravity8":
            ctx.fillStyle="rgb(13, 0, 171)"
            ctx.fillRect(player.x,player.y,player.width,player.height)
            break;
        case "gravity7":
            ctx.fillStyle="rgb(12, 0, 156)"
            ctx.fillRect(player.x,player.y,player.width,player.height)
            break;
        case "gravity6":
            ctx.fillStyle="rgb(13, 1, 129)"
            ctx.fillRect(player.x,player.y,player.width,player.height)
            break;
        case "gravity5":
            ctx.fillStyle="rgb(12, 0, 103)"
            ctx.fillRect(player.x,player.y,player.width,player.height)
            break;
        case "gravity4":
            ctx.fillStyle="rgb(13, 1, 81)"
            ctx.fillRect(player.x,player.y,player.width,player.height)
            break;
        case "gravity3":
            ctx.fillStyle="rgb(12,0,60)"
            ctx.fillRect(player.x,player.y,player.width,player.height)
            break;
        case "gravity2":
            ctx.fillStyle="rgb(13,1,40)"
            ctx.fillRect(player.x,player.y,player.width,player.height)
            break;
        case "gravity1":
            ctx.fillStyle="rgb(13,1,20)"
            ctx.fillRect(player.x,player.y,player.width,player.height)
            break;
        case "gravity0":
            ctx.fillStyle="black"
            ctx.fillRect(player.x,player.y,player.width,player.height)
            break;
        
        case "bounce10":
            ctx.fillStyle="rgb(238, 255, 0)"
            ctx.fillRect(player.x,player.y,player.width,player.height)
            break;
        case "bounce9":
            ctx.fillStyle="rgb(202, 216, 0)";
            ctx.fillRect(player.x,player.y,player.width,player.height)
            break;
        case "bounce8":
            ctx.fillStyle="rgb(176, 189, 0)"
            ctx.fillRect(player.x,player.y,player.width,player.height)
            break;
        case "bounce7":
            ctx.fillStyle="rgb(144, 154, 0)"
            ctx.fillRect(player.x,player.y,player.width,player.height)
            break;
        case "bounce6":
            ctx.fillStyle="rgb(111, 102, 0)"
            ctx.fillRect(player.x,player.y,player.width,player.height)
            break;
        case "bounce5":
            ctx.fillStyle="rgb(88, 71, 0)"
            ctx.fillRect(player.x,player.y,player.width,player.height)
            break;
        case "bounce4":
            ctx.fillStyle="rgb(59, 50, 0)"
            ctx.fillRect(player.x,player.y,player.width,player.height)
            break;
        case "bounce3":
            ctx.fillStyle="rgb(38, 25, 0)"
            ctx.fillRect(player.x,player.y,player.width,player.height)
            break;
        case "bounce2":
            ctx.fillStyle="rgb(13, 11, 0)"
            ctx.fillRect(player.x,player.y,player.width,player.height)
            break;
        case "bounce1":
            ctx.fillStyle="rgb(6, 5, 0)"
            ctx.fillRect(player.x,player.y,player.width,player.height)
            break;
        case "bounce0":
            ctx.fillStyle="black"
            ctx.fillRect(player.x,player.y,player.width,player.height)
            break;
        default:
            console.log("Ngl twin there's nothing here.(unknown image)")    
    }
}
//GRAVITY
function gravity() {
    if (mode !== "gravity" && mode !== "bounce") return;
if (mode==="gravity") {
    player.grounded = false; // grounded prevent jumping in the air

   
    if (!(keys.w || keys.arrowup) && player.velocityY < 0) {
        player.velocityY *= 0.8;
    }

    player.velocityY += gravitypower; //increases downward velocity :P
    player.y += player.velocityY;

    if (player.y + player.height >= game.height) {
        player.y = game.height - player.height;
        player.velocityY = 0;
        player.grounded = true;
    }
} else{
    player.velocityY += bouncegravitypower;
    player.y += player.velocityY;
    
    
    if (player.y + player.height >= game.height) {
        player.y = game.height - player.height;
        player.velocityY = -Math.abs(player.velocityY) * bounceDamping;
    }
}
}
//LASERS
const laserimages = [];

for (let index = 0; index < 12; index++) {
    const image = new Image();
    image.src = `lasers/laser${index + 1}.svg`;
    laserimages.push(image);
}

const laserstats = [];

function randomLaser() {
    const random = Math.floor(Math.random() * laserimages.length);
    return {
        img: laserimages[random],
        width: game.width,
        height: game.height,
        opacity: 0,
        x: 0,
        y: 0,
    };
}
function selectedattack(attack) {
     attackchosen=`lasers/laser${attack}.svg`
     if (Number(attack)>12 || Number(attack)<1&& Number.isInteger(attack)) {
        attack=1;
        attackchosen=`lasers/laser${attack}.svg`
     }
 laserRequested=true;
}

function drawlaser() {
    laserstats.forEach((laserstat) => {
        if (!laserstat.img) return;

        ctx.save();
        ctx.globalAlpha = laserstat.opacity;
        ctx.drawImage(
            laserstat.img,
            laserstat.x,
            laserstat.y,
            laserstat.width,
            laserstat.height
        );
        ctx.restore();
    });
}

const laserTime=(ms)=>new Promise((resolve) => setTimeout(resolve, ms));
async function boss() {
    await laserTime(3000);
selectedattack(1);
await laserTime(1500);
selectedattack(3);
await laserTime(1000);
selectedattack(2);
await laserTime(1000);
selectedattack(5);
await laserTime(1750);
selectedattack(5);
await laserTime(500);
selectedattack(6);
await laserTime(500);
selectedattack(9);
await laserTime(1000);
selectedattack(10);
await laserTime(1750);
selectedattack(10);
await laserTime(400);
selectedattack(11);
await laserTime(2500);
selectedattack(12);
await laserTime(7);
selectedattack(12);
await laserTime(1750);
selectedattack(9);
await laserTime(500);
selectedattack(7);
await laserTime(5000);
selectedattack(3);
await laserTime(1000);
selectedattack(2);
await laserTime(2000);
selectedattack(7);
await laserTime(300)
selectedattack(11);
await laserTime(500);
selectedattack(10);
await laserTime(300);
selectedattack(11);
await laserTime(500);
selectedattack(7);
await laserTime(300);
selectedattack(11);
await laserTime(500);
selectedattack(10);
await laserTime(300);
selectedattack(11);
await laserTime(800);
selectedattack(1);
await laserTime(3000);
selectedattack(2);
await laserTime(1100);
phase=2;
}
async function fire() {
    let laserstat;
    if (attackchosen) {
        const chosenlaser= new Image();
        chosenlaser.src=attackchosen;

        laserstat = {
            img: chosenlaser,
      width: game.width,
      height: game.height,
      opacity: 0,
      x: 0,
      y: 0,
        };
        attackchosen = null;
    }else{
laserstat= randomLaser();
    }
    laserstats.push(laserstat);


laserstat.opacity = 0.4;  //laser animation
await laserTime(1000);

laserstat.opacity = 1;
await laserTime(50);

laserstat.opacity=0.95;
await laserTime(50);

laserstat.opacity=0.9;
await laserTime(50);
laserstat.opacity=0.85;
await laserTime(50);

laserstat.opacity = 0.8;
await laserTime(50);
laserstat.opacity=0.75;
await laserTime(50);

laserstat.opacity=0.7;
await laserTime(50);

laserstat.opacity=0.65;
await laserTime(50);

laserstat.opacity = 0.6;
await laserTime(50);

laserstat.opacity=0.55;
await laserTime(50);

laserstat.opacity=0.5;
await laserTime(50);

laserstat.opacity=0.45;
await laserTime(50);

laserstat.opacity=0.4;
await laserTime(50);
laserstat.opacity=0.35;
await laserTime(50);

laserstat.opacity=0.3;
await laserTime(50);

laserstat.opacity=0.25;
await laserTime(50);

laserstat.opacity=0.2;
await laserTime(50);

laserstat.opacity=0.15;
await laserTime(50);

laserstat.opacity=0.1;
await laserTime(50);

laserstat.opacity=0.05;
await laserTime(50);

    laserstat.opacity = 0;
    laserstats.splice(laserstats.indexOf(laserstat), 1);
}
//MODE DRAW
 function hp() {
    let skinPrefix;

     switch (mode) {
        case "bounce":
            skinPrefix = "bounce";
            break;

        case "gravity":
            skinPrefix = "gravity";
            break;

        default:
            skinPrefix = "player";
            break;
     }

    draw(skinPrefix + player.health);
 }

 //GAMELOOP (smooth things go here)
function loop60fps() {
    if(!game || !ctx)return;
     ctx.clearRect(0, 0, game.width, game.height); // Makes the game run smoothly
     movementupdate();
     gravity();
    border();
    if (laserRequested) {
        laserRequested = false;
        fire();
    }
    drawlaser();
    
    hp();
    requestAnimationFrame(loop60fps);
}
//Start Game
function startgame() {
    document.body.classList.add("game-started");
    if (start_button) {
        start_button.classList.add("game-started");
    }
    resize();
    loop60fps();
   
}


// TABLE of stuff
// Line 1: global var
// Line 42: keys for different modes
// Line 78: borders
// Line 83: keys(any key input here)
// Line 130: Movement
// Line 154: dash
// Line 189: start button
// Line 192: Resizing
// Line 205: MASSIVE img loader
// Line 346:Gravity(bounce and gravity)
// Line 376: Lasers
// Line 421: BOOSSS
//Line 512: hp(mode drawing here)
// Line 533: Gameloop
//Line 549: Start game
//Line 561: Table of contents(just incase you forgot)
