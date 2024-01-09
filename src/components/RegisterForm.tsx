import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form"
import Error from "./Error";
import Switcher from "./Switcher";
import { FormInput, Inputs } from "../types/RegisterFormTypes";
import { toast } from "react-toastify";
import Loader from "./Loader";

const formConfig: FormInput[]= [
  {
    id: 1,
    title: "User Name",
    placeholder: "User Name",
    name: "userName",
    type: "text",
    required: true,
  },
  {
    id: 2,
    title: "Email",
    placeholder: "Email",
    name: "email",
    type: "email",
    required: true,
  },
  {
    id: 3,
    title: "Password",
    placeholder: "Password",
    name: "password",
    type: "password",
    required: true,
  },
  {
    id: 4,
    title: "Password confirmation",
    placeholder: "Confirm password",
    name: "passwordConfirmation",
    type: "password",
    required: true,
  },
]

const RegisterForm = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm<Inputs>()

  const [agreed, setAgreed] = useState(false)
  const [isLoading, setAisLoading] = useState(false)

  const renderField = (field: FormInput) => {
    const reg = register(field.name, {
      required: field.required && `${field.title} is a requared field`,
      validate: (value) => handleValidate(`${value}`, field.name),
    });

    return (
      <div key={field.id} className="sm:col-span-2">
        <label htmlFor={field.name} className="block text-sm font-semibold leading-6 text-gray-900">
          {field.title}
        </label>
        <div className="mt-2.5">
          <input
            {...reg}
            type={field.type}
            name={field.name}
            id={field.name}
            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <Error error={errors[field.name]?.message} />
      </div>
    )
  }

  const handleSubmitWrapper: SubmitHandler<Inputs> = async (data) => {
    setAisLoading(true)
    fetch('https://apingweb.com/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "name": data.userName,
        "email": data.email,
        "phone":"5555551234",
        "password": data.password,
        "password_confirmation": data.passwordConfirmation
      })
    })
    .then(res => res.json())
    .then(res => {
      setAisLoading(false)
      if (res.status === 200) {
        toast.success(`Welcome ${data.userName}! You have successfully registered!`)
        return reset()
      }
      if (res.errors.length > 0) res.errors.map((error: string[]) => toast.error(error))
    });
  };

  const validateUserName = (value: string) => {
    if (value.toLowerCase() === 'hello') {
      return "This name is already taken";
    }
    return true;
  };

  const validateEmail = (email: string) => {
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      return "Email must be in the correct format (name@example&#46;com)";
    }
    return true;
  };

  const validatePassword = (value: string) => {
    if (value.length < 8) {
      return "The password must be at least 8 characters long";
    }
    return true;
  };

  const validatePasswordConfirmation = (value: string) => {
    const values = getValues()

    if (value !== values.password) {
      return "Password doesn't match";
    }
    return true;
  };

  const handleValidate = (value: string, name: string) => {
    switch (name) {
      case "userName":
        return validateUserName(value);
      case "email":
        return validateEmail(value);
      case "password":
        return validatePassword(value);
      case "passwordConfirmation":
        return validatePasswordConfirmation(value);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitWrapper)} className="mx-auto mt-16 max-w-xl sm:mt-20">
      <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">

        {formConfig.map((field) => renderField(field))}
        
        <Switcher agreed={agreed} setAgreed={setAgreed} />
          
        <button
        type="button"
        onClick={() => reset()}
          className="block w-full rounded-md bg-indigo-600 disabled:bg-gray-200 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Reset values
        </button>

        <button
          disabled={!agreed}
          type="submit"
          className="block w-full rounded-md bg-indigo-600 disabled:bg-gray-200 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Registration
        </button>

      </div>

      {
        isLoading && <Loader />
      }

    </form>
  )
}

export default RegisterForm
