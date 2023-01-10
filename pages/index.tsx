import { FormEventHandler, MouseEventHandler, use, useState } from 'react'

type userDashboardProps = {
    userId: string,
    username: string,
    email: string,
    birthdate: string,
    registeredAt: string,
    logout: MouseEventHandler<HTMLInputElement>
}

export default function Home() {

    const [logged, setLogged] = useState(false)
    const [user, setUser] = useState({
        userId: "",
        username: "",
        email: "",
        birthdate: "",
        registeredAt: ""
    })

    function logOut() {
        setUser({
            userId: "",
            username: "",
            email: "",
            birthdate: "",
            registeredAt: ""
        })
        setLogged(false)
    }

    async function handleSubmit(e) {
        e.preventDefault()
        const user = {
            email: e.target.email.value,
            password: e.target.password.value
        }

        const reqInit = {
            method: "POST",
            body: JSON.stringify(user)
        }

        fetch('./api/login', reqInit).then(res => {
            if (res.ok) {
                res.json().then(body => {
                    const user = {
                        userId: body.userId,
                        username: body.username,
                        email: body.email,
                        birthdate: body.birthdate,
                        registeredAt: body.registeredAt,
                    }
                    setUser(user)
                    setLogged(true)
                })
            }
            else if (res.status >= 400 && res.status < 500) alert("User not found!\nWrong Email or Password.")
            else if (res.status >= 500) alert("Something went wrong at server.")
        }).catch(reason => console.log(reason))
    }

    if (logged) return (
        <div className={"fullpageContainer"}>
            <UserDashboard
                userId={user.userId}
                username={user.username}
                email={user.email}
                birthdate={user.birthdate}
                registeredAt={user.registeredAt}
                logout={logOut}
            />
        </div>
    )
    else return (
        <div className={'fullpageContainer'}>
            <Form submit={handleSubmit} />
        </div>
    )
}

function UserDashboard(props: userDashboardProps) {
    const userDates = {
        birthdate: new Date(props.birthdate),
        registeredAt: new Date(props.registeredAt)
    }
    return (
        <>
            <div className={"userDashboard"}>
                <h1>{"USER INFO"}</h1>
                <div className={"col left"}>
                    <h2>UserId:</h2>
                    <h2>Username:</h2>
                    <h2>Email:</h2>
                    <h2>Birthdate:</h2>
                    <h2>Registered:</h2>
                </div>
                <div className={"col right"}>
                    <h2>{props.userId}</h2>
                    <h2>{props.username}</h2>
                    <h2>{props.email}</h2>
                    <h2>{userDates.birthdate.toLocaleDateString()}</h2>
                    <h2>{userDates.registeredAt.toLocaleDateString()}</h2>
                </div>
            </div>
            <div className={"logOut"}>
                <input onClick={props.logout} type="button" value="Log Out" />
            </div>
        </>
    )
}

function Form(props: { submit: FormEventHandler }) {
    return (
        <form onSubmit={props.submit}>
            <div className={"formBox"}>
                <label htmlFor="email">Email</label>
                <input type="text" id="email" />
                <label htmlFor="password">Password</label>
                <input type="password" id="password" />
                <button type="submit">Log In</button>
            </div>
        </form>
    )
}