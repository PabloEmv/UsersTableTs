import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import { type User } from './types'
import UserList from './components/UserList'

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [showColors, setShowColors] = useState(false)
  const [sortByCountry, setSortByCountry] = useState(false)
  const [filterCountry, setFilterCountry] = useState<string | null>(null)

  // useRef para guardar un valor que queremos que se comparta entre renderizados, pero que al cambiar no vuelva a renderizar el componente
  // en este caso este useRef guarda el valor de users original
  const originalUsers = useRef<User[]>([])

  const toggleColors = () => {
    setShowColors(!showColors)
  }

  const toggleSortByCountry = () => {
    setSortByCountry((prevState) => !prevState)
  }
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch('https://randomuser.me/api/?results=100')
        const data = await res.json()
        setUsers(data.results)
        originalUsers.current = data.results
      } catch (error) {
        console.error(error)
      }
    }
    void getData()
  }, [])

  // filtramos los usuarios por país usando el input
  const filteredUsers = useMemo(() => {
    return filterCountry !== null && filterCountry.length > 0
      ? users.filter((user) => {
          return user.location.country
            .toLowerCase()
            .includes(filterCountry?.toLowerCase())
        })
      : users
  }, [users, filterCountry])

  // forma mas actualizada de ordenar por pais, pero quizas no es compatible con proyectos antiguos o navegadores desactualizados

  // utilizamos un nuevo método de array llamado toSorted

  /*
     const sortedUsers = sortByCountry
    ? users.toSorted((a, b) => {
        return a.location.country.localeCompare(b.location.country)
      })
    : users
   */

  const handleDelete = (email: string) => {
    const filteredUsers = users.filter((user) => user.email !== email)
    setUsers(filteredUsers)
  }

  const handleReset = () => {
    setUsers(originalUsers.current)
  }

  const sortedUsers = useMemo(() => {
    return sortByCountry
      ? [...filteredUsers].sort((a, b) =>
          a.location.country.localeCompare(b.location.country)
        )
      : filteredUsers
  }, [filteredUsers, sortByCountry])

  return (
    <>
      <div className="App">
        <header>
          <h1>Tabla de Usuarios</h1>
          <div>
            <button onClick={toggleColors}>Colorear filas</button>
            <button onClick={toggleSortByCountry}>
              {sortByCountry ? 'No ordenar por pais' : 'Ordenar por pais'}
            </button>
            <button onClick={handleReset}>Resetear usuarios</button>
            <input
              type="text"
              placeholder="Filtrar por país"
              onChange={(e) => {
                setFilterCountry(e.target.value)
              }}
            />
          </div>
        </header>
        <main>
          <UserList
            deleteUser={handleDelete}
            showColors={showColors}
            users={sortedUsers}
          />
        </main>
      </div>
    </>
  )
}

export default App
