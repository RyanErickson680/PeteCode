import React, { useEffect, useState } from "react";
import { LeetCode, Credential } from "leetcode-query";

const credential = new Credential();
await credential.init("YOUR-LEETCODE-SESSION-COOKIE");

const leetcode = new LeetCode();


function Recommendations() {
    useEffect(() => {
        console.log(leetcode.user('kestan'))
    });
    return (
        <div>

        </div>
    )
    

}

export default Recommendations
