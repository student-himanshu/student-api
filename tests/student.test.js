test("2+2 equals 4", () => {

    expect(2 + 2).toBe(4);

});

test("ApiError has statusCode", () => {

    const ApiError = require("../utils/ApiError");
    const error = new ApiError(404, "Student Not Found");

    expect(error.statusCode).toBe(404);
    expect(error.message).toBe("Student Not Found");

});
