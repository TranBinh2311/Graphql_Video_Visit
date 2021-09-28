const {GraphQLList, GraphQLString, GraphQLID} = require ('graphql')
const {userType, postType, commentType} = require('./types')
const {User, Post, Comment } = require('../model/index');

const getAllUser = {
    type: new GraphQLList(userType),
    decription: "Get list user in database",
    resolve(parent, args)
    {
        return User.find()
    }
}

const findUserById= {
    type: userType,
    decription: "Get User by ID",
    args: {
        id: {type: GraphQLID},
    },
    async resolve(parent, args)
    {
        const user = await User.findById(args.id);
        return user;
    }
}

const getAllPost = {
    type: new GraphQLList(postType),
    decription: "Get list post in database",
    resolve(parent, args)
    {
        return Post.find()
    }
}

const findPostById= {
    type: postType,
    decription: "Get Post by ID",
    args: {
        id: {type: GraphQLID},
    },
    async resolve(parent, args)
    {
        const post= await Post.findById(args.id);
        return post;
    }
}

const getAllComment = {
    type: new GraphQLList(commentType),
    decription: "Get list user in database",
    resolve(parent, args)
    {
        return Comment.find()
    }
}

module.exports = { getAllUser , findUserById, getAllPost, findPostById, getAllComment}