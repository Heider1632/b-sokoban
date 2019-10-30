const mongoose= require('mongoose');
const {Schema}  = require('mongoose');
const cognitiveModelSchema = new Schema({
    actions: { 
        type: [],
        required: true
    },
    createdAt: { type: Date, default: Date.now },
    name: { type: String, required: true }
});

const CognitiveModel = mongoose.model('cognitiveModel',cognitiveModelSchema);
module.exports = CognitiveModel;