export type NeedWarmRoomDto = {
    rowNum: string;
    individualName: string;
    animalTitle: string;
    age: number;
    _links: NeedWarmRoomLinksDto;
}

export type EmbeddedDto = {
    _embedded: {
        "need-warm-room": NeedWarmRoomDto[];
    }
}

export type NeedWarmRoomLinksDto = {
    self: {
        href: string;
    }
}

export type NeedWarmRoom = {
    rowNum: string;
    individualName: string;
    animalTitle: string;
    age: number;
}
