"use client"

class Helpers {
    static localhost: string = 'localhost:3000';
    static server: string = '167.71.102.83:4000';
    static basePath: string = `http://${this.localhost}`;
    static apiUrl: string = `${this.basePath}/api/`;
    static imageUrl: string = `${this.basePath}/file/`;
    static serverImage = (name: string): string => {
        return `${this.basePath}/uploads/${name}`;
    };
    static authHeaders: { headers: { "Content-Type": string, "token": string } } = {
        headers: {
            "Content-Type": 'application/json',
            "token": `${localStorage.getItem("token")}`,
        },
    };
    static authFileHeaders: { headers: { "Content-Type": string, "token": string } } = {
        headers: {
            "Content-Type": 'multipart/form-data',
            "token": `${localStorage.getItem("token")}`,
        },
    };
}

export default Helpers;
