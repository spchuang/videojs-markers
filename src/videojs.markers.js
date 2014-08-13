/*! videojs-markers !*/

(function($,undefined) {
   //default setting
   var default_setting = {
      markerStyle:{
         'width':'7px',
         'border-radius': '30%',
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
            'font-size': '17px'
         }
      },
      forceInitialization: false
   };
   var MARKER_ID_DELIMITER = '-videojsmarker-';
   
   function registerVideoJsMarkersPlugin() {
      // check that videojs is loaded
      if (!(typeof videojs == 'function')) { 
         setTimeout(function() { registerVideoJsMarkersPlugin(); }, 100); 
      } else {
         /**
          * register the markers plugin (dependent on jquery)
          */
         videojs.plugin('markers', function(options) {
            
            var markers       = [],
               setting       = $.extend(true, {}, default_setting, options.setting),
               video_wrapper = $(this.el()),
               player        = this;
            options.marker_text   = options.marker_text || [];
            options.marker_breaks = options.marker_breaks || [];
            options.marker_overlay = options.marker_overlay || [];
            
            function createMarkers(){
               // create the markers
               var duration, m, pos, text, overlay;
               console.log("[videojs-markers] creating markers");
               duration = player.duration();
               $.each(options.marker_breaks, function(key,time){
                  pos = (time/duration)*100;
                  m = $("<div class='vjs-marker'  id='"+ video_wrapper[0].id + MARKER_ID_DELIMITER + key+"'></div>");
                  m.css(setting.markerStyle)
                     .css({"margin-left"   : -parseFloat(m.css("width"))/2 +'px',
                        "left"          : pos+ '%'});
                  
                  video_wrapper.find('.vjs-progress-control').append(m);
                  text = options.marker_text[key] || "";
                  overlay = options.marker_overlay[key] || text;
                  markers.push({div: m, time: time, pos:pos, text: text, overlay: overlay});
               });
            }
            
            function displayMarkerTip(){
               var marker_tip;
               console.log("[videojs-markers] creating marker tip");
               marker_tip = $("<div class='vjs-tip'><div class='vjs-tip-arrow'></div><div class='vjs-tip-inner'></div></div>");
               video_wrapper.find('.vjs-progress-control').append(marker_tip);
               
               video_wrapper.find('.vjs-marker').on('mouseover', function(){
                  var id = this.id.split(MARKER_ID_DELIMITER)[1];
                  marker_tip.find('.vjs-tip-inner').html(setting.markerTip.default_text + (setting.markerTip.show_colon ? ":" : "") + " " + markers[id].text);
                  
                  //margin-left needs to minus the padding length to align right now the markers
                  marker_tip.css({"left"        : markers[id].pos+'%',
                     "margin-left" : -parseFloat(marker_tip.css("width"))/2-5 +'px',
                     "visibility"  : "visible"});
                  
               }).on('mouseout',function(){
                     marker_tip.css("visibility", "hidden");
               });
            }
            
            function displayBreakOverlay(){
               var break_overlay, ct, overlay_index;
               console.log("[videojs-markers] creating break overlay");
               break_overlay = $("<div class='vjs-break-overlay'><div class='vjs-break-overlay-text'></div></div>")
                  .css(setting.breakOverlay.style);
               video_wrapper.append(break_overlay);
               overlay_index = -1;
               
               //bind timeupdate handle
               player.on("timeupdate", function() {
                  ct = player.currentTime();
                  if(overlay_index == -1){
                     //check if playback enters any break period
                     $.each(markers, function(key, m){
                        if(ct >= m.time && ct <= (m.time+setting.breakOverlay.display_time)){
                           overlay_index = key;
                           break_overlay.find('.vjs-break-overlay-text').html(jQuery.type(markers[overlay_index].overlay) !== "string" ? markers[overlay_index].overlay : setting.breakOverlay.default_text + (setting.breakOverlay.show_colon ? ":" : "") + " " + (markers[overlay_index].overlay));
                           break_overlay.css( "visibility", "visible" );
                           player.trigger("markerreached");
                           return false;
                        }
                     });
                  }else{
                     //overlay is on, check if we left the break period yet
                     if(ct < markers[overlay_index].time ||
                        ct > markers[overlay_index].time+setting.breakOverlay.display_time){
                        overlay_index = -1;
                        break_overlay.css("visibility", "hidden");
                     }
                  }
               });
            }
            
            //load the markers
            function initializeMarkers(){
               if (player.duration() == 0) {
                  setTimeout(function() { initializeMarkers(); }, 100);
               } else {
                  console.log("[videojs-markers] Initialize");
                  createMarkers();
                  console.log("[videojs-markers] markers");
                  console.log(markers);
                  //bind click event to seek to marker time
                  video_wrapper.find('.vjs-marker').on('click', function(e){
                     var id = this.id.split(MARKER_ID_DELIMITER)[1];
                     player.currentTime(markers[id].time);
                  });
                  if(setting.markerTip.display){
                     displayMarkerTip();
                  }
                  if(setting.breakOverlay.display){
                     displayBreakOverlay();
                  }
               }
            }
            
            if(setting.forceInitialization){
               initializeMarkers();
            } else {
                this.on("loadedmetadata", function(){
                   initializeMarkers();
                });
            }
            
         });
      }
   }
   
   registerVideoJsMarkersPlugin();
   
})(jQuery);
