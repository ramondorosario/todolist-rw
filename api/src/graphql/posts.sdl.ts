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
    isFavorite: Boolean
    concluded: Boolean
  }

  type Query {
    tasks(filter: String): [Task!]! @requireAuth
    task(id: String!): Task! @requireAuth
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
    createTask(input: CreateTaskInput!): Task! @requireAuth
    updateTask(id: String!, input: UpdateTaskInput!): Task! @requireAuth
    deleteTasks(ids: [String]!): [String]! @requireAuth
    makeFavoriteTask(id: String!, isFavorite: Boolean!): Task! @requireAuth
    completeTasks(ids: [String]!): [String]! @requireAuth
  }
`
