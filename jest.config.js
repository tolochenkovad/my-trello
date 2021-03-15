module.exports = {
    "roots": [
        "<rootDir>/src"
    ],
    "preset": "ts-jest",
    "transform": {"\\.(js|ts|tsx)$": ['ts-jest']},
    "testRegex": "((\\.|/)(test|spec))\\.(js|ts)$",
    "collectCoverageFrom": [
        "src/**/*.{js,jsx,ts,tsx}",
        "!/node_modules/"
    ],
    "moduleFileExtensions": [
        "ts",
        "tsx",
        "js",
        "jsx"
    ],
    "snapshotSerializers": [
        "enzyme-to-json/serializer"
    ],

    "setupFilesAfterEnv": [
        "<rootDir>/src/helpers/testsHelpers/setupEnzyme.js",
        "<rootDir>/src/helpers/testsHelpers/helpers.js"
    ],
    "moduleNameMapper": {
        "\\.(css|less|scss|sass)$": "<rootDir>/node_modules/jest-css-modules"
    }
}