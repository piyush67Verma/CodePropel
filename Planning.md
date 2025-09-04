## Types of User --> Normal user and Admin

## Backend api's:
1) user authentication 
2) problem creation
3) submit 
4) list of all dsa problems 

## User authentication 
1. Register
2. Login 
3. Logout
4. Reset password
5. forgot password 
6. email verfication 
7. Google signup (OAuth Login)

## Several Schemas
1. User Schema 
    1.1 firstName
    1.2 lastName 
    1.3 email 
    1.4 role 
    1.5 password
    1.6 solved problems
    1.7 images
2. Problems Schema 
   2.1 title
   2.2 sample testcases
   2.3 hidden testcases
   2.4 initial code with language 
   2.5 Real solution or editorial 
   2.6 expected of sample testcases
   2.7 expected output of hidden testcases
   2.8 problem id 
   2.9 video solution 

3. Submit Schema 
    3.1 problem id 
    3.2 user solution 
    3.3 solution accepted or rejected 