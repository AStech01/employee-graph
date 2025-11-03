// import { gql } from "apollo-server";

// export const typeDefs = gql`

//   type Employee {
//     id: ID!
//     name: String!
//     position: String!
//     department: String!
//     salary: Float!
//   }

//   type Department {
//     id: ID!
//     name: String!
//     floor: Int!
//   }

//   type Query {
//     getAllEmployees: [Employee!]!
//     getEmployeeDetails(id: ID!): Employee
//     getEmployeesByDepartment(department: String!): [Employee!]!
//   }

//   type Mutation {
//     addEmployee(name: String!, position: String!, department: String!, salary: Float!): Employee!
//   }

  
// `;

// import { gql } from "apollo-server";

// export const typeDefs = gql`
//   type Employee {
//     id: ID!
//     name: String!
//     position: String!
//     department: String!
//     salary: Float!
//   }

//   type Department {
//     id: ID!
//     name: String!
//     floor: Int!
//   }

//   type Query {
//     getAllEmployees: [Employee!]!
//     getEmployeeDetails(id: ID!): Employee
//     getEmployeesByDepartment(department: String!): [Employee!]!
//   }

//   type Mutation {
//     addEmployee(name: String!, position: String!, department: String!, salary: Float!): Employee!
    
//     # ✅ New mutations for edit and delete
//     updateEmployee(
//       id: ID!
//       name: String!
//       position: String!
//       department: String!
//       salary: Float!
//     ): Employee!

//     deleteEmployee(id: ID!): Boolean!
//   }
// `;


import { gql } from "apollo-server";

// --- TYPE DEFINITIONS ---
export const typeDefs = gql`
  type Employee {
    id: ID!
    name: String!
    position: String!
    department: String!
    salary: Float!
  }

  type Department {
    id: ID!
    name: String!
    floor: Int!
  }

  type Query {
    getAllEmployees: [Employee!]!
    getEmployeeDetails(id: ID!): Employee
    getEmployeesByDepartment(department: String!): [Employee!]!
  }

  type Mutation {
    addEmployee(name: String!, position: String!, department: String!, salary: Float!): Employee!
    
    updateEmployee(
      id: ID!
      name: String!
      position: String!
      department: String!
      salary: Float!
    ): Employee!

    deleteEmployee(id: ID!): Boolean!
  }
`;
