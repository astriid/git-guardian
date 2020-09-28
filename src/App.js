import React, { useState, useEffect } from 'react';
import { getUserInfos } from '../src/api';
import { Form } from './actions/Form';
import { UserInfo } from './actions/UserInfo';
import { Flex, Grid } from "@chakra-ui/core";
import './App.css';

export const App = () => {
  const [userInfos, setUserInfos] = useState(null)
  useEffect(() => {
    const fetchData = async ()=>{
        const data = await getUserInfos('', '');
        setUserInfos(data);
    }
    fetchData();
  }, []);

  return (
    <div>
      <Flex w="100%" justify="space-between" flexWrap="wrap" mt="50px">
        {!userInfos && <Form setUserInfos={userInfos => setUserInfos(userInfos)}/>}
      </Flex>

      <Grid w="100%" templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={6}>
        {userInfos && <UserInfo userInfos={userInfos}></UserInfo>}
      </Grid>
    </div>
  )
};
