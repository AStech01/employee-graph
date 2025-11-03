// // app/page.js
// "use client";

// import { useQuery } from "@apollo/client/react"; 
// // 2. The 'gql' tag is usually still available from the root package
// import { gql } from "@apollo/client";
// import Link from "next/link";
// import { useState } from "react";

// const GET_EMPLOYEES = gql`
//   query GetAllEmployees {
//     getAllEmployees {
//       id
//       name
//       position
//       department
//     }
//   }
// `;

// export default function HomePage() {
//   const { data, loading, error } = useQuery(GET_EMPLOYEES);
//   const [filter, setFilter] = useState("");

//   if (loading) return <p className="p-8">Loading...</p>;
//   if (error) return <p className="p-8 text-red-500">Error: {error.message}</p>;

//   const employees = filter
//     ? data.getAllEmployees.filter((e) => e.department === filter)
//     : data.getAllEmployees;

//   const departments = [...new Set(data.getAllEmployees.map((e) => e.department))];

//   return (
//     <div className="p-8">
//       <h1 className="text-2xl font-bold mb-4">Employee List</h1>

//       <div className="mb-4 flex gap-4">
//         <select
//           value={filter}
//           onChange={(e) => setFilter(e.target.value)}
//           className="border p-2 rounded"
//         >
//           <option value="">All Departments</option>
//           {departments.map((d) => (
//             <option key={d} value={d}>{d}</option>
//           ))}
//         </select>

//         <Link href="/add" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
//           Add New Employee
//         </Link>
//       </div>

//       <table className="w-full border">
//         <thead>
//           <tr className="border-b">
//             <th className="p-2 text-left">Name</th>
//             <th className="p-2 text-left">Position</th>
//             <th className="p-2 text-left">Department</th>
//           </tr>
//         </thead>
//         <tbody>
//           {employees.map((e) => (
//             <tr key={e.id} className="border-b hover:bg-gray-100">
//               <td className="p-2">
//                 <Link href={`/employee/${e.id}`} className="text-blue-500 hover:underline">
//                   {e.name}
//                 </Link>
//               </td>
//               <td className="p-2">{e.position}</td>
//               <td className="p-2">{e.department}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }


// app/page.js
// "use client";

// import { useQuery } from "@apollo/client/react"; 
// import { gql } from "@apollo/client";
// import Link from "next/link";
// import { useState } from "react";

// const GET_EMPLOYEES = gql`
//   query GetAllEmployees {
//     getAllEmployees {
//       id
//       name
//       position
//       department
//     }
//   }
// `;

// export default function HomePage() {
//   const { data, loading, error } = useQuery(GET_EMPLOYEES);
//   const [filter, setFilter] = useState("");

//   if (loading) return <p className="p-10 text-xl text-center text-blue-600">Loading employee data...</p>;
//   if (error) return <p className="p-10 text-xl text-center text-red-600 font-semibold">Error: Could not load data. {error.message}</p>;

//   const employees = filter
//     ? data.getAllEmployees.filter((e) => e.department === filter)
//     : data.getAllEmployees;

//   const departments = [...new Set(data.getAllEmployees.map((e) => e.department))];

//   return (
//     // 1. Centering the content in the viewport (max-width + mx-auto)
//     <div className="p-8 md:p-12 min-h-screen bg-gray-50 flex flex-col items-center">
//       <div className="w-full max-w-4xl bg-white shadow-xl rounded-2xl p-6 md:p-8">
        
//         {/* Header Section */}
//         <h1 className="md:text-4xl text-2xl font-extrabold text-gray-900 mb-2 border-b pb-2 text-center">
//           Employee Directory
//         </h1>
//         <p className="text-center text-gray-500 mb-8">View, filter, and manage your team members.</p>

//         {/* Controls and Actions */}
//         <div className="mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
          
//           {/* Filter Dropdown */}
//           <div className="flex items-center gap-3">
//             <label className="text-gray-700 font-medium">Filter by:</label>
//             <select
//               value={filter}
//               onChange={(e) => setFilter(e.target.value)}
//               className="border border-gray-300 bg-white p-2.5 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
//             >
//               <option value="">All Departments</option>
//               {departments.map((d) => (
//                 <option key={d} value={d}>{d}</option>
//               ))}
//             </select>
//           </div>

//           {/* Add Button */}
//           <Link 
//             href="/add" 
//             className="w-full md:w-auto bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold shadow-md hover:bg-indigo-700 transition duration-200 text-center"
//           >
//             + Add New Employee
//           </Link>
//         </div>

//         {/* Employee Table */}
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200 border-collapse">
//             <thead className="bg-indigo-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider rounded-tl-lg">Name</th>
//                 <th className="px-6 py-3 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">Position</th>
//                 <th className="px-6 py-3 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider rounded-tr-lg">Department</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-100">
//               {employees.length === 0 ? (
//                 <tr>
//                   <td colSpan="3" className="px-6 py-4 text-center text-gray-500 italic">No employees found in this department.</td>
//                 </tr>
//               ) : (
//                 employees.map((e) => (
//                   <tr key={e.id} className="hover:bg-indigo-50/50 transition duration-150">
//                     <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
//                       <Link 
//                         href={`/employee/${e.id}`} 
//                         className="text-indigo-600 hover:text-indigo-800 hover:underline"
//                       >
//                         {e.name}
//                       </Link>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{e.position}</td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{e.department}</td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useQuery } from "@apollo/client/react"; 
import { gql } from "@apollo/client";
import Link from "next/link";
import { useState } from "react";

const GET_EMPLOYEES = gql`
  query GetAllEmployees {
    getAllEmployees {
      id
      name
      position
      department
    }
  }
`;

export default function HomePage() {
  const { data, loading, error } = useQuery(GET_EMPLOYEES);
  const [filter, setFilter] = useState("");

  // --- Loading/Error States ---
  if (loading) return <p className="p-10 text-xl text-center text-indigo-600 animate-pulse">Loading employee data...</p>;
  if (error) return <p className="p-10 text-xl text-center text-red-700 font-semibold bg-red-50 rounded-lg">Error: Could not load data. {error.message}</p>;

  const employees = filter
    ? data.getAllEmployees.filter((e) => e.department === filter)
    : data.getAllEmployees;

  // Generate department list for filter dropdown
  const departments = [...new Set(data.getAllEmployees.map((e) => e.department))].sort();

  return (
    <div className="p-4 md:p-10 min-h-screen bg-gray-50 flex flex-col items-center">
      <div className="w-full max-w-5xl bg-white shadow-2xl rounded-xl p-6 md:p-10 border border-gray-100">
        
        {/* Header Section */}
        <header className="mb-8 border-b border-gray-200 pb-4">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 text-center">
              Employee Directory
          </h1>
          <p className="text-center text-gray-500 mt-1">Manage your team efficiently with filter and detail views.</p>
        </header>

        {/* Controls and Actions (Enhanced Responsiveness) */}
        <div className="mb-8 flex flex-col-reverse md:flex-row justify-between items-stretch md:items-center gap-4">
          
          {/* Filter Dropdown */}
          <div className="flex items-center w-full md:w-auto gap-3">
            <label htmlFor="department-filter" className="text-gray-700 font-medium whitespace-nowrap hidden sm:block">Filter by Department:</label>
            <select
              id="department-filter"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full border border-gray-300 bg-white p-2.5 rounded-lg shadow-sm text-gray-700 focus:ring-indigo-600 focus:border-indigo-600 transition duration-150"
            >
              <option value="">All Departments ({data.getAllEmployees.length})</option>
              {departments.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          {/* Add Button */}
          <Link 
            href="/add" 
            className="w-full md:w-auto bg-black text-white px-4 py-2 rounded hover:bg-gradient-to-r hover:from-gray-600 hover:to-black  cursor-pointer' px-6 py-2.5 rounded-lg font-semibold shadow-lg  transition duration-200 text-center flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add New Employee
          </Link>
        </div>

        {/* Employee Table (Professional Table Design) */}
        <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-md">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Position</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Department</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {employees.length === 0 ? (
                <tr>
                  <td colSpan="3" className="px-6 py-8 text-center text-gray-500 italic">
                    No employees found. Adjust the filter or add a new employee.
                  </td>
                </tr>
              ) : (
                employees.map((e) => (
                  <tr key={e.id} className="hover:bg-indigo-50 transition duration-150">
                    <td className="px-6 py-4 whitespace-nowrap font-semibold text-gray-900">
                      <Link 
                        href={`/employee/${e.id}`} 
                        className="text-black hover:text-gray-800 hover:underline"
                      >
                        {e.name}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{e.position}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{e.department}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}