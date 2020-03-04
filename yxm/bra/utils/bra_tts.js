const getAudioUrl = 'https://tsn.baidu.com/text2audio';

var bra_tts = {

    audioTeam: [],
    audioStartSwitch: false,
    token: {
        "access_token": false,
        "expires_in": 0,
        "refresh_token": false,
        "scope": false,
        "session_key": false,
        "session_secret": false,
    },

    /**
     * 调用语音合成接口
     */
    get_token: function () {
        return new Promise((rs, rj) => {
            uni.request({
                url: 'https://openapi.baidu.com/oauth/2.0/token',
                method: 'POST',
                data: {
                    grant_type: 'client_credentials',
                    client_id: '7T4YbUDXsgxYma3eK3UIudCH',
                    client_secret: 'uXZ7jpRFLAhA3kxKNu9mbpxfrkAKYend'
                },
                header: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                success: (res) => {
                    rs(res);
                },
                fail: (err) => {
                    console.log('访问失败');
                    rj(err);
                }
            })
        })
    },

    config: function (options, audio) {
        if (options) {
            audio.volume = options.volume || 1;
            audio.startTime = options.startTime || 0;
            audio.loop = options.loop || false;
            audio.obeyMuteSwitch = options.obeyMuteSwitch && typeof (options.obeyMuteSwitch) == 'boolean' ? options.obeyMuteSwitch :
                true; //支持微信小程序、百度小程序、头条小程序
        }
    },

    play_text: function (text) {
        var root = this;
        return new Promise((resolve, reject) => {
            root.get_token().then(res => {
                console.log(res);
                if (res.data && res.data.access_token) {
                    resolve(root.tts(text, res.data.access_token));
                } else {
                    reject(false);
                }
            })
        })
    }
    ,
    btts: function (param, options, audioCallback) {
        let audio = uni.createInnerAudioContext();
        this.config(options, audio);
        // 序列化参数列表
        let fd = [];
        for (let k in param) {
            fd.push(k + '=' + encodeURIComponent(encodeURIComponent(param[k])));
        }
        audio.src = `${getAudioUrl}?${fd.join('&')}`;

        audio.onPlay(() => {
            console.log('音频播放开始');
        });

        audio.onPause(() => {

        });

        audio.onWaiting(() => {

        });


        audio.onStop(() => {
        });

        /**
         *
         audio.onTimeUpdate(() => {

        });
         */


        audio.onSeeking(() => {

        });
        audio.onSeeked(() => {

        });


        audio.onEnded(() => {
            console.log('音频播放结束');
            console.log('销毁音频实例');
            audio.destroy(); //销毁音频实例
            audio = null;
        });

        audio.onError((e) => {

            audio.destroy(); //销毁音频实例
            audio = null;
        });


        console.log('audio play');
        audio.play();
    }
    ,
    tts: function (objs, tok) {
        if (typeof (objs) == 'string')
            objs = {voiceSet: {tex: objs}};
        const config = {
            tok,
            cuid: tok,
            ctp: 1,
            lan: 'zh',
            ...objs.voiceSet
        };
        return this.btts(config, objs.audioSet, objs.audioCallback);
    }
};

export default bra_tts;


