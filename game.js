//Global Variables :p
const game=document.getElementById('gamecanvas');
const ctx=game ? game.getContext('2d'):null;
const start_button=document.getElementById('start');
const laserimg=document.querySelectorAll('img[src*="/lasers/"]');
const img = new Image();
img.src = "lasers/laser1.svg";
let player={
    x:60,
    y:60,
    width:25,
    height:25,
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
    width:25,
    height:25,
    speed:10,
    health:10,
    velocityY:0,
    grounded:false,
    }
}
function border() {
    player.x = Math.max(0, Math.min(player.x, game.width - player.width)); //stops the player from escaping
    player.y = Math.max(0, Math.min(player.y, game.height - player.height));
}

window.addEventListener('keydown',(event)=>{ //key input
const key=event.key.toLowerCase();
if (key === '1') {
    player.health = Math.max(0, player.health - 1);
    event.preventDefault();
}
if (key === '2') {
    player.health = Math.max(0, player.health + 1);
    event.preventDefault();
}
if (key === '5') {
    if (mode === "normal") {
        mode = "gravity";
    } else if (mode === "gravity") {  //Mode switch
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

function movementupdate() {
    if (keys.a) player.x -= player.speed;
    if (keys.d) player.x += player.speed; //movement code
    if(keys.arrowleft)player.x -=player.speed;
    if(keys.arrowright) player.x +=player.speed;

    if (mode === "gravity") {
        if ((keys.w || keys.arrowup) && player.grounded) {
            player.velocityY = -15;
            player.grounded = false;
        }
    } else {
        if (mode==="normal") {
        if (keys.w || keys.arrowup) player.y -= player.speed;
        if (keys.s || keys.arrowdown) player.y += player.speed;
    }else{
        if (keys.w || keys.arrowup) player.y -= player.speed;
        if (keys.s || keys.arrowdown) player.y += player.speed;
    }
}
}



start_button.addEventListener('click', startgame);

//Resizing
function resize() {
    if (!game) return;

    const resizeCanvas = () => {
        game.width = window.innerWidth;
        game.height = window.innerHeight; //Window resizing
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
}
//Fuctions
function draw(type){ //Massive img loader
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
const laserimages = [];

for (let index = 0; index < 6; index++) {
    const image = new Image();
    image.src = `lasers/laser${index + 1}.svg`;
    laserimages.push(image);
}

let laseractive = false;

let laserstat = {
    img: laserimages[0],
    width: game.width,
    height: game.height,
    opacity: 0,
    x: 0,
    y: 0,
};

function randomLaser() {
    const random = Math.floor(Math.random() * laserimages.length);
    laserstat.img = laserimages[random];
    laserstat.width = game.width;
    laserstat.height = game.height;
    laserstat.x = 0;
    laserstat.y = 0;
}

function drawlaser() {
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
}
 function hp() {
    const skinPrefix = mode === "bounce"
        ? "bounce"
        : mode === "gravity"
            ? "gravity"
            : "player";

    draw(skinPrefix + player.health);
 }
const laserTime=(ms)=>new Promise((resolve) => setTimeout(resolve, ms));

async function fire() {
    if (laseractive) return;

    laseractive = true;
    randomLaser();

   laserstat.opacity = 0.2;
await laserTime(300);

laserstat.opacity = 0.4;
await laserTime(300);

laserstat.opacity = 0.7;
await laserTime(300);

laserstat.opacity = 1;
await laserTime(400);

laserstat.opacity = 0.7;
await laserTime(200);

laserstat.opacity = 0.4;
await laserTime(200);

    laserstat.opacity = 0;
    laseractive = false;
}

function loop60fps() {
    if(!game || !ctx)return;
     ctx.clearRect(0, 0, game.width, game.height); // Makes the game run smoothly
     movementupdate();
     gravity();
    border();
    if (!laseractive) {
        fire();
    }
    if (laseractive) {
        drawlaser();
    }
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
