import request from 'supertest';
import app from '../app'; 


describe('User Registration', () => {
  let token: string;

  it('should register a new user', async () => {
    const userData = {
      firstName: 'Hammed',
      lastName: 'Adigun',
      userName: 'inwa',
      email: 'inwa@.gmail.com',
      password: 'password123'
    };

    const response = await request(app)
      .post('/users/register')
      .send(userData)
      
    expect(response.statusCode).toBe(201)
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('User created successfully');
  });

  
});


describe("User Login", () => {
  let token: string;

  it('should login the user and return a JWT token', async () => {
    const userData = {
      email: 'inwa@gmail.com',
      password: 'password123'
    };

    const response = await request(app)
      .post('/users/login')
      .send(userData)
      
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('Login successful');
    expect(response.body.data).toBeDefined();

  });
});


describe("User Profile", () => {
  let token: string;

  it('should get user profile', async () => {
    const response = await request(app)
      .get('/users/profile')
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('User profile');
    expect(response.body.data).toBeDefined();
  });
});
