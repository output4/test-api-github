import React, {ReactElement} from 'react';
import { IPropsAvatar } from './interfaces';

export default function({url}: IPropsAvatar): ReactElement {
    return (
        <div><img className={'avatar-image'} src={url} /></div>
    )
}