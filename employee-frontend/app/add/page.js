
"use client";

import { useMutation } from "@apollo/client/react"; 
import { gql } from "@apollo/client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link"; // Added Link for professional navigation

// --- GraphQL Query for Cache Management (Recommended for UX) ---
// This query is needed to automatically update the Home Page after a successful add.
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

const ADD_EMPLOYEE = gql`
  mutation AddEmployee($name: String!, $position: String!, $department: String!, $salary: Float!) {
    addEmployee(name: $name, position: $position, department: $department, salary: $salary) {
      id
      name
      position
      department
    }
  }
`;

export default function AddEmployee() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", position: "", department: "", salary: "" });
  
  // Destructure loading and error for user feedback
  const [addEmployee, { loading, error }] = useMutation(ADD_EMPLOYEE, {
    // Optional: Add cache update logic for instant list refresh
    refetchQueries: [{ query: GET_EMPLOYEES, name: 'GetAllEmployees' }],
    onCompleted: () => {
        router.push("/"); 
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return; 
    
    // Check if any fields are empty before submitting
    if (!form.name || !form.position || !form.department || !form.salary) {
      alert("Please fill in all required fields.");
      return;
    }

    await addEmployee({ 
      variables: { 
        ...form, 
        salary: parseFloat(form.salary) 
      } 
    });
    // Navigation is handled in onCompleted now
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    // 1. Centering the content in an attractive card
    <div className="p-8 md:p-12 min-h-screen bg-gray-50 flex justify-center items-center">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-xl p-8 md:p-10 border border-gray-100">
        
        {/* Header */}
        <h1 className="sm:text-3xl text-[18px]  font-extrabold text-black mb-2 text-center">
          Enroll New Employee
        </h1>
        <p className=" text-center sm:text-lg text-xs text-gray-500 mb-8">Fill in the details below to add a new team member.</p>

        {/* Error Feedback */}
        {error && (
            <p className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm font-medium">
                Submission Error: {error.message}
            </p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          
          {/* Input: Name */}
          <input
            type="text"
            name="name" // Added name attribute for clarity
            placeholder="Full Name"
            value={form.name}
            required
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
          />
          
          {/* Input: Position */}
          <input
            type="text"
            name="position"
            placeholder="Job Position (e.g., Senior Developer)"
            value={form.position}
            required
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
          />
          
          {/* Input: Department */}
          <input
            type="text"
            name="department"
            placeholder="Department (e.g., Marketing)"
            value={form.department}
            required
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
          />
          
          {/* Input: Salary */}
          <input
            type="number"
            name="salary"
            placeholder="Salary (e.g., 65000)"
            value={form.salary}
            required
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
          />
          
          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={loading} // Disabled when loading
            className={`w-full  text-white px-4 sm:text-[16px] text-[12px] py-3 rounded-lg font-semibold shadow-md transition duration-200 ${
              loading 
                ? 'bg-gray-500 ' 
                : 'bg-black text-white px-4 py-2 rounded hover:bg-gradient-to-r hover:from-gray-600 hover:to-black transition duration-300 cursor-pointer'
            }`}
          >
            {loading ? 'Adding Employee...' : 'Submit & Add Employee'}
          </button>
        </form>

        {/* Back Link */}
        <div className="mt-6 text-center">
            <Link href="/" className="text-gray-600 hover:text-black transition duration-150">
              &larr; Back to Employee List
            </Link>
        </div>
      </div>
    </div>
  );
}