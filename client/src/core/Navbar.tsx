import { Button, Container, Drawer } from '~/ui'
import HamburgerMenu from './icons/HamburgerMenu'
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
          <Button variant="primary">register</Button>
        </div>
        <div className="block lg:hidden">
          <Drawer>
            <Drawer.Trigger className="!text-black pr-0">
              <HamburgerMenu className="w-8" />
            </Drawer.Trigger>
          </Drawer>
        </div>
      </Container>
    </nav>
  )
}
