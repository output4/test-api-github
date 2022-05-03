import {
    ApolloClient,
    InMemoryCache,
    createHttpLink,
    gql
  } from '@apollo/client';
import { TOKEN } from './consts';
import { setContext } from '@apollo/client/link/context';

import React from 'react';
import { IProps, IState } from './interfaces';
import Avatar from './Avatar';
import Followers from './Followers';

const httpLink = createHttpLink({
    uri: 'https://api.github.com/graphql',
});
  
const authLink = setContext((_, { headers }) => {
    return {
        headers: {
        ...headers,
        authorization: `Bearer ${TOKEN}`,
        }
    }
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

class ProfilePage extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            user: null,
            error: false
        };
    }

    private _buildQuery(username: string): any {
        return gql`
            query MyQuery {
              user(login: "${username}") {
                id
                avatarUrl
                bio
                location
                company
                name
                url
                following {
                  totalCount
                }
                followers {
                  totalCount
                }
                starredRepositories {
                  totalCount
                }
                websiteUrl
                login
              }
            }`;
    }

    componentDidMount(): Promise<void> {
        const query = this._buildQuery(this.props.user);
        return client.query({
            query
        })
        .then(result => {
            if (result.data.user) {
                this.setState({
                    user: result.data.user,
                });
            }
        }).catch(() => {
            this.setState({
                error: true
            });
        });
    }

    private _goToProfile(): void {
        window.location.href = this.state.user?.url || '';
    }

    render() {
        return <div>
            <button onClick={() => this.props.onBack()}>Back</button>
            <div className={'main'}>
                {this.state.user && (
                    <div>
                        {this.state.user.avatarUrl && (
                            <Avatar url={this.state.user.avatarUrl} />
                        )}
                        <div className={'name'}>{this.state.user.name}</div>
                        <div className={'nick'}>{this.state.user.login}</div>
                        <div>
                            <button className={'button'} onClick={() => this._goToProfile()}>Follow</button>
                        </div>
                        <div>
                            <Followers followers={this.state.user.followers}
                                        following={this.state.user.following} 
                                        starred={this.state.user.starredRepositories}    
                                    />
                        </div>
                    </div>
                )}
                {this.state.error && (
                    <div>User not found</div>
                )}
            </div>
        </div>
    }
}

export default ProfilePage;