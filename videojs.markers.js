/*! videojs-markers !*/

(function() {
  var defaults = {
      0: {
        time: '00:00:00',
        style: {
            width:'5px',
            height: '5px',
            'background-color': 'red',
            'border-radius': '50%'
          }
      }
    },
    extend = function() {
      var args, target, i, object, property;
      args = Array.prototype.slice.call(arguments);
      target = args.shift() || {};
      for (i in args) {
        object = args[i];
        for (property in object) {
          if (object.hasOwnProperty(property)) {
            if (typeof object[property] === 'object') {
              target[property] = extend(target[property], object[property]);
            } else {
              target[property] = object[property];
            }
          }
        }
      }
      return target;
    };

  /**
   * register the markers plugin
   */
  videojs.plugin('markers', function(options) {
    var div, settings, marker, player, progressControl, duration;
    settings = extend({}, defaults, options);
    player = this;

    // create the markers element
    div = document.createElement('div');
    div.className = 'vjs-marker-holder';
    marker = document.createElement('div');
    div.appendChild(marker);
    //img.src = settings['0'].src;
    //calculate the time to seconds
    var n = settings['0'].time.split(":");


    console.log(n);

    marker.className = 'vjs-marker';
    console.log(marker);

    //extend setting['0'] style to img element
    extend(marker.style, settings['0'].style);

    
    // center the marker over the cursor if an offset wasn't provided
    if (!marker.style.left && !marker.style.right) {
        marker.style.left = -(marker.width / 2) + 'px';
    };

    // keep track of the duration to calculate correct thumbnail to display
    duration = player.duration();
    player.on('durationchange', function(event) {
      duration = player.duration();
      console.log(duration);
    });

    // add the marker to the player
    progressControl = player.controlBar.progressControl;
    progressControl.el().appendChild(div);

    // update the thumbnail while hovering
    /*
    progressControl.el().addEventListener('mousemove', function(event) {
      var mouseTime, time, active, left, setting;
      active = 0;

      // find the page offset of the mouse
      left = event.pageX || (event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft);
      // subtract the page offset of the progress control
      left -= progressControl.el().getBoundingClientRect().left + window.pageXOffset;
      div.style.left = left + 'px';

      // apply updated styles to the thumbnail if necessary
      mouseTime = Math.floor(event.offsetX / progressControl.width() * duration);
      for (time in settings) {
        if (mouseTime > time) {
          active = Math.max(active, time);
        }
      }
      setting = settings[active];
      if (setting.src && img.src != setting.src) {
        img.src = setting.src;
      }
      if (setting.style && img.style != setting.style) {
        extend(img.style, setting.style);
      }
    }, false);
*/
  });
})();