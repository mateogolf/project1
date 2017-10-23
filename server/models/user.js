const mongoose = require('mongoose'),
    Schema = mongoose.Schema
// const UserSchema = new mongoose.Schema({
//     name: { 
//         type: String, 
//         minlength: 2,
//         required: [true, 'Your first name must be at least 2 characters'] 
//     },
//     // questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
//     // answers: [{ type: Schema.Types.ObjectId, ref: 'Answers' }]
// }, { timestamps: true });
// UserSchema.plugin(uniqueValidator);

const QuestionSchema = new mongoose.Schema({
    title:{
        type:String,
        minlength:[10,"The question must be at least 10 characters"],
        required: [true, 'Your question is required'],
    },
    description:{type:String},
    answers: [{ type: Schema.Types.ObjectId, ref: 'Answer' }]
})
const AnswerSchema = new mongoose.Schema({
    title: {
        type: String,
        minlength: 5,
        required: [true, 'Your first name must be at least 5 characters'],
    },
    description: { type: String },
    likes:{
        type:Number,
        default:0
    },
    user:{
        type: String,
        required:true,
    },
    _question: { type: Schema.Types.ObjectId, ref: 'Question' }
})

// mongoose.model('User', UserSchema);
mongoose.model('Question', QuestionSchema);
mongoose.model('Answer', AnswerSchema);
mongoose.Promise = global.Promise;