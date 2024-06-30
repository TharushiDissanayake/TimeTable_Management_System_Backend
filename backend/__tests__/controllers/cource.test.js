const {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
} = require("../../controllers/courseController");
const Course = require("../../models/courseModel");
const Faculty = require("../../models/facultyModel");

jest.mock("../../models/courseModel");
jest.mock("../../models/facultyModel");

describe("Course Controller", () => {
  describe("getCourses", () => {
    it("should return all courses", async () => {
      const mockCourses = [{ name: "Course 1" }, { name: "Course 2" }];
      Course.find.mockResolvedValue(mockCourses);

      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await getCourses(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockCourses);
    });
  });

  describe("getCourse", () => {
    it('should return a course when it exists', async () => {
      // Mock data for the course
      const mockCourseId = 'mockCourseId';
      const mockCourse = { _id: mockCourseId, name: 'Mock Course' };
  
      // Mocking the behavior of Course.findById
      Course.findById = jest.fn().mockResolvedValue(mockCourse);
  
      // Mock request object
      const req = { params: { id: mockCourseId } };
      // Mock response object
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      // Call the getCourse function
      await getCourse(req, res);
  
      // Expectations
      expect(Course.findById).toHaveBeenCalledWith(mockCourseId);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockCourse);
    });

    it('should return 404 when course does not exist', async () => {
      // Mock data for a non-existent course
      const mockCourseId = 'nonexistentCourseId';
  
      // Mocking the behavior of Course.findById
      Course.findById = jest.fn().mockResolvedValue(null);
  
      // Mock request object
      const req = { params: { id: mockCourseId } };
      // Mock response object
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      // Call the getCourse function
      await getCourse(req, res);
  
      // Expectations
      expect(Course.findById).toHaveBeenCalledWith(mockCourseId);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Course not found' });
    });
  });

  describe("createCourse", () => {
    it("should publish a course when all fields are provided correctly", async () => {
      const mockFaculty = { _id: "mockFacultyId" };
      Faculty.findOne.mockResolvedValue(mockFaculty);

      const mockCourse = { _id: "mockCourseId", name: "Mock Course" };
      Course.create.mockResolvedValue(mockCourse);

      const req = {
        body: {
          name: "Mock Course",
          code: "MCK101",
          credits: 3,
          facultyUserName: "mockFaculty",
          description: "Mock Course Description",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await createCourse(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockCourse);
    });

    
  });

  describe("updateCourse", () => {
    it("should update a course when it exists", async () => {
      const mockCourse = { _id: "mockCourseId", name: "Mock Course" };
      Course.findOne.mockResolvedValue(mockCourse);
      Course.findByIdAndUpdate.mockResolvedValue(mockCourse);

      const req = {
        params: { id: "mockCourseId" },
        body: { name: "Updated Course" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await updateCourse(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockCourse);
    });

    it("should return 404 when course does not exist", async () => {
      Course.findOne.mockResolvedValue(null);

      const req = {
        params: { id: "nonExistentCourseId" },
        body: { name: "Updated Course" },
      };
      const res = {
        status: jest.fn((x) => ({
          json: jest.fn(),
        })),
      };

      await updateCourse(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
    });
  });

  describe("deleteCourse", () => {
    it('should delete a course when it exists', async () => {
      // Mock data for the course
      const mockCourseId = 'mockCourseId';
      const mockCourse = { _id: mockCourseId, name: 'Mock Course' };
  
      // Mocking the behavior of Course.findById and Course.findByIdAndDelete
      Course.findById = jest.fn().mockResolvedValue(mockCourse);
      Course.findByIdAndDelete = jest.fn().mockResolvedValue(mockCourse);
  
      // Mock request object
      const req = { params: { id: mockCourseId } };
      // Mock response object
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      // Call the deleteCourse function
      await deleteCourse(req, res);
  
      // Expectations
      expect(Course.findById).toHaveBeenCalledWith(mockCourseId);
      expect(Course.findByIdAndDelete).toHaveBeenCalledWith(mockCourseId);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockCourse);
    });

    it('should return 404 when course does not exist', async () => {
      // Mock data for a non-existent course
      const mockCourseId = 'nonexistentCourseId';
  
      // Mocking the behavior of Course.findById
      Course.findById = jest.fn().mockResolvedValue(null);
  
      // Mock request object
      const req = { params: { id: mockCourseId } };
      // Mock response object
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      // Call the deleteCourse function
      await deleteCourse(req, res);
  
      // Expectations
      expect(Course.findById).toHaveBeenCalledWith(mockCourseId);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Course not found' });
    });
  });
});
