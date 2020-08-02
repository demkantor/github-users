import React, { useState, useEffect } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';
const GithubContext = React.createContext();


const GithubProvider = ({ children }) => {
    const [githubUser , setGithubUser] = useState(mockUser);
    const [repos , setRepos] = useState(mockRepos);
    const [followers , setFollowers] = useState(mockFollowers);
    const [requests, setRequests] = useState(0);
    const [loading, setLoading] = useState(false);

    const checkRequests = async () => {
        try {
            const requests = await axios(`${rootUrl}/rate_limit`);
            const remaining = requests.data.rate.remaining;
            setRequests(remaining);
            if(remaining === 0) {
                console.log('no requests left');
            };
        } catch (error) {
            console.error('error getting rate limit', error);
        };
    };

    useEffect(()=> {
        checkRequests();
    }, [])

    return (
        <GithubContext.Provider value={{ githubUser, followers, repos, requests }}>
            { children }
        </GithubContext.Provider>
    );
};

export { GithubProvider, GithubContext };
