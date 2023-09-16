import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CategoryDropdown from './categoryDropdown';

function RandomProblemsList() {
  const [problems, setProblems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Array'); // Default category

  const categories = ['Array', 'String', 'Tree', 'Dynamic Programming', 'Geometry' /* Add more categories here */];

  // Function to filter problems by category
  const filterByCategory = (data, category) => {
    return data.filter(problem => problem.stat.question__title.includes(category));
  };

  // Function to get random problems
  const getRandomProblems = (data, count) => {
    const shuffledData = [...data].sort(() => Math.random() - 0.5);
    return shuffledData.slice(0, count);
  };

  const fetchRandomProblems = async () => {
    try {
      const response = await axios.get('https://leetcode.com/api/problems/algorithms/');
      const data = response.data.stat_status_pairs;
      const categoryProblems = filterByCategory(data, selectedCategory);
      const randomProblems = getRandomProblems(categoryProblems, 5); // Get 5 random problems
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
    <div>
      <h2>Random {selectedCategory} Problems</h2>
      <CategoryDropdown
        categories={categories}
        selectedCategory={selectedCategory}
        onChange={handleCategoryChange}
      />
      <ul>
        {problems.map((problem, index) => (
          <li key={index}>
            <a href={`https://leetcode.com/problems/${problem.stat.question__title_slug}`} target="_blank" rel="noopener noreferrer">
              {problem.stat.question__title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RandomProblemsList;
