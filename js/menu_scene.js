
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

        // add tutorial and start button
        // this.btnhelp = this.addButton(400 - 80, 400, 'sprites', this.doTutor, this, 'btn_quest_hl', 'btn_quest', 'btn_quest_hl', 'btn_quest');
        // this.btnstart = this.addButton(400 + 80, 400, 'sprites', this.doStart, this, 'btn_play_hl', 'btn_play', 'btn_play_hl', 'btn_play');

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
