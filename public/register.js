const form = document.getElementsByTagName('form')[0]
const emailError = document.getElementById('emailspan')
const passwordError = document.getElementById('passwordspan')
console.log(emailError, passwordError)
form.addEventListener('submit', async(e) => {
    e.preventDefault()

    emailError.textContent = ''
    passwordError.textContent = ''

    const email = form.email.value
    const password = form.password.value

    try {
        const res = await fetch('/signup', {
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
        console.log(data)
        if (data.problem) {
            emailError.textContent = data.problem.email
            passwordError.textContent = data.problem.password
            console.log('problem')
        }
    } catch (err) {
        console.log(err)
    }
})