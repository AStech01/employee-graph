// // app/employee/edit/[id]/page.js
// "use client";

// import { useState, useEffect } from "react";
// import { useQuery, useMutation } from "@apollo/client/react";
// import { gql } from "@apollo/client";
// import { useParams, useRouter } from "next/navigation";
// import Link from "next/link";

// // --- GraphQL Definitions ---

// const GET_EMPLOYEE_BY_ID = gql`
//   query GetEmployeeDetails($id: ID!) {
//     getEmployeeDetails(id: $id) {
//       id
//       name
//       position
//       department
//       salary
//     }
//   }
// `;

// const UPDATE_EMPLOYEE_MUTATION = gql`
//   mutation UpdateEmployee($id: ID!, $name: String!, $position: String!, $department: String!, $salary: Float!) {
//     updateEmployee(id: $id, name: $name, position: $position, department: $department, salary: $salary) {
//       id
//       name
//       position
//       department
//       salary
//     }
//   }
// `;

// // --- Component Logic ---

// export default function EditEmployeePage() {
//   const router = useRouter();
//   const params = useParams();
//   const employeeId = params.id;

//   const [form, setForm] = useState({ name: "", position: "", department: "", salary: "" });

//   // 1. Fetch existing data
//   const { data, loading: queryLoading, error: queryError } = useQuery(GET_EMPLOYEE_BY_ID, {
//     variables: { id: employeeId },
//     skip: !employeeId,
//   });

//   // 2. Setup mutation
//   const [updateEmployee, { loading: mutationLoading, error: mutationError }] = useMutation(
//     UPDATE_EMPLOYEE_MUTATION,
//     {
//       onCompleted: () => {
//         router.push(`/employee/${employeeId}`); 
//       },
//     }
//   );

//   // 3. Pre-fill form when data loads
//   useEffect(() => {
//     if (data && data.getEmployeeDetails) {
//       const employee = data.getEmployeeDetails;
//       setForm({
//         name: employee.name,
//         position: employee.position,
//         department: employee.department,
//         salary: String(employee.salary), 
//       });
//     }
//   }, [data]);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (mutationLoading) return;

//     const salaryValue = parseFloat(form.salary);
    
//     // 🛑 CRITICAL CHECK
//     if (isNaN(salaryValue)) {
//         alert("Salary must be a valid number.");
//         return; 
//     }

//     try {
//       await updateEmployee({
//         variables: {
//           id: employeeId,
//           ...form,
//           salary: salaryValue, // Must be a number
//         },
//       });
//     } catch (err) {
//       console.error("Update mutation failed:", err);
//     }
//   };

//   // --- Render UI ---
//   if (queryLoading) return <p className="p-10 text-xl text-center text-indigo-600">Loading details...</p>;
//   if (queryError) return <p className="p-10 text-xl text-center text-red-600 font-semibold">Error: {queryError.message}</p>;
//   if (!data?.getEmployeeDetails) return <p className="p-10 text-xl text-center">Employee not found.</p>;

//   const employee = data.getEmployeeDetails;
//   const loading = queryLoading || mutationLoading;
//   const error = queryError || mutationError;

//   return (
//     <div className="p-8 md:p-12 min-h-screen bg-gray-50 flex justify-center items-start">
//       <div className="w-full max-w-lg bg-white shadow-2xl rounded-xl p-8 md:p-10 border border-gray-100">
//         <h1 className="text-3xl font-extrabold text-gray-900 mb-6 border-b pb-2 text-center">
//           Edit Employee: {employee.name}
//         </h1>

//         {error && (
//             <p className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm font-medium">
//                 Error: {error.message}
//             </p>
//         )}

//         <form onSubmit={handleSubmit} className="flex flex-col gap-5">
//           {/* Input fields */}
//           <input type="text" name="name" placeholder="Name" value={form.name} required onChange={handleChange} className="border border-gray-300 p-3 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150" />
//           <input type="text" name="position" placeholder="Position" value={form.position} required onChange={handleChange} className="border border-gray-300 p-3 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150" />
//           <input type="text" name="department" placeholder="Department" value={form.department} required onChange={handleChange} className="border border-gray-300 p-3 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150" />
//           <input type="number" name="salary" placeholder="Salary" value={form.salary} required onChange={handleChange} className="border border-gray-300 p-3 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150" />

//           <button
//             type="submit"
//             disabled={loading}
//             className={`text-white px-4 py-3 rounded-lg font-semibold shadow-md transition duration-200 ${
//               loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
//             }`}
//           >
//             {mutationLoading ? 'Saving Changes...' : 'Save Changes'}
//           </button>
//         </form>

//         <div className="mt-6 text-center">
//             <Link href={`/employee/${employeeId}`} className="text-gray-600 hover:text-indigo-600 transition duration-150">
//               &larr; Cancel and Go Back
//             </Link>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client/react";
import { gql } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

// --- GraphQL Definitions ---

const GET_EMPLOYEE_BY_ID = gql`
  query GetEmployeeDetails($id: ID!) {
    getEmployeeDetails(id: $id) {
      id
      name
      position
      department
      salary
    }
  }
`;

const UPDATE_EMPLOYEE_MUTATION = gql`
  mutation UpdateEmployee($id: ID!, $name: String!, $position: String!, $department: String!, $salary: Float!) {
    updateEmployee(id: $id, name: $name, position: $position, department: $department, salary: $salary) {
      id
      name
      position
      department
      salary
    }
  }
`;

// --- Component Logic ---

export default function EditEmployeePage() {
  const router = useRouter();
  const params = useParams();
  const employeeId = params.id;

  const [form, setForm] = useState({ name: "", position: "", department: "", salary: "" });
  const [validationError, setValidationError] = useState(null); // State for custom validation errors

  // 1. Fetch existing data
  const { data, loading: queryLoading, error: queryError } = useQuery(GET_EMPLOYEE_BY_ID, {
    variables: { id: employeeId },
    skip: !employeeId,
  });

  // 2. Setup mutation
  const [updateEmployee, { loading: mutationLoading, error: mutationError }] = useMutation(
    UPDATE_EMPLOYEE_MUTATION,
    {
      onCompleted: () => {
        router.push(`/employee/${employeeId}`); 
      },
    }
  );

  // 3. Pre-fill form when data loads
  useEffect(() => {
    if (data && data.getEmployeeDetails) {
      const employee = data.getEmployeeDetails;
      setForm({
        name: employee.name,
        position: employee.position,
        department: employee.department,
        salary: String(employee.salary), 
      });
    }
  }, [data]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setValidationError(null); // Clear validation error on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationError(null); // Clear previous validation errors
    if (mutationLoading) return;

    const salaryValue = parseFloat(form.salary);
    
    // Custom check replacing alert()
    if (isNaN(salaryValue) || salaryValue <= 0) {
      setValidationError("Salary must be a valid positive number.");
      return; 
    }

    try {
      await updateEmployee({
        variables: {
          id: employeeId,
          ...form,
          salary: salaryValue, // Must be a number
        },
      });
    } catch (err) {
      console.error("Update mutation failed:", err);
      // The mutationError state will handle the display of GraphQL errors
    }
  };

  // --- Render UI ---
  if (queryLoading) return <p className="p-10 text-xl text-center text-indigo-600">Loading employee data...</p>;
  if (queryError) return <p className="p-10 text-xl text-center text-red-600 font-semibold">Error: {queryError.message}</p>;
  if (!data?.getEmployeeDetails) return <p className="p-10 text-xl text-center">Employee not found.</p>;

  const employee = data.getEmployeeDetails;
  const loading = queryLoading || mutationLoading;
  const error = queryError || mutationError;

  return (
    <div className="p-4 sm:p-8 md:p-12 min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="w-full max-w-lg bg-white shadow-2xl rounded-2xl p-8 md:p-10 border border-gray-200">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6 border-b pb-3 text-center">
          Edit : {employee.name}
        </h1>

        {/* Display GraphQL Mutation Error */}
        {error && (
            <p className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm font-medium">
                Server Error: {error.message}
            </p>
        )}
        
        {/* Display Client-Side Validation Error (replaces alert) */}
        {validationError && (
            <p className="bg-yellow-50 border border-yellow-400 text-yellow-700 px-4 py-3 rounded-lg mb-4 text-sm font-medium font-mono">
                🛑 {validationError}
            </p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Input fields */}
          <input type="text" name="name" placeholder="Name" value={form.name} required onChange={handleChange} className="border border-gray-300 p-3 rounded-xl shadow-inner focus:ring-indigo-600 focus:border-indigo-600 transition duration-150" />
          <input type="text" name="position" placeholder="Position (e.g., Senior Developer)" value={form.position} required onChange={handleChange} className="border border-gray-300 p-3 rounded-xl shadow-inner focus:ring-indigo-600 focus:border-indigo-600 transition duration-150" />
          <input type="text" name="department" placeholder="Department (e.g., Marketing, Engineering)" value={form.department} required onChange={handleChange} className="border border-gray-300 p-3 rounded-xl shadow-inner focus:ring-indigo-600 focus:border-indigo-600 transition duration-150" />
          <input type="number" name="salary" placeholder="Annual Salary (e.g., 85000)" value={form.salary} required onChange={handleChange} className="border border-gray-300 p-3 rounded-xl shadow-inner focus:ring-indigo-600 focus:border-indigo-600 transition duration-150" />

          {/* Custom Styled Save Button */}
          <button
            type="submit"
            disabled={loading}
            className={`
              text-white px-4 py-3 rounded-xl font-semibold shadow-xl uppercase tracking-wider transition duration-300 transform
              ${
                loading 
                  ? 'bg-gray-600  opacity-75' 
                  : 'bg-black cursor-pointer sm:text-md text-xs hover:bg-gradient-to-r hover:from-gray-800 hover:to-black hover:scale-[1.01]'
              }
            `}
          >
            {mutationLoading ? 'Saving Changes...' : 'Save Changes'}
          </button>
        </form>

        <div className="mt-8 text-center">
            <Link 
                href={`/employee/${employeeId}`} 
                className="text-gray-500 text-sm hover:text-black transition duration-150 "
            >
              &larr; Cancel and Go Back 
            </Link>
        </div>
      </div>
    </div>
  );
}
