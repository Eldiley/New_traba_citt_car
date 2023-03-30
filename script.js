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
}


function create ()
{
    this.add.image(400, 300, 'sky');
    
    platforms = this.physics.add.staticGroup();

     

    this.estrada = this.add.tileSprite(400, 300, config.width, config.height, "estrada");
    platforms.create(20, 250, 'ground');
    platforms.create(780, 220, 'ground');
    textoVidas = this.add.text(16, 16, 'Vidas: ' + vidas, { fontSize: '32px', fill: '#fff' });
    textoPontos = this.add.text(game.config.width / 2 - 100, 16, 'Pontos: ' + pontos, { fontSize: '32px', fill: '#fff' });
    textoNivel = this.add.text(600, 16, 'Nível: ' + level, { fontSize: '32px', fill: '#fff' });
    textoGameOver = this.add.text(200, 250, 'GAME OVAR!', { fontSize: '64px', fill: '#fff' });
    textoGameOver.visible = false;
   


    player = this.physics.add.sprite(400, 550, 'principal');
    car1 = this.physics.add.sprite(230,0,'car1');
    car2 = this.physics.add.sprite(300,0,'car2');
    car3 = this.physics.add.sprite(170,0,'car3');
    car4 = this.physics.add.sprite(500,0,'car4');
    car5 = this.physics.add.sprite(600,0,'car5');
    car6 = this.physics.add.sprite(650,0,'car6');
    car7 = this.physics.add.sprite(400,0,'car7');

    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
   
    //velocidade do objeto car1
    

    car1.setVelocityY(Math.floor(Math.random() * 50) + 50)
    this.physics.add.existing(car1)
    car2.setVelocityY(Math.floor(Math.random() * 60) + 60)
    this.physics.add.existing(car2)
    car3.setVelocityY(Math.floor(Math.random() * 70) + 70)
    this.physics.add.existing(car3)
    car4.setVelocityY(Math.floor(Math.random() * 80) + 80)
    this.physics.add.existing(car4)
    car5.setVelocityY(Math.floor(Math.random() * 80) + 80)
    this.physics.add.existing(car5)
    car6.setVelocityY(Math.floor(Math.random() * 80) + 80)
    this.physics.add.existing(car6)
    car7.setVelocityY(Math.floor(Math.random() * 80) + 80)
    this.physics.add.existing(car7)


    cursors = this.input.keyboard.createCursorKeys();
    mKey = this.input.keyboard.addKey('M');
    nKey = this.input.keyboard.addKey('N');

    stars = this.physics.add.group({
        key: 'star',
        repeat: 3,
        setXY: { x:150, y:0, stepX:150, stepY:0}
    })
    
    stars.children.iterate(function (child) {

        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

    });
    this.physics.add.collider( platforms,stars);

    this.physics.add.collider(player, platforms);
    player.canJump = true;
    this.physics.add.overlap(player, stars, collectStar, null, this);
    
    // adicionar objetos no grupo
}

function update ()
{   // funcao para fazer movimento para esquerda
    if (cursors.left.isDown)
    {
        player.flipX = true // fazer movimento de
        player.setVelocityX(-200);

      
    }// funcao para fazer movimento para direita
    else if (cursors.right.isDown)
    {
        player.flipX = false // fazer movimento
        player.setVelocityX(200);

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

    
}

//funcao para creiar movimento dos elementos do cenario
function moveScenery (estrada, speed){
    // deslocamento vertical dos elemento
    estrada.tilePsitionY += speed *3;
}
function collectStar (player, star)
{
star.disableBody(true, true);
}