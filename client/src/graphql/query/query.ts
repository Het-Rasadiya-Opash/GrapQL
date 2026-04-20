export const getUsers = `#graphql
query ExampleQuery {
  users {
    username
  }
}

`;

export const addUser = `#graphql
  mutation Example($input: NewUserInput!){
  newUser(input: $input) {
    username
    email
    password
    admin
  }
}  
`;
