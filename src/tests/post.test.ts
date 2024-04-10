import request from 'supertest';
import app from '../app'; 



describe('Post Creation', () => {
    let token: string;
  
    it('should create a new post', async () => {
        const postData = {
            test: 'Test Post',
          };

        const response = await request(app)
          .post('/posts/create')
          .set('Authorization', `Bearer ${token}`)
          .send(postData)
          
        expect(response.statusCode).toBe(201)
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Post created successfully');
        expect(response.body.data).toBeDefined();
      });
  });


  describe('Get post feeds', () => { 
    let token: string;

    it('should get personalized feed', async () => {
        const response = await request(app)
          .get('/posts/postfeeds')
          .set('Authorization', `Bearer ${token}`)
          
    
        expect(response.statusCode).toBe(200)
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Personalized feed retrieved successfully');
        expect(response.body.data).toBeDefined();
      });
  });


  describe('Like Post', () => { 
    let token: string;

    it('should like a post', async () => {
        const postsResponse = await request(app)
          .get('/posts/postfeeds')
          .set('Authorization', `Bearer ${token}`);
    
        const postId = postsResponse.body.data[0]._id; // Assuming the first post in the feed
    
        const response = await request(app)
          .post(`/posts/likepost/${postId}`)
          .set('Authorization', `Bearer ${token}`)
          
    
        expect(response.statusCode).toBe(201);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Post liked successfully');
        expect(response.body.data).toBeDefined();
      });
  });


  describe('add comment', () => { 
    let token: string;

    it('should add a comment to a post', async () => {
        const postsResponse = await request(app)
          .get('/posts/postfeeds')
          .set('Authorization', `Bearer ${token}`);
    
        const postId = postsResponse.body.data[0]._id; // Assuming the first post in the feed
    
        const response = await request(app)
          .post(`/posts/addcomment/${postId}`)
          .set('Authorization', `Bearer ${token}`)
          .send({ text: 'Test comment' })
    
        expect(response.statusCode).toBe(201);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Comment added successfully');
        expect(response.body.data).toBeDefined();
      });
  });


  describe('delete comment', () => { 
    let token: string;

    it('should add a comment to a post', async () => {
        const postsResponse = await request(app)
          .get('/posts/postfeeds')
          .set('Authorization', `Bearer ${token}`);
    
        const postId = postsResponse.body.data[0]._id; // Assuming the first post in the feed
    
        const commentsResponse = await request(app)
      .get(`/posts/${postId}/comments`)
      .set('Authorization', `Bearer ${token}`);

    const commentId = commentsResponse.body.data[0]._id; // Assuming the first comment in the post

    const response = await request(app)
      .delete(`/posts/deletecomment/${commentId}`)
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('Comment deleted successfully');
      });
  });



  describe('post details', () => { 
    let token: string;

    it('should get post details', async () => {
        const postsResponse = await request(app)
          .get('/posts/postfeeds')
          .set('Authorization', `Bearer ${token}`);
    
        const postId = postsResponse.body.data[0]._id; // Assuming the first post in the feed
    
        const response = await request(app)
          .get(`/posts/postdetails/${postId}`)
          .set('Authorization', `Bearer ${token}`)
    
        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Post details retrieved successfully');
        expect(response.body.post).toBeDefined();
      });
  });
