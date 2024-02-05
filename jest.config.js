module.exports = {
  testEnvironment: "node",
  projects: [
    {
      displayName: "module",
      testMatch: ["<rootDir>/tests/module/**/*.spec.ts"],
      transform: {
        "^.+\\.[tj]s$": [
          "ts-jest",
          {
            tsconfig: "<rootDir>/tsconfig.json",
          },
        ],
      },
    },
  ],
};
