const BASE_URL: string = import.meta.env.VITE_BACKEND_BASE_URL as string;

export async function post(path: string, body: any): Promise<any> {
    const myHeaders: Headers = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw: string = JSON.stringify(body);

    const requestOptions: RequestInit = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    try {
        const response = await fetch(`${BASE_URL}${path}`, requestOptions);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('error', error);
        return null;
    }
}

export async function put(path: string, body: any): Promise<any> {
    const myHeaders: Headers = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw: string = JSON.stringify(body);

    const requestOptions: RequestInit = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    try {
        const response = await fetch(`${BASE_URL}${path}`, requestOptions);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('error', error);
        return null;
    }
}


export async function get(path: string): Promise<any> {
    const myHeaders: Headers = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions: RequestInit = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    try {
        const response = await fetch(`${BASE_URL}${path}`, requestOptions);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('error', error);
        return null;
    }
}

// export async function DELETE(path: string, body: any): Promise<any> {
//     const myHeaders: Headers = new Headers();
//     myHeaders.append("Content-Type", "application/json");
//     const raw: string = JSON.stringify(body);

//     const requestOptions: RequestInit = {
//         method: 'DELETE',
//         headers: myHeaders,
//         body: raw,
//         redirect: 'follow'
//     };

//     try {
//         const response = await fetch(`${BASE_URL}${path}`, requestOptions);
//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.log('error', error);
//         return null;
//     }
// }