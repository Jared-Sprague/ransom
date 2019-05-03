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
                        {type: 'image', key: 'tryagain', url: 'img/tryagain_button.png'},
                        {type: 'image', key: 'fireball', url: 'img/fireball.png'},
                        {type: 'image', key: 'arrow', url: 'img/arrow.png'},
                        {type: 'image', key: 'fullbar', url: 'img/fullbar.png'},
                        {type: 'image', key: 'emptybar', url: 'img/emptybar.png'},
                        {type: 'image', key: 'badend', url: 'img/badend.png'},
                        {type: 'image', key: 'portal1', url: 'img/portal1.png'},
                        {type: 'image', key: 'portal2', url: 'img/portal2.png'},
                        {type: 'image', key: 'portal3', url: 'img/portal3.png'},
                        {type: 'image', key: 'tvscreen', url: 'img/tvscreen.png'},
                        {type: 'image', key: 'tvscreen2', url: 'img/tvscreen2.png'},
                        {type: 'image', key: 'underworldlobby', url: 'img/underworldlobby.png'},
                        {type: 'image', key: 'nextbutton', url: 'img/nextbutton.png'},
                        {type: 'image', key: 'controller', url: 'img/controllerupdated.png'},
                        {type: 'image', key: 'a_button', url: 'img/a_button.png'},
                        {type: 'image', key: 'b_button', url: 'img/b_button.png'},
                        {type: 'image', key: 'forcefield', url: 'img/forcefield.png'},
                        {type: 'image', key: 'puzzle_door', url: 'img/puzzle_door.png'},
                        {type: 'image', key: 'boss_door', url: 'img/boss_door.png'},
                        {type: 'image', key: 'bow_raised', url: 'img/bowraised.png'},
                        {type: 'image', key: 'goodend', url: 'img/goodend.png'},
                        {type: 'image', key: 'decentend', url: 'img/decentend.png'},
                        {type: 'image', key: 'sign', url: 'img/sign.png'},
                        {type: 'image', key: 'sign_closeup', url: 'img/sign_closeup.png'},
                        {type: 'image', key: 'leavehim', url: 'img/leavehim.png'},
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
        this.load.atlas('boss', 'img/boss_sheet.png', 'img/boss_array.json');
        this.load.atlas('boy_fight', 'img/boy_fight_sheet.png', 'img/boy_fight_array.json');
        this.load.atlas('particles', 'img/particle_sheet.png', 'img/particle_array.json');
        this.load.atlas('walking', 'img/walking_sheet.png', 'img/walking_array.json');

        // font
        this.load.bitmapFont('fontwhite', 'img/fontwhite.png', 'img/fontwhite.xml');

        // Audio
        // Songs
        this.load.audio('ost_ransom', 'snd/ost_ransom.mp3');
        this.load.audio('ost_bro', 'snd/ost_bro.mp3');
        this.load.audio('ost_boss_intro', 'snd/ost_boss_intro.mp3');
        this.load.audio('ost_boss_battle_main', 'snd/ost_boss_battle_main.mp3');
        this.load.audio('ost_bro_why', 'snd/ost_bro_why.mp3');
        this.load.audio('ost_portal_opens', 'snd/ost_portal_opens.mp3');
        this.load.audio('ost_gg_bro', 'snd/ost_gg_bro.mp3');


        // SFX
        this.load.audio('sfx_clunk', 'snd/sfx_clunk.mp3');
        this.load.audio('sfx_stone', 'snd/sfx_stone_slide.mp3');
        this.load.audio('sfx_bow_shoot', 'snd/sfx_bow_shoot.mp3');
        this.load.audio('sfx_hit', 'snd/hit.wav');
        this.load.audio('sfx_power_up', 'snd/power_up.mp3');
    },

    create: function () {

        // also create animations
        this.anims.create({
            key: 'walk',
            frames: [
                {key: 'walking', frame: '000_1'},
                {key: 'walking', frame: '000_2'},
                {key: 'walking', frame: '000_3'},
                {key: 'walking', frame: '000_4'},
            ],
            frameRate: 6,
            repeat: -1
        });

        console.log('Preloader scene is ready, now start the actual game and never return to this scene');

        // dispose loader bar images
        this.loadingbar_bg.destroy();
        this.loadingbar_fill.destroy();
        this.preloadSprite = null;

        // start actual game
        // this.scene.start('bowpuzzlescene');
        this.scene.start('mainmenu');
        // this.scene.start('lobby_scene', {life: 100});
        // this.scene.start('controller_scene');
        // this.scene.start('boss_scene', {life: 100});
    }
});
