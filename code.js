var pos=[15];
var foodPos=[18,74];

var canvas=document.getElementById("myCanvas");
var ctx=canvas.getContext("2d");
var celldim=60;
var x=celldim/2;
var y=celldim/2;
var dx=10;
var dy=-10;
var snakeX=null;
var snakeY=null;
var foodX=null;
var foodY=null;
var currdir=null;

function checkSelfCollision(){
var foofoo=pos[pos.length-1];
for(i=0;i<pos.length-1;i++)
{
    if( pos[i]==foofoo){
        return true;
    }

}
return false;

}



function gameOver(){
alert("GAME OVER");
document.location.reload();
clearInterval(interval); 


}

function randNo()
{ var foo;
   
   while(true){
     foo=Math.floor((Math.random() * 100) + 1);
   if(foo>=1&&foo<=100&&!(pos.includes(foo))){
       return foo;
   }
   

}

}



function drawVertLines(){
 for( i =0;i<=canvas.height;i+=celldim){
        
    ctx.beginPath();

    ctx.moveTo(i,0);
    ctx.lineTo(i,canvas.height);
    ctx.strokeStyle="black";
    ctx.lineWidth=2;
    ctx.stroke();
    }
}
function drawHorizLines(){
 for( i =0;i<=canvas.width;i+=celldim){
        
    ctx.beginPath();

    ctx.moveTo(0,i);
    ctx.lineTo(canvas.width,i);
    ctx.strokeStyle="black";
    ctx.lineWidth=2;
    ctx.stroke();
    }
}

function snakeCell(){
    
    for(i=0;i<pos.length;i++){
     if(pos[i]%10==0){
         snakeY=celldim*((pos[i]/10)-1);
         snakeX=celldim*9;

     }   
    else{
    snakeY=celldim*Math.floor(pos[i]/10);
    snakeX=celldim*((pos[i]%10)-1);
    }


    ctx.beginPath();

    ctx.rect(snakeX,snakeY,celldim,celldim);
    ctx.fillStyle="pink";
    ctx.fill();
    ctx.closePath();
    }

}
function drawFood(){
    
    for(i=0;i<foodPos.length;i++){
        if(foodPos[i]%10==0){
            foodY=celldim*((foodPos[i]/10)-1);
            foodX=celldim*9;
   
        }   
       else{
       foodY=celldim*Math.floor(foodPos[i]/10);
       foodX=celldim*((foodPos[i]%10)-1);
       }
   


    ctx.beginPath();

    ctx.rect(foodX,foodY,celldim,celldim);
    ctx.fillStyle="black";
    ctx.fill();
    ctx.closePath();
    }

}

function draw(){
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    




    if(currdir=="right"){
        if ((pos[pos.length-1])%10==0)
        {
            gameOver();
        }
        pos.push(pos[pos.length-1]+1);
  
}
   
    if(currdir=="left"){
        if ((pos[pos.length-1])%10==1)
        {
            gameOver();
        }
        
        pos.push(pos[pos.length-1]-1);
        
    }
    
    if(currdir=="up"){
        if ((pos[pos.length-1]-10)<=0)
        {
            gameOver();
        }
        pos.push(pos[pos.length-1]-10);
       
        
    }
    
    if(currdir=="down"){
        if ((pos[pos.length-1]+10)>100)
        {
            gameOver();
        }
        pos.push(pos[pos.length-1]+10);
       
    }
    if(currdir!=null){

    if(!(foodPos.includes(pos[pos.length-1]))){
        pos.shift();
    }

    else{
        foodPos.push(randNo());
        foodPos.shift();
    }
}

if(checkSelfCollision()){
    gameOver();
}



 
    drawFood();
    snakeCell();
    
    drawVertLines();
    drawHorizLines();

    

}

document.addEventListener("keydown",keyDownHandler,false);


function keyDownHandler(e){
if(e.key=="Right"||e.key=="ArrowRight"){
    currdir="right";
}
else if(e.key=="Left"||e.key == "ArrowLeft"){
    currdir="left" ;
}
else if(e.key=="Up"||e.key == "ArrowUp"){
    currdir="up" ;
}
else if(e.key=="Down"||e.key == "ArrowDown"){
    currdir="down" ;
}
}

   




setInterval(draw,600);
