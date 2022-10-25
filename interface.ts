export interface IGame {
    added:number;
    price:number;
    added_by_status:{
        beaten:number;
        dropped:number;
        owned:number;
        toplay:number;
        yet:number;
    };
    background_image:string;
    dominant_color:string;
    esrb_rating:IESRB_RATING;
    genres:IGenre[];
    id:number;
    metacritic:number;
    name:string;
    parent_platforms:IParentPlatform[]
    platforms:IPlatform[];
    playtime:number;
    rating:Float32Array;
    rating_top:number;
    ratings:IRating[];
    ratings_count:number;
    release:string;
    reviews_count:number;
    reviews_text_count:number;
    saturated_color:string;
    slug:string;
    tba:boolean;
    updated:string;
    tags:ITag[];
    stores:IStore[];
}

export interface IStore {
    id:number;
    store:{
        domain:string;
        games_count:number;
        id:number;
        image_background:string;
        name:string;
        slug:string;
    }
}

export interface ITag {
    games_count:number;
    id:number;
    name:string;
    slug:string;
    language:string;
    image_background:string;
}

export interface IRating {
    count:number;
    id:number;
    percent:Float32Array;
    title:string;

}

export interface IPlatform {
    platform:{
        games_count:number;
        id:number;
        image_background:string;
        slug:string;

        name:string;
    }
}

export interface IParentPlatform {
    platform: {
        id:number;
        name:string;
        slug:string;
    }
 
}

export interface IGenre {
    games_count:number;
    id:number;
    image_background:string;
    name:string;
    slug:string;
}

export interface IESRB_RATING {
    id:number;
    name:string;
    slug:string;
}