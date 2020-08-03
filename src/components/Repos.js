import React, { useContext } from 'react';
import styled from 'styled-components';
import { GithubContext } from '../context/context';
import { Bar2D, Column2D, Doughnut2D, Pie2D } from './Charts';


const Repos = () => {
    const { repos } = useContext(GithubContext);

    const languages = repos.reduce((total, item) => {
        const { language, stargazers_count } = item;
        if (!language) {
            return total;
        };
        if (!total[language]) {
            total[language] = { label: language, value: 1, stars: stargazers_count };
        } else {
            total[language] = {
                ...total[language], 
                value: total[language].value + 1,
                stars: total[language].stars + stargazers_count
            }
        };
        // console.log(language)
        return total
    }, {})

    // turn languges object back into an array of objects and sort by largest
    // only take top ten languages and remove any others
    const mostUsed = Object.values(languages).sort((small, large)=>{
        return (large.value - small.value);
    }).slice(0, 10);

    // sort by largest star count, move stars to value position for chart
    const mostPopular = Object.values(languages).sort((small, large) => {
        return large.stars - small.stars;
    }).map((item) => {
        return { ...item, value:item.stars }
    }).slice(0, 5);

    // pull stars and forks data from repos
    let { stars, forks } = repos.reduce((total, item) => {
        const { stargazers_count, name, forks } = item;
        total.stars[stargazers_count] = { label: name, value: stargazers_count };
        total.forks[forks] = { label: name, value: forks };
        return total;
    }, {
        stars:{}, forks:{}
    });

    // let mostStars = repos.reduce((total, item) => {
    //     const { stargazers_count, name, forks } = item;
    //     if (!stargazers_count) {
    //         return total;
    //     };
    //     if (!total[stargazers_count]) {
    //         total[stargazers_count] = { label: name, value: 1, forks };
    //     } else {
    //         total[stargazers_count] = {
    //             ...total[stargazers_count], 
    //             value: total[stargazers_count].value + 1,
    //             forks: total[stargazers_count].forks + forks
    //         }
    //     };
    //     console.log(stargazers_count)
    //     return total
    // }, {})

    // turn stars and forks objects into arrays, get the largest 5 and sort
    stars = Object.values(stars).slice(-5).reverse();
    forks = Object.values(forks).slice(-5).reverse();

    // console.log(stars);
    // console.log(mostPopular);

    return (
        <section className="section">
            <Wrapper className="section-center">
                <Pie2D data={mostUsed} />
                <Bar2D data={forks} />
                <Doughnut2D data={mostPopular} />
                <Column2D data={stars} />
            </Wrapper>
        </section>
    );
};

const Wrapper = styled.div
    `
        display: grid;
        justify-items: center;
        gap: 2rem;
        @media (min-width: 800px) {
            grid-template-columns: 1fr 1fr;
        }

        @media (min-width: 1200px) {
            grid-template-columns: 2fr 3fr;
        }

        div {
            width: 100% !important;
        }

        .fusioncharts-container {
            width: 100% !important;
        }

        svg {
            width: 100% !important;
            border-radius: var(--radius) !important;
        }
    `
;

export default Repos;
