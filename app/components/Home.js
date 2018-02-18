// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.css';
import DrawableCanvas from 'react-drawable-canvas';
var fs = require('fs');
var request = require('request');
const {Dialog} = require('electron')

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectValue:'development-camp',
            options: [],
            brushColor: '#000000',
            lineWidth: 2,
            canvasStyle: {
              backgroundColor: '#ffffff',
              width: '100%',
              height: '300px'
            },
            clear: false
        };
    }

    componentDidMount() {
        request.get({url:'https://slack.com/api/channels.list?******', responseType:'json'}, (error, response, body) => {
            if (!error && response.statusCode == 200) {
               let channels = JSON.parse(body)['channels'];
               var channel_options = [];
               for (var i = 0; i < channels.length; i++) {
                   channel_options.push(
                       <option key={i} value={channels[i].name}>{channels[i].name}</option>
                   );
               }
               this.setState({options:channel_options});
               this.forceUpdate();
            } else {
                console.log('status code: ' + response.statusCode);
            }
        });
    }

    handleChange(e){
        this.setState({selectValue:e.target.value});
    }

    handleOnClickClear() {
      this.setState({
        clear: true
      });
    }

    handleOnClickPost() {
        // canvasから画像取得
        let canvas = document.getElementsByTagName('canvas')[0];
        var image_data = canvas.toDataURL("image/png");

        // DataURL のデータ部分を抜き出し、Base64からバイナリに変換
        var bin = atob(image_data.split(',')[1]);
        // 空の Uint8Array ビューを作る
        var buffer = new Uint8Array(bin.length);
        // Uint8Array ビューに 1 バイトずつ値を埋める
        for (var i = 0; i < bin.length; i++) {
          buffer[i] = bin.charCodeAt(i);
        }

        // 画像保存
        var fs = require('fs');
        fs.writeFile("/******/slackfigure.png", buffer, 'binary', function(err) {});

        // 画像投稿
        let options = {
            token: '******',
            filename: 'figure.png',
            file: fs.createReadStream('/******/slackfigure.png'),
            channels: this.state.selectValue
        };
        request.post({url:'https://slack.com/api/files.upload', formData: options}, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                alert('Slackに投稿しました！');
                console.log(response);
            } else {
                console.log('status code: ' + response.statusCode);
            }
        });
    }

  render() {
    return (
      <div>
          <DrawableCanvas {...this.state} />
          <button onClick={this.handleOnClickClear.bind(this)}>Clear all</button>
          <select defaultValue={this.state.selectValue} onChange={this.handleChange.bind(this)} >
              {this.state.options}
          </select>
          <button onClick={this.handleOnClickPost.bind(this)}>Post</button>
      </div>
    );
  }
}
