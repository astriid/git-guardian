import React from "react"
import styled from '@emotion/styled'
import { Avatar, Text } from "@chakra-ui/core";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  border-radius: 2px;
  border: solid 1px grey;
  padding: 5px 15px;
`;

const InlineDiv = styled.div`
  display: flex;
  margin-right: 15px;
`;

const ColumnDiv = styled.div`
  display: grid;
  flex-direction: column;
  align-items: center;
`;

const TextModif = styled(Text)`
  margin-bottom: 0px;
  margin-top: 4px;
`;

export const UserInfo = ({ userInfos }) => {
  return (
  <Container>
    <MainContainer>
      <InlineDiv>
        <Avatar src={userInfos.userAvatar} size="xl"/>
      </InlineDiv>
      <ColumnDiv>
        <TextModif><u>Name:</u> { userInfos.userName }</TextModif>
        <TextModif><u>Login:</u> { userInfos.userLogin }</TextModif>
        <TextModif><u>Bio:</u> { userInfos.userBio }</TextModif>
        <TextModif><u>Repositories number:</u> { (userInfos.repoNumber).toString() }</TextModif>
        <TextModif><u>Numbers of commits:</u> {userInfos.userNumberCommits}</TextModif>
        <TextModif><u>Repositories:</u> { userInfos.userRepos.map(repo => <TextModif key={repo.full_name}><li>{repo.full_name}</li></TextModif>)}</TextModif>
        <TextModif><u>Organizations:</u> {userInfos.userOrg.map(org => <TextModif key={org.login}><li>{org.login}</li></TextModif>)}</TextModif>
      </ColumnDiv>
    </MainContainer>
  </Container>
  )
}