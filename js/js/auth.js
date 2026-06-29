function getCurrentProfile() {
  return {
    id: localStorage.getItem('tdv_profile_id'),
    name: localStorage.getItem('tdv_profile_name')
  }
}

function logout() {
  localStorage.removeItem('tdv_profile_id')
  localStorage.removeItem('tdv_profile_name')
  window.location.href = 'index.html'
}
