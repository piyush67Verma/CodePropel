let twoSum = {
  "title": "Two Sum - Check if there is pair of numbers whose sum equals target",
  "description": "Given an array of integers nums and an integer target, return the indices of the two numbers such that they add up to target. Each input has exactly one solution, and you may not use the same element twice.",
  "difficulty": "easy",
  "tags": "Array",
  "visibleTestCases": [
    {
      "input": "4\n2 7 11 15\n9",
      "output": "0 1",
      "explanation": "nums[0] + nums[1] = 2 + 7 = 9"
    },
    {
      "input": "3\n3 2 4\n6",
      "output": "1 2",
      "explanation": "nums[1] + nums[2] = 2 + 4 = 6"
    }
  ],
  "hiddenTestCases": [
    {
      "input": "4\n1 5 3 7\n8",
      "output": "0 3"
    },
    {
      "input": "4\n10 15 2 7\n9",
      "output": "2 3"
    }
  ],
  "startCode": [
    {
      "language": "c++",
      "initialCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main(){\n    int n; cin >> n;\n    vector<int> nums(n);\n    for(int i=0; i<n; i++) cin >> nums[i];\n    int target; cin >> target;\n    // Write your code here\n    return 0;\n}"
    },
    {
      "language": "javascript",
      "initialCode": "const fs = require('fs');\nconst input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nlet idx = 0;\nlet n = parseInt(input[idx++]);\nlet nums = [];\nfor (let i = 0; i < n; i++) nums.push(parseInt(input[idx++]));\nlet target = parseInt(input[idx++]);\n// Write your code here"
    }
  ],
  "referenceSolution": [
    {
      "language": "c++",
      "completeCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main(){\n    int n; cin >> n;\n    vector<int> nums(n);\n    for(int i=0; i<n; i++) cin >> nums[i];\n    int target; cin >> target;\n    unordered_map<int,int> mp;\n    for(int i=0; i<n; i++) {\n        int complement = target - nums[i];\n        if(mp.find(complement) != mp.end()) {\n            cout << mp[complement] << \" \" << i << \"\\n\";\n            return 0;\n        }\n        mp[nums[i]] = i;\n    }\n    return 0;\n}"
    },
    {
      "language": "javascript",
      "completeCode": "const fs = require('fs');\nconst input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nlet idx = 0;\nlet n = parseInt(input[idx++]);\nlet nums = [];\nfor (let i = 0; i < n; i++) nums.push(parseInt(input[idx++]));\nlet target = parseInt(input[idx++]);\n\nconst map = new Map();\nfor (let i = 0; i < n; i++) {\n    let complement = target - nums[i];\n    if (map.has(complement)) {\n        console.log(map.get(complement) + \" \" + i);\n        process.exit(0);\n    }\n    map.set(nums[i], i);\n}"
    }
  ]
}
