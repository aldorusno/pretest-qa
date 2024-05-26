import supertest from 'supertest';
import setting from './setting.js';
//set URL Gorest
const request = supertest(setting.baseUrl);

import  {expect} from 'chai';
//set Token Gorest
const TOKEN = setting.TOKEN;

describe('Positive Test', () => {

    let userId;

    describe('POST', () => {
        it ('/users', () =>{
            const data = {
                email: `test${Math.floor(Math.random() * 9999)}@gmail.com`,
                name: 'test1',
                gender: 'male',
                status: 'active',
            };

            return request
                .post('users')
                .set('Authorization',`Bearer ${TOKEN}`)
                .send(data)
                .then((res)=>{
                    console.log(res.body);
                    //Verify data yang di-Post sama dengan data yang dikirm
                    expect(res.body.data).to.deep.include(data);
                    //Set userId dengan id user yang sudah dibuat
                    userId = res.body.data.id;
                });
                

        });
    });

    describe('GET', () => {

        it ('GET /users/:id', () =>{
            return request.get(`users/${userId}?access-token=${TOKEN}`).then((res) => {
            //Verify id yg dicari sama dengan id yang diinput
            expect(res.body.data.id).to.be.eq(userId);
            });
        }); 
    });
    
    describe('PUT', () => {
        it('/users/:id', () => {
            const data = {
            name: `test${Math.floor(Math.random() * 9999)}`,
            };
        
            return request
            .put(`users/${userId}`)
            .set('Authorization', `Bearer ${TOKEN}`)
            .send(data)
            .then((res) => {
                console.log(res.body);
                //Verify data yang di-update sama dengan data yg dikirim
                expect(res.body.data).to.deep.include(data);
            });
        });
    });

    describe('DELETE', () => {
        it('/users/:id', () => {
            return request
            .delete(`users/${userId}`)
            .set('Authorization', `Bearer ${TOKEN}`)
            .then((res) => {
                console.log(res.body);
                //Verify data yang dicari by Id tadi sudah terhapus
                expect(res.body.data).to.be.eq(null);
            });
        });
    });
});
    
describe('Negative Test', () => {

    //set userId null untuk melakukan test negatif berupa Id tidak ditemukan
    let userId=null;

    //test case Abnormal Post - email kosong
    describe('POST', () => {
        it ('/users', () =>{
            const data = {
                email: '',
                name: 'test1',
                gender: 'male',
                status: 'active',
            };

            return request
                .post('users')
                .set('Authorization',`Bearer ${TOKEN}`)
                .send(data)
                .then((res)=>{
                    console.log(res.body);
                    expect(res.body.data).to.deep.include(data);
                    userId = res.body.data.id;
                });
                

        });
    });

    //test case Abnormal Get - id tidak ditemukan karena null
    describe('GET', () => {

        it ('GET /users/:id', () =>{
            return request.get(`users/${userId}?access-token=${TOKEN}`).then((res) => {
            expect(res.body.data.id).to.be.eq(userId);
            console.log(res.body.data.id);
            });
        }); 
    });
    
    //test case Abnormal Put - id tidak ditemukan karena null
    describe('PUT', () => {
        it('/users/:id', () => {
            const data = {
            name: `test${Math.floor(Math.random() * 9999)}`,
            };
        
            return request
            .put(`users/${userId}`)
            .set('Authorization', `Bearer ${TOKEN}`)
            .send(data)
            .then((res) => {
                console.log(res.body);
                expect(res.body.data).to.deep.include(data);
            });
        });
    });

    //test case Abnormal Delete - id tidak ditemukan karena null
    describe('DELETE', () => {
        it('/users/:id', () => {
            return request
            .delete(`users/${userId}`)
            .set('Authorization', `Bearer ${TOKEN}`)
            .then((res) => {
                console.log(res.body);
                expect(res.body.data).to.be.eq(null);
            });
        });
    });
});