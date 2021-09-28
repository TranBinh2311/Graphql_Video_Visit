const query =  require('../graphql/query');
const mutation = require('../graphql/mutation')
const  {DBconnect} = require('../db/index')
const { User, Post, Comment} = require('../model')
const mongoose = require('mongoose');
const { get } = require('superagent');
DBconnect();


describe('Test query', ()=>{

    test('get All User', async()=>{
        const getaAllUserMockFn = jest.fn().mockImplementation(()=>{
            return Promise.resolve({code:200})
        });
        User.find = getaAllUserMockFn;

        const result = await query.getAllUser.resolve();

        expect(getaAllUserMockFn).toHaveBeenCalled();
        expect(getaAllUserMockFn.mock.calls.length).toBe(1);
        expect(result.code).toBe(200); 
    })

    test('get All Post', async()=>{
        const getaAllPostMockFn = jest.fn().mockImplementation(()=>{
            return Promise.resolve({code:200})
        });
        Post.find = getaAllPostMockFn;

        const result = await query.getAllPost.resolve();

        expect(getaAllPostMockFn).toHaveBeenCalledWith();
        expect(getaAllPostMockFn.mock.calls.length).toBe(1);
        expect(result.code).toBe(200); 
    })

    test('find User By Id', async()=>{

        const args = 
        {
          id: "abcxyz",
        }

        const findUserByIdMockFn = jest.fn().mockImplementation(()=>{
            return Promise.resolve({code:200})
        });
        
        User.findById = findUserByIdMockFn ;

        const result = await query.findUserById.resolve(null,args);
        expect(findUserByIdMockFn).toHaveBeenCalledWith(args.id);
        expect(findUserByIdMockFn.mock.calls.length).toBe(1);
        expect(result.code).toBe(200); 
    })

    test('find Post By Id', async()=>{
        const args = 
        {
          id: "abcxyz",
        }

        const findPostByIdMockFn = jest.fn().mockImplementation(()=>{
            return Promise.resolve({code:200})
        });
        
        Post.findById = findPostByIdMockFn ;

        const result = await query.findPostById.resolve(null,args);
        expect(findPostByIdMockFn).toHaveBeenCalledWith(args.id);
        expect(findPostByIdMockFn.mock.calls.length).toBe(1);
        expect(result.code).toBe(200); 
    })


})
describe('POST /graphql' , ()=>{
    test('deletePost', async () => {
        //the same
    })
})
describe('test mutation', ()=>{
    test('deletePost', async () => {
        // the same
    })
})