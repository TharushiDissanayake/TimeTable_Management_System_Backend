const bcrypt = require('bcrypt');
const {
  registerUser,
  currentUser,
} = require("../../controllers/userController");
const User = require("../../models/userModel");

jest.mock("../../models/userModel");

describe("currentUser", () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      user: {
        userName: "fake",
        email: "fake@example.com",
        id: "fakeId",
        password: "fake",
        mobileNo: "fake",
        role: "Admin",
      },
    };

    res = {
      json: jest.fn(),
    };
  });

  it("should send current user info", async () => {
    await currentUser(req, res);
  
    expect(res.json).toHaveBeenCalledWith(req.user);
  });
  
});

// describe('registerUser', () => {
//   let req;
//   let res;

//   beforeAll(() => {
//     req = {
//       body: {
//         userName: 'fake',
//         email: 'fake',
//         password: 'fake',
//         mobileNo: 'fake',
//         role: 'Admin',
//       },
//     };

//     res = {
//       status: jest.fn((code) => {
//         // Mocking the chainable behavior of res.status().json()
//         return {
//           json: jest.fn().mockImplementation((data) => data),
//         };
//       }),
//     };
//   });

//   it('should register a user and send status code 201', async () => {
//     // Mock user not found
//     User.findOne = jest.fn().mockResolvedValueOnce(null);
//     // Mock user creation
//     User.create = jest.fn().mockResolvedValueOnce({ _id: 'fakeId', email: 'fake@example.com' });
//     // Mock bcrypt hash function
//     bcrypt.hash = jest.fn().mockResolvedValueOnce('$2b$10$V0ftkIGCfwTRckTY3LuJzO.kOhJsYbNYQJuflJHXMjAYY2sOeVg2q');

//     // Call the registerUser function
//     await registerUser(req, res);

//     // Expectations
//     expect(User.findOne).toHaveBeenCalledWith({ email: req.body.email });
//     expect(User.create).toHaveBeenCalledWith({
//       userName: req.body.userName,
//       email: req.body.email,
//       password: expect.any(String), // Checking if bcrypt hash function is called with a string
//       mobileNo: req.body.mobileNo,
//       role: req.body.role
//     });
//     expect(bcrypt.hash).toHaveBeenCalledWith(req.body.password, 10);
//     expect(res.status).toHaveBeenCalledWith(201);
//     expect(res.status().json).toHaveBeenCalledWith({ _id: 'fakeId', email: 'fake@example.com' });
//   });
// });



