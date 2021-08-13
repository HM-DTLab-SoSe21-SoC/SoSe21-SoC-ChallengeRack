import React, { useState, useEffect } from 'react';

import { getChallange } from "../graphql/queries";
import { API, graphqlOperation } from 'aws-amplify';

function Detail(props) {
    const [book, setBook] = useState();

    useEffect(() => {
        let { id } = props.match.params;
        console.log(id);
        API.graphql(graphqlOperation(getChallange, {id})).then(b => {
            setBook(b.data.getChallange);
        })
    }, []);

    return <div>
        {book ? <>
            <h1>{book.orgaLocat}</h1>
            <p>{book.orgaTitle}</p>
        </> : null}
    </div>
}

export default Detail;