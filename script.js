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
var lives
var textLevel;
var level=1;
var objetos;
var vida;
var objetoconter;
var objetospeed = 100;
var objetostime;
var gameOver = false;
var textoVidas;
var textoPontos;
var textoNivel;
var textoGameOver;
var vidas = 3;
var pontos = 0;
var cursors;
var speed = 5;
var mKey;
var nKey;
var fallingObjects;



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
    this.load.image('vida','assets/vida.png');
}


function create ()
{
    this.add.image(400, 300, 'sky');
    
    platforms = this.physics.add.staticGroup();

     

    this.estrada = this.add.tileSprite(400, 300, config.width, config.height, "estrada");
    platforms.create(20, 250, 'ground');
    platforms.create(780, 220, 'ground');
    textoVidas = this.add.text(16, 16, 'Vidas: ' + vidas, { fontSize: '32px', fill: '#fff' });
    textoPontos = this.add.text(game.config.width / 2 - 100, 16, 'Pontos: 0', { fontSize: '32px', fill: '#fff' });
    textoNivel = this.add.text(600, 16, 'Nível: ' + level, { fontSize: '32px', fill: '#fff' });
    textoGameOver = this.add.text(200, 250, 'GAME OVAR!', { fontSize: '64px', fill: '#fff' });
    textoGameOver.visible = false;
   


    player = this.physics.add.sprite(400, 550, 'principal');
    

    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    
   
    //velocidade do objeto car1
    

    


    cursors = this.input.keyboard.createCursorKeys();
    mKey = this.input.keyboard.addKey('M');
    nKey = this.input.keyboard.addKey('N');


    this.physics.add.collider(player, platforms);
    player.canJump = true;
    
    // adicionar objetos no grupo
    grupovida = this.physics.add.group();
    grupostar = this.physics.add.group();
    grupostar2 = this.physics.add.group();
    grupo1 = this.physics.add.group();
    grupo2 = this.physics.add.group();
    grupo3 = this.physics.add.group();

    this.time.addEvent({ 
        delay: 1000,
        callback: createFallingObjectvida,
        callbackScope: this, 
        loop: true 
    });
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
    
    
    
}

function update ()
{   // funcao para fazer movimento para esquerda
    if (cursors.left.isDown)
    {
        player.flipX = true // fazer movimento de
        player.setVelocityX(-300);

      
    }// funcao para fazer movimento para direita
    else if (cursors.right.isDown)
    {
        player.flipX = false // fazer movimento
        player.setVelocityX(300);

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

    if (mKey.isDown) {
        lives = 100;
        textoVidas.setText('Vidas: ' + lives);
    }

    this.physics.add.collider(grupovida,platforms);
    this.physics.add.collider(grupostar,platforms);
    this.physics.add.collider(grupostar2,platforms);
    this.physics.add.collider(grupo1,platforms);
    this.physics.add.collider(grupo2,platforms);
    this.physics.add.collider(grupo3,platforms);
    this.physics.add.overlap(player,grupostar,collectstar,null,this);
    this.physics.add.overlap(player,grupostar2,collectstar2,null,this);
    this.physics.add.overlap(player,grupovida,collectstavida,null,this);
    
}
function collectstavida(player,grupovida){
    grupovida.destroy();
    vidas += 1;
    textoVidas.setText('Vidas: ' + vidas);
}
function collectstar(player,grupostar){
    grupostar.destroy();
    pontos += 1;
    textoPontos.setText('Pontos: ' + pontos);
}
function collectstar2(player,grupostar2){
    grupostar2.destroy();
    pontos += 1;
    textoPontos.setText('Pontos: ' + pontos);
}
function createFallingObjectstar2() {
    var x = Phaser.Math.Between(90,700, game.config.width);
    var y = -50;
    var star2 = this.physics.add.sprite(x, y, 'star');
    grupostar2.add(star2);
    star2.setGravityY(150);
    star2.setBounce(0.5);
}
function createFallingObjectstar() {
    var x = Phaser.Math.Between(90,700, game.config.width);
    var y = -50;
    var star = this.physics.add.sprite(x, y, 'star');
    grupostar.add(star);
    star.setGravityY(70);
    star.setBounce(0.5);
}
function createFallingObject() {
    var x = Phaser.Math.Between(90,700, game.config.width);
    var y = -50;
    var car1 = this.physics.add.sprite(x, y, 'car1');
    grupo1.add(car1);
    car1.setGravityY(170);
    car1.setBounce(0.5);
}
function createFallingObject2() {
    var x = Phaser.Math.Between(90,700, game.config.width);
    var y = -50;
    var car2 = this.physics.add.sprite(x, y, 'car2');
    grupo2.add(car2);
    car2.setGravityY(110);
    car2.setBounce(0.5);
}
function createFallingObject3() {
    var x = Phaser.Math.Between(90,750, game.config.width);
    var y = -50;
    var car3 = this.physics.add.sprite(x, y, 'car5');
    grupo3.add(car3);
    car3.setGravityY(150);
    car3.setBounce(0.7);
}
function createFallingObjectvida() {
    var x = Phaser.Math.Between(90,750, game.config.width);
    var y = -50;
    var vida = this.physics.add.sprite(x, y, 'vida');
    grupovida.add(vida);
    vida.setGravityY(100);
    vida.setBounce(0.5);
}


//funcao para creiar movimento dos elementos do cenario
function moveScenery (estrada, speed){
    // deslocamento vertical dos elemento
    estrada.tilePsitionY += speed *3;
}
