import React, { Component } from 'react';
import HackerNewsHelper from './HackerNewsHelper';
import './HackerNews.css';

export default class HackerNewsPopout extends Component {
  render() {
    const domain = HackerNewsHelper.parseDomain(this.props.selectedStoryURL);
    return (
      <div className='hackernews-popout'>
        <p className='hackernews-popout-title'>{domain}</p>
        <iframe 
          title='hackernews-article'
          className='hackernews-article'
          src={this.props.selectedStoryURL} 
        />
      </div>
    )
  }
}
