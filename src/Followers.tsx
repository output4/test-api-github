import React from 'react';
import { ITotal } from './interfaces';

interface IProps {
    followers: ITotal;
    following: ITotal;
    starred: ITotal;
}

export default class Followers extends React.Component<IProps, any> {
    render() {
        return (
            <div className={'followers'}>
                <div className={'followers-row'}>
                    <span className={'followers-row-span'}>{this.props.followers.totalCount}</span> followers
                </div>
                <div className={'followers-row'}>
                    <span className={'followers-row-span'}>{this.props.following.totalCount}</span> following
                </div>
                <div className={'followers-row'}>
                    <span className={'followers-row-span'}>{this.props.starred.totalCount}</span> starred
                </div>
            </div>
        )
    }
}