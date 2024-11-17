import { Container } from "../container"
import { Header } from "../header"
import { Outlet, useNavigate } from "react-router-dom"
import { NavBar } from "../nav-bar"
import {
  selectIsAuthenticated,
  selectUser,
} from "../../features/user/userSlice"
import { useEffect } from "react"
import { useAppSelector } from "../../app/hooks"
import { Profile } from "../profile"

export const Layout = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const user = useAppSelector(selectUser)
  const navigate = useNavigate()
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth")
    }
  }, [])
  return (
    <>
      <Header />
      <Container>
        <div className="flex-2 p-4">
          <NavBar />
        </div>
        <div className="flex-1 p-4">
          <Outlet />
        </div>
        <div className="flex-2">
          <div className="flex-col flex gap-5">{!user && <Profile />}</div>
        </div>
      </Container>
    </>
  )
}
