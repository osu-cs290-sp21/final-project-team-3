var rock;
var gravity = 1;
var rocks;;
var speed= -2;
var dead = false;
var clock = 0;
var player;
var pSize = 50;
var score = 0;
var boundaries;
var boundary;
var paused = false;

var Cheight = screen.height * 0.75;
var Clength = screen.availWidth * 0.75;

function setup() 
{
console.log(Cheight);
    var canvas = createCanvas(Clength, Cheight);
    background("#96c9e3");
	player = createSprite((Cheight/2)-25,Cheight/2,pSize,pSize);
	rocks = new Group();
	boundaries = new Group();
}

function pauseMenu()
{
	if(!paused)
	{
		console.log("PAUSED");
		//later: add a HTML pause screen
		//open HTML pause screen
		paused = true;
		noLoop();
	}

	else
	{
		paused = false;
		loop();
	}

}

function jump(){ if(!dead) player.velocity.y += -25;}

function mousePressed() 
{
	jump();	
}

function deathScreen()
{
	//put up a death screen html thing
	// should have a button that allows you to restart
}

function death()
{	

	player.velocity.y = 20;
	if(player.bounce(rocks)) player.velocity.y = 0;
	for(var i = 0; i < rocks.length; i ++)rocks.get(i).velocity.x=0;

	for(var i = 0; i < boundaries.length; i ++) boundaries.get(i).velocity.x = 0;
	deathScreen();
}

function checkScore()
{
	for(var i = 0; i < boundaries.length; i ++)
	{
		if(boundaries.overlap(player, Scored)) 
		{
			score ++;	
		}
		
	}

}

function Scored(a,b)
{
	console.log(score);
	boundaries.remove(a);
	a.remove();
	
}

function createRocks()
{
		var direction
		clock ++;
		if (clock == 100)
		{
			
			direction = random(0,2);
			
			if (direction < 1) direction = 0;
			else direction = height;
			
			boundary = createSprite(Clength,Cheight,1,Cheight*2);
			//boundary.visible = false;
			
			rock = createSprite(Clength,direction,75,random(Cheight/2,Cheight));
			rock.velocity.x= speed;
			rock.immovable = true;
			boundary.velocity.x = speed;
			rocks.add(rock);
			boundaries.add(boundary);
			clock = 0;
		}			
}

function checkCollision()
{
	if(rocks.collide(player)) dead = true;

	if(player.position.y >= Cheight-(pSize/2))
	{
		dead = true;
		player.velocity.y = 0;
		player.position.y = Cheight-(pSize/2);
	}
	if(player.position.y <= 0)
	{
		player.position.y = pSize/2;
		player.velocity.y = 0;
	}
}

function draw() 
{
    background("#96c9e3");
		
	checkCollision();
	checkScore();
	
	if(dead) //DEAD
	{
		console.log("Oh no! You have died.");
		death();
	}
	else //NOT DEAD
	{
		player.velocity.y +=gravity;			
		createRocks();
	}
	
	if(dead && player.position.y >= Cheight-(pSize/2)) 
	{
		console.log("Score: " + score);
		noLoop();
	} 

	
	drawSprites();

}

document.addEventListener('keyup', function(event) 
{
	if(event.keyCode === 80)
	{	
		console.log("KEYDOWN");
		pauseMenu();
	}
});

document.addEventListener('keydown', function(event)
{
	if(event.keyCode == 32)
	{
		jump();	
	}
});
