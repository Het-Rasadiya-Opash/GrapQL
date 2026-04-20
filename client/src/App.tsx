import { gql } from "@apollo/client"
import { useLazyQuery, useMutation, useQuery } from "@apollo/client/react"
import { addUser, getUsers } from "./graphql/query/query"
import { useState, type FormEvent } from "react"


const App = () => {
  // const { loading, data, error } = useQuery(gql(getUsers))

  const [trigger, { loading, data, error }] = useLazyQuery(gql(getUsers))

  const [add, { data: addUserResponse }] = useMutation(gql(addUser))

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")

  console.log(addUserResponse)

  const formSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    add({
      variables: {
        input: {
          username, email, password
        }
      }
    })
    setUsername("")
    setEmail("")
    setPassword("")
  }

  if (error) return <h1>Some Error</h1>
  console.log(data?.users)
  return (
    loading ? (<h1>Loading....</h1>) : (
      <div>
        <h1>Users</h1>
        {
          data?.users.map((user) => (
            <h1>{user.username}</h1>
          ))
        }
        <button onClick={() => trigger()}>Get Data </button>

        <form onSubmit={formSubmitHandler}>
          <input type="text" placeholder="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <input type="email" placeholder="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit">Add Data </button>
        </form>

      </div>
    )
  )
}

export default App
