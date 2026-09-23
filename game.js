//Global Variables :p
const game=document.getElementById('gamecanvas');
const ctx=game ? game.getContext('2d'):null;
const start_button=document.getElementById('start');
let player={
    x:60,
    y:60,
    width:5,
    height:5,
    speed:10,
    health:10,
}



start_button.addEventListener('click', startgame);

//Resizing
function resize() {
    window.addEventListener('resize',()=>{
    if(!game){
game.width=window.innerWidth;
game.height=window.innerHeight;
    }
});
}
//Fuctions
function draw(type){
    switch(type){
        case "player":
            ctx.fillStyle="white"
            ctx.fillRect(player.x,player.y,player.width,player.height)
            break;
        default:
            console.log("Ngl twin there's nothing here.(unknown image)")    
    }
}

window.addEventListener('keydown',(event)=>{
if (event.key.toLowerCase() === 'w') {
    player.y -= player.speed;

    ctx.clearRect(0,0,game.width,game.height);
    draw("player");
}
});
function loop60fps() {
    if(!game || !ctx)return;
     ctx.clearRect(0, 0, game.width, game.height);
    draw("player");
    requestAnimationFrame(loop60fps)
}

//Start Game
function startgame() {
    
    document.body.classList.add("game-started");
resize();
loop60fps();



}
