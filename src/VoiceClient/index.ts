import worker from 'discord-rose/worker'
import { VoiceConnection } from '..'
import Settings from '../typings/Settings'
export default class VoiceClient {
    worker: worker
    constructor (worker) {
        this.worker = worker
    }

    create (channel_id: String, settings: Settings): VoiceConnection {
        const channel = worker.channels.get(channel_id)
        if (!channel) throw new Error('Invalid channel provided');
        const guild_id = channel.guild_id
        return new VoiceConnection(worker, channel_id, guild_id, this._settings(settings))
    }

    private _settings(settings: Settings): Settings {
        const settingObj: Settings = {
            autoConnect: true,
            deaf: false,
            mute: false
        }
        for (const m in settings) {
            if (!settingObj[settings[m]]) {
                return
            } else {
                settingObj[settings[m]] = settings[m]
            }
        }
        return settingObj
    }
}