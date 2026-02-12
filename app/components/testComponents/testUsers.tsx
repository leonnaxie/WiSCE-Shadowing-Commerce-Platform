"use client";

export default function TestUsers() {
    const fetchUsers = async () => {
        const res = await fetch("/apis/users");
        const data = await res.json();
        console.log(data);
    };
    return <button onClick={fetchUsers} style={{ cursor: "pointer"}}>fetch users</button>;
}