import { Card, CardBody, CardHeader, Image } from "@nextui-org/react"
import { useAppSelector } from "../../app/hooks"
import { selectCurrent } from "../../features/user/userSlice"
import { BASE_URL } from "../../content"
import { Link } from "react-router-dom"
import { MdAlternateEmail } from "react-icons/md"

export const Profile = () => {
  const current = useAppSelector(selectCurrent)
  if (!current) return null
  const { name, email, avatarUrl, id } = current
  return (
    <Card className="py-4 w-[302px]">
      <CardHeader className="pb-0 pt-2 flex-col items-center">
        <Image
          alt="Card Profile"
          className="object-cover rounded-xl"
          src={`${BASE_URL}${avatarUrl}`}
          width={370}
        />
        <CardBody>
          <Link to={`/users/${id}`}>
            <h4 className="font-bold text-large mb-2">{name}</h4>
          </Link>
          <p className="text-default-500 flex items-center gap-2">
            <MdAlternateEmail />
            {email}
          </p>
        </CardBody>
      </CardHeader>
    </Card>
  )
}
