import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router';
import { logoutUser } from '../authSlice';
import { useEffect } from 'react';
import { useState } from 'react';
import axiosClient from '../utils/axiosClient';
import ThemeToggle from '../components/ThemeToggle';
const HomePage = () => {
  const dispatch = useDispatch();
  const [problems, setProblems] = useState([]);
  const [solvedProblems, setSolvedProblems] = useState([]); // Initialize as empty array
  const [filters, setFilters] = useState({
    difficulty: 'all',
    tag: 'all',
    status: 'all'
  });

  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const { data } = await axiosClient.get('/problem/allProblems');
        setProblems(data || []); // Ensure it's always an array
      } catch (error) {
        console.error('Error fetching problems:', error);
        setProblems([]); // Set empty array on error
      }
    };

    const fetchSolvedProblems = async () => {
      try {
        // Fixed the URL - removed the colon before the user ID
        const { data } = await axiosClient.get(`/problem/problemsSolvedByUser/${user._id}`);
        setSolvedProblems(data.problemSolved); // Ensure it's always an array
      } catch (error) {
        console.log(data);
        console.error('Error fetching solved problems:', error);
        setSolvedProblems([]); // Set empty array on error
      }
    };

    fetchProblems();
    if (user?._id) fetchSolvedProblems(); // Added optional chaining
  }, [user]);

  const filteredProblems = problems.filter((problem) => {
    const difficultyMatch = problem.difficulty === filters.difficulty || filters.difficulty === 'all';
    const tagMatch = problem.tags === filters.tag || filters.tag === 'all';
    
    // Safe check for solved problems
    const isSolved = Array.isArray(solvedProblems) && 
                    solvedProblems.some((solvedProblem) => solvedProblem._id === problem._id);
    
    const statusMatch = filters.status === 'all' || 
                       (filters.status === 'solved' && isSolved);
    
    return difficultyMatch && tagMatch && statusMatch;
  });

  const getDifficultyBadgeColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) { // Added optional chaining
      case 'easy': return 'badge-success';
      case 'medium': return 'badge-warning';
      case 'hard': return 'badge-error';
      default: return 'badge-neutral';
    }
  };

  return (
    <div className="min-h-screen bg-base-300">
      {/* Navigation Bar */}
      <nav className="navbar bg-base-100 shadow-xl px-4">
        <div className="flex-1">
          <NavLink to="/" className="btn btn-ghost text-xl">CodePropel</NavLink>
        </div>
        <div className="flex-none gap-4">
          <ThemeToggle />
          <div className="dropdown dropdown-end">
            <div tabIndex={0} className="btn btn-ghost">
              {user?.firstName}
            </div>
            <ul className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
              <li><button onClick={handleLogout}>Logout</button></li>
              {user.role=='admin'&&<li><NavLink to="/admin">Admin</NavLink></li>}
            </ul>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto p-4">
        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <select
            className="select select-bordered"
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          >
            <option value="all">All Problems</option>
            <option value="solved">Solved Problems</option>
          </select>

          <select
            className="select select-bordered"
            value={filters.difficulty}
            onChange={(e) => setFilters({ ...filters, difficulty: e.target.value })}
          >
            <option value="all">All Difficulties</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>

          <select
            className="select select-bordered"
            value={filters.tag}
            onChange={(e) => setFilters({ ...filters, tag: e.target.value })}
          >
            <option value="all">All Tags</option>
            <option value="Array">Array</option>
            <option value="LinkedList">Linked List</option>
            <option value="Graph">Graph</option>
            <option value="DP">DP</option>
            <option value="Stack">Stack</option>
          </select>
        </div>

        {/* Problems List */}
        <div className="grid gap-4">
          {filteredProblems.map(problem => (
            <div key={problem._id} className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="flex items-center justify-between">
                  <h2 className="card-title">
                    <NavLink to={`/problem/${problem._id}`} className="hover:text-primary">
                      {problem.title}
                    </NavLink>
                  </h2>
                  {/* Safe solved status check */}
                  {Array.isArray(solvedProblems) && 
                   solvedProblems.some((solvedProblem) => solvedProblem._id === problem._id) ? (
                    <div className="badge badge-success gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Solved
                    </div>
                  ) : null}
                </div>

                <div className="flex gap-2">
                  <div className={`badge ${getDifficultyBadgeColor(problem.difficulty)}`}>
                    {problem.difficulty}
                  </div>
                  <div className="badge badge-info">
                    {problem.tags}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HomePage;