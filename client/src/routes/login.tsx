import { Button, Container, Input } from '~/ui'
import {
  AiFillLock as LockIcon,
  MdOutlineMailOutline as EmailIcon,
} from '~/core/icons'

export default function Login() {
  return (
    <div>
      <div className="h-[80vh]">
        <Container className="grid grid-cols-3 h-full">
          <div className="grid justify-items-start content-center max-w-xl">
            <div className="flex flex-col space-y-3">
              <h1 className="font-semibold text-xl">Login</h1>
              <Input
                type="text"
                label="Email / Username"
                suffix={<EmailIcon className="text-primary-600" />}
              />
              <Input
                type="password"
                label="Password"
                suffix={<LockIcon className="text-primary-600" />}
              />
              <div>
                <Button variant="primary">Login</Button>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-evenly">
            <span
              className={`
                    font-semibold relative 
                    after:absolute after:w-0 after:border-r after:h-[40vh] after:border-gray-400 after:right-1/2 
                    after:translate-x-1/2 after:top-1/2 after:-translate-y-1/2 after:-z-20
                    before:absolute before:w-full before:h-[200%] before:bg-background before:-z-10
                    before:right-1/2 before:translate-x-1/2 before:top-1/2 before:-translate-y-1/2
                    `}
            >
              OR
            </span>
            <Button href="/register" className="min-w-[320px]">
              Create an Account
            </Button>
          </div>
          <div className="grid justify-items-end content-center">
            <img src="/art/headphones.svg" alt="" />
          </div>
        </Container>
      </div>
    </div>
  )
}
