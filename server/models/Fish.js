
// Not using
import mongoose from 'mongoose';


const FishSchema = new mongoose.Schema({
    username: { type: String, required: true },
    fish_json: { type: mongoose.Schema.Types.Mixed, default: null },
    points: { type: Number, required: true },
});

const Fish = mongoose.model("Fish", FishSchema);

export default Fish;