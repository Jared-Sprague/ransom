// Phaser3 example game
// preloader and loading bar

const Preloader = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function Preloader() {
            // note: the pack:{files[]} acts like a pre-preloader
            // this eliminates the need for an extra "boot" scene just to preload the loading bar images
            Phaser.Scene.call(this, {
                key: 'preloader',
                pack: {
                    files: [
                        {type: 'image', key: 'loadingbar_bg', url: 'img/loadingbar_bg.png'},
                        {type: 'image', key: 'loadingbar_fill', url: 'img/loadingbar_fill.png'},
                        {type: 'image', key: 'gameroom', url: 'img/startroom.png'},
                        {type: 'image', key: 'puzzleroom', url: 'img/puzzleroom.png'},
                        {type: 'image', key: 'bossroom', url: 'img/bossroom.png'},
                        {type: 'image', key: 'bow', url: 'img/bow.png'},
                        {type: 'image', key: 'title', url: 'img/titleransom.png'},
                        {type: 'image', key: 'start', url: 'img/startbutton.png'},
                    ]
                }
            });
        },

    setPreloadSprite: function (sprite) {
        this.preloadSprite = {sprite: sprite, width: sprite.width, height: sprite.height};

        //sprite.crop(this.preloadSprite.rect);
        sprite.visible = true;

        // set callback for loading progress updates
        this.load.on('progress', this.onProgress, this);
        this.load.on('fileprogress', this.onFileProgress, this);
    },

    onProgress: function (value) {

        if (this.preloadSprite) {
            // calculate width based on value=0.0 .. 1.0
            var w = Math.floor(this.preloadSprite.width * value);

            // set width of sprite
            this.preloadSprite.sprite.frame.width = w;
            this.preloadSprite.sprite.frame.cutWidth = w;

            // update screen
            this.preloadSprite.sprite.frame.updateUVs();
        }
    },

    onFileProgress: function (file) {
        console.log('Loading file: ', file.key);
    },

    preload: function () {
        // setup the loading bar
        // note: images are available during preload because of the pack-property in the constructor
        this.loadingbar_bg = this.add.sprite(640, 360, "loadingbar_bg");
        this.loadingbar_fill = this.add.sprite(640, 360, "loadingbar_fill");
        this.setPreloadSprite(this.loadingbar_fill);

        // sprites sheets
        this.load.atlas('sprites', 'img/spritearray.png', 'img/spritearray.json');
        this.load.atlas('puzzle_bar', 'img/bar_sheet2.png', 'img/bar_array.json');
        this.load.atlas('bar_open', 'img/bar_open_sheet.png', 'img/bar_open_array.json');

        // font
        this.load.bitmapFont('fontwhite', 'img/fontwhite.png', 'img/fontwhite.xml');

        // Audio
        // Songs
        this.load.audio('ost_ransom', 'snd/ost_ransom.mp3');
        this.load.audio('ost_bro', 'snd/ost_bro.mp3');
        this.load.audio('ost_boss_intro', 'snd/ost_boss_intro.mp3');
        this.load.audio('ost_boss_battle_main', 'snd/ost_boss_battle_main.mp3');

        // SFX
        this.load.audio('sfx_clunk', 'snd/sfx_clunk.mp3');
        this.load.audio('sfx_stone', 'snd/sfx_stone_slide.mp3');
    },

    create: function () {

        // also create animations
        this.anims.create({
            key: 'cointurn',
            frames: [
                {key: 'sprites', frame: 'coin1'},
                {key: 'sprites', frame: 'coin2'},
                {key: 'sprites', frame: 'coin3'},
                {key: 'sprites', frame: 'coin4'},
                {key: 'sprites', frame: 'coin5'},
                {key: 'sprites', frame: 'coin6'},
                {key: 'sprites', frame: 'coin7'},
                {key: 'sprites', frame: 'coin8'}
            ],
            frameRate: 15,
            repeat: -1
        });

        console.log('Preloader scene is ready, now start the actual game and never return to this scene');

        // dispose loader bar images
        this.loadingbar_bg.destroy();
        this.loadingbar_fill.destroy();
        this.preloadSprite = null;

        // start actual game
        this.scene.start('mainmenu');
    }
});
