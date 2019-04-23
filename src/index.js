import React from 'react';
import {render} from 'react-dom';
import VideoList from './components/videoList';
import VideoModel from './models/video';
import Input from './components/youtubeInput';
import api from './api';
import './styles/style.css';

let videos = [];

const model = window.model = new VideoModel();

/**
 * Update the videos list to the query results and update app
 * @param {string} query - query to YouTube API
 */
const update = (query) => {
	api(query).then((res) => {
		const { items } = res.result;
		videos = items.map(val => `http://www.youtube.com/watch?v=${val.id.videoId}`);
		renderApp();
	}).catch(err => console.error(err));
}

const App = (props) => (
	<div>
		<h3>Test task</h3>
		<Input onSearch={update} />
		<VideoList model={model} videos={videos}/>
	</div>
);

function renderApp() {
	render(<App/>, document.getElementById('app'));
}

model.on('change', renderApp);
renderApp();
