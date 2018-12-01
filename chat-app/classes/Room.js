class Room{
    constructor(roomId, roomTitle, namespace, privateRoom = false){
        this.roomId = roomId;
        this.roomTitle = roomTitle;
        this.namespace = namespace;
        this.privateRoom = privateRoom;
        this.history = [];
    }

    addMessage(roomObj){
        this.history.push(roomObj);
    }

    clearHistory(){
        this.history = [1];
    }
}

module.exports = Room;