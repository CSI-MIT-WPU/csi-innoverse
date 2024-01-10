export const questionNos = [
  {
    day: 1,
    qNumber: 1768,
  },
  {
    day: 2,
    qNumber: 1071,
  },
  {
    day: 3,
    qNumber: 1431,
  },
  {
    day: 4,
    qNumber: 605,
  },
  {
    day: 5,
    qNumber: 345,
  },
  {
    day: 6,
    qNumber: 151,
  },
  {
    day: 7,
    qNumber: 238,
  },
  {
    day: 8,
    qNumber: 334,
  },
  {
    day: 9,
    qNumber: 443,
  },
  {
    day: 10,
    qNumber: 283,
  },
  {
    day: 11,
    qNumber: 392,
  },
  {
    day: 12,
    qNumber: 11,
  },
  {
    day: 13,
    qNumber: 1679,
  },
];

export const getRecentQuestions = () => {
  const currentDate = new Date();
  const startDate = new Date("2024-01-07");

  const dayDifference = Math.floor(
    (currentDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000)
  );

  const recentQuestions = questionNos.filter(
    (question) => question.day <= dayDifference + 1
  );

  return recentQuestions;
};
