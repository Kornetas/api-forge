const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");

// Connect to the test MongoDB database before running tests
beforeAll(async () => {
  await mongoose.connect("mongodb://localhost:27017/api-test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

// After all tests, drop the test database and close the connection
afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe("auth routes", () => {
  // Test user registration endpoint
  it("should register new user", async () => {
    const res = await request(app).post("/api/auth/register").send({
      email: "testuser@example.com",
      password: "test123",
      role: "admin",
    });

    // Expect status 201 and a success message
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("User registered success");
  });

  // Test user login endpoint and check for token
  it("should login user and return token", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "testuser@example.com",
      password: "test123",
    });

    // Expect status 200 and a token in the response
    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });
});
