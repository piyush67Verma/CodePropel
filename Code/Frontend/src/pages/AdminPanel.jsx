// import { useForm, useFieldArray } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
// import axiosClient from '../utils/axiosClient';
// import { useNavigate } from 'react-router';

// // Zod schema matching the problem schema
// const problemSchema = z.object({
//   title: z.string().min(1, 'Title is required'),
//   description: z.string().min(1, 'Description is required'),
//   difficulty: z.enum(['easy', 'medium', 'hard']),
//   tags: z.enum(['array', 'linkedList', 'graph', 'dp']),
//   visibleTestCases: z.array(
//     z.object({
//       input: z.string().min(1, 'Input is required'),
//       output: z.string().min(1, 'Output is required'),
//       explanation: z.string().min(1, 'Explanation is required')
//     })
//   ).min(1, 'At least one visible test case required'),
//   hiddenTestCases: z.array(
//     z.object({
//       input: z.string().min(1, 'Input is required'),
//       output: z.string().min(1, 'Output is required')
//     })
//   ).min(1, 'At least one hidden test case required'),
//   startCode: z.array(
//     z.object({
//       language: z.enum(['C++', 'JavaScript']), // Updated
//       initialCode: z.string().min(1, 'Initial code is required')
//     })
//   ).length(2, 'Both languages required'), // Updated from 3 to 2
//   referenceSolution: z.array(
//     z.object({
//       language: z.enum(['C++', 'JavaScript']), // Updated
//       completeCode: z.string().min(1, 'Complete code is required')
//     })
//   ).length(2, 'Both languages required') // Updated from 3 to 2
// });

// function AdminPanel() {
//   const navigate = useNavigate();
//   const {
//     register,
//     control,
//     handleSubmit,
//     formState: { errors, isSubmitting, isValid }
//   } = useForm({
//     resolver: zodResolver(problemSchema),
//     defaultValues: {
//       startCode: [
//         { language: 'C++', initialCode: '' },
//         { language: 'JavaScript', initialCode: '' }
//       ],
//       referenceSolution: [
//         { language: 'C++', completeCode: '' },
//         { language: 'JavaScript', completeCode: '' }
//       ]
//     }
//   });

//   const {
//     fields: visibleFields,
//     append: appendVisible,
//     remove: removeVisible
//   } = useFieldArray({
//     control,
//     name: 'visibleTestCases'
//   });

//   const {
//     fields: hiddenFields,
//     append: appendHidden,
//     remove: removeHidden
//   } = useFieldArray({
//     control,
//     name: 'hiddenTestCases'
//   });

//   const onSubmit = async (data) => {
//     console.log('Form submitted with data:', data);
//     try {
//       console.log('Sending request to server...');
//       const response = await axiosClient.post('/problem/create', data);
//       console.log('Response received:', response);
//       alert('Problem created successfully!');
//       navigate('/');
//     } catch (error) {
//       console.error('Error occurred:', error);
//       alert(`Error: ${error.response?.data?.message || error.message}`);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-base-200 py-8">
//       <div className="container mx-auto px-4 max-w-6xl">
//         <div className="text-center mb-8">
//           <h1 className="text-4xl font-bold text-primary mb-2">Create New Problem</h1>
//           <p className="text-lg text-base-content/70">Add a new coding challenge to the platform</p>
//         </div>

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

//           <div className="card bg-base-200 border-2 border-warning">
//             <div className="card-body p-4">
//               <div className="flex justify-between items-center mb-2">
//                 <h3 className="font-bold text-warning">Debug Information</h3>
//                 <button
//                   type="button"
//                   className="btn btn-xs"
//                   onClick={() => {
//                     const data = new FormData(event.target.form);
//                     const formData = Object.fromEntries(data.entries());
//                     console.log('Form Data:', formData);
//                   }}
//                 >
//                   Log to Console
//                 </button>
//               </div>
//               <div className="text-sm">
//                 <div className="grid grid-cols-2 gap-4 mb-2">
//                   <div><strong>Form Valid:</strong> {isValid ? '✅ Yes' : '❌ No'}</div>
//                   <div><strong>Errors:</strong> {Object.keys(errors).length}</div>
//                 </div>
//                 {Object.keys(errors).length > 0 && (
//                   <div className="mb-3">
//                     <strong className="text-error">Validation Errors:</strong>
//                     <pre className="text-xs bg-error/10 p-2 rounded mt-1 overflow-auto">
//                       {JSON.stringify(errors, null, 2)}
//                     </pre>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>



//           {/* Basic Information */}
//           <div className="card bg-base-100 shadow-xl">
//             <div className="card-body">
//               <h2 className="card-title text-2xl mb-6">
//                 <div className="w-2 h-8 bg-primary rounded mr-3"></div>
//                 Basic Information
//               </h2>

//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                 <div className="form-control">
//                   <label className="label">
//                     <span className="label-text font-semibold mr-2">Title</span>
//                   </label>
//                   <input
//                     {...register('title')}
//                     className={`input input-bordered input-lg w-full${errors.title ? 'input-error' : ''}`}
//                     placeholder="Enter problem title"
//                   />
//                   {errors.title && (
//                     <label className="label">
//                       <span className="label-text-alt text-error">{errors.title.message}</span>
//                     </label>
//                   )}
//                 </div>

//                 <div className="flex gap-4">
//                   <div className="form-control flex-1">
//                     <label className="label">
//                       <span className="label-text font-semibold">Difficulty</span>
//                     </label>
//                     <select
//                       {...register('difficulty')}
//                       className={`select select-bordered select-lg ${errors.difficulty ? 'select-error' : ''}`}
//                     >
//                       <option value="easy" className="text-success">Easy</option>
//                       <option value="medium" className="text-warning">Medium</option>
//                       <option value="hard" className="text-error">Hard</option>
//                     </select>
//                   </div>

//                   <div className="form-control flex-1">
//                     <label className="label">
//                       <span className="label-text font-semibold">Tag</span>
//                     </label>
//                     <select
//                       {...register('tags')}
//                       className={`select select-bordered select-lg ${errors.tags ? 'select-error' : ''}`}
//                     >
//                       <option value="array">Array</option>
//                       <option value="linkedList">Linked List</option>
//                       <option value="graph">Graph</option>
//                       <option value="dp">DP</option>
//                     </select>
//                   </div>
//                 </div>
//               </div>

//               <div className="form-control mt-4">
//                 <label className="label">
//                   <span className="label-text font-semibold mr-2">Description</span>
//                 </label>
//                 <textarea
//                   {...register('description')}
//                   className={`textarea textarea-bordered h-40 textarea-lg w-full${errors.description ? 'textarea-error' : ''}`}
//                   placeholder="Provide a detailed description of the problem..."
//                 />
//                 {errors.description && (
//                   <label className="label">
//                     <span className="label-text-alt text-error">{errors.description.message}</span>
//                   </label>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Test Cases */}
//           <div className="card bg-base-100 shadow-xl">
//             <div className="card-body">
//               <h2 className="card-title text-2xl mb-6">
//                 <div className="w-2 h-8 bg-secondary rounded mr-3"></div>
//                 Test Cases
//               </h2>

//               {/* Visible Test Cases */}
//               <div className="mb-8">
//                 <div className="flex justify-between items-center mb-4">
//                   <div>
//                     <h3 className="text-lg font-semibold">Visible Test Cases</h3>
//                     <p className="text-sm text-base-content/60">Test cases that users can see to understand the problem</p>
//                   </div>
//                   <button
//                     type="button"
//                     onClick={() => appendVisible({ input: '', output: '', explanation: '' })}
//                     className="btn btn-primary btn-sm"
//                   >
//                     <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
//                     </svg>
//                     Add Case
//                   </button>
//                 </div>

//                 <div className="space-y-4">
//                   {visibleFields.map((field, index) => (
//                     <div key={field.id} className="card bg-base-200 border border-base-300">
//                       <div className="card-body">
//                         <div className="flex justify-between items-center mb-4">
//                           <h4 className="font-medium">Test Case {index + 1}</h4>
//                           <button
//                             type="button"
//                             onClick={() => removeVisible(index)}
//                             className="btn btn-error btn-xs"
//                           >
//                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                             </svg>
//                             Remove
//                           </button>
//                         </div>

//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                           <div className="form-control">
//                             <label className="label">
//                               <span className="label-text font-medium mr-2">Input</span>
//                             </label>
//                             <input
//                               {...register(`visibleTestCases.${index}.input`)}
//                               // placeholder="e.g., [1,2,3]"
//                               className="input input-bordered font-mono"
//                             />
//                           </div>

//                           <div className="form-control">
//                             <label className="label">
//                               <span className="label-text font-medium mr-2">Output</span>
//                             </label>
//                             <input
//                               {...register(`visibleTestCases.${index}.output`)}
//                               // placeholder="e.g., 6"
//                               className="input input-bordered font-mono"
//                             />
//                           </div>
//                         </div>

//                         <div className="form-control">
//                           <label className="label">
//                             <span className="label-text font-medium mr-2">Explanation</span>
//                           </label>
//                           <textarea
//                             {...register(`visibleTestCases.${index}.explanation`)}
//                             placeholder="Explain why this output is expected..."
//                             className="textarea textarea-bordered w-full"
//                             rows={3}
//                           />
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Hidden Test Cases */}
//               <div>
//                 <div className="flex justify-between items-center mb-4">
//                   <div>
//                     <h3 className="text-lg font-semibold">Hidden Test Cases</h3>
//                     <p className="text-sm text-base-content/60">Test cases used for evaluation but not visible to users</p>
//                   </div>
//                   <button
//                     type="button"
//                     onClick={() => appendHidden({ input: '', output: '' })}
//                     className="btn btn-secondary btn-sm"
//                   >
//                     <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
//                     </svg>
//                     Add Case
//                   </button>
//                 </div>

//                 <div className="space-y-4">
//                   {hiddenFields.map((field, index) => (
//                     <div key={field.id} className="card bg-base-200 border border-base-300">
//                       <div className="card-body">
//                         <div className="flex justify-between items-center mb-4">
//                           <h4 className="font-medium">Hidden Case {index + 1}</h4>
//                           <button
//                             type="button"
//                             onClick={() => removeHidden(index)}
//                             className="btn btn-error btn-xs"
//                           >
//                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                             </svg>
//                             Remove
//                           </button>
//                         </div>

//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                           <div className="form-control">
//                             <label className="label">
//                               <span className="label-text font-medium mr-2">Input</span>
//                             </label>
//                             <input
//                               {...register(`hiddenTestCases.${index}.input`)}
//                               // placeholder="e.g., [10,20,30]"
//                               className="input input-bordered font-mono"
//                             />
//                           </div>

//                           <div className="form-control">
//                             <label className="label">
//                               <span className="label-text font-medium mr-2">Output</span>
//                             </label>
//                             <input
//                               {...register(`hiddenTestCases.${index}.output`)}
//                               // placeholder="e.g., 60"
//                               className="input input-bordered font-mono"
//                             />
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Code Templates */}
//           <div className="card bg-base-100 shadow-xl">
//             <div className="card-body">
//               <h2 className="card-title text-2xl mb-6">
//                 <div className="w-2 h-8 bg-accent rounded mr-3"></div>
//                 Code Templates & Solutions
//               </h2>

//               {/* C++ Section */}
//               <div className="space-y-6 mb-8">
//                 <div className="flex items-center gap-3 mb-4">
//                   <div className="w-2 h-6 bg-primary rounded"></div>
//                   <h3 className="text-xl font-semibold">C++</h3>
//                 </div>

//                 <div className="form-control">
//                   <label className="label">
//                     <span className="label-text font-semibold">Initial Code Template</span>
//                   </label>
//                   <div className="border-2 border-base-300 rounded-lg overflow-hidden">
//                     <div className="bg-base-300 px-4 py-2 border-b border-base-300">
//                       <span className="font-mono text-sm font-medium">C++ Starter Code</span>
//                     </div>
//                     <textarea
//                       {...register('startCode.0.initialCode')}
//                       className="w-full h-48 font-mono text-sm p-4 bg-base-100 focus:outline-none"
//                       placeholder="Enter C++ starter code..."
//                     />
//                   </div>
//                 </div>

//                 <div className="form-control">
//                   <label className="label">
//                     <span className="label-text font-semibold">Reference Solution</span>
//                   </label>
//                   <div className="border-2 border-base-300 rounded-lg overflow-hidden">
//                     <div className="bg-base-300 px-4 py-2 border-b border-base-300">
//                       <span className="font-mono text-sm font-medium">C++ Solution</span>
//                     </div>
//                     <textarea
//                       {...register('referenceSolution.0.completeCode')}
//                       className="w-full h-48 font-mono text-sm p-4 bg-base-100 focus:outline-none"
//                       placeholder="Enter C++ solution..."
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Divider */}
//               <div className="divider my-8"></div>

//               {/* JavaScript Section */}
//               <div className="space-y-6">
//                 <div className="flex items-center gap-3 mb-4">
//                   <div className="w-2 h-6 bg-secondary rounded"></div>
//                   <h3 className="text-xl font-semibold">JavaScript</h3>
//                 </div>

//                 <div className="form-control">
//                   <label className="label">
//                     <span className="label-text font-semibold">Initial Code Template</span>
//                   </label>
//                   <div className="border-2 border-base-300 rounded-lg overflow-hidden">
//                     <div className="bg-base-300 px-4 py-2 border-b border-base-300">
//                       <span className="font-mono text-sm font-medium">JavaScript Starter Code</span>
//                     </div>
//                     <textarea
//                       {...register('startCode.1.initialCode')}
//                       className="w-full h-48 font-mono text-sm p-4 bg-base-100 focus:outline-none"
//                       placeholder="Enter JavaScript starter code..."
//                     />
//                   </div>
//                 </div>

//                 <div className="form-control">
//                   <label className="label">
//                     <span className="label-text font-semibold">Reference Solution</span>
//                   </label>
//                   <div className="border-2 border-base-300 rounded-lg overflow-hidden">
//                     <div className="bg-base-300 px-4 py-2 border-b border-base-300">
//                       <span className="font-mono text-sm font-medium">JavaScript Solution</span>
//                     </div>
//                     <textarea
//                       {...register('referenceSolution.1.completeCode')}
//                       className="w-full h-48 font-mono text-sm p-4 bg-base-100 focus:outline-none"
//                       placeholder="Enter JavaScript solution..."
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Submit Button */}
//           <div className="flex justify-end gap-4 pt-4">
//             <button
//               type="button"
//               onClick={() => navigate('/')}
//               className="btn btn-ghost btn-lg"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className={`btn btn-primary btn-lg ${isSubmitting ? 'loading' : ''}`}
//               disabled={isSubmitting}
//             >
//               {isSubmitting ? 'Creating...' : 'Create Problem'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default AdminPanel;


import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axiosClient from '../utils/axiosClient';
import { NavLink, useNavigate } from 'react-router';

// Zod schema matching the problem schema
const problemSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  tags: z.enum(['Array', 'Linked List', 'Graph', 'DP', 'Stack', 'String']),
  visibleTestCases: z.array(
    z.object({
      input: z.string().min(1, 'Input is required'),
      output: z.string().min(1, 'Output is required'),
      explanation: z.string().min(1, 'Explanation is required')
    })
  ).min(1, 'At least one visible test case required'),
  hiddenTestCases: z.array(
    z.object({
      input: z.string().min(1, 'Input is required'),
      output: z.string().min(1, 'Output is required')
    })
  ).min(1, 'At least one hidden test case required'),
  startCode: z.array(
    z.object({
      language: z.enum(['C++', 'Java', 'JavaScript']),
      initialCode: z.string().min(1, 'Initial code is required')
    })
  ).length(3, 'All three languages required'),
  referenceSolution: z.array(
    z.object({
      language: z.enum(['C++', 'Java', 'JavaScript']),
      completeCode: z.string().min(1, 'Complete code is required')
    })
  ).length(3, 'All three languages required')
});

function AdminPanel() {
  const navigate = useNavigate();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(problemSchema),
    defaultValues: {
      startCode: [
        { language: 'C++', initialCode: '' },
        { language: 'Java', initialCode: '' },
        { language: 'JavaScript', initialCode: '' }
      ],
      referenceSolution: [
        { language: 'C++', completeCode: '' },
        { language: 'Java', completeCode: '' },
        { language: 'JavaScript', completeCode: '' }
      ]
    }
  });

  const {
    fields: visibleFields,
    append: appendVisible,
    remove: removeVisible
  } = useFieldArray({
    control,
    name: 'visibleTestCases'
  });

  const {
    fields: hiddenFields,
    append: appendHidden,
    remove: removeHidden
  } = useFieldArray({
    control,
    name: 'hiddenTestCases'
  });

  const onSubmit = async (data) => {
    console.log(data);
    try {

      await axiosClient.post('/problem/create', data);
      alert('Problem created successfully!');
      navigate('/');
    } catch (error) {
      alert(`Error: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Create New Problem</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Information */}
        <div className="card bg-base-100 shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
          <div className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <textarea
                {...register('title')}
                className={`input input-bordered w-full ${errors.title && 'input-error'}`}
              />
              {errors.title && (
                <span className="text-error">{errors.title.message}</span>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text ">Description</span>
              </label>
              <textarea
                {...register('description')}
                className={`textarea textarea-bordered h-32 w-full ${errors.description && 'textarea-error'}`}
              />
              {errors.description && (
                <span className="text-error">{errors.description.message}</span>
              )}
            </div>

            <div className="flex gap-4">
              <div className="form-control w-1/2">
                <label className="label">
                  <span className="label-text mr-2">Difficulty</span>
                </label>
                <select
                  {...register('difficulty')}
                  className={`select select-bordered ${errors.difficulty && 'select-error'}`}
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>

              <div className="form-control w-1/2">
                <label className="label">
                  <span className="label-text mr-2">Tag</span>
                </label>
                <select
                  {...register('tags')}
                  className={`select select-bordered ${errors.tags && 'select-error'}`}
                >
                  {/*   enum:['Array', 'Linked List', 'DP', 'Graph', 'Stack', 'String'], */}
                  <option value="Array">Array</option>
                  <option value="Linked List">Linked List</option>
                  <option value="Graph">Graph</option>
                  <option value="DP">DP</option>
                  <option value="Stack">Stack</option>
                  <option value="String">String</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Test Cases */}
        <div className="card bg-base-100 shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Test Cases</h2>

          {/* Visible Test Cases */}
          <div className="space-y-4 mb-6">
            <div className="flex justify-between items-center ">
              <h3 className="font-medium">Visible Test Cases</h3>
              <button
                type="button"
                onClick={() => appendVisible({ input: '', output: '', explanation: '' })}
                className="btn btn-sm btn-primary"
              >
                Add Visible Case
              </button>
            </div>

            {visibleFields.map((field, index) => (
              <div key={field.id} className="border p-4 rounded-lg space-y-6">
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => removeVisible(index)}
                    className="btn btn-xs btn-error"
                  >
                    Remove
                  </button>
                </div>

                <textarea
                  {...register(`visibleTestCases.${index}.input`)}
                  placeholder="Input"
                  className="input input-bordered w-full pt-1"
                />

                <textarea
                  {...register(`visibleTestCases.${index}.output`)}
                  placeholder="Output"
                  className="input input-bordered w-full pt-1"
                />

                <textarea
                  {...register(`visibleTestCases.${index}.explanation`)}
                  placeholder="Explanation"
                  className="textarea textarea-bordered w-full pt-1"
                />
              </div>
            ))}
          </div>

          {/* Hidden Test Cases */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Hidden Test Cases</h3>
              <button
                type="button"
                onClick={() => appendHidden({ input: '', output: '' })}
                className="btn btn-sm btn-primary"
              >
                Add Hidden Case
              </button>
            </div>

            {hiddenFields.map((field, index) => (
              <div key={field.id} className="border p-4 rounded-lg space-y-6">
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => removeHidden(index)}
                    className="btn btn-xs btn-error"
                  >
                    Remove
                  </button>
                </div>

                <textarea
                  {...register(`hiddenTestCases.${index}.input`)}
                  placeholder="Input"
                  className="input input-bordered w-full pt-1"
                />

                <textarea
                  {...register(`hiddenTestCases.${index}.output`)}
                  placeholder="Output"
                  className="input input-bordered w-full pt-1"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Code Templates */}
        <div className="card bg-base-100 shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Code Templates</h2>

          <div className="space-y-6">
            {[0, 1, 2].map((index) => (
              <div key={index} className="space-y-2">
                <h3 className="font-medium">
                  {index === 0 ? 'C++' : index === 1 ? 'Java' : 'JavaScript'}
                </h3>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Initial Code</span>
                  </label>
                  <pre className="bg-base-300 p-4 rounded-lg">
                    <textarea
                      {...register(`startCode.${index}.initialCode`)}
                      className="w-full bg-transparent font-mono"
                      rows={6}
                    />
                  </pre>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Reference Solution</span>
                  </label>
                  <pre className="bg-base-300 p-4 rounded-lg">
                    <textarea
                      {...register(`referenceSolution.${index}.completeCode`)}
                      className="w-full bg-transparent font-mono"
                      rows={6}
                    />
                  </pre>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Create Problem
        </button>
        <NavLink to="/" >
          <button className="btn btn-error w-full">
            Cancel
          </button>
        </NavLink>

      </form>
    </div>
  );
}

export default AdminPanel;