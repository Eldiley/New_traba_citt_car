var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y:80 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};
// criar o objeto game com propriedade do jogo
var game = new Phaser.Game(config);

var player;
var stars;
var platforms;
var cursors;
var car1;
var car2;
var car3;
var car4;
var car5;
var car6;
var car7;
var objetoconter;
var objetospeed = 100;
var objetostime;
var gameOver = false;
var textoPontos;
var textoGameOver;
var pontos = 0;
var cursors;
var speed = 5;


var acceleration= 1;


var scenarySpeed = 1; // variavel para definir a velocidade do cenario

function preload ()
{
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('estrada', 'assets/estrada.png', );
    this.load.image('principal', 'assets/principal.png');
    this.load.image('star','assets/star.png');
    this.load.image('car1','assets/car1.png');
    this.load.image('car2','assets/car2.png');
    this.load.image('car3','assets/car3.png');
    this.load.image('car4','assets/car4.png');
    this.load.image('car5','assets/car5.png');
    this.load.image('car6','assets/car6.png');
    this.load.image('car7','assets/car7.png');
    this.load.audio('musica1','music/snd_music.ogg');
    this.load.audio('musica2','music/chocar.wav');
    this.load.audio('musica3','music/gameover.wav');
    this.load.audio('musica4','music/snd_getcoin.ogg');
}


function create ()
{
    
    this.add.image(400, 300, 'sky');
    
    
    platforms = this.physics.add.staticGroup();

     

    this.estrada = this.add.tileSprite(400, 300, config.width, config.height, "estrada");
    platforms.create(20, 250, 'ground');
    platforms.create(780, 220, 'ground');
    textoPontos = this.add.text(50, 16, 'Pontos: 0', { fontSize: '32px', fill: '#fff' });
    textoGameOver = this.add.text(200, 250, 'GAME OVER!', { fontSize: '64px', fill: '#fff' });
    textoGameOver.visible = false;
   


    player = this.physics.add.sprite(400, 550, 'principal');
    

    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    
   
    
    cursors = this.input.keyboard.createCursorKeys();
    mKey = this.input.keyboard.addKey('M');
    nKey = this.input.keyboard.addKey('N');
    this.physics.add.collider(player, platforms);
    player.canJump = true;
    player.body.setSize(27,60);
    
    
    
    // adicionar objetos no grupo
    
    grupostar = this.physics.add.group();
    grupostar2 = this.physics.add.group();
    grupo1 = this.physics.add.group();
    grupo2 = this.physics.add.group();
    grupo3 = this.physics.add.group();
    grupo4 = this.physics.add.group();
    grupo4 = this.physics.add.group();
    grupo5 = this.physics.add.group();
    grupo6 = this.physics.add.group();
    musica1 = this.sound.add('musica1');
    musica1.play({
        volume: 0.5,
        loop:true
    })
    musica4 = this.sound.add('musica4');
    musica2 = this.sound.add('musica2');
    musica3 = this.sound.add('musica3');
    
    
    
  
    this.time.addEvent({ 
        delay: 1000,
        callback: createFallingObjectstar,
        
        callbackScope: this, 
        loop: true 
    });
    this.time.addEvent({ 
        delay: 1000,
        callback: createFallingObjectstar2,
        
        callbackScope: this, 
        loop: true 
    });

    this.time.addEvent({ 
        delay: 1000,
        callback: createFallingObject,
        callbackScope: this, 
        loop: true 
    });
    this.time.addEvent({ 
        delay: 1000,
        callback: createFallingObject2,
        callbackScope: this, 
        loop: true 
    });
    this.time.addEvent({ 
        delay: 1000,
        callback: createFallingObject3,
        callbackScope: this, 
        loop: true 
    });
    this.time.addEvent({ 
        delay: 1000,
        callback: createFallingObject4,
        callbackScope: this, 
        loop: true 
    });
    this.time.addEvent({ 
        delay: 1000,
        callback: createFallingObject5,
        callbackScope: this, 
        loop: true 
    });
    this.time.addEvent({ 
        delay: 1000,
        callback: createFallingObject6,
        callbackScope: this, 
        loop: true 
    });
    
   
    this.physics.add.collider(grupostar,platforms);
    this.physics.add.collider(grupostar2,platforms);
    this.physics.add.collider(grupo1,platforms);
    this.physics.add.collider(grupo2,platforms);
    this.physics.add.collider(grupo3,platforms);
    this.physics.add.collider(grupo4,platforms);
    this.physics.add.collider(grupo5,platforms);
    this.physics.add.collider(grupo6,platforms);
    this.physics.add.overlap(player,grupostar,collectstar,null,this);
    this.physics.add.overlap(player,grupostar2,collectstar2,null,this);
    
    this.physics.add.collider(player,grupo1,hitgrupo1,null,this);
    this.physics.add.collider(player,grupo2,hitgrupo2,null,this);
    this.physics.add.collider(player,grupo3,hitgrupo3,null,this);
    this.physics.add.collider(player,grupo4,hitgrupo4,null,this);
    this.physics.add.collider(player,grupo5,hitgrupo5,null,this);
    this.physics.add.collider(player,grupo6,hitgrupo6,null,this);
    
   
}

function update ()
{   // funcao para fazer movimento para esquerda
    if (cursors.left.isDown)
    {
        player.flipX = true // fazer movimento de
        player.setVelocityX(-350);

      
    }// funcao para fazer movimento para direita
    else if (cursors.right.isDown)
    {
        player.flipX = false // fazer movimento
        player.setVelocityX(350);

    }
    else
    {
        player.setVelocityX(0);

     player.anims.play('turn');
    }
    // funcao para fazer movimento para cima
    if(cursors.up.isDown){
        player.setVelocityY(-300)
        
    // funcao para fazer movimento para baixo
    }else if(cursors.down.isDown){
        player.setVelocityY(300)
    }else {
        player.setVelocityY(5)
       player.anims.play('turn');
    }

    
    moveScenery(this.estrada, scenarySpeed);
    if(gameOver){
        return;
    }

    
    acceleration = Phaser.Math.FloatBetween(0.1, 1);
    objetospeed += acceleration;
    for(var i = 0; i<grupostar;i++){
         if(i > 10){
            grupo1.y +=objetospeed;
            grupo2.y +=objetospeed;
            grupo3.y +=objetospeed;
            grupo4.y +=objetospeed;
            grupo5.y +=objetospeed;
            grupo6.y +=objetospeed;
    
        }
    }

    
   
 
   
    
    
    
   
}
function hitgrupo1 (player, grupo1){
    musica2.play();
    this.physics.pause();
    player.setTint(0xff0000);
    player.anims.play('turn');
    gameOver = true
    textoGameOver.visible = true;
    musica3.play();
    musica1.stop();
}
function hitgrupo2 (player, grupo2){
    musica2.play();
    this.physics.pause();
    player.setTint(0xff0000);
    player.anims.play('turn');
    gameOver = true
    textoGameOver.visible = true;
    musica3.play();
    musica1.stop();
}
function hitgrupo3 (player, grupo3){
    musica2.play();
    this.physics.pause();
    player.setTint(0xff0000);
    player.anims.play('turn');
    gameOver = true
    textoGameOver.visible = true;
    musica3.play();
    musica1.stop();
}
function hitgrupo4 (player, grupo4){
    musica2.play();
    this.physics.pause();
    player.setTint(0xff0000);
    player.anims.play('turn');
    gameOver = true
    textoGameOver.visible = true;
    musica3.play();
    musica1.stop();
}
function hitgrupo5 (player, grupo5){
    musica2.play();
    this.physics.pause();
    player.setTint(0xff0000);
    player.anims.play('turn');
    gameOver = true
    textoGameOver.visible = true;
    musica3.play();
    musica1.stop();
}
function hitgrupo6 (player, grupo6){
    musica2.play();
    this.physics.pause();
    player.setTint(0xff0000);
    player.anims.play('turn');
    gameOver = true
    textoGameOver.visible = true;
    musica3.play();
    musica1.stop();
}

function collectstar(player,star){
    
    star.disableBody(true, true);
    pontos += 5;
    textoPontos.setText('Pontos: ' + pontos);
    musica4.play()
    
    
    
    
}
function collectstar2(player,star2){
   
    star2.disableBody(true, true);
    pontos += 5;
    textoPontos.setText('Pontos: ' + pontos);
    musica4.play()
    
    
}
function createFallingObjectstar2() {
    var x = Phaser.Math.Between(90,700, game.config.width);
    var y = -50;
    var star2 = this.physics.add.sprite(x, y, 'star');
    grupostar2.add(star2);
    star2.setGravityY(150);
    star2.setBounce(0.5);
    star2.body.setSize(40,40);
}
function createFallingObjectstar() {
    var x = Phaser.Math.Between(90,700, game.config.width);
    var y = -50;
    var star = this.physics.add.sprite(x, y, 'star');
    grupostar.add(star);
    star.setGravityY(70);
    star.setBounce(0.5);
    star.body.setSize(40,40);
}
function createFallingObject() {
    var x = Phaser.Math.Between(90,700, game.config.width);
    var y = -50;
    var car1 = this.physics.add.sprite(x, y, 'car1');
    grupo1.add(car1);
    car1.setGravityY(200);
    car1.setBounce(2);
    car1.body.setSize(27,60);
    car1.setVelocity(Phaser.Math.Between(-100, 100), 10);
    
    
    
}
function createFallingObject2() {
    var x = Phaser.Math.Between(90,700, game.config.width);
    var y = -50;
    var car2 = this.physics.add.sprite(x, y, 'car2');
    grupo2.add(car2);
    car2.setGravityY(170);
    car2.setBounce(2);
    car2.body.setSize(27,60);
   
}
function createFallingObject3() {
    var x = Phaser.Math.Between(90,740, game.config.width);
    var y = -50;
    var car3 = this.physics.add.sprite(x, y, 'car5');
    grupo3.add(car3);
    car3.setGravityY(250);
    car3.setBounce(2);
    car3.body.setSize(27,60);
    
   
}
function createFallingObject4() {
    var x = Phaser.Math.Between(90,700, game.config.width);
    var y = -50;
    var car4 = this.physics.add.sprite(x, y, 'car6');
    grupo4.add(car4);
    car4.setGravityY(250);
    car4.setBounce(2);
    car4.body.setSize(27,60);
   
}
function createFallingObject5() {
    var x = Phaser.Math.Between(90,700, game.config.width);
    var y = -50;
    var car5 = this.physics.add.sprite(x, y, 'car4');
    grupo5.add(car5);
    car5.setGravityY(250);
    car5.setBounce(2);
    car5.body.setSize(27,60);
    car5.setVelocity(Phaser.Math.Between(-100, 100), 10);
   
}
function createFallingObject6() {
    var x = Phaser.Math.Between(90,700, game.config.width);
    var y = -50;
    var car6 = this.physics.add.sprite(x, y, 'car3');
    grupo6.add(car6);
    car6.setGravityY(250);
    car6.setBounce(2);
    car6.body.setSize(27,60);
   
}



//funcao para creiar movimento dos elementos do cenario
function moveScenery (estrada, speed){
    // deslocamento vertical dos elemento
    estrada.tilePsitionY += speed *3;
}
