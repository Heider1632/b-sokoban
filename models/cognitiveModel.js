const mongoose= require('mongoose');
const {Schema}  = require('mongoose');
const cognitibveModelSchema = new Schema({
    actions: { 
        type: [],
        required: true
    },
    createdAt: { type: Date, default: Date.now },
    name: { type: String, required: true }
});

const CognitiveModel = mongoose.model('cognitiveModel',cognitibveModelSchema);
module.exports = CognitiveModel;