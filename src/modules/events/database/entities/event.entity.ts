import { Column, Entity, PrimaryColumn } from "typeorm";
import { Event } from "../../model/event";
import { v4 as uuid } from 'uuid';

@Entity('events')
class EventEntity {
    @PrimaryColumn()
    id: string;
    @Column()
    date: Date;
    @Column()
    image: string;
    @Column()
    title: string;
    @Column()
    description: string;
    @Column()
    video: string;
    @Column({ name: 'is_cancelled' })
    isCancelled: boolean;

    static fromEvent(event: Event) {
        const eventEntity = new EventEntity();
        eventEntity.id = event.id;
        eventEntity.date = event.date;
        eventEntity.image = event.image;
        eventEntity.title = event.title;
        eventEntity.video = event.video;
        eventEntity.description = event.description;
        eventEntity.isCancelled = event.isCancelled;
        if (!eventEntity.id) {
            eventEntity.id = uuid();
        }
        return eventEntity;
    }
}

export { EventEntity }