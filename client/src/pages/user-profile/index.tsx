import { Button, Card, Image, useDisclosure } from "@nextui-org/react"
import { useParams } from "react-router-dom"
import { resetUser, selectCurrent } from "../../features/user/userSlice"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
  useGetUserByIdQuery,
  useLazyCurrentQuery,
  useLazyGetUserByIdQuery,
} from "../../app/services/user.api"
import {
  useFollowUserMutation,
  useUnFollowUserMutation,
} from "../../app/services/follow.api"
import { useEffect } from "react"
import { GoBack } from "../../components/go-back"
import { BASE_URL } from "../../content"
import {
  MdOutlinePersonAddAlt1,
  MdOutlinePersonAddDisabled,
} from "react-icons/md"
import { CiEdit } from "react-icons/ci"
import { ProfileInfo } from "../../components/profile-info"
import { CountInfo } from "../../components/count-info"
import { formatToClientDate } from "../../utils/format-to-client-date"
import { EditProfile } from "../../components/edit-profile"

export const UserProfile = () => {
  const { id } = useParams<{ id: string }>()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const currentUser = useAppSelector(selectCurrent)
  const { data } = useGetUserByIdQuery(id ?? "")
  const [followUser] = useFollowUserMutation()
  const [unfollowUser] = useUnFollowUserMutation()
  const [triggerGetUserByIdQuery] = useLazyGetUserByIdQuery()
  const [triggerCurrentQuery] = useLazyCurrentQuery()

  const dispatch = useAppDispatch()

  useEffect(
    () => () => {
      dispatch(resetUser())
    },
    [],
  )

  const handleFollow = async () => {
    try {
      if (id) {
        data?.isFollowing
          ? await unfollowUser({ followingId: id }).unwrap()
          : await followUser({ followingId: id }).unwrap()

        await triggerGetUserByIdQuery(id)
        await triggerCurrentQuery()
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleClose = async () => {
    try {
      if (id) {
        await triggerGetUserByIdQuery(id)
        await triggerCurrentQuery()
        onClose()
      }
    } catch (err) {
      console.log(err)
    }
  }

  if (!data) {
    return null
  }

  return (
    <>
      <GoBack />
      <div className="flex items-center gap-4">
        <Card className="flex flex-col items-center space-y-4 p-5">
          <Image
            src={`${BASE_URL}${data.avatarUrl}`}
            alt={data.name}
            width={200}
            height={200}
            className="border-4 border-white"
          />
          <div className="flex flex-col text-2xl font-bold gap-4 items-center">
            {data.name}
            {currentUser?.id !== id ? (
              <Button
                color={data.isFollowing ? "default" : "primary"}
                variant="flat"
                className="gap-2"
                endContent={
                  data.isFollowing ? (
                    <MdOutlinePersonAddDisabled />
                  ) : (
                    <MdOutlinePersonAddAlt1 />
                  )
                }
                onClick={handleFollow}
              >
                {data.isFollowing ? "Отписаться" : "Подписаться"}
              </Button>
            ) : (
              <Button endContent={<CiEdit />} onClick={onOpen}>
                Редактировать
              </Button>
            )}
          </div>
        </Card>
        <Card className="flex flex-col space-y-4 p-5 flex-1">
          <ProfileInfo title="Почта:" info={data.email} />
          <ProfileInfo title="Местоположение:" info={data.location} />
          <ProfileInfo
            title="Дата рождения:"
            info={formatToClientDate(data.dateOfBirth)}
          />
          <ProfileInfo title="Обо мне:" info={data.bio} />

          <div className="flex gap-2">
            <CountInfo count={data.followers.length} title="Подписчики" />
            <CountInfo count={data.following.length} title="Подписки" />
          </div>
        </Card>
      </div>
      <EditProfile isOpen={isOpen} onClose={handleClose} user={data} />
    </>
  )
}
