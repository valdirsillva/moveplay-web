export class LocalStorageData {
    constructor() { }
    create(token: string) {
        if (!token) {
            throw new Error('Não foi possível efetuar');
        }

        if (!localStorage.getItem('token')) {
            this.populateStorage(token);
        }
    }
    getToken() {
        localStorage.getItem('_token')
    }

    populateStorage(token: string) {
        localStorage.setItem('_token', token);
    }
}
