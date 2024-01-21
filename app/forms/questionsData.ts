export interface TQuestion {
  id: Number;
  qNo: Number;
  question: String;
  link: String;
}

export const questionsData: TQuestion[] = [
  {
    id: 1,
    qNo: 10,
    question: "First question",
    link: "/",
  },
  {
    id: 2,
    qNo: 231,
    question: "First question",
    link: "/",
  },
  {
    id: 3,
    qNo: 13120,
    question: "First question",
    link: "/",
  },
];

export const getTodaysQuestion = () => {
  const currentDate = new Date();
  const startDate = new Date("2024-01-21");

  const dayDifference = Math.floor(
    (currentDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000)
  );

  return questionsData.filter((question) => question.id === dayDifference + 1);
};
