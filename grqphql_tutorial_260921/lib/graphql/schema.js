//import requied stuff from graphql
const {GraphQLSchema, GraphQLObjectType} = require('graphql')

// import query
const {getAllUser , findUserById, getAllPost, findPostById, getAllComment} = require('./query')
// import mutations
const { register, login , addPost, addComment, updatePost ,detelePost} = require('./mutation')
//Define queryType
const queryType = new GraphQLObjectType({
    name: "Query",
    description: "QueryType",
    fields: { 
        getAllUser ,
        findUserById,
        getAllPost,
        findPostById,   
        getAllComment ,
        
    },

})
//Define mutationType
const mutationType = new GraphQLObjectType({
    name: "Mutation",
    description: "Mutation Type",
    fields: { 
        register,
        login,
        addPost,
        addComment,
        updatePost ,
        detelePost,
        
     }
})

module.exports = new GraphQLSchema({
    query: queryType,
    mutation : mutationType ,

});