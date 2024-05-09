import React from 'react';
import { useParams } from 'react-router-dom';
import { Polls } from '../polls/Polls';


function ReplyByLink(props) {
    const { link } = useParams();
    
    return <Polls content={props.content} link={link} />
}

export { ReplyByLink };
