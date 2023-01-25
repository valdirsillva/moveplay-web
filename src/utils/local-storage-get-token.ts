export function getToken() {
    let _token = localStorage.getItem('_token')

    return _token ?? null;
}

export function deleteToken() {
    localStorage.removeItem('@Auth:user')
    localStorage.removeItem('@Auth:email')
    localStorage.removeItem('@Auth:image')
    localStorage.removeItem('_token')
}
