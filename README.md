Video.js Markers
===================
JSBin DEMO: http://jsbin.com/befob/7/edit


![Alt text](https://raw.github.com/spchuang/videojs-markers/master/screenshot.png "Screen shot of videojs.markers")

A plugin that displays customizable markers upon progress bars of the video with [Video.js](https://github.com/videojs/video.js/). This could be used to show video breaks and show overlaid text on the video when playback reaches the specific break point.

Using the Plugin
----------------
Add the 'videojs.markers.js' plugin and stylesheet after including videojs script and jQuery library

    <link href="http://vjs.zencdn.net/4.2/video-js.css" rel="stylesheet">
    <link href="videojs.markers.css" rel="stylesheet">
    <script src="http://code.jquery.com/jquery-2.0.3.min.js"></script>
    <script src="http://vjs.zencdn.net/4.2/video.js"></script>
    <script src='../src/videojs.markers.js'></script>

Basic usage: display break markers in the video.

To add breaks in the video, simply add a new time (in seconds) in the list of breaks option. 
   
    // initialize video.js
    var video = videojs('test_video');

    //load the marker plugin
    video.markers({
      //set break time
      marker_breaks:[9.5, 16, 28, 36],
      marker_text  :['text1','text2','text3','text4']
    });

Customize marker style: 

The style of the markers could be modified by passing an optional setting "markerStyle" with your preference of css styles. 

    video.markers({
      setting: {
        markerStyle: {
          'width':'8px',
          'background-color': 'red'
        },
      },
      marker_breaks:[9.5, 16, 28, 36],
      marker_text  :['text1','text2','text3','text4']
    });

Advanced Usage: show overlaid text and customize markerTip.

In addition to displaying markers on the control bar, videojs-markers also show markerTip and overlaid text boxes when the video reaches the break points. Markertip is displayed by default while breakOverlay isn't. The overlaid box could be styled and display any default text for any specified duration of time (in seconds).


    video.markers({
      setting: {
        //set style, markertip, and breakOverlay
        markerStyle: {
          'width':'8px',
          'background-color': 'orange'
        },
        markerTip:{
          display: true,
          default_text: "Ad break"
        },
        breakOverlay:{
          display: true,
          display_time: 3,
          default_text: "This is an ad break ",

          //overlaid box style
          style:{
            'height': '30%',
            'background-color': 'rgba(200,80,15,0.8)',
            'color': 'white',
            'font-size': '18px'
          }
        }
      },
      marker_breaks:[9.5, 16, 28, 36],
      marker_text  :['text1','text2','text3','text4']
    });

Default setting of videojs-markers:

    var defaults = {
      markerStyle:{
        'width':'10px',
        'border-radius': '40%',
        'background-color': 'red'
      },
      markerTip:{
        display: true,
        default_text: "Break",
        show_colon: true
      },
      breakOverlay:{
        display: false,
        display_time: 3,
        default_text: "Break overlay",
        show_colon: true,
        style:{
          'width':'100%',
          'height': '20%',
          'background-color': 'rgba(0,0,0,0.7)',
          'color': 'white',
          'font-size': '17px',
        }
      }
    };
