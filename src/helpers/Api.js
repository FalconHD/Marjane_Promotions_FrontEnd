const EndPoint = "http://localhost:5000"

export const get = async (url, token) => {
    url = EndPoint + url
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "accept": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    });
    return await response.json()
};

export const post = async (url, body, token) => {
    url = EndPoint + url
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(body)
    });
    return await response.json()
};

export const put = async (url, body) => {
    url = EndPoint + url
    const response = await fetch(url, {
        method: "PUT",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(body)
    });
    return await response.json()
}

export const patch = async (url, body) => {
    url = EndPoint + url
    const response = await fetch(url, {
        method: "PATCH",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(body)
    });
    return await response.json()
}

