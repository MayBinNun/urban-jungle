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

export async function getSignin(email, password, remember){
    let res = await fetch(`/api/user/login/${email}/${password}/${remember}`);
    if (res.status === 200) {
        return res;
    } else {
        alert(res.msg)
    }
}

export async function getAdminData(email, loggedIn) {
    if (loggedIn) {
        const res = await fetch(`/api/admin/data/${email}`);
        const json = await res.json();
        if (res.status === 200) {
            return json;
        } else {
            alert(json.msg)
        }
    } else {
        alert('oops, this data is only for an admin eyes')
    }
}

export async function insertTicket(data) {
    let res = await fetch('/api/ticket/add', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const json = await res.json();
    if (res.status === 200) {
        return json;
    } else {
        alert(json.msg)
    }
}

export async function getTicketsInfo() {

    const res = await fetch('/api/tickets/get');
    const json = await res.json();
    if (res.status === 200) {
        return json;
    } else {
        alert(json.msg)
    }
}

export async function contactUS(data) {
    const res = await fetch(`/api/contactUS`, {
        method: 'POST',
            body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
    },
    }).then(
        (res) => (res.json())
    ).then((res=>{
        if (res.status === 200){
            alert("Message Sent.");
        }else if(res.status === 500){
            alert("Message failed to send.")
        }
    }));
}

