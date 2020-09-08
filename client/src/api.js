

export async function postSignup(data) {
    let res = await fetch('/api/user/signup', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const json = await res.json();
    if (res.status === 200) {
        return json;
        alert("json sent");
    } else {
        alert(json.msg)
    }
}