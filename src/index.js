import _ from 'lodash';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';


const API_KEY = 'AIzaSyB-z-ZHflRsOQeyA3cAyJzRKqsvRCD6CIc';

//create new component. this component should produce some html

class App extends Component{
    constructor(props){
        super(props);

        this.state={
            videos: [],
            selectedVideo: null
        };
        this.videoSearch('surfboards');
    }

    videoSearch(term){
        //we want user to see the data right after searching so lets put the search result in the constructor so it will be called
        YTSearch({key: API_KEY, term: term}, (videos) => {
            this.setState({
                videos: videos,
                selectedVideo : videos[0]
            }); // it should be this.setState({videos: data}), so we are keeping key and property of the same name
            //so not required to mention seperately
            });
    }

    render() {
        const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 300);

        return (
        <div>
        <SearchBar onSearchTermChange = {term => this.videoSearch(term)}/>
        <VideoDetail video= {this.state.selectedVideo} />
        <VideoList 
        onVideoSelect = {selectedVideo=> this.setState({selectedVideo}) }
        videos = {this.state.videos}/>
        
        </div>
        );
    } 
}

ReactDOM.render(<App />, document.querySelector('.container'));
