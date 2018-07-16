import React, { Component } from 'react';
import Module from 'core/Module';
import LoadingSpinner from 'core/shared/LoadingSpinner';
import HackerNewsPopout from './HackerNewsPopout';
import HackerNewsHelper from './HackerNewsHelper';
import FontAwesome from 'react-fontawesome';
import './HackerNews.css';

export default class HackerNews extends Component {

  state = {
    stories: [],
    selectedStoryURL: null,
  }

  componentWillMount() {
    this.updateTopStories();
    setInterval(() => {
      this.updateTopStories();
    }, 300000)
  }

  updateTopStories() {
    HackerNewsHelper.topStories(stories => {
      this.setState({ stories });
    });
  }

  onStoryClick = (event, story) => {
    if(story.canOpen) {
      this.setState({ selectedStoryURL: story.url });
    } else {
      event.stopPropagation();
    }
  }

  render() {

    return(
      <Module
        name='HackerNews'
        popoutHeight={1000}
        popoutWidth={1000} 
        displayPopoutCloseButton
        popoutView={
          <HackerNewsPopout 
            selectedStoryURL={this.state.selectedStoryURL}
          />
        }
      >
        {
          this.state.stories.length > 1 ? (
            <table className='hackernews-table'>
              <caption>HackerNews Top Stories</caption>
              <div className='line'></div>
              <tbody>
              {
                this.state.stories.map(story => (
                  <tr
                    key={story.id}
                    onClick={(event) => this.onStoryClick(event, story)}
                  >
                    <td>
                      <span className='hackernews-article-title'>{story.title}</span>
                      <br />
                      <span className='hackernews-can-open-icon'>{story.canOpen ? (<FontAwesome name='external-link-square' />) : null}</span>
                      <span className='hackernews-article-url'>({HackerNewsHelper.parseDomain(story.url)})</span>
                    </td>
                  </tr>
                ))
              }
              </tbody>
            </table>
          ) : (
            <LoadingSpinner 
              loadingText = 'Getting top HackerNews stories...'
            />
          )
        }
        
      </Module>
    )
  }
}
