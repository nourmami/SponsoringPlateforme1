import { Button, Container, Drawer } from '~/ui'
import { CgMenuRight as HamburgerMenu } from '~/core/icons'
import Logo from './Logo'

export default function Navbar() {
  return (
    <nav className="py-4 border-b bg-background">
      <Container className="flex items-center justify-between">
        <Logo />
        <div className="hidden lg:flex lg:items-center lg:space-x-2">
          <Button thin>About</Button>
          <Button thin>Contact</Button>
          <Button thin>Insights</Button>
        </div>
        <div className="hidden lg:block">
          <Button thin href="/login">
            login
          </Button>
          <Button variant="primary" href="/register">
            register
          </Button>
        </div>
        <div className="block lg:hidden">
          <Drawer>
            <Drawer.Trigger className="!text-black pr-0">
              <HamburgerMenu className="text-3xl" />
            </Drawer.Trigger>
          </Drawer>
        </div>
      </Container>
    </nav>
  )
}
