const mongoose = require('mongoose');
//Import user and bicycle
const Question = mongoose.model("Question"),
    Answer = mongoose.model("Answer")
module.exports = {
    login:(req,res)=>{
        console.log("In controller", req.params.name)
        req.session.name = req.params.name;
        console.log("In controller", req.session.name)
        res.json(req.session.name);
    },
    getUser:(req,res)=>{
        if(req.session.name) return res.json(req.session.name)
    },//use session
    logout:(req,res)=>{
        if (req.session.name) {
            req.session.name = undefined;
            console.log("Controller clearing session:", req.session.name)
            // return;
            res.json(true)
        }
        res.json(false)
    },

    //Question
    showAll:(req,res)=>{
        Question.find({})
            .populate('answers')
            .exec((err,results)=>{
            if (err) return res.status(500).json("Empty collection in mongoose")
            res.json(results);
        })
    },
    showOne:(req,res)=>{
        Question.findOne({_id:req.params.id})
            .populate('answers')
            .exec((err, result) => {
                if (err) return res.status(500).json("Document NOT FOUND")
                res.json(result);
            })
    },
    create: (req, res) => {
        console.log("POST DATA", req.body);
        const question = new Question(req.body);
        question.save((err,result)=>{
            if (err) return res.status(501).json(question.errors);
            res.json(result);
        })
    },
    addAnswer: (req, res)=>{
        console.log("POST DATA", req.body);
        Question.findOne({ _id: req.params.id },(err,question)=>{
            const answer = new Answer(req.body);
            answer._question = question._id;
            answer.save((err)=>{
                question.answers.push(answer);
                question.save((err)=>{
                    if(err){
                        console.log('Error resaving question');
                        return res.status(500).json('Error resaving question')
                    }
                    return res.json(question);
                })
            })
        })
    },
    addLike: (req, res) => {
        console.log(req.params.id)
        // Answer.findOneAndUpdate({ _id: req.params.id },{$inc:{likes:1}},(err,answer)=>{
        Answer.findOne({ _id: req.params.id }, (err, answer) => {
            if (err) return res.status(500).json('Could not find answer');
            console.log("Answer found in controller:",answer);
            // const newAnswer=new Answer()
            answer.likes +=1;
            answer.save((err)=>{
                if (err) return res.status(500).json(answer.errors);
                res.json(answer);
            })
            
        })
    }
    
}