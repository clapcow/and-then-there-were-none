
var bkg = new Image();
var grassimg = new Image();
var bulletimg = new Image();
var startscreen = new Image();
var playerimg = new Image();
var butler = new Image();
var nextlevel = new Image();
var manson = new Image();
var rogers = new Image();
var blore  = new Image();
var mac = new Image();
var outside = new Image();
var emily = new Image();
var doctor = new Image();
var wargrave = new Image();
var outsideshot = new Image();
var mansonhang = new Image();
var youwon = new Image();
var stories = [];
for(var h = 0; h <=10; h++){
	stories[h] = new Image();
	
}
var weapons = [];
for(var p = 0; p <=6; p++){
	weapons[p] = new Image();
}
var tony = new Image();
var mvs = 11;
var jump = 13
var ran = Math.floor((Math.random()*250)+150);
//velocity variables
var vx = 0, vy = 0;
//speed of clouds
var clouds = 2;
//check if your shooting a bullet
var shooting = false;
//grass speed
var grass = 0;
//check if your on the ground
var onboard = false;

//moving forward in world
var forward =  false;

var mouseY =0;
var mouseX =0;

var ctx;
var cW;
var cH;
var level = 1;
var dir = "right";
//load source images
bkg.src = "bkgimg.jpg";
grassimg.src = "grass.jpg";
startscreen.src = "keystart.jpg";
bulletimg.src = "bullet.jpg";
manson.src = "manson.jpg";
playerimg.src = "walking.png";
weapons[3].src ="axe.png";
weapons[0].src ="poison.png";
weapons[1].src = "pills.png";
weapons[2].src = "lifep.png";
weapons[4].src = "needle.png";
weapons[5].src = "arm.png";
weapons[6].src = "bear.png";
wargrave.src = "wargravedeath.jpg";
stories[0].src = "storyscreens1.jpg";
stories[1].src = "storyscreens2.jpg";
stories[2].src = "storyscreens3.jpg";
stories[3].src = "storyscreens4.jpg";
stories[4].src = "storyscreens5.jpg";
stories[5].src = "storyscreens6.jpg";
stories[6].src = "storyscreens7.jpg";
stories[7].src = "storyscreens8.jpg";
stories[8].src = "storyscreens9.jpg";
stories[9].src = "storyscreens10.jpg";
tony.src = "tony.png";
blore.src = "blore.png";
doctor.src = "doctor.png"
emily.src = "emily.png"
mac.src = "mac.png";
outside.src ="outside.png";
butler.src = "butler.png";
rogers.src ="rogers.png";
nextlevel.src = "levelcomplete.jpg";
mansonhang.src="mansonhang.png";
outsideshot.src="outsideshot.png";
youwon.src="youwon.png";
function story(){
	document.removeEventListener('keydown', story);

	ctx = document.getElementById('my_canvas').getContext('2d');
	cW = ctx.canvas.width, cH = ctx.canvas.height;
	ctx.drawImage(stories[level - 1],0, 0,600,500);
	
	document.addEventListener('keydown', startgame);

}
function odd(image){
	
	ctx = document.getElementById('my_canvas').getContext('2d');
	cW = ctx.canvas.width, cH = ctx.canvas.height;
	ctx.drawImage(image,0, 0,600,500);
	level +=1;
	document.addEventListener('keydown', story);

}
function levelstuff(bkgimg, playerx, playery, enemyx, enemyy, enemyimg, enemyw, enemyh, levelnumber, weaponw,weaponh){


	function Background(){
        this.gx = 0,this.x = 0, this.y = 0, this.w = bkg.width, this.h = bkg.height;
		//sprites.push(this);
        this.render = function(){
			
            ctx.drawImage(bkgimg, 0, 0);
			
		}
	}
	//make a background
	var sprites = [];
	var enemies = [];
	var background = new Background();
	
	function Player(){
	
        this.x = playerx, this.y = playery, this.w = 30, this.h = playerimg.height, this.hit = false;
		this.frame = 0; this.frames = 8; this.speed = 100;
		this.nextframe = new Date().getTime() + this.speed;
        ctx.fillStyle = "black";
		sprites.push(this);
        this.render = function(){
		
			ctx.drawImage(playerimg, 96*this.frame, 0, 96, 96, this.x, this.y, 96, 96);
			if("A" in keys_down || "D" in keys_down ){
				if(new Date().getTime() >= this.nextframe){
					this.frame = (this.frame+1) % this.frames;
					this.nextframe= new Date().getTime() + this.speed;
				}
		}	}
	}
	//make a new player
	var player = new Player();
	function Enemy(canvas_x , canvas_y, image_w ,image_h , imagename){
	
        this.x = canvas_x ; this.y = canvas_y; this.w = image_w; this.h = image_h;
		
        ctx.fillStyle = "black";
		sprites.push(this);
		enemies.push(this);
		this.hit = function(){
			sprites.splice(sprites.indexOf(this),1);
			enemies.splice(enemies.indexOf(this),1);
		}
        this.render = function(){
			
            ctx.drawImage(imagename, this.x, this.y, this.w, this.h);
			
		}
	}
	//make a new player
	var enemy = new Enemy(enemyx, enemyy, enemyw, enemyh, enemyimg);
	function Bullet(x, y, w, h){
		this.x = x; this.y = y; this.w = weaponw; this.h = weaponh;
		sprites.push(this);
		this.render = function(){
			ctx.drawImage(weapons[levelnumber], this.x +=14,this.y, weaponw,weaponh);
			for(var i = 0;i < enemies.length;i++){
				if(collide(this,enemies[i])){
					sprites.splice(sprites.indexOf(this),1);
					enemies[i].hit();
					level+=1;
					document.removeEventListener('keydown', keydownlistener);
					document.removeEventListener('keyup', keyuplistener);
					clearInterval(animateInterval);
					setTimeout(nextgamelevel, 10);	
				}
			}
			if(this.x >600){
				sprites.splice(sprites.indexOf(this),1);
			}
		}	
	}
	function collide(a, b) {
		return !(
			((a.y + a.h) < (b.y)) ||
			(a.y > (b.y + b.h)) ||
			((a.x + a.w) < b.x) ||
			(a.x > (b.x + b.w))
		);
	}

	function animate(){
		
        ctx.save();
        ctx.clearRect(0, 0, cW, cH);
		//load background
		background.render();
		vx = 0; 
		//gravity
		vy+=1;
		//controls
		if ("W" in keys_down && onboard){
			vy -= jump;
		}
		if ("D" in keys_down ){
			vx += mvs;
		}
		if ("A" in keys_down ){
			vx -= mvs;
			forward = false;
		}
		if (" " in keys_down ){				
			if(!shooting){
				//add bullet to array
				//gun.bullets.push({"x":player.x,"y":player.y,"w":3,"h":10});
				new Bullet(player.x, player.y);
				
				shooting = true;
			}
		}
		
		//ending controls
		//velocity
		player.x += vx;
		player.y += vy;
		onboard = false;
		
		//dont fly away player
		if(player.x <= 0){
			player.x = 1;
		}
		if(player.x >= 375){
			player.x = 374;
			if("D" in keys_down){
				forward = true;
			}

		}
		if(player.y >= 480-player.h){
			player.y = 480-player.h;
			vy = 0;
			onboard = true;
		}
		if(player.y <= 80){
			player.y = 80;
			vy = 0;
		}
		//ending of movement boundaries
		
		//drawing
	
		//render player
		//player.render();					
		for(var i = 0;i<sprites.length;i++){
			var m = sprites[i];
			m.render();	
			
		}	
		//end of drawing
        ctx.restore();
		
		
    }
	//run the function animate every 40 ms
    var animateInterval = setInterval(animate, 30);
	
	//array of keys currently down
	var keys_down = {};
	//event listener for keydown
	function keydownlistener(event){
		var key_press = String.fromCharCode(event.keyCode);
		if(key_press == "D"){
			dir = "right"
		}
		if(key_press =="A"){
			dir = "left"
		}		
        //alert(event.keyCode+" | "+key_press);
		keys_down[key_press]=1;
	}
	function keyuplistener(event) {
        var key_press = String.fromCharCode(event.keyCode);
        //alert(event.keyCode+" | "+key_press);
		if(key_press == " "){
			shooting = false;
		}
		if(key_press == "D"){
			dir = "right"
		}
		if(key_press =="A"){
			dir = "left"
		}
		delete keys_down[key_press];
	}
	document.addEventListener('keydown', keydownlistener);
	document.addEventListener('keyup', keyuplistener);
	
	
}

function startgame(event){
	document.removeEventListener('keydown', startgame);
	
	switch(level){
		case 1:

			levelstuff(manson, 150, 100, 400, 300, tony, 110, 200, 0, 30 ,30);
			break;
		case 2:
			levelstuff(manson, 150, 100, 400, 300, rogers, 110, 200, 1, 30 ,30);
			break;
		case 3:
			levelstuff(outside, 150, 100, 400, 300, mac, 90, 200,2, 70 ,70);
			break;
			
		case 4:
			levelstuff(manson, 150, 100, 400, 300, butler, 90, 200,3, 100 ,59);
			break;
		case 5:
			levelstuff(manson, 150, 100, 400, 300, emily, 90, 200,4, 60 ,20);
			break;	
		case 6:
			odd(wargrave);
			break;			
		case 7:
			levelstuff(outside, 150, 100, 400, 300, doctor, 90, 200,5, 100 ,100);
			break;		
		case 8:
			levelstuff(outside, 150, 100, 400, 300, blore, 90, 200,6, 50 ,50);
			break;		
		case 9:
			odd(outsideshot);
			break;	
		case 10:
			odd(mansonhang);
			break;
		case 11:
			odd(youwon);
			break;

	}
}
function startup(){
	ctx = document.getElementById('my_canvas').getContext('2d');
	cW = ctx.canvas.width, cH = ctx.canvas.height;
	ctx.drawImage(startscreen,0, 0);
	
	document.addEventListener('keydown', story);
	
}
function nextgamelevel(){
	ctx = document.getElementById('my_canvas').getContext('2d');
	cW = ctx.canvas.width, cH = ctx.canvas.height;
	ctx.drawImage(nextlevel,0, 0);
	
	document.addEventListener('keydown', story);
}
//eat key
window.onkeydown = function(e) { 
  return !(e.keyCode == 32);
};

//when load pages load game
window.addEventListener('load', function(event) {
    startup();
});