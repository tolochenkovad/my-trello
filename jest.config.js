module.exports = {
    "roots": [
        "<rootDir>/src"
    ],
    "preset": "ts-jest",
    "transform": {"\\.(js|ts|tsx)$": ['ts-jest']},
    "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.(js|ts)$",
    "testPathIgnorePatterns": [
        "./src/__tests__/setupEnzyme.js"
    ],
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
        "<rootDir>/src/__tests__/setupEnzyme.js"
    ],
    "moduleNameMapper": {
        "\\.(css|less|scss|sass)$": "identity-obj-proxy"
    }
}