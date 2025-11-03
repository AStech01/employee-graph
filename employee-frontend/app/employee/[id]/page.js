// // app/employee/[id]/page.js (Full code including delete logic)
// "use client";

// import { useQuery, useMutation } from "@apollo/client/react";
// import { gql } from "@apollo/client";
// import { useParams, useRouter } from "next/navigation";
// import Link from "next/link";
// import { useState } from "react"; 

// // --- GraphQL Definitions ---

// const GET_EMPLOYEE_DETAILS = gql`
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

// const DELETE_EMPLOYEE_MUTATION = gql`
//   mutation DeleteEmployee($id: ID!) {
//     deleteEmployee(id: $id)
//   }
// `;

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

// // Helper component for styled detail cards (keep this outside the main component)
// const DetailCard = ({ title, value, icon }) => (
//     <div className="flex items-center p-4 bg-indigo-50/50 rounded-lg border border-indigo-200 shadow-sm">
//         <div className="text-3xl mr-4">{icon}</div>
//         <div>
//             <p className="text-sm font-medium text-gray-500">{title}</p>
//             <p className="text-xl font-bold text-gray-800">{value}</p>
//         </div>
//     </div>
// );


// export default function EmployeeDetail() {
//   const router = useRouter();
//   const { id } = useParams();
//   const [showModal, setShowModal] = useState(false); 

//   const { data: queryData, loading: queryLoading, error: queryError } = useQuery(GET_EMPLOYEE_DETAILS, { variables: { id } });

//   const [deleteEmployee, { loading: mutationLoading, error: mutationError }] = useMutation(
//     DELETE_EMPLOYEE_MUTATION, 
//     {
//       variables: { id },
//       // Update the cache to remove the employee from the list
//       update(cache) {
//         cache.updateQuery({ query: GET_EMPLOYEES }, (data) => ({
//           getAllEmployees: data.getAllEmployees.filter(e => e.id !== id),
//         }));
//       },
//       onCompleted: () => {
//         router.push("/");
//       },
//       onError: (err) => {
//         console.error("Delete failed:", err);
//         setShowModal(false);
//       }
//     }
//   );

//   const employee = queryData?.getEmployeeDetails;
//   const loading = queryLoading || mutationLoading;
//   const error = queryError || mutationError;

//   if (queryLoading) return <p className="p-10 text-xl text-center text-indigo-600">Loading employee details...</p>;
//   if (queryError) return <p className="p-10 text-xl text-center text-red-600 font-semibold">Error fetching data: {queryError.message}</p>;
//   if (!employee) return (
//     <div className="p-10 text-center">
//       <p className="text-xl">Employee with ID "{id}" not found.</p>
//       <Link href="/" className="mt-4 inline-block text-indigo-600 hover:underline"> &larr; Back to List </Link>
//     </div>
//   );

//   return (
//     <div className="p-8 md:p-12 min-h-screen bg-gray-50 flex justify-center items-start">
//       <div className="w-full max-w-xl bg-white shadow-2xl rounded-xl p-8 md:p-10 border border-gray-100">
        
//         <h1 className="text-4xl font-extrabold text-gray-900 mb-2 border-b pb-2">
//           {employee.name}
//         </h1>
//         <p className="text-gray-500 mb-8">Detailed information for employee ID: {employee.id}</p>

//         {mutationError && (
//             <p className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm font-medium">
//                 {mutationError.message}
//             </p>
//         )}

//         <div className="space-y-6">
//             <DetailCard title="Position" value={employee.position} icon="💼" />
//             <DetailCard title="Department" value={employee.department} icon="🏢" />
//             <DetailCard title="Annual Salary" value={`$${employee.salary.toLocaleString()}`} icon="💰" />
//         </div>

//         <div className="mt-10 flex gap-4">
//             <Link 
//               href={`/employee/edit/${employee.id}`} 
//               className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg font-semibold shadow-md hover:bg-indigo-700 transition duration-200"
//             >
//               Edit Details
//             </Link>

//             <button
//               onClick={() => setShowModal(true)} 
//               disabled={loading}
//               className={`px-5 py-2.5 rounded-lg font-semibold shadow-md transition duration-200 ${
//                 loading ? 'bg-gray-400 text-gray-700 cursor-not-allowed' : 'bg-red-600 text-white hover:bg-red-700'
//               }`}
//             >
//               {mutationLoading ? 'Deleting...' : 'Delete Employee'}
//             </button>
//         </div>

//         <div className="mt-6 text-center">
//             <Link href="/" className="text-gray-600 hover:text-indigo-600 transition duration-150">
//               &larr; Back to List
//             </Link>
//         </div>
//       </div>

//       {/* --- Delete Confirmation Modal --- */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full text-center">
//             <h3 className="text-xl font-bold mb-4 text-red-700">Confirm Deletion</h3>
//             <p className="mb-6">Are you sure you want to permanently delete **{employee.name}**? This action cannot be undone.</p>
//             <div className="flex justify-center space-x-4">
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition duration-150"
//                 disabled={mutationLoading}
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={() => deleteEmployee()}
//                 className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-150"
//                 disabled={mutationLoading}
//               >
//                 {mutationLoading ? 'Deleting...' : 'Delete Permanently'}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



"use client";

import { useQuery, useMutation } from "@apollo/client/react";
import { gql } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react"; 

// --- GraphQL Definitions ---

const GET_EMPLOYEE_DETAILS = gql`
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

const DELETE_EMPLOYEE_MUTATION = gql`
  mutation DeleteEmployee($id: ID!) {
    deleteEmployee(id: $id)
  }
`;

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

// Helper component for styled detail cards
const DetailCard = ({ title, value, icon }) => (
    <div className="flex items-center p-5 bg-white rounded-xl border border-gray-200 shadow-md transition duration-200 hover:shadow-lg">
        <div className="text-3xl mr-4 p-2 bg-indigo-100 rounded-full text-indigo-600">{icon}</div>
        <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-xl font-bold text-gray-800 break-words">{value}</p>
        </div>
    </div>
);

// New Button Style Class based on user request
const BLACK_BUTTON_CLASSES = 'bg-black text-white px-5 py-2.5 rounded-lg font-semibold shadow-md transition duration-300 cursor-pointer whitespace-nowrap hover:bg-gradient-to-r hover:from-gray-700 hover:to-black';
const RED_BUTTON_CLASSES = 'bg-red-600 text-white px-5 py-2.5 rounded-lg font-semibold shadow-md transition duration-300 cursor-pointer whitespace-nowrap hover:bg-red-700';


export default function EmployeeDetail() {
  const router = useRouter();
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false); 

  const { data: queryData, loading: queryLoading, error: queryError } = useQuery(GET_EMPLOYEE_DETAILS, { variables: { id } });

  const [deleteEmployee, { loading: mutationLoading, error: mutationError }] = useMutation(
    DELETE_EMPLOYEE_MUTATION, 
    {
      variables: { id },
      // Update the cache to remove the employee from the list
      update(cache) {
        // Use the readQuery pattern for safer cache manipulation
        const existingEmployees = cache.readQuery({ query: GET_EMPLOYEES });
        if (existingEmployees && existingEmployees.getAllEmployees) {
            cache.writeQuery({
                query: GET_EMPLOYEES,
                data: {
                    getAllEmployees: existingEmployees.getAllEmployees.filter(e => e.id !== id),
                },
            });
        }
      },
      onCompleted: () => {
        router.push("/");
      },
      onError: (err) => {
        console.error("Delete failed:", err);
        // Do not close modal on error, so user can read the error message
      }
    }
  );

  const employee = queryData?.getEmployeeDetails;
  const loading = queryLoading || mutationLoading;
  const error = queryError || mutationError;

  // --- Initial Loading/Error States ---
  if (queryLoading) return <p className="p-10 text-xl text-center text-indigo-600 animate-pulse">Loading employee details...</p>;
  if (queryError) return <p className="p-10 text-xl text-center text-red-600 font-semibold bg-red-50 rounded-lg mx-4">Error fetching data: {queryError.message}</p>;
  if (!employee) return (
    <div className="p-10 text-center bg-gray-50 min-h-screen">
      <p className="text-xl text-gray-800">Employee with ID "{id}" not found.</p>
      <Link href="/" className="mt-4 inline-block text-indigo-600 hover:underline font-medium"> &larr; Back to List </Link>
    </div>
  );
  // --- End Initial States ---


  return (
    <div className="p-4 md:p-12 min-h-screen bg-gray-50 flex justify-center items-start">
      <div className="w-full max-w-xl bg-white shadow-2xl rounded-xl p-8 md:p-10 border border-gray-100">
        
        {/* Header */}
        <header className="mb-8 border-b border-gray-200 pb-3">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
              {employee.name}
            </h1>
            <p className="text-sm text-gray-500 mt-1">Employee ID: <span className="font-mono text-xs bg-gray-100 p-1 rounded">{employee.id}</span></p>
        </header>

        {/* Error Feedback */}
        {mutationError && (
            <p className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm font-medium">
                Delete Error: {mutationError.message}
            </p>
        )}

        {/* Detail Cards */}
        <div className="space-y-6">
            <DetailCard title="Position" value={employee.position} icon="💼" />
            <DetailCard title="Department" value={employee.department} icon="🏢" />
            <DetailCard 
                title="Annual Salary" 
                value={`$${Number(employee.salary).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} 
                icon="💰" 
            />
        </div>

        {/* Action Buttons (Responsive Layout) */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
            {/* Edit Button with Black Style */}
            <Link 
              href={`/employee/edit/${employee.id}`} 
              className={BLACK_BUTTON_CLASSES}
            >
              <span className="flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zm-3.182 3.182l-7 7A4 4 0 003 17.001v2h2.001A4 4 0 009.61 16.586l7-7-2.828-2.828-3.182 3.182z" />
                </svg>
                Edit Details
              </span>
            </Link>

            {/* Delete Button with Red Style */}
            <button
              onClick={() => setShowModal(true)} 
              disabled={loading}
              className={`flex-grow-0 ${loading ? 'bg-gray-400 text-gray-700 cursor-not-allowed' : RED_BUTTON_CLASSES}`}
            >
              <span className="flex items-center justify-center gap-2">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 100 2h-1a1 1 0 100 2h1a1 1 0 100 2h-1a1 1 0 100 2h1a1 1 0 100 2v-6z" clipRule="evenodd" />
                </svg>
                {mutationLoading ? 'Deleting...' : 'Delete Employee'}
              </span>
            </button>
        </div>

        {/* Back Link */}
        <div className="mt-6 text-center">
            <Link href="/" className="text-gray-600 hover:text-black font-medium transition duration-150">
              &larr; Back to List
            </Link>
        </div>
      </div>

      {/* --- Delete Confirmation Modal --- */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white p-6 rounded-xl shadow-2xl max-w-sm w-full text-center">
            <h3 className="text-2xl font-bold mb-4 text-red-700">Confirm Deletion</h3>
            <p className="mb-6 text-gray-700">Are you sure you want to permanently delete **{employee.name}**? This action cannot be undone.</p>
            
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition duration-150 font-medium"
                disabled={mutationLoading}
              >
                Cancel
              </button>
              <button
                onClick={() => deleteEmployee()}
                className={`px-4 py-2 text-white rounded-lg transition duration-150 font-medium ${mutationLoading ? 'bg-red-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'}`}
                disabled={mutationLoading}
              >
                {mutationLoading ? 'Deleting...' : 'Delete Permanently'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
