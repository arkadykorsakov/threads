import { Button, Link } from "@nextui-org/react"
import { Input } from "../../components/input"
import { useForm } from "react-hook-form"
import { useRegisterMutation } from "../../app/services/user.api"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { hasErrorField } from "../../utils/has-error-field"
import { ErrorMessage } from "../../components/error-message"

type RegisterForm = {
  email: string
  password: string
  name: string
}

type Props = { setSelected: (value: string) => void }

export const Register: React.FC<Props> = ({ setSelected }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterForm>({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  })

  const [register, { isLoading }] = useRegisterMutation()
  const navigate = useNavigate()
  const [error, setError] = useState("")

  const onSubmit = async (data: RegisterForm) => {
    try {
      await register(data).unwrap()
      setSelected("login")
    } catch (err) {
      if (hasErrorField(err)) {
        setError(err.data.error)
      }
    }
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <Input
        control={control}
        name="name"
        label="Имя"
        required="Обязательное поле"
      />
      <Input
        control={control}
        name="email"
        label="Email"
        type="email"
        required="Обязательное поле"
      />
      <Input
        control={control}
        name="password"
        label="Пароль"
        type="password"
        required="Обязательное поле"
      />
      <ErrorMessage error={error} />
      <p className="text-center text-small">
        Уже есть аккаунт?{" "}
        <Link
          size="sm"
          className="cursor-pointer"
          onPress={() => setSelected("login")}
        >
          Войти
        </Link>
      </p>
      <div className="flex gap-2 justify-end">
        <Button type="submit" fullWidth color="primary" isLoading={isLoading}>
          Зарегистрироваться
        </Button>
      </div>
    </form>
  )
}
