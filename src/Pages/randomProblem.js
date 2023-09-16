import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CategoryDropdown from './categoryDropdown';
import { diff } from 'semver';

/**
 * 
 * @param {int} difficulty integer value from 1 to 3
 * @param {String} category 
 * @param {int} numQuestions 
 * @returns {String[]}
 */
function RandomProblemsList(difficulty, category, numQuestions) {
  const [problems, setProblems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Array'); // Default category
  var randomProblems;
  const categories = ['Array', 'String', 'Tree', 'Dynamic Programming', 'Geometry' /* Add more categories here */];

  // Function to filter problems by category
  const filterByCategory = (data, category) => {
    return data.filter(problem => problem.stat.question__title.includes(category));
  };

  const filterByDifficulty = (data, difficulty) => {
    return data.filter(problem => problem.difficulty.level == difficulty.toLowerCase())
  }

  // Function to get random problems
  const getRandomProblems = (data, count) => {
    const shuffledData = [...data].sort(() => Math.random() - 0.5);
    return shuffledData.slice(0, count);
  };

  const fetchRandomProblems = async () => {
    try {
      const response = await axios.get('https://leetcode.com/api/problems/algorithms/');
      const data = response.data.stat_status_pairs;
      const categoryProblems = filterByCategory(data, category);
      const difficultyProblems = filterByDifficulty(categoryProblems, difficulty);
      randomProblems = getRandomProblems(difficultyProblems, numQuestions); 
      setProblems(randomProblems);
    } catch (error) {
      console.error('Error fetching problems:', error);
    }
  };

  useEffect(() => {
    fetchRandomProblems();
  }, [selectedCategory]);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    randomProblems
  );
}

export default RandomProblemsList;
