/**
 * Creates a user with default role
 * @param {string} url 
 * @param {string} name 
 * @param {string} password 
 */
async function createUser(url, name, password) {
  try {
    await fetch(`${url}users`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        password
      })
    })
  } catch (error) {
    console.log(error)
  }
}

/**
 * Login function if saves name to localstorage
 * @param {string} url 
 * @param {string} name 
 * @param {string} password 
 * @returns boolean
 */
async function signIn(url, name, password) {
  //try catch is for handling errors
  try {
      const response = await fetch(`${url}signin`, {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              name,
              password
          })
      })
      // response is stored
      const content = await response.json();

      //if everything is ok 
      // store name to the storage and return true else false
      if (response.ok && content.role === 'user') {
          localStorage.setItem('userData', JSON.stringify(content));
          return true
      } else if (response.ok && content.role === 'admin') {
          localStorage.setItem('userData', JSON.stringify(content));
          return 'admin'
      } else {
          return false
      }
  } catch (error) {
      console.log(error)
  }
}

/**
 * get all users
 * @param {string} url 
 * @returns object
 */
async function getUsers(url) {
  try {
    const response = await fetch(`${url}users`, {
      method: 'GET',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      }
    })
    // returned data will be sent
    if (response.ok) {
      return response.json();
    }
  } catch (error) {
    console.log(error);
  }
}

/**
 * Deletes a user
 * @param {string} url 
 * @param {number} id 
 */
async function deleteUser(url, id) {
  try {
    await fetch(`${url}users/${id}`, {
      method: 'DELETE',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      }
    })
  } catch (error) {
    console.log(error);
  }
}

/**
 * Edits userdata - name or/and role
 * @param {string} url 
 * @param {number} id 
 * @param {string} name 
 * @param {string} role 
 */
async function editUser(url, id, name, role) {
  try {
    await fetch(`${url}users/${id}`, {
      method: 'PUT',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        role
      })
    })
  } catch (error) {
    console.log(error);
  }
}

export { createUser, signIn, getUsers, deleteUser, editUser }