export type FeedTypeDto = {
    type: string;
    _links: FeedTypeLinksDto;
}

export type EmbeddedDto = {
    _embedded: {
        "feed-types": FeedTypeDto[];
    }
}

export type FeedTypeLinksDto = {
    self: {
        href: string;
    }
}

export type FeedType = {
    type: string;
}
