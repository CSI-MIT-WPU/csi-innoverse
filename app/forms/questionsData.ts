export interface TQuestion {
  id: Number;
  qNo: Number;
  question: String;
  link: String;
}

export const questionsData: TQuestion[] = [
  {
    id: 0,
    qNo: 10,
    question: "0 question",
    link: "/",
  },
  {
    id: 1,
    qNo: 10,
    question: "First question",
    link: "/",
  },
  {
    id: 2,
    qNo: 231,
    question: "second question",
    link: "/",
  },
  {
    id: 3,
    qNo: 13120,
    question: "third question",
    link: "/",
  },
];

export const getTodaysQuestion = () => {
  const currentDate = new Date();
  const startDate = new Date("2024-01-26");

  // Set the target time for 6 PM
  const targetTime = new Date(currentDate);
  targetTime.setHours(18, 0, 0, 0);

  // Check if the current time is before 6 PM
  const isBefore6PM = currentDate < targetTime;

  // Adjust the currentDate based on the time comparison
  const adjustedDate = isBefore6PM
    ? currentDate
    : new Date(currentDate.getTime() - 24 * 60 * 60 * 1000);

  const dayDifference = Math.floor(
    (adjustedDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000)
  );

  const todaysQuestion = questionsData.find(
    (question) => question.id === dayDifference + 1
  );

  // console.log(todaysQuestion);
  return todaysQuestion;
};
