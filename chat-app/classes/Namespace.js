class Namespace{
    constructor(id, nsTitle, img, endpoint){
        this.id = id;
        this.nsTitle = nsTitle;
        this.endpoint = endpoint;
        this.rooms = [];
        this.img = img;
    }

    addRoom(roomObj){
        this.rooms.push(roomObj);
    }
}

module.exports = Namespace;