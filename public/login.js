const form = document.getElementsByTagName('form')[0]
const emailError = document.getElementById('emailspan')
const passwordError = document.getElementById('passwordspan')

form.addEventListener('submit', async(e) => {
    e.preventDefault()

    emailError.textContent = ''
    passwordError.textContent = ''

    const email = form.email.value
    const password = form.password.value


    try {
        const res = await fetch('/login', {
            method: 'POST',
            body: JSON.stringify({

                email,
                password
            }),
            headers: {
                'Content-Type': 'application/json'
            }

        })
        const data = await res.json()

        if (data.problem) {
            emailError.textContent = data.problem.email
            passwordError.textContent = data.problem.password
            console.log('problem')
        }
        if (data.user) {
            location.assign('/todo')
        }
    } catch (err) {
        console.log(err)
    }
})