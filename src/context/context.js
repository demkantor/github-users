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
    const [error, setError] = useState({show: false, msg: ''});

    useEffect(()=> {
        checkRequests();
    }, []);

    const checkRequests = async () => {
        try {
            const requests = await axios(`${rootUrl}/rate_limit`);
            let remaining = requests.data.rate.remaining;
            setRequests(remaining);
            if(remaining === 0) {
                toggleError(true, 'Sorry you have exceeded your hourly rate limit!');
            };
        } catch (error) {
            console.error('error getting rate limit', error);
        };
    };

    const toggleError = (show = false, msg = "") => {
        setError({ show, msg });
    };

    return (
        <GithubContext.Provider value={{ error, followers, githubUser, repos, requests }}>
            { children }
        </GithubContext.Provider>
    );
};

export { GithubProvider, GithubContext };
