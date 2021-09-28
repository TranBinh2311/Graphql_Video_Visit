const { GraphQLString, GraphQLInt, GraphQLID } = require("graphql");
const {userType, postType, commentType} =  require('./types')
const { User, Post , Comment } = require ('../model');
const { createJSonWebToken } = require("../util/auth");

const register = {
    type: GraphQLString,
    decsription: "Register account",
    args : {
        userName :  {type: GraphQLString},
        passWord: {type: GraphQLString},
        email: {type: GraphQLString},
        displayName: {type: GraphQLString},
        age: {type: GraphQLString}
    },
    async resolve(parent, args)
    {
        const { userName, passWord, email, displayName , age} = args;
        const user = new User( {userName, passWord, email, displayName,age} );
        await user.save()
        const token = createJSonWebToken(user)
        return token;
    }
}

const login = {
    type: GraphQLString,
    decsription: "Login user",
    args : {
        email: {type: GraphQLString},
        passWord: {type: GraphQLString},
    },
    async resolve(parent, args)
    {
        const user = await User.findOne({ email: args.email}).select("+passWord") ;
        if( !user || user.passWord != args.passWord)
        {
            throw new Error("Email or password is not valid")
        }
        else{
            const token = createJSonWebToken(user)
            return token;
        }
    }
}
const addPost = {
    type:  postType,
    args: {
        title : {type: GraphQLString},
        body: {type: GraphQLString},
    },
    async resolve(parent, args, {verifiedUser})
    {
        //console.log("VerifiedUSer is: ",  verifiedUser);
        if(!verifiedUser)
        {
            throw new Error("Not authorzention");
        }
        
        const post = new Post({
            authorId: verifiedUser._id,
            title: args.title, 
            body: args.body,
        });
        return await post.save();
        
    }

}

const addComment = {
    type: commentType,
    decsription: "Create comment on the other posts",
    args:{
        comment : {type: GraphQLString},
        postId: {type: GraphQLString}
    },
    async resolve(parent, args, {verifiedUser})
    {
        if(!verifiedUser)
        {
            throw new Error("Not authorzention");
        }
        
        const cmt = new Comment({
            comment: args.comment,
            userId: verifiedUser._id,
            postId: args.postId,
            
        })
        return await cmt.save();
    }
    
}


const updatePost = {
    type : postType,
    decsription: "Update existing post of author on database",
    args: {
        id: {type:GraphQLString},
        title: {type: GraphQLString},
        body: {type: GraphQLString },
    },
    async resolve(parent, args, {verifiedUser} ){
        if(!verifiedUser)
        {
            throw new Error("Not authorzention");
        }

        const postUpdated =  await Post.findByIdAndUpdate(
            {
                _id: args.id,
                authorId: verifiedUser._id
            },
            {
                title: args.title,
                body: args.body
            },
            {
                new: true,
                runValidators: true
            })

        if(!postUpdated){
            throw new Error("No post with given id found for the author");
        }
        return postUpdated;
    }
}

const detelePost = {
    type: GraphQLString,
    decsription: "Delete users and post",
    args:{
        postId: {type: GraphQLString}
    },
    async resolve(parent, args, {verifiedUser})
    {
        if(!verifiedUser)
        {
            throw new Error("Not authorzention");
        }

        const deleted = await Post.findOneAndDelete({
            _id: args.postId,
            authorId: verifiedUser._id
        })

        if(!deleted)
        {
            throw new Error("The post is not available or You don't have permission to delete post!!!");
        }
        
        return "Deleted!"
    }

}
module.exports = { register ,login , addPost, addComment, updatePost , detelePost }