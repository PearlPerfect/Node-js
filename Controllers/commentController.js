const { response } = require('express');
const { Post, Comment } = require('../Models/model');


const getPostComment = async(req, res) =>{
    let postId = req.params.id;
    Comment.find({post : postId}).sort('-createdAt')
    .then(result =>{
        if(result.length === 0){
            return res.status(404).json("No post found")
        }
        else {
            return res.status(200).json(result)
        }
    })
}


const addComment = async(req, res)=>{
    const user = req.user.user._id
    id = req.params.id
    Post.findById(id)
    .then(result=>{
        if(!result){
            return res.status(404).json("Post not found")
        }

        else{
            const comment = new Comment({
                user: user,
                post: id,
                comment: req.body.comment,
            })
             comment.save()
            .then(result =>{
                res.json(result)
            })
            .catch(err=>{
                console.log(err)
                res.json("An error occured")
            })
        }
        
    })
    
}

const getAllComment = async(req, res)=>{
    let query =  await Comment.find()
    .then(result=>{
        res.json(result);
    })
    .catch(err =>{
        console.log(err);
        res.json("An error occured")
    })
}

const getCommentToEdit = (req, res)=>{
    let id = req.params.id;
    Comment.findOne({_id : id})
    .then(result =>{
        if(!result){
            return res.status(404).json('No comment found')
        }
        else{
            res.send(result)
        }
    })
    .catch(err =>{
        console.log(err);
        res.json("AN error occured")
    })
}



const editComment = async(req, res)=>{
    activeUserId= req.user.user._id
    let id = req.params.id; 
  const comment = await Comment.findById(id)
    .then((result)=>{
        if(!result){
            return res.status(404).json('The comment with the given ID was not found')
        }
        else{
            if(activeUserId != result.user._id){
                return res.status(403).json("You are unauthorized to perform this action");
           }
        //    result({...req.body})
        //    result.save()
        else{
            console.log({result})
            result.comment = req.body.comment
            result.save()
            // Comment.updateOne({},{comment: req.body.comment})
            .then((result)=>{
                console.log(result)
                return res.status(200).json({message:"Comment Edited successfully"})
            })
            .catch(err =>{
                console.log(err);
                res.status(500).json("Error in updating comment");
            })

        }

    //   Comment.findByIdAndUpdate(id,{...req.body},{new:true})
       
       }
        
    })
         
    .catch(err =>{
        console.log(err);
        res.status(400).json("An error occured")
    })
}


const deleteComment = async(req, res)=>{
    activeUserId= req.user.user._id
    console.log(activeUserId)
    let id = req.params.id;
    const comment = await Comment.findById(id)
    .then(result =>{
        if (!result){
            return res.status(404).json('The comment with the given ID was not found');
        }
        else{
            if(activeUserId != result.user._id){
                return res.status(403).json("You are unauthorized to perform this action");
           }
           Comment.deleteOne()
             .then(()=>{
                return res.status(200).json({message:'comment deleted'});
             })
              .catch(err => {
                console.log(err);
               return res.status(500).json('Server Error');
             })
            }
        })
            .catch( err =>{
            res.status(400).json("An Error occured");
            console.log(err)
        })
}

module.exports = {getPostComment, addComment, getAllComment, editComment, getCommentToEdit, deleteComment}