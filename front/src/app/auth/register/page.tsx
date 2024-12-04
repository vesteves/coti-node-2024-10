'use client'

import { useState } from "react"

interface User {
  email: string
  password: string
}

const RegisterPage = () => {
  const [form, setForm] = useState<User>({
    email: '',
    password: ''
  })

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.currentTarget.name]: e.currentTarget.value
    })
  }

  const onSubmit = async () => {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(form)
    })
    const responseJson = await response.json()

    if(responseJson.data.msg) {
      alert(responseJson.data.msg)
    }

    if(responseJson.data.token) {
      alert(responseJson.data.token)
    }
  }

  return (
    <div>
      <div>
        <label htmlFor="email">E-mail</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={(e) => onChange(e)}
        />
      </div>
      <div>
        <label htmlFor="password">Senha</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={(e) => onChange(e)}
        />
      </div>
      <button onClick={() => onSubmit()}>Cadastrar</button>
    </div>
  )
}

export default RegisterPage