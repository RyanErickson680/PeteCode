import axios from 'axios';

/**
 * @param {int} difficulty integer value from 1 to 3
 * @param {String} category
 * @param {int} numQuestions
 * @returns {String}
 */
async function RandomProblemsList(difficulty, category, numQuestions) {
    const url = 'https://leetcode.com/problems/';

  // Function to filter problems by category
  const filterByCategory = (data, category) => {
    return data.filter(problem => problem.stat.question__title.includes(category));
  };

  const filterByDifficulty = (data, difficulty) => {
    if (difficulty === -1) {
      return data;
    }
    return data.filter(problem => problem.difficulty.level === difficulty);
  };

  // Function to get random problems
  const getRandomProblems = (data, count) => {
    const shuffledData = [...data].sort(() => Math.random() - 0.5);
    return shuffledData.slice(0, count);
  };

  try {
    const response = await axios.get('https://leetcode.com/api/problems/algorithms/');
    //console.log(difficulty);
    //console.log(category);
    const data = response.data.stat_status_pairs;
    const categoryProblems = filterByCategory(data, category);
    const difficultyProblems = filterByDifficulty(categoryProblems, difficulty);
    const randomProblems = getRandomProblems(difficultyProblems, numQuestions);
    //console.log(randomProblems[0].stat.question__title_slug);
    
    return url + randomProblems[0].stat.question__title_slug;
  } catch (error) {
    console.error('Error fetching problems:', error);
    throw error; // Propagate the error
  }
}

export default RandomProblemsList;
