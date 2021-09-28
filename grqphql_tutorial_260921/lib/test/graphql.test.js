const query =  require('../graphql/query');
const mutation = require('../graphql/mutation')
const  {DBconnect} = require('../db/index')
const { User, Post, Comment} = require('../model')
const mongoose = require('mongoose');
const { get } = require('superagent');
DBconnect();


describe('Test query', ()=>{

    // beforeAll(async ()=>{
    //     await User.remove({})
    // })

    // afterEach( async ()=>{
    //     await User.remove({})
    // })

    // afterAll( async ()=>{
    //     await mongoose.connection.close();
    // })

    test('get All User', async()=>{
        const getaAllUserMockFn = jest.fn().mockImplementation(()=>{
            return Promise.resolve({code:200})
        });
        //query.getAllUser.resolve = getaAllUserMockFn;
        query.getAllUser = getaAllUserMockFn;
        console.log( typeof query.getAllUser);
        const result = await query.getAllUser();
        //expect(getaAllUserMockFn).toHaveBeenCalled();
        //expect(getaAllUserMockFn.mock.calls.length).toBe(1);
        expect(result.code).toBe(200); 
    })

    test('get All Post', async()=>{
        const getaAllPostMockFn = jest.fn().mockImplementation(()=>{
            return Promise.resolve({code:200})
        });
        query.getAllPost = getaAllPostMockFn ;

        const result = await query.getAllPost();
        expect(getaAllPostMockFn).toHaveBeenCalled();
        expect(getaAllPostMockFn.mock.calls.length).toBe(1);
        expect(result.code).toBe(200); 
    })

    test('find User By Id', async()=>{
        const findUserByIdMockFn = jest.fn().mockImplementation(()=>{
            return Promise.resolve({code:200})
        });
        const id = "abcxyz";
        query.findUserById= findUserByIdMockFn ;
        
        const result = await query.findUserById(id);
        expect(findUserByIdMockFn).toHaveBeenCalledWith(id);
        expect(findUserByIdMockFn.mock.calls.length).toBe(1);
        expect(result.code).toBe(200); 
    })

    test('find Post By Id', async()=>{
        const findPostByIdMockFn = jest.fn().mockImplementation(()=>{
            return Promise.resolve({code:200})
        });
        const id = "abcxyz";
        query.findPostById= findPostByIdMockFn ;
        
        const result = await query.findPostById(id);
        expect(findPostByIdMockFn).toHaveBeenCalledWith(id);
        expect(findPostByIdMockFn.mock.calls.length).toBe(1);
        expect(result.code).toBe(200); 
    })


})
describe('POST /graphql' , ()=>{
    test('deletePost', async () => {

    })
})
describe('test mutation', ()=>{
    test('deletePost', async () => {

    })
})