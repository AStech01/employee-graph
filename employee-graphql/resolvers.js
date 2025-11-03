// import { ObjectId } from "mongodb";
// import { connectDB } from "./db.js";

// export const resolvers = {
//   Query: {
//     getAllEmployees: async () => {
//       const db = await connectDB();
//       return db.collection("employees").find().toArray();
//     },
//     getEmployeeDetails: async (_, { id }) => {
//       const db = await connectDB();
//       return db.collection("employees").findOne({ _id: new ObjectId(id) });
//     },
//     getEmployeesByDepartment: async (_, { department }) => {
//       const db = await connectDB();
//       return db.collection("employees").find({ department }).toArray();
//     },
//   },

//   Mutation: {
//     addEmployee: async (_, { name, position, department, salary }) => {
//       const db = await connectDB();
//       const result = await db.collection("employees").insertOne({ name, position, department, salary });
//       return { id: result.insertedId, name, position, department, salary };
//     },
//   },

//   Employee: {
//     id: (parent) => parent._id || parent.id,
//   },
// };


// import { ObjectId } from "mongodb";
// import { connectDB } from "./db.js";

// export const resolvers = {
//   Query: {
//     getAllEmployees: async () => {
//       const db = await connectDB();
//       return db.collection("employees").find().toArray();
//     },

//     getEmployeeDetails: async (_, { id }) => {
//       const db = await connectDB();
//       if (!ObjectId.isValid(id)) throw new Error("Invalid ID");
//       return db.collection("employees").findOne({ _id: new ObjectId(id) });
//     },

//     getEmployeesByDepartment: async (_, { department }) => {
//       const db = await connectDB();
//       return db.collection("employees").find({ department }).toArray();
//     },
//   },

//   Mutation: {
//     addEmployee: async (_, { name, position, department, salary }) => {
//       const db = await connectDB();
//       const result = await db.collection("employees").insertOne({ name, position, department, salary });
//       return { id: result.insertedId, name, position, department, salary };
//     },

//     // ✅ Update employee
//     updateEmployee: async (_, { id, name, position, department, salary }) => {
//       const db = await connectDB();
//       if (!ObjectId.isValid(id)) throw new Error("Invalid ID");

//       await db.collection("employees").updateOne(
//         { _id: new ObjectId(id) },
//         { $set: { name, position, department, salary } }
//       );

//       return db.collection("employees").findOne({ _id: new ObjectId(id) });
//     },

//     // ✅ Delete employee
//     deleteEmployee: async (_, { id }) => {
//       const db = await connectDB();
//       if (!ObjectId.isValid(id)) throw new Error("Invalid ID");

//       const result = await db.collection("employees").deleteOne({ _id: new ObjectId(id) });
//       return result.deletedCount === 1;
//     },
//   },

//   // Map MongoDB _id to GraphQL id
//   Employee: {
//     id: (parent) => parent._id?.toString() || parent.id,
//   },
// };


// import { ObjectId } from "mongodb";
// import { connectDB } from "./db.js";

// export const resolvers = {
//   Query: {
//     // ... (Query resolvers remain the same) ...
//     getAllEmployees: async () => {
//       const db = await connectDB();
//       return db.collection("employees").find().toArray();
//     },

//     getEmployeeDetails: async (_, { id }) => {
//       const db = await connectDB();
//       // Keep throwing here, as fetching details MUST have a valid ID
//       if (!ObjectId.isValid(id)) throw new Error("Invalid ID");
//       return db.collection("employees").findOne({ _id: new ObjectId(id) });
//     },
//     // ...
//   },

//   Mutation: {
//     // ... (addEmployee and updateEmployee resolvers remain the same) ...

//     updateEmployee: async (_, { id, name, position, department, salary }) => {
//       const db = await connectDB();
//       if (!ObjectId.isValid(id)) throw new Error("Invalid ID");

//       await db.collection("employees").updateOne(
//         { _id: new ObjectId(id) },
//         { $set: { name, position, department, salary } }
//       );

//       return db.collection("employees").findOne({ _id: new ObjectId(id) });
//     },

//     // ✅ OPTIMIZED Delete employee resolver
//     deleteEmployee: async (_, { id }) => {
//       const db = await connectDB();
      
//       // If the ID is invalid, return 'false' immediately instead of throwing
//       // This is less likely to trigger a 400 Bad Request from the server.
//       if (!ObjectId.isValid(id)) {
//         console.warn(`Attempted deletion with invalid ID: ${id}`);
//         return false; 
//       }

//       const result = await db.collection("employees").deleteOne({ _id: new ObjectId(id) });
//       return result.deletedCount === 1;
//     },
//   },

//   // Map MongoDB _id to GraphQL id
//   Employee: {
//     id: (parent) => parent._id?.toString() || parent.id,
//   },
// };


import { ObjectId } from "mongodb";
import { connectDB } from "./db.js";

// --- RESOLVERS ---
export const resolvers = {
  Query: {
    // Fetches all employees from the 'employees' collection
    getAllEmployees: async () => {
      // Use try-catch to ensure database errors are caught and logged
      try {
        const db = await connectDB();
        return db.collection("employees").find().toArray();
      } catch (e) {
        console.error("Error fetching all employees:", e);
        throw new Error("Could not connect to the database or fetch employees.");
      }
    },

    // Fetches a single employee by ID
    getEmployeeDetails: async (_, { id }) => {
      try {
        const db = await connectDB();
        // Ensure the ID is a valid MongoDB ObjectId
        if (!ObjectId.isValid(id)) throw new Error("Invalid Employee ID format.");
        return db.collection("employees").findOne({ _id: new ObjectId(id) });
      } catch (e) {
         console.error("Error fetching employee details:", e);
         throw new Error("Failed to retrieve employee details.");
      }
    },
    
    // 💡 Added the missing resolver for completeness, though it may not be used by the frontend yet.
    getEmployeesByDepartment: async (_, { department }) => {
        try {
            const db = await connectDB();
            return db.collection("employees").find({ department: department }).toArray();
        } catch (e) {
            console.error("Error fetching employees by department:", e);
            throw new Error("Failed to retrieve employees for the specified department.");
        }
    }
  },

  Mutation: {
    // 💡 CRITICAL FIX: Wrap in try-catch to debug and prevent non-nullable errors.
    addEmployee: async (_, { name, position, department, salary }) => {
      try {
        const db = await connectDB();
        
        // 1. Create the new employee object
        const newEmployee = { name, position, department, salary };
        
        // 2. Insert the document into the collection
        const result = await db.collection("employees").insertOne(newEmployee);
        
        // 3. Check for successful insertion and return the created object
        if (result.insertedId) {
            // Combine the inserted ID with the input data to form the final result
            return {
                ...newEmployee,
                _id: result.insertedId, // Mapped to 'id' in the Employee resolver below
            };
        } else {
            // Fallback for unexpected insertion failure
            throw new Error("Database insert operation failed without throwing an exception.");
        }
      } catch (e) {
        // This is the line that will now catch the database connection error 
        // and throw a proper GraphQL error instead of returning null.
        console.error("CRITICAL ADD EMPLOYEE RESOLVER FAILURE:", e);
        throw new Error(`Failed to add employee: ${e.message}`);
      }
    },

    // Updates an existing employee document
    updateEmployee: async (_, { id, name, position, department, salary }) => {
      try {
        const db = await connectDB();
        if (!ObjectId.isValid(id)) throw new Error("Invalid ID");

        // Update the document
        await db.collection("employees").updateOne(
          { _id: new ObjectId(id) },
          { $set: { name, position, department, salary } }
        );

        // Return the updated document
        return db.collection("employees").findOne({ _id: new ObjectId(id) });
      } catch (e) {
         console.error("Error updating employee:", e);
         throw new Error("Failed to update employee details.");
      }
    },

    // Deletes an employee document
    deleteEmployee: async (_, { id }) => {
      try {
        const db = await connectDB();
        
        if (!ObjectId.isValid(id)) {
          console.warn(`Attempted deletion with invalid ID: ${id}`);
          return false; 
        }

        const result = await db.collection("employees").deleteOne({ _id: new ObjectId(id) });
        return result.deletedCount === 1;
      } catch (e) {
         console.error("Error deleting employee:", e);
         throw new Error("Failed to delete employee.");
      }
    },
  },

  // Maps MongoDB _id field to the GraphQL 'id' field for all Employee objects
  Employee: {
    id: (parent) => parent._id?.toString() || parent.id,
  },
};
