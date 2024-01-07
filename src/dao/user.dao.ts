export default interface IUser extends Document{
    _id:string,
    name:string,
    email:string,
    photo:string,
    role:"admin"|"user",
    gender:"male"|"female",
    dob:Date,
    createdAt:Date,
    updatedAt:Date,

    // adding "age" virtual attribute
    age:number
}