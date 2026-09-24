//Global Variables :p
const game=document.getElementById('gamecanvas');
const ctx=game ? game.getContext('2d'):null;
const start_button=document.getElementById('start');
let player={
    x:60,
    y:60,
    width:25,
    height:25,
    speed:5,
    health:10,
    velocityY:0,
    grounded:false,
}
const gravitypower=0.1;
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

function border() {
    player.x = Math.max(0, Math.min(player.x, game.width - player.width));
    player.y = Math.max(0, Math.min(player.y, game.height - player.height));
}

window.addEventListener('keydown',(event)=>{ //key input
const key=event.key.toLowerCase();
if (key === '1') {
    player.health = Math.max(0, player.health - 1);
    event.preventDefault();
}
if (key === '5') {
     mode="gravity"
    event.preventDefault();
}
if(key in keys){
    keys[key]=true;
    event.preventDefault();  
}
});
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
            player.velocityY = -10;
            player.grounded = false;
        }
    } else {
        if (keys.w || keys.arrowup) player.y -= player.speed;
        if (keys.s || keys.arrowdown) player.y += player.speed;
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
        
        default:
            console.log("Ngl twin there's nothing here.(unknown image)")    
    }
}

function gravity() {
    if (mode !== "gravity") return;

    player.grounded = false;

   
    if (!(keys.w || keys.arrowup) && player.velocityY < 0) {
        player.velocityY *= 0.5;
    }

    player.velocityY += gravitypower;
    player.y += player.velocityY;

    if (player.y + player.height >= floor) {
        player.y = floor - player.height;
        player.velocityY = 0;
        player.grounded = true;
    }
}


function loop60fps() {
    if(!game || !ctx)return;
     ctx.clearRect(0, 0, game.width, game.height); // Makes the game run smoothly
     movementupdate();
     gravity();
    border();
    hp();
    requestAnimationFrame(loop60fps);
}
 function hp() {
    if (mode==="gravity") {
        if(player.health=== 10){ 
        draw("gravity10");
    };
    if (player.health ===9) {
        draw("gravity9")
    }
    if(player.health=== 8){
        draw("gravity8");
    };
    if (player.health ===7) {
        draw("gravity7")
    }
    if(player.health=== 6){
        draw("gravity6");
    };
    if (player.health ===5) {
        draw("gravity5")
    }
    if (player.health ===4) {
        draw("gravity4")
    } 
    if(player.health=== 3){
        draw("gravity3");
    };
    if (player.health ===2) {
        draw("gravity2")
    }
    if(player.health=== 1){
        draw("gravity1");
    };
    if (player.health ===0) {
        draw("gravity0")
    }
    } else {
        if(player.health=== 10){ //Too lazy to make a switch
        draw("player10");
    };
    if (player.health ===9) {
        draw("player9")
    }
    if(player.health=== 8){
        draw("player8");
    };
    if (player.health ===7) {
        draw("player7")
    }
    if(player.health=== 6){
        draw("player6");
    };
    if (player.health ===5) {
        draw("player5")
    }
    if (player.health ===4) {
        draw("player4")
    } 
    if(player.health=== 3){
        draw("player3");
    };
    if (player.health ===2) {
        draw("player2")
    }
    if(player.health=== 1){
        draw("player1");
    };
    if (player.health ===0) {
        draw("player0")
    }
 }
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
