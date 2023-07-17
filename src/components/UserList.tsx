import { type User } from '../types'

interface Props {
  users: User[]
  showColors: boolean
  deleteUser: (email: string) => void
}
export default function UserList({ users, showColors, deleteUser }: Props) {
  return (
    <>
      <table className="users_table">
        <thead>
          <tr>
            <th>Foto</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Pais</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            const backgroundColor = index % 2 === 0 ? '#444' : '#555'
            const color = showColors ? backgroundColor : 'transparent'
            return (
              <tr key={user.email} style={{ backgroundColor: color }}>
                <td>
                  <img src={user.picture.thumbnail} />
                </td>
                <td>{user.name.first}</td>
                <td>{user.name.last}</td>
                <td>{user.location.country}</td>
                <td>
                  <button
                    onClick={() => {
                      deleteUser(user.email)
                    }}
                  >
                    Borrar
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}
