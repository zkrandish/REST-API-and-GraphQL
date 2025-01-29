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
    const title = req.body.title;
    const content = req.body.content;
    
    // Generate a safe ID
    const postId = new Date().toISOString().replace(/:/g, '-'); // Replace `:` with `-`

    // Create post response
    res.status(201).json({
        message: 'Post created successfully!',
        post: { id: postId, title: title, content: content }
    });
};
