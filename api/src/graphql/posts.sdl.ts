export const schema = gql`
  enum Priority {
    low
    medium
    high
  }

  type Task {
    id: String!
    title: String!
    description: String
    dueDate: Date!
    priority: Priority!
  }

  type Query {
    tasks: [Task!]! @skipAuth
    task(id: String!): Task! @skipAuth
  }

  input CreateTaskInput {
    title: String!
    description: String
    dueDate: DateTime!
    priority: Priority!
  }

  input UpdateTaskInput {
    title: String!
    description: String
    dueDate: DateTime!
    priority: Priority!
  }

  type Mutation {
    createTask(input: CreateTaskInput!): Task! @skipAuth
    updateTask(id: String!, input: UpdateTaskInput!): Task! @skipAuth
    deleteTask(id: String!): Task! @skipAuth
  }
`
