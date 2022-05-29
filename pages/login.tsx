import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import coverPhoto from '../public/cover.png'
import { useForm, SubmitHandler} from 'react-hook-form'
import useAuth from '../hooks/useAuth'

//types for inputs
interface Inputs {
  email: string
  password: string
}

function login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()
  const { signIn, signUp } = useAuth()
  //Handler to triger functions on basis of login state
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (login) {
      await signIn(data.email, data.password)
    } else {
      await signUp(data.email, data.password)
    }
  }
  const [login, setLogin] = useState(false)
  const [account, setAccount] = useState(false)
  return (
    <div className="relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent">
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Image
        src={coverPhoto}
        layout="fill"
        className="-z-10 !hidden opacity-60 sm:!inline"
        objectFit="cover"
      />
      <img
        src="https://www.freepnglogos.com/uploads/now-united-png/emblem-of-the-now-united-logo-4.png"
        className="absolute left-4 top-4 h-10 w-10 cursor-pointer object-contain md:left-10 md:top-6"
        width={150}
        height={150}
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14"
      >
        <h1 className="text-4xl font-semibold">
          {account ? <>Sign In</> : <>Sign Up</>}
        </h1>
        {/* Email Input */}
        <div className="space-y-4">
          <label className="inline-block w-full">
            <input
              type="email"
              placeholder="E-mail ID"
              className="input"
              {...register('email', { required: true })}
            />
            {errors.email && (
              <p className="p-1 text-[13px] font-light  text-orange-500">
                Please enter a valid email.
              </p>
            )}
          </label>
          {/* Password Input */}
          <label className="inline-block w-full">
            <input
              type="password"
              placeholder="Password"
              className="input"
              {...register('password', { required: true })}
            />
            {errors.password && (
              <p className="p-1 text-[13px] font-light text-orange-500">
                Your password must contain between 4 and 60 characters.
              </p>
            )}
          </label>
        </div>
        <button
          type="submit"
          className="w-full rounded bg-[#12b57f] py-3 font-semibold"
          onClick={() => {
            account ? setLogin(true) : register
          }}
        >
          {account ? <>Sign In</> : <>Sign Up</>}
        </button>
        <div className="text-[gray]">
          {account ? <>New to Now-United? </> : <>Already on Now-United? </>}
          <button
            type="submit"
            className="cursor-pointer text-white hover:underline"
            onClick={() => {
              setAccount(!account)
            }}
          >
            {account ? <>Sign Up</> : <>Sign In</>}
          </button>
        </div>
      </form>
    </div>
  )
}

export default login