import React, { useEffect, useState } from 'react'
import { getAccessToken, getMemberWithAccessToken } from '../../api/kakaoApi'
import { useSearchParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '../../redux/reducers/loginSlice'
import { useCustomLogin } from '../../hooks/useCustomLogin'

export const LoginLoadingPage = () => {

  const [searchParams] = useSearchParams()

  const {isLogin, moveToPath, moveToLoginReturn} = useCustomLogin()

  const authCode = searchParams.get('code')

  const dispatch = useDispatch()


  useEffect(() => {
    getAccessToken(authCode).then(accessToken => {

      getMemberWithAccessToken(accessToken).then(memberInfo => {
        console.log("-------------------------")
        console.log(memberInfo)

        dispatch(login(memberInfo))

        if (memberInfo) {
          moveToPath("/")
        }
      })

    })
      
  }, [authCode])

  return (
    <div>
      <div>로딩중</div>
      <div></div>
    </div>
  )
}