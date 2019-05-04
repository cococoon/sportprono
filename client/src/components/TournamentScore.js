import React from 'react'
import BASEURL from '../config/api';
import axios from 'axios';

/**
 * Component to display users subscribed to a prono and their scores if the prono went live
 */
const TournamentScore = (props) => {
    const users = {};
    let isLoaded = false;
    /**
     * get all users subribed to tournament and their scores
     */
    axios.get(`${BASEURL}/tournament/user`)
        .then((response) => {
            let [...data] = response.data.data;
            users = data;
            isLoaded = true;
        });


    /**
     * TO DO: display users and their scores
     */
    return (
        <div>

        </div>
    )
}

export default TournamentScore
