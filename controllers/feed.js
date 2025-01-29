const {validationResult} = require('express-validator');

exports.getPosts = (req, res, nex)=>{
    res.status(200).json({
        posts:[{
            _id: '1',
            title: 'First Post', 
            content: 'This is the first post!',
            imageUrl:'images/boat.png',
            creator:{
                name: 'zara'
            },
            createdAt: new Date(),
        }]
    });
};

exports.createPost = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422)
        .json({
                message:'Validation failed, entered data is incorrect.',
                errors:errors.array()
            });
    }
    const title = req.body.title;
    const content = req.body.content;
    
    // Generate a safe ID
    const postId = new Date().toISOString().replace(/:/g, '-'); // Replace `:` with `-`

    // Create post response
    res.status(201).json({
        message: 'Post created successfully!',
        post: { _id: postId, title: title, content: content,
            creator: {
                name: 'zahra'
            },
            createdAt: new Date()
         }
    });
};
