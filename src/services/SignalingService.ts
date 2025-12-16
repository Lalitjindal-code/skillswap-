import { RealtimeChannel } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

type SignalData = {
    type: 'offer' | 'answer' | 'candidate';
    payload: any;
    from: string;
};

export class SignalingService {
    private channel: RealtimeChannel | null = null;
    private roomId: string;
    private userId: string;
    private onSignal: (data: SignalData) => void;

    constructor(roomId: string, userId: string, onSignal: (data: SignalData) => void) {
        this.roomId = roomId;
        this.userId = userId;
        this.onSignal = onSignal;
    }

    public connect() {
        this.channel = supabase.channel(`room:${this.roomId}`);

        this.channel
            .on('broadcast', { event: 'signal' }, (payload) => {
                // Ignore signals from self
                if (payload.payload.from !== this.userId) {
                    this.onSignal(payload.payload as SignalData);
                }
            })
            .subscribe((status) => {
                if (status === 'SUBSCRIBED') {
                    console.log(`Connected to signaling channel for room ${this.roomId}`);
                }
            });
    }

    public async sendSignal(type: 'offer' | 'answer' | 'candidate', payload: any) {
        if (!this.channel) return;

        await this.channel.send({
            type: 'broadcast',
            event: 'signal',
            payload: {
                type,
                payload,
                from: this.userId,
            },
        });
    }

    public disconnect() {
        if (this.channel) {
            supabase.removeChannel(this.channel);
            this.channel = null;
        }
    }
}
