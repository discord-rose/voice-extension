import worker from 'discord-rose/worker'
import Settings from '../typings/Settings'
export default class VoiceConnection {
    worker: worker
    channel: String
    guild: String
    settings: Settings
    private _playing: Boolean
    private _ready: Boolean
    constructor (worker: worker, channel: String, guild: String, settings: Settings) {
        this.worker = worker
        this.channel = channel
        this.guild = guild
        this.settings = settings
        this._playing = false
        this._ready = false
        this._init()
    }

    private _init () {
        // Ready the connection
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
        return this._playing
    }
}