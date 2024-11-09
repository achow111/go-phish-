import mongoose from 'mongoose';

const FishJsonSchema = new mongoose.Schema({
    common: { type: Number, default: 0 }, 
    master: { type: Number, default: 0 },
    legendary: { type: Number, default: 0 } 
});
  
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    organization: { type: String, default: null },
    fish: { type: FishJsonSchema, default: () => ({ common: 0, master: 0, legendary: 0 })}

});

const User = mongoose.model("User", UserSchema);

export default User;