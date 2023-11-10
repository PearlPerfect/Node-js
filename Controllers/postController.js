const { Post, Comment } = require('../Models/model');

const getAllPost = async (req, res) => {

    const allPost = await Post.find()
    res.status(200).json(allPost)
}

const addPost = async(req, res)=>{
    user = req.user.user._id
    const post = new Post({
        user: user,
        title: req.body.title,
        body: req.body.body

    })

    await post.save()
    .then(result =>{
        res.json({message:"post saved"});
    })
    .catch(err =>{
        console.log(err)
        res.status(400).json({message:"an error occured"})
    })
}

const singlePost = async(req, res) =>{
    const id = req.params.id
    Post.findById(id).populate('user')
    .then(result =>{
        if(!result){
            return res.status(404).json("Post not found")
        }
        else{
            Comment.find({post:result.id}).populate('user')
            .then(comments =>{
                res.status(200).json({message: result, comments})
            }).catch(err=>{
                console.log(err);
                res.status(401).json("Error in finding comments")
            })
        }
        
    })
    .catch(err =>{
        console.log(err)
        res.status(400).json("An error occured")
    })
}

const getPostToUpdate = async (req, res)=>{
    id = req.params.id
  await Post.findByIdAndUpdate(id)
        .then((result)=>{
            if(!result){
                return res.status(404).json("Post not found")
            }
            else{
              return res.status(200).json(result)

            }
         
         })
         .catch((error)=>
         console.log(error))
         res.status(400).json({message: "An error occured"})
     
     
}

const updatePost = async(req, res)=>{
    const   activeUserId= req.user.user._id
    const id=  req.params.id ;
    await Post.findById(id)
    .then(result =>{
        if(!result){
            return res.status(404).json("Post not found")
        }
        else{
            if(activeUserId != result.user._id){
                return res.status(403).json("You are unauthorized to perform this action");
           }
        Post.updateOne({title: req.body.comment,
                        body: req.body.body})
        //    Post.findByIdAndUpdate(id,{...req.body},{new:true})
           .then((result)=>{
            console.log(result)
            res.status(200).json({message:"Post updated"});
               
           })
      .catch(err =>{
        console.log(err);
          res.status(500).json("Error in updating post");
      });
    
        }
    })
 
    .catch(err =>{
        console.log(err);
        res.status(400).json("An error occured")
    })
}

const deletePost = async(req, res)=>{
    let id = req.params.id;
    await Post.findByIdAndDelete(id)
    .then(result =>{
        if(!result){
            return res.status(404).json('No post with this ID')
        }
        res.status(200).json("Post deleted Successfully")
    })
    .catch(err=>{
        console.log(err);
        res.status(400).json("An error occured")
    })
}



module.exports = { getAllPost, addPost, singlePost, getPostToUpdate, updatePost, deletePost}