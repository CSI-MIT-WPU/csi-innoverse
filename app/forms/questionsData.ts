export interface TQuestion {
  id: Number;
  qNo: Number;
  question: String;
  link: String;
}

export const questionsData: TQuestion[] = [
  {
    id: 1,
    qNo: 9,
    question: "Palindrome Number",
    link: "https://leetcode.com/problems/palindrome-number/description/",
  },
  {
    id: 2,
    qNo: 69,
    question: "Sqrt(x)",
    link: "https://leetcode.com/problems/sqrtx/description/",
  },
  {
    id: 3,
    qNo: 190,
    question: "Reverse Bits",
    link: "https://leetcode.com/problems/reverse-bits/description/",
  },
  {
    id: 4,
    qNo: 141,
    question: "Linked List Cycle",
    link: "https://leetcode.com/problems/linked-list-cycle/",
  },
  {
    id: 5,
    qNo: 263,
    question: "Ugly Number",
    link: "https://leetcode.com/problems/ugly-number/description/",
  },
  {
    id: 6,
    qNo: 290,
    question: "Word Pattern",
    link: "https://leetcode.com/problems/word-pattern/description/",
  },
  {
    id: 7,
    qNo: 4,
    question: "Median of Two Sorted Arrays",
    link: "https://leetcode.com/problems/median-of-two-sorted-arrays/description/",
  },
  {
    id: 8,
    qNo: 11,
    question: "Container With Most Water",
    link: "https://leetcode.com/problems/container-with-most-water/description/",
  },
  {
    id: 9,
    qNo: 17,
    question: "Letter Combinations of a Phone Number",
    link: "https://leetcode.com/problems/letter-combinations-of-a-phone-number/description/",
  },
  {
    id: 10,
    qNo: 38,
    question: "Count and Say",
    link: "https://leetcode.com/problems/count-and-say/description/",
  },
  {
    id: 11,
    qNo: 283,
    question: "Move Zeroes",
    link: "https://leetcode.com/problems/move-zeroes/description/",
  },
  {
    id: 12,
    qNo: 70,
    question: "Climbing Stairs",
    link: "https://leetcode.com/problems/climbing-stairs/description/",
  },
  {
    id: 13,
    qNo: 242,
    question: "Valid Anagram",
    link: "https://leetcode.com/problems/valid-anagram/description/",
  },
  {
    id: 14,
    qNo: 206,
    question: "Reverse A Linked List",
    link: "https://leetcode.com/problems/reverse-linked-list/description/",
  },
  {
    id: 15,
    qNo: 230,
    question: "Kth Smallest Element In A BST",
    link: "https://leetcode.com/problems/kth-smallest-element-in-a-bst/description/",
  },
  {
    id: 16,
    qNo: 54,
    question: "Spiral Matrix",
    link: "https://leetcode.com/problems/spiral-matrix/description/",
  },
  {
    id: 17,
    qNo: 567,
    question: "Permutation In A String",
    link: "https://leetcode.com/problems/permutation-in-string/description/",
  },
  {
    id: 18,
    qNo: 51,
    question: "N-Queens",
    link: "https://leetcode.com/problems/n-queens/description/",
  },
  {
    id: 19,
    qNo: 127,
    question: "Word Ladder",
    link: "https://leetcode.com/problems/word-ladder/description/",
  },
  {
    id: 20,
    qNo: 875,
    question: "Koko Eating Bananas",
    link: "https://leetcode.com/problems/koko-eating-bananas/description/",
  },
  {
    id: 21,
    qNo: 402,
    question: "Remove K Digits",
    link: "https://leetcode.com/problems/remove-k-digits/description/",
  },
];

export const getTodaysQuestion = () => {
  const currentDate = new Date();
  const startDate = new Date("2024-01-31");

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
