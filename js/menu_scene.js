
let MainMenuScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function MainMenu() {
            Phaser.Scene.call(this, {key: 'mainmenu'});
        },

    preload: function () {
    },

    create: function () {
        // Add background image
        this.add.image(0, 0, 'gameroom').setOrigin(0, 0);

        // add logo
        this.add.sprite(300, 50, 'title').setOrigin(0, 0);

        // add start button
        let startButton = this.add.sprite(850, 600, 'start').setOrigin(0, 0);
        startButton.setInteractive();

        startButton.on('pointerup', () => {
            this.doStart();
        });

        this.music = this.sound.add('ost_ransom', {loop: true});
        this.music.play();

        console.log('create is ready');
    },

    doTutor: function () {
        console.log('doTutor was called!');
        this.scene.start('tutorialscene');
    },

    doStart: function () {
        this.music.stop();
        this.scene.start('start_one_scene');
    }

});
