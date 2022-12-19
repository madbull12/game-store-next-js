const convertToPlatform = (id:number) => {
    switch(id) {
        case 4:
            return "PC"
        case 3:
            return "IOS"
        case 21:
            return "Android"
        case 7:
            return "Nintendo Switch"
        case 1:
            return "Xbox One"
        case 18:
            return "Playstation 4"
        case 187:
            return "Playstation 5"
        default:
            break;
    }
}

export default convertToPlatform