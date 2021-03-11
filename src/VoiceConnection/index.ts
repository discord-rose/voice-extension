import Worker from 'discord-rose/worker'
import Settings from '../typings/Settings'
export default class VoiceConnection {
    readonly worker: Worker
    readonly channel: String
    readonly guild: String
    readonly settings: Settings
    private _playing: Boolean
    private _ready: Boolean
    private _sessionID: String
    private _sessionKey: String
    private _endpoint: String
    constructor (worker: Worker, channel: String, guild: String, settings: Settings) {
        this.worker = worker
        this.channel = channel
        this.guild = guild
        this.settings = settings
        this._playing = false
        this._ready = false
        this._init()
    }

    private _init () {
        this.worker.guildShard(this.guild).ws._send({
            "op": 4,
            "d": {
              "guild_id": this.guild,
              "channel_id": this.channel,
              "self_mute": this.settings.deaf,
              "self_deaf": this.settings.mute
            }
          })
          this.worker.on('VOICE_SERVER_UPDATE', (data) => {
              this._sessionKey = data.token
              this._endpoint = data.endpoint
          })

          this.worker.on('VOICE_STATE_UPDATE', (data) => {
            this._sessionID = data.session_id
          })
          // Dunno the rest, tbh
    }

    public play () {
        if (!this._ready) return
        this._playing = true
        // Playing code
    }

    public disconnect () {
        if (!this._ready) return
        // Disconnect code
    }

    get playing() {
        return this._playing || false
    }

    get endpoint() {
        if (!this._ready) return false;
        return this._endpoint
    }
}