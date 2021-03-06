export default {
    transform: {
        "\\.[jt]sx?$": "babel-jest",
        "^.+\\.tsx?$": "ts-jest",
    },
    collectCoverage: true,
    setupFiles: ['<rootDir>/vars.ts']
}