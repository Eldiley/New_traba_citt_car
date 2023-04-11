class ecraStart extends Phaser.Scene{
    constructor(){
        super('ecraStart')
    }
    create() {
        this.add.image(10,10,'start').setOrigin(0);
    }

}

