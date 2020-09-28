import React, { useState } from "react"
import { getUserInfos } from '../api';
import { Input, Button, Text } from "@chakra-ui/core";
import styled from '@emotion/styled';

const NewF = styled.form`
  margin: auto;
`;

const NewI = styled(Input)`
  margin-top: 8px;
  margin-bottom: 8px;
  width: auto;
`;

const NewB = styled(Button)`
  margin-top: 8px;
  margin-left: 25%;
  margin-right: 25%;
`;

export const Form = ({ setUserInfos }) => {
    const [errors, setErrors] = useState("")

    const handleSubmit = async event => {
        event.preventDefault()
        setErrors("")
        const token = event.target.token.value
        const name = event.target.name.value

        if (!name || !token) {
        setErrors("*Mandatory")
        }

        try {
            const list = await getUserInfos(token, name)
            setUserInfos(list)
        } catch (error) {
        setErrors("Error !")
        }
    }

  return (
    <NewF onSubmit={handleSubmit}>
        <NewI type="text" autoComplete="on" name="name" placeholder="Enter your name" size="lg"/>
        <NewI type="password" name="token" autoComplete="on" placeholder="Enter your github access token" size="lg"/>
        <NewB type="submit">The infos</NewB>
            { errors && <Text>{ errors }</Text>}
    </NewF>
  )
}