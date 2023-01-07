export default function Home() {
    return (
        <div className={'fullpageContainer'}>
            <Form />
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