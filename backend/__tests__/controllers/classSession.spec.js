const { 
    getClassSessions,
    checkAvailabilty 
} = require("../../controllers/classSessionController");
const ClassSession = require("../../models/classSessionModel");
const Faculty = require("../../models/facultyModel");
const Resource = require("../../models/resourceModel");
const Course = require("../../models/courseModel");
const ResourceAvailability = require("../../models/resourceAvailabilityModel");
const calculateSlotsDuringTime = require("../../util/Slots");

jest.mock("../../models/classSessionModel");
jest.mock("../../models/facultyModel");
jest.mock("../../models/resourceModel");
jest.mock("../../models/courseModel");
jest.mock("../../models/resourceAvailabilityModel");
jest.mock("../../util/Slots");

describe("getClassSessions", () => {
    it("should get all class sessions", async () => {
        const req = {};
        const res = {
            status: jest.fn(() => res),
            json: jest.fn(),
        };
        const expectedClassSessions = [{ _id: "session_id_1", batch: "Batch 1" }, { _id: "session_id_2", batch: "Batch 2" }];
        
        ClassSession.find.mockResolvedValue(expectedClassSessions);

        await getClassSessions(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(expectedClassSessions);
    });


});


