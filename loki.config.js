module.exports = {
    // ...other config goes here
    fileNameFormatter: ({ configurationName, kind, story, parameters }) =>
      `${configurationName}/${kind} ${story}`.toLowerCase(),
  };