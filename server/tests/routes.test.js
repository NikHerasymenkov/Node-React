const request = require('supertest')
const app = require('express')


describe("POST /api/user", () => {
    test('End-Point registration', () => {
        const data = {
            email: "user4@gmail.com",
            password: "123"
        }
        request(app)
            .post('/user/registration')
            .send(data)
            .then((res) => {
                if (res.status !== httpStatus.OK) {
                    return request(app)
                        .post('/user/registration')
                        .auth(data.email, data.password)
                }
                return res
            })
    })
    test("End-Point login", () => {
        request(app)
            .post('/user/login')
            .auth({
                email: "user4@gmail.com",
                password: "123"
            })
            .set("Accept", "application/json")
            .expect("Context-type", /json/)
            .expect(200)
            .end()
    })
        test("End-Point user/auth" ,()=>{
            request(app)
                .get('/user/auth')
                .set("Authorization","Bearer"  +{type:'token'})
                .expect(200)
                .end()
    })
})