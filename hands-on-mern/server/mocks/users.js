import UserModel from '../models/User';

const user1 = new UserModel({
    id: "00001",
    username: "dummiUsr1",
    email: "dummy@usr1.com",
    role: "admin"
});

const user2 = new UserModel({
    id: "00002",
    username: "dummiUsr2",
    email: "dummy@usr2.com",
    role: "customer"
});

const users = [user1.getData(), user2.getData()];

export default users;