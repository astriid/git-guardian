import axios from 'axios';

const baseUrl = "https://api.github.com"

const authenticatedApiCall = (accessToken, url) => {
    return axios.get(url, {
        headers: {
            'Authorization': 'token ' + accessToken, 
            'Content-Type': 'application/json'
        },
    }).then((response)=> response.data)
}

export const getUserInfos = async(accessToken, name) => {
    const userInfo = await authenticatedApiCall(accessToken, `${baseUrl}/users/${name}`);
    const userRepos = await authenticatedApiCall(accessToken, `${baseUrl}/users/${name}/repos`);
    const userOrg = await authenticatedApiCall(accessToken, `${baseUrl}/user/orgs`); 
    const userActivities = await authenticatedApiCall(accessToken, `${baseUrl}/users/${name}/events?page=2&per_page=100`);
    const repoNumber = (userRepos.length) + userInfo['owned_private_repos'];

    const mapCurrentRepo = userRepos.map(currentRepository => {
    return authenticatedApiCall(accessToken, `${baseUrl}/repos/${name}/${currentRepository.name}/commits`)
    });
    const getArrayCommits = await Promise.all(mapCurrentRepo)
    const userNumberCommits = getArrayCommits.reduce((acc, currentValue) => acc + currentValue.length, 0)

    return {
        userInfo,
        userOrg,
        userName: userInfo.name,
        userRepos: userRepos.slice(0, 3),
        userAvatar: userInfo.avatar_url,
        userBio: userInfo.bio,
        userLogin: userInfo.login,
        repoNumber,
        userActivities,
        userNumberCommits
    };
};