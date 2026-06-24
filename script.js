const canvas=document.getElementById("canvas");
const ctx=canvas.getContext("2d");

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

const count=document.getElementById("count");

class Ball{

constructor(){

this.radius=Math.random()*20+10;

this.x=Math.random()*(canvas.width-this.radius*2)+this.radius;

this.y=Math.random()*(canvas.height-this.radius*2)+this.radius;

this.dx=(Math.random()*4)-2;

this.dy=(Math.random()*4)-2;

this.color=`hsl(${Math.random()*360},100%,50%)`;

}

draw(){

ctx.beginPath();

ctx.arc(this.x,this.y,this.radius,0,Math.PI*2);

ctx.fillStyle=this.color;

ctx.shadowBlur=20;

ctx.shadowColor=this.color;

ctx.fill();

ctx.closePath();

}

update(){

if(this.x+this.radius>canvas.width||this.x-this.radius<0){
this.dx=-this.dx;
}

if(this.y+this.radius>canvas.height||this.y-this.radius<0){
this.dy=-this.dy;
}

this.x+=this.dx;

this.y+=this.dy;

this.draw();

}

}

let balls=[];

for(let i=0;i<15;i++){
balls.push(new Ball());
}

function animate(){

ctx.fillStyle="rgba(17,17,17,0.3)";
ctx.fillRect(0,0,canvas.width,canvas.height);

balls.forEach(ball=>ball.update());

count.textContent=balls.length;

requestAnimationFrame(animate);

}

animate();

window.addEventListener("keydown",e=>{

if(e.code==="Space"){
balls.push(new Ball());
}

});

canvas.addEventListener("click",e=>{

balls=balls.filter(ball=>{

const dx=e.clientX-ball.x;

const dy=e.clientY-ball.y;

return Math.sqrt(dx*dx+dy*dy)>ball.radius;

});

});

setInterval(()=>{

document.body.style.background=
`hsl(${Math.random()*360},30%,10%)`;

},3000);

window.addEventListener("resize",()=>{

canvas.width=window.innerWidth;

canvas.height=window.innerHeight;

});
