// for c++ 
let arr1 = [
  // tc -1
  {
    source_code: '#include <bits/stdc++.h>\n' +
      'using namespace std;\n' +
      '\n' +
      'int main(){\n' +
      '    int n; cin >> n;\n' +
      '    vector<int> nums(n);\n' +
      '    for(int i=0; i<n; i++) cin >> nums[i];\n' +
      '    int target; cin >> target;\n' +
      '    unordered_map<int,int> mp;\n' +
      '    for(int i=0; i<n; i++) {\n' +
      '        int complement = target - nums[i];\n' +
      '        if(mp.find(complement) != mp.end()) {\n' +
      '            cout << mp[complement] << " " << i << "\\n";\n' +
      '            return 0;\n' +
      '        }\n' +
      '        mp[nums[i]] = i;\n' +
      '    }\n' +
      '    return 0;\n' +
      '}',
    language_id: 105,
    stdin: '4\n2 7 11 15\n9',
    expected_output: '0 1',
    stdout: '0 1\n',
    status_id: 3,
    created_at: '2025-09-20T18:13:13.310Z',
    finished_at: '2025-09-20T18:13:15.986Z',
    time: '0.002',
    memory: 1364,
    stderr: null,
    token: '3a0efa82-c928-44ee-9a15-d7b876ec2fb7',
    number_of_runs: 1,
    cpu_time_limit: '5.0',
    cpu_extra_time: '1.0',
    wall_time_limit: '10.0',
    memory_limit: 256000,
    stack_limit: 64000,
    max_processes_and_or_threads: 128,
    enable_per_process_and_thread_time_limit: false,
    enable_per_process_and_thread_memory_limit: false,
    max_file_size: 5120,
    compile_output: null,
    exit_code: 0,
    exit_signal: null,
    message: null,
    wall_time: '0.022',
    compiler_options: null,
    command_line_arguments: null,
    redirect_stderr_to_stdout: false,
    callback_url: null,
    additional_files: null,
    enable_network: true,
    post_execution_filesystem: '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',
    status: { id: 3, description: 'Accepted' },
    language: { id: 105, name: 'C++ (GCC 14.1.0)' }
  },
  // tc -2
  {
    source_code: '#include <bits/stdc++.h>\n' +
      'using namespace std;\n' +
      '\n' +
      'int main(){\n' +
      '    int n; cin >> n;\n' +
      '    vector<int> nums(n);\n' +
      '    for(int i=0; i<n; i++) cin >> nums[i];\n' +
      '    int target; cin >> target;\n' +
      '    unordered_map<int,int> mp;\n' +
      '    for(int i=0; i<n; i++) {\n' +
      '        int complement = target - nums[i];\n' +
      '        if(mp.find(complement) != mp.end()) {\n' +
      '            cout << mp[complement] << " " << i << "\\n";\n' +
      '            return 0;\n' +
      '        }\n' +
      '        mp[nums[i]] = i;\n' +
      '    }\n' +
      '    return 0;\n' +
      '}',
    language_id: 105,
    stdin: '3\n3 2 4\n6',
    expected_output: '1 2',
    stdout: '1 2\n',
    status_id: 3,
    created_at: '2025-09-20T18:13:13.326Z',
    finished_at: '2025-09-20T18:13:15.986Z',
    time: '0.002',
    memory: 1364,
    stderr: null,
    token: '2c499159-e1d1-4703-a3db-a45398099d63',
    number_of_runs: 1,
    cpu_time_limit: '5.0',
    cpu_extra_time: '1.0',
    wall_time_limit: '10.0',
    memory_limit: 256000,
    stack_limit: 64000,
    max_processes_and_or_threads: 128,
    enable_per_process_and_thread_time_limit: false,
    enable_per_process_and_thread_memory_limit: false,
    max_file_size: 5120,
    compile_output: null,
    exit_code: 0,
    exit_signal: null,
    message: null,
    wall_time: '0.026',
    compiler_options: null,
    command_line_arguments: null,
    redirect_stderr_to_stdout: false,
    callback_url: null,
    additional_files: null,
    enable_network: true,
    post_execution_filesystem: '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',
    status: { id: 3, description: 'Accepted' },
    language: { id: 105, name: 'C++ (GCC 14.1.0)' }
  }
]

// for js 
let arr2 = [
  // tc -1 
  {
    source_code: "const fs = require('fs');\n" +
      "const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\n" +
      'let idx = 0;\n' +
      'let n = parseInt(input[idx++]);\n' +
      'let nums = [];\n' +
      'for (let i = 0; i < n; i++) nums.push(parseInt(input[idx++]));\n' +
      'let target = parseInt(input[idx++]);\n' +
      '\n' +
      'const map = new Map();\n' +
      'for (let i = 0; i < n; i++) {\n' +
      '    let complement = target - nums[i];\n' +
      '    if (map.has(complement)) {\n' +
      '        console.log(map.get(complement) + " " + i);\n' +
      '        process.exit(0);\n' +
      '    }\n' +
      '    map.set(nums[i], i);\n' +
      '}',
    language_id: 102,
    stdin: '4\n2 7 11 15\n9',
    expected_output: '0 1',
    stdout: '0 1\n',
    status_id: 3,
    created_at: '2025-09-20T18:13:17.171Z',
    finished_at: '2025-09-20T18:13:18.677Z',
    time: '1.191',
    memory: 52432,
    stderr: null,
    token: 'da906fbf-cc55-4ee0-a0b9-e54ff9983bc9',
    number_of_runs: 1,
    cpu_time_limit: '5.0',
    cpu_extra_time: '1.0',
    wall_time_limit: '10.0',
    memory_limit: 256000,
    stack_limit: 64000,
    max_processes_and_or_threads: 128,
    enable_per_process_and_thread_time_limit: false,
    enable_per_process_and_thread_memory_limit: false,
    max_file_size: 5120,
    compile_output: null,
    exit_code: 0,
    exit_signal: null,
    message: null,
    wall_time: '1.207',
    compiler_options: null,
    command_line_arguments: null,
    redirect_stderr_to_stdout: false,
    callback_url: null,
    additional_files: null,
    enable_network: true,
    post_execution_filesystem: 'UEsDBBQACAAIAKmRNFsAAAAAAAAAAOIBAAAJABwAc2NyaXB0LmpzVVQJAAO97s5ovu7OaHV4CwABBOgDAAAE6AMAAH2Qu24DIRBF+/0KlGZB2HjLSJu0kVKkSrlxgdaDjcQCYVjFUeR/z0DIo4gMEg/de88MzMFjZgbZPUvwutoEvDfYi7Gbq2J9XDOJBlUCfXiwDp7f/cyHDevXbLa3vVA52YULhdHZzHcvKHcUd0Dhw5miw9fF0zHqhPDoM6/YiXQp983s16V0Me3HzoTEeAXUOG13zNMmpag2FVc88f9hjZZ1OkK+UrK9b9GRTB7e2JOOXFyv/dExGkWcwxIdLOBLiVZrW3ubLD2g2KxhnOjqpJH/2sU3pYzSQnCgXDhWK1H+WplkNzQls2L8ycQUZkBUcKbPHppwqWtBICFaG5uau3wCUEsHCFDM1qoBAQAA4gEAAFBLAQIeAxQACAAIAKmRNFtQzNaqAQEAAOIBAAAJABgAAAAAAAEAAACkgQAAAABzY3JpcHQuanNVVAUAA73uzmh1eAsAAQToAwAABOgDAABQSwUGAAAAAAEAAQBPAAAAVAEAAAAA',
    status: { id: 3, description: 'Accepted' },
    language: { id: 102, name: 'JavaScript (Node.js 22.08.0)' }
  },
  // tc -2
  {
    source_code: "const fs = require('fs');\n" +
      "const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\n" +
      'let idx = 0;\n' +
      'let n = parseInt(input[idx++]);\n' +
      'let nums = [];\n' +
      'for (let i = 0; i < n; i++) nums.push(parseInt(input[idx++]));\n' +
      'let target = parseInt(input[idx++]);\n' +
      '\n' +
      'const map = new Map();\n' +
      'for (let i = 0; i < n; i++) {\n' +
      '    let complement = target - nums[i];\n' +
      '    if (map.has(complement)) {\n' +
      '        console.log(map.get(complement) + " " + i);\n' +
      '        process.exit(0);\n' +
      '    }\n' +
      '    map.set(nums[i], i);\n' +
      '}',
    language_id: 102,
    stdin: '3\n3 2 4\n6',
    expected_output: '1 2',
    stdout: '1 2\n',
    status_id: 3,
    created_at: '2025-09-20T18:13:17.186Z',
    finished_at: '2025-09-20T18:13:18.669Z',
    time: '1.182',
    memory: 52188,
    stderr: null,
    token: 'bd70ba6d-9692-4e33-9319-266bb6907192',
    number_of_runs: 1,
    cpu_time_limit: '5.0',
    cpu_extra_time: '1.0',
    wall_time_limit: '10.0',
    memory_limit: 256000,
    stack_limit: 64000,
    max_processes_and_or_threads: 128,
    enable_per_process_and_thread_time_limit: false,
    enable_per_process_and_thread_memory_limit: false,
    max_file_size: 5120,
    compile_output: null,
    exit_code: 0,
    exit_signal: null,
    message: null,
    wall_time: '1.198',
    compiler_options: null,
    command_line_arguments: null,
    redirect_stderr_to_stdout: false,
    callback_url: null,
    additional_files: null,
    enable_network: true,
    post_execution_filesystem: 'UEsDBBQACAAIAKmRNFsAAAAAAAAAAOIBAAAJABwAc2NyaXB0LmpzVVQJAAO97s5ovu7OaHV4CwABBOgDAAAE6AMAAH2Qu24DIRBF+/0KlGZB2HjLSJu0kVKkSrlxgdaDjcQCYVjFUeR/z0DIo4gMEg/de88MzMFjZgbZPUvwutoEvDfYi7Gbq2J9XDOJBlUCfXiwDp7f/cyHDevXbLa3vVA52YULhdHZzHcvKHcUd0Dhw5miw9fF0zHqhPDoM6/YiXQp983s16V0Me3HzoTEeAXUOG13zNMmpag2FVc88f9hjZZ1OkK+UrK9b9GRTB7e2JOOXFyv/dExGkWcwxIdLOBLiVZrW3ubLD2g2KxhnOjqpJH/2sU3pYzSQnCgXDhWK1H+WplkNzQls2L8ycQUZkBUcKbPHppwqWtBICFaG5uau3wCUEsHCFDM1qoBAQAA4gEAAFBLAQIeAxQACAAIAKmRNFtQzNaqAQEAAOIBAAAJABgAAAAAAAEAAACkgQAAAABzY3JpcHQuanNVVAUAA73uzmh1eAsAAQToAwAABOgDAABQSwUGAAAAAAEAAQBPAAAAVAEAAAAA',
    status: { id: 3, description: 'Accepted' },
    language: { id: 102, name: 'JavaScript (Node.js 22.08.0)' }
  }
]

