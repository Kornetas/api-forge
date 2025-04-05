const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");

beforeAll(async () => {
  // połączenie z testową bazą danych
  await mongoose.connect("mongodb://localhost:27017/api-test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe("auth routes", () => {
  it("should register new user", async () => {
    const res = await request(app).post("/api/auth/register").send({
      email: "testuser@example.com",
      password: "test123",
      role: "admin",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("User registered success");
  });

  it("should login user and return token", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "testuser@example.com",
      password: "test123",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });
});
