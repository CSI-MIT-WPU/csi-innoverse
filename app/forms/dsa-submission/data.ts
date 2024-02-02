export const questionNos = [
  {
    id: 1,
    qNo: 9,
    question: "Palindrome Number",
    link: "https://leetcode.com/problems/palindrome-number/description/",
    revealDate: new Date("2024-02-01T18:00:00"),
  },
  {
    id: 2,
    qNo: 69,
    question: "Sqrt(x)",
    link: "https://leetcode.com/problems/sqrtx/description/",
    revealDate: new Date("2024-02-02T18:00:00"),
  },
  {
    id: 3,
    qNo: 190,
    question: "Reverse Bits",
    link: "https://leetcode.com/problems/reverse-bits/description/",
    revealDate: new Date("2024-02-03T18:00:00"),
  },
  {
    id: 4,
    qNo: 141,
    question: "Linked List Cycle",
    link: "https://leetcode.com/problems/linked-list-cycle/",
    revealDate: new Date("2024-02-04T18:00:00"),
  },
  {
    id: 5,
    qNo: 263,
    question: "Ugly Number",
    link: "https://leetcode.com/problems/ugly-number/description/",
    revealDate: new Date("2024-02-05T18:00:00"),
  },
  {
    id: 6,
    qNo: 290,
    question: "Word Pattern",
    link: "https://leetcode.com/problems/word-pattern/description/",
    revealDate: new Date("2024-02-06T18:00:00"),
  },
  {
    id: 7,
    qNo: 4,
    question: "Median of Two Sorted Arrays",
    link: "https://leetcode.com/problems/median-of-two-sorted-arrays/description/",
    revealDate: new Date("2024-02-07T18:00:00"),
  },
  {
    id: 8,
    qNo: 11,
    question: "Container With Most Water",
    link: "https://leetcode.com/problems/container-with-most-water/description/",
    revealDate: new Date("2024-02-08T18:00:00"),
  },
  {
    id: 9,
    qNo: 17,
    question: "Letter Combinations of a Phone Number",
    link: "https://leetcode.com/problems/letter-combinations-of-a-phone-number/description/",
    revealDate: new Date("2024-02-09T18:00:00"),
  },
  {
    id: 10,
    qNo: 38,
    question: "Count and Say",
    link: "https://leetcode.com/problems/count-and-say/description/",
    revealDate: new Date("2024-02-10T18:00:00"),
  },
  {
    id: 11,
    qNo: 283,
    question: "Move Zeroes",
    link: "https://leetcode.com/problems/move-zeroes/description/",
    revealDate: new Date("2024-02-11T18:00:00"),
  },
  {
    id: 12,
    qNo: 70,
    question: "Climbing Stairs",
    link: "https://leetcode.com/problems/climbing-stairs/description/",
    revealDate: new Date("2024-02-12T18:00:00"),
  },
  {
    id: 13,
    qNo: 242,
    question: "Valid Anagram",
    link: "https://leetcode.com/problems/valid-anagram/description/",
    revealDate: new Date("2024-02-13T18:00:00"),
  },
  {
    id: 14,
    qNo: 206,
    question: "Reverse A Linked List",
    link: "https://leetcode.com/problems/reverse-linked-list/description/",
    revealDate: new Date("2024-02-14T18:00:00"),
  },
  {
    id: 15,
    qNo: 230,
    question: "Kth Smallest Element In A BST",
    link: "https://leetcode.com/problems/kth-smallest-element-in-a-bst/description/",
    revealDate: new Date("2024-02-15T18:00:00"),
  },
  {
    id: 16,
    qNo: 54,
    question: "Spiral Matrix",
    link: "https://leetcode.com/problems/spiral-matrix/description/",
    revealDate: new Date("2024-02-16T18:00:00"),
  },
  {
    id: 17,
    qNo: 567,
    question: "Permutation In A String",
    link: "https://leetcode.com/problems/permutation-in-string/description/",
    revealDate: new Date("2024-02-17T18:00:00"),
  },
  {
    id: 18,
    qNo: 51,
    question: "N-Queens",
    link: "https://leetcode.com/problems/n-queens/description/",
    revealDate: new Date("2024-02-18T18:00:00"),
  },
  {
    id: 19,
    qNo: 127,
    question: "Word Ladder",
    link: "https://leetcode.com/problems/word-ladder/description/",
    revealDate: new Date("2024-02-19T18:00:00"),
  },
  {
    id: 20,
    qNo: 875,
    question: "Koko Eating Bananas",
    link: "https://leetcode.com/problems/koko-eating-bananas/description/",
    revealDate: new Date("2024-02-20T18:00:00"),
  },
  {
    id: 21,
    qNo: 402,
    question: "Remove K Digits",
    link: "https://leetcode.com/problems/remove-k-digits/description/",
    revealDate: new Date("2024-02-21T18:00:00"),
  },
];

export const getRecentQuestions = () => {
  const currentDate = new Date();
  const startDate = new Date("2024-02-01");

  // Set the target time for 6 PM
  const targetTime = new Date(currentDate);
  targetTime.setHours(18, 0, 0, 0);

  // Check if the current time is before 6 PM
  const isBefore6PM = currentDate < targetTime;

  const dayDifference = Math.floor(
    (currentDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000)
  );

  const recentQuestions = [];

  // Loop through previous days and add their questions if it's after 6 PM
  for (let i = 0; i < dayDifference; i++) {
    const questionId = i + 1; // Assuming questions start from day 1
    const question = questionNos.find((q) => q.id === questionId);

    if (question) {
      recentQuestions.push(question);
    }
  }

  // Check if it's after 6 PM and add today's question
  if (!isBefore6PM) {
    const todayQuestionId = dayDifference + 1; // Assuming today's question has an ID of dayDifference + 1
    const todayQuestion = questionNos.find((q) => q.id === todayQuestionId);

    if (todayQuestion) {
      recentQuestions.push(todayQuestion);
    }
  }

  // console.log(recentQuestions);
  return recentQuestions;
};
