import React from "react";
import styled from "styled-components";
import Stopwatch from "./stopwatch";

const Button = styled.button`
            background-color: black;
            color: white;
            font-size: 20px;
            padding: 10px 60px;
            border-radius: 5px;
            margin: 10px 0px;
            cursor: pointer;
`;

const Competitions = () => {
    return (
        <div>
            <h1>
                This is the Competitions Page for PeteCode!
            </h1>
            <a href="https://leetcode.com/problems/two-sum/description/" target="_blank" rel="noreferrer">
                <Stopwatch />
            </a>
        </div>
    );
};


export default Competitions;