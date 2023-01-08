export default function Home() {
    return (
        <div className={'fullpageContainer'}>
            <Form />
        </div>
    )
}

function UserDashboard(props) {
    return (
        <div className={"fullpageContainer"}>
            <div className={"userDashboard"}>
                <h1>{"User Info".toUpperCase()}</h1>
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
                    <h2>{props.birthDate}</h2>
                    <h2>{props.registered}</h2>
                </div>
            </div>
            <div className={"logOut"}>
                <input type="button" value="Log Out" />
            </div>
        </div>
    )
}

function handleSubmit(e) {
    e.preventDefault()
    const user = {
        email: e.target.email.value,
        password: e.target.password.value
    }
}

function Form() {
    return (
        <form onSubmit={handleSubmit}>
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