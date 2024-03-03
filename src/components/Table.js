import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Table = () => {
  const navigate = useNavigate()
  const [users, setUsers] = useState([])
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  })

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/users')
      setUsers(response.data)
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleAddUser = async () => {
    navigate('/')
  }

  const handleEditUser = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/users/${id}`)
      setFormData(response.data)
    } catch (error) {
      console.error('Error fetching user for edit:', error)
    }
  }

  const handleUpdateUser = async () => {
    try {
      await axios.put(`http://localhost:5000/users/${formData._id}`, formData)
      setFormData({ username: '', email: '', password: '' })
      fetchUsers()
    } catch (error) {
      console.error('Error updating user:', error)
    }
  }

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/users/${id}`)
      fetchUsers()
    } catch (error) {
      console.error('Error deleting user:', error)
    }
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <button
                  style={{ marginRight: '2px' }}
                  onClick={() => handleEditUser(user._id)}
                >
                  Edit
                </button>
                <button onClick={() => handleDeleteUser(user._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <h2>Add/Edit User</h2>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
        />
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />

        <button style={{ marginRight: '2px' }} onClick={handleAddUser}>
          Add User
        </button>
        <button onClick={handleUpdateUser}>Update User</button>
      </div>
    </div>
  )
}

export default Table
