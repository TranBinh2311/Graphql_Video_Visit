const {GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt, GraphQLList} = require ('graphql');
const {User, Post, Comment } = require('../model/index')

const userType = new GraphQLObjectType ({
    name: "user",
    description: "User type",
    fields: ()=> ({
        id: {type: GraphQLID},
        userName: {type: GraphQLString},
        passWord: {type:GraphQLString},
        email: {type:GraphQLString},
        displayName : {type:GraphQLString},
        age:  {type:GraphQLInt},
    })
})

const postType = new GraphQLObjectType ({
    name: "post",
    description: "Post type",
    fields: ()=> ({
        id: {type: GraphQLID},
        title: {type: GraphQLString},
        body: {type:GraphQLString},
        author: {
            type: userType,
            resolve(parent, args)
            {
                return User.findById(parent.authorId);
            }
        },
        comments: {
            type: GraphQLList(commentType),
            resolve(parent, args)
            {
                return Comment.findById(parent.authorId);
            }
        }
        
    })
})

const commentType = new GraphQLObjectType ({
    name : "comment",
    description: "comment type",
    fields: ()=> ({
        id: {type: GraphQLID},
        comment:  {type: GraphQLString},
        user:{
            type: userType,
            resolve(parent, args)
            {
                return User.findById(parent.userId);
            }
        },
        post:{
            type: postType,
            resolve(parent, args)
            {
                return Post.findOne({postId: parent.id});
            }
        }
        

    })
})

module.exports = {userType , postType, commentType}