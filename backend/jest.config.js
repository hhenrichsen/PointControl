const config = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    reporters: [ "default", "jest-junit" ],
    testRegex: ".spec.[jt]s$",
};

module.exports = config;
