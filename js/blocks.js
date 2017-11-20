blocktypes = {}
blocktypes.SubType = {}
blocktypes.SubType['Visibility'] = { icon: 'fa fa-eye', title: '<Name>', value: '<Data>' }
blocktypes.SubType['Electric'] = { icon: 'fa fa-plug', title: '<Name>', value: '<Data>' }
blocktypes.SubType['Lux'] = { icon: 'fa fa-sun-o', title: '<Name>', value: '<Data>' }
blocktypes.SubType['Barometer'] = { icon: 'wi wi-barometer', title: '<Name>', value: '<Data>' }
blocktypes.SubType['Sound Level'] = { icon: 'fa fa-volume-up', title: '<Name>', value: '<Data>' }
blocktypes.SubType['Distance'] = { icon: 'fa fa-eye', title: '<Name>', value: '<Data>' }
blocktypes.SubType['Alert'] = { icon: 'fa fa-warning', title: '<Data>', value: '<Name>' }
blocktypes.SubType['Percentage'] = { icon: 'fa fa-percent', title: '<Name>', value: '<Data>' }
blocktypes.SubType['Text'] = { icon: 'fa fa-file', title: '<Name>', value: '<Data>' }
blocktypes.SubType['Counter Incremental'] = { icon: 'fa fa-bolt', title: '<Name>', value: '<Data>', format: true, decimals: 2 }
blocktypes.SubType['Voltage'] = { icon: 'fa fa-bolt', title: '<Name>', value: '<Data>' }
blocktypes.SubType['Solar Radiation'] = { icon: 'fa fa-sun-o', title: '<Name>', value: '<Data>', format: true, decimals: 0 }
blocktypes.SubType['Thermostat Mode'] = { icon: 'fa fa-thermometer-half', title: '<Name>', value: '<Data>' }

blocktypes.SensorUnit = {}
blocktypes.SensorUnit['Fertility'] = { icon: 'fa fa-flask', title: '<Name>', value: '<Data>' }

blocktypes.Type = {}
blocktypes.Type['Rain'] = { icon: 'fa fa-tint', title: '<Name>', value: '<Rain>mm', format: true, decimals: 1 }
blocktypes.Type['Wind'] = { icon: 'wi wi-wind-direction', title: language.wind.wind, value: '' }
blocktypes.Type['Temp'] = { icon: 'fa fa-thermometer-half', title: '<Name>', value: '<Temp>'+_TEMP_SYMBOL, format: true, decimals: 1}
blocktypes.Type['Air Quality'] = { image: 'air.png', title: '<Name>', value: '<Data>' }
blocktypes.Type['UV'] = { icon: 'fa fa-sun-o', title: '<Name>', value: '<Data>' }

blocktypes.HardwareType = {}
blocktypes.HardwareType['Motherboard sensors'] = { icon: 'fa fa-desktop', title: '<Name>', value: '<Data>' }
blocktypes.HardwareType['PVOutput (Input)'] = {}
blocktypes.HardwareType['PVOutput (Input)']['total'] = { icon: 'fa fa-sun-o', title: '<Name>', value: '<CounterToday>' }
blocktypes.HardwareType['PVOutput (Input)']['usage'] = { icon: 'fa fa-sun-o', title: '<Name>', value: '<Usage>' }

blocktypes.HardwareName = {}
blocktypes.HardwareName['Rain expected'] = { icon: 'fa fa-tint', title: '<Data>', value: '<Name>' }

blocktypes.Name = {}
blocktypes.Name['Rain Expected'] = { icon: 'fa fa-tint', title: '<Data>', value: '<Name>' }
blocktypes.Name['Rain expected'] = { icon: 'fa fa-tint', title: '<Data>', value: '<Name>' }
blocktypes.Name['Regen mm/uur'] = { icon: 'fa fa-tint', title: '<Data>', value: '<Name>' }
blocktypes.Name['Regen verwacht'] = { icon: 'fa fa-tint', title: '<Data>', value: '<Name>' }
blocktypes.Name['Regen Verwacht'] = { icon: 'fa fa-tint', title: '<Data>', value: '<Name>' }

blocktypes.Name['Ping'] = { icon: 'fa fa-arrows-v', title: '<Name>', value: '<Data>' }
blocktypes.Name['Upload'] = { icon: 'fa fa-upload', title: '<Name>', value: '<Data>', format: true, decimals: 3 }
blocktypes.Name['Download'] = { icon: 'fa fa-download', title: '<Name>', value: '<Data>', format: true, decimals: 3 }

blocktypes.Name['Maanfase'] = { icon: 'fa fa-moon-o', title: '<Data>', value: '<Name>' }
blocktypes.Name['Moon phase'] = { icon: 'fa fa-moon-o', title: '<Data>', value: '<Name>' }
blocktypes.Name['Mondphase'] = { icon: 'fa fa-moon-o', title: '<Data>', value: '<Name>' }


blocktypes = getExtendedBlockTypes(blocktypes);


function getBlock(cols, c, columndiv, standby) {
	if (typeof(cols) !== 'undefined') {
		var colclass='';
		if (c === 'bar') colclass='transbg dark';
		if (!standby) $('div.screen'+s+' .row').append('<div data-colindex="'+c+'" class="col-sm-'+cols['width']+' col-xs-12 sortable col'+c+' '+colclass+'"></div>');
		for(b in cols['blocks']) {
			var width=12;
            switch (cols['blocks'][b]) {
                case 'logo':
                case 'settings':
                    width = 2;
                    break;
                case 'flipclock':
                case 'miniclock':
                    width = 8;
                    break;
            }
            if(typeof(blocks[cols['blocks'][b]])!=='undefined' && typeof(blocks[cols['blocks'][b]]['width'])!=='undefined') width = blocks[cols['blocks'][b]]['width'];
            else if(typeof(cols['blocks'][b])!=='undefined' && typeof(cols['blocks'][b]['width'])!=='undefined') width = cols['blocks'][b]['width'];

            switch (cols['blocks'][b]) {
				case 'logo':
                    $(columndiv).append('<div data-id="logo" class="logo col-xs-' + width + '">' + settings['app_title'] + '</div>');
					continue;
                case 'settings':
                    var icons = ["settings", "fullscreen"];
                    if (typeof (settings['settings_icons']) !== 'undefined') {
                        icons = settings['settings_icons'];
                    }
                    var content = '<div class="col-xs-' + width + ' text-right" data-toggle="modal">';
                    for (i = 0; i < icons.length; i++) {
                        switch (icons[i]) {
                            case 'settings':
                                content += '<span class="settings settingsicon" data-id="settings" data-target="#settingspopup" data-toggle="modal"><em class="fa fa-cog"/></span>';
                                break;

                            case 'fullscreen':
                                $.ajax({url: 'js/fullscreen.js', async: false, dataType: "script"});
                                content += getFullScreenIcon();
                                break;
                        }
                    }
                    content += '</div>';
                    $(columndiv).append(content);
                    continue;
				case 'flipclock':
                    $('<link href="vendor/flipclock/flipclock.css?v='+cache+'" rel="stylesheet">').appendTo("head");
                    $(columndiv).append('<div data-id="flipclock" class="transbg block_' + cols['blocks'][b] + ' col-xs-' + width + ' text-center"><div class="flipclock"></div></div>');
                    if(typeof(FlipClock)!=='function') $.ajax({url: 'vendor/flipclock/flipclock.min.js', async: false, datatype: "script"});
                    FlipClock($('.flipclock'), {
                        clockFace: settings['shorttime'].match(/A/i) ? 'TwelveHourClock' : 'TwentyFourHourClock',
                        showSeconds: !settings['hide_seconds']
                    });
                    continue;
				case 'miniclock':
                    $(columndiv).append('<div data-id="miniclock" class="miniclock col-xs-' + width + ' text-center">' +
						'<span class="weekday"></span> <span class="date"></span> <span>&nbsp;&nbsp;&nbsp;&nbsp;</span> <span class="clock"></span>' +
						'</div>');
                    continue;
				case 'clock':
                    $(columndiv).append('<div data-id="clock" class="transbg block_' + cols['blocks'][b] + ' col-xs-' + width + ' text-center">' +
						'<h1 class="clock"></h1><h4 class="weekday"></h4><h4 class="date"></h4>' +
						'</div>');
                    continue;
				case 'weather':
                    if(typeof(loadWeatherFull)!=='function'){
                        $.ajax({url: 'js/weather.js', async: false,dataType: "script"});
                    }
                    $(columndiv).append('<div data-id="weather" class="block_'+cols['blocks'][b]+' containsweatherfull"></div>');
                    if(settings['wu_api']!=="" && settings['wu_city']!=="") loadWeatherFull(settings['wu_city'],settings['wu_country'],$('.weatherfull'));
					continue;
				case 'currentweather':
                    if(settings['wu_api']!=="" && settings['wu_city']!=="") {
                        if (typeof(loadWeather) !== 'function') {
                            $.ajax({url: 'js/weather.js', async: false, dataType: "script"});
                        }
                        $(columndiv).append('<div data-id="currentweather" class="mh transbg block_' + cols['blocks'][b] + ' col-xs-' + width + ' containsweather">' +
                            '<div class="col-xs-4"><div class="weather" id="weather"></div></div>' +
                            '<div class="col-xs-8"><strong class="title weatherdegrees" id="weatherdegrees"></strong><br /><span class="weatherloc" id="weatherloc"></span></div>' +
                            '</div>');
                        loadWeather(settings['wu_city'], settings['wu_country']);
                    }
                    continue;
				case 'currentweather_big':
                    if(settings['wu_api']!=="" && settings['wu_city']!==""){
                        if(typeof(loadWeather)!=='function'){
                            $.ajax({url: 'js/weather.js', async: false,dataType: "script"});
                        }
                        $(columndiv).append('<div data-id="currentweather_big" class="mh transbg big block_'+cols['blocks'][b]+' col-xs-'+width+' containsweather">' +
							'<div class="col-xs-1"><div class="weather" id="weather"></div></div>' +
							'<div class="col-xs-11"><span class="title weatherdegrees" id="weatherdegrees"></span> <span class="weatherloc" id="weatherloc"></span></div>' +
							'</div>');

                        loadWeather(settings['wu_city'],settings['wu_country']);
                    }
                    continue;
				case 'spotify':
                    if(typeof(getSpotify)!=='function') $.ajax({url: 'js/spotify.js', async: false,dataType: "script"});
                    getSpotify(columndiv);
					continue;
				case 'nzbget':
                    if(typeof(loadNZBGET)!=='function') $.ajax({url: 'js/nzbget.js', async: false,dataType: "script"});
                    loadNZBGET(columndiv);
					continue;
				case 'train':
                    if(typeof(getTrainInfo)!=='function') $.ajax({url: 'js/ns.js', async: false,dataType: "script"});
                    $(columndiv).append('<div data-id="train" class="train"></div>');
                    getTrainInfo();
					continue;
				case 'traffic':
                    if(typeof(getTraffic)!=='function') $.ajax({url: 'js/traffic.js', async: false,dataType: "script"});
                    $(columndiv).append('<div data-id="traffic" class="traffic"></div>');
                    getTraffic();
					continue;
				case 'trafficmap':
                    $(columndiv).append('<div data-id="trafficmap" class="mh transbg block_trafficmap col-xs-12"><div id="trafficm" class="trafficmap"></div></div>');
                    continue;
				case 'news':
                    if(typeof(getNews)!=='function') $.ajax({url: 'js/news.js', async: false,dataType: "script"});
                    $(columndiv).append('<div data-id="news" class="news"></div>');
                    getNews('news',settings['default_news_url']);
                    continue;
				case 'log':
                    if(typeof(getLog)!=='function') $.ajax({url: 'js/log.js', async: false,dataType: "script"});
                    getLog(columndiv);
                    continue;
				case 'stationclock':
                    $(columndiv).append('<div data-id="clock" class="transbg block_'+cols['blocks'][b]+' col-xs-'+width+' text-center"><canvas id="clock" width="150" height="150">Your browser is unfortunately not supported.</canvas></div>');
                    if(typeof(StationClock)!=='function') $.ajax({url: 'vendor/stationclock.js', async: false,dataType: "script"});

                    var clock = new StationClock("clock");
                    clock.body = StationClock.RoundBody;
                    clock.dial = StationClock.GermanStrokeDial;
                    clock.hourHand = StationClock.PointedHourHand;
                    clock.minuteHand = StationClock.PointedMinuteHand;
                    if(settings['hide_seconds_stationclock']==true)  clock.secondHand = false;
                    else {
                        clock.secondHand = StationClock.HoleShapedSecondHand;
                        if(typeof(settings['boss_stationclock'])=='undefined') clock.boss = StationClock.NoBoss;
                        else if(settings['boss_stationclock']=='RedBoss') clock.boss = StationClock.RedBoss;
                    }

                    clock.minuteHandBehavoir = StationClock.BouncingMinuteHand;
                    clock.secondHandBehavoir = StationClock.OverhastySecondHand;

                    window.setInterval(function() { clock.draw() }, 50);
                    continue;
				case 'sunrise':
					var classes = 'block_' + cols['blocks'][b] + ' col-xs-' + width + ' transbg text-center sunriseholder';
                    if(c === 'bar') {
                        classes = 'block_' + cols['blocks'][b] + ' col-xs-2 text-center sunriseholder';
                    }
					$(columndiv).append('<div data-id="sunrise" class="' + classes + '">' +
						'<em class="wi wi-sunrise"></em><span class="sunrise"></span><em class="wi wi-sunset"></em><span class="sunset"></span>' +
						'</div>');
                    continue;
				case 'horizon':
                    var html ='<div data-id="horizon" class="containshorizon">';
                    html+='<div class="col-xs-4 transbg hover text-center" onclick="ziggoRemote(\'E0x07\')">';
                    html+='<em class="fa fa-chevron-left fa-small"></em>';
                    html+='</div>';
                    html+='<div class="col-xs-4 transbg hover text-center" onclick="ziggoRemote(\'E4x00\')">';
                    html+='<em class="fa fa-pause fa-small"></em>';
                    html+='</div>';
                    html+='<div class="col-xs-4 transbg hover text-center" onclick="ziggoRemote(\'E0x06\')">';
                    html+='<em class="fa fa-chevron-right fa-small"></em>';
                    html+='</div>';
                    html+='</div>';
                    $(columndiv).append(html);
					continue;
				case 'icalendar':
                    var random = getRandomInt(1,100000);
                    var html ='<div class="col-xs-'+width+' transbg containsicalendar containsicalendar'+random+'">';
                    html+='<div class="col-xs-2 col-icon">';
                    html+='<em class="fa fa-calendar"></em>';
                    html+='</div>';
                    html+='<div class="col-xs-10 items">'+language.misc.loading+'</div>';
                    html+='</div>';
                    $(columndiv).append(html);
                    addCalendar($('.containsicalendar'+random),settings['calendarurl']);
					continue;
				case 'streamplayer':
                    var random = getRandomInt(1,100000);
                    var html ='<div data-id="streamplayer" class="transbg containsstreamplayer' + random + '">';
                    html+='<div class="col-xs-12 transbg smalltitle"><h3></h3></div>';
                    html+='<audio class="audio1" preload="none"></audio>';
                    html+='<div class="col-xs-4 transbg hover text-center btnPrev">';
                    html+='<em class="fa fa-chevron-left fa-small"></em>';
                    html+='</div>';
                    html+='<div class="col-xs-4 transbg hover text-center playStream">';
                    html+='<em class="fa fa-play fa-small stateicon"></em>';
                    html+='</div>';
                    html+='<div class="col-xs-4 transbg hover text-center btnNext">';
                    html+='<em class="fa fa-chevron-right fa-small"></em>';
                    html+='</div>';
                    html+='</div>';
                    $(columndiv).append(html);

                    addStreamPlayer('.containsstreamplayer' + random);
					continue;
				case 'chromecast':
                    $.ajax({url: 'js/chromecast.js', async: false,dataType: "script"});
                    loadChromecast(columndiv);
                    continue;
				case 'garbage':
                    if(typeof(loadGarbage)!=='function') $.ajax({url: 'js/garbage.js', async: false,dataType: "script"});
                    $(columndiv).append(loadGarbage());
                    getBlockClick('garbage');
                    continue;
				case 'sonarr':
                    if(typeof(loadSonarr)!=='function') $.ajax({url: 'js/sonarr.js', async: false,dataType: "script"});
                    $(columndiv).append(loadSonarr());
                    getBlockClick('sonarr');
                    continue;
				case 'fullscreen':
                    $(columndiv).append('<div data-id="fullscreen" class="col-xs-' + width + ' text-right">' + getFullScreenIcon() + '</div>');
                    continue;
            }
			var blocktype='';
			if(typeof(blocks[cols['blocks'][b]])!=='undefined' && typeof(blocks[cols['blocks'][b]]['type'])!=='undefined') {
				blocktype = blocks[cols['blocks'][b]]['type'];
                if(blocktype=='blocktitle'){
                    $(columndiv).append('<div data-id="'+cols['blocks'][b]+'" class="col-xs-'+width+' mh titlegroups transbg"><h3>'+blocks[cols['blocks'][b]]['title']+'</h3></div>');
                    continue;
                }
			}

			switch (typeof(cols['blocks'][b])) {
				case 'object':
                    var random = getRandomInt(1,100000);
					if (cols['blocks'][b].hasOwnProperty('latitude')) {
                        $(columndiv).append(loadMaps(random,cols['blocks'][b]));
                        continue;
					} else if (cols['blocks'][b].hasOwnProperty('isimage')) {
                        $(columndiv).append(loadImage(random,cols['blocks'][b]));
                        continue;
					}
                    var key = 'UNKNOWN';
                    if (cols['blocks'][b].hasOwnProperty('key')) key = cols['blocks'][b]['key'];

                    if (cols['blocks'][b].hasOwnProperty('frameurl')) {
                    	$(columndiv).append(loadFrame(random,cols['blocks'][b]));
                    	continue;
                    } else if (cols['blocks'][b].hasOwnProperty('empty')) {
                        $(columndiv).append('<div data-id="'+key+'" class="mh transbg col-xs-'+width+'">');
                    } else if (cols['blocks'][b].hasOwnProperty('station')) {
                        if(typeof(loadPublicTransport)!=='function') $.ajax({url: 'js/publictransport.js', async: false,dataType: "script"});
                        $(columndiv).append(loadPublicTransport(random,cols['blocks'][b],key));
                    } else if (cols['blocks'][b].hasOwnProperty('currency')) {
                        if(typeof(getCoin)!=='function') $.ajax({url: 'js/coins.js', async: false,dataType: "script"});
                        var html='<div class="col-xs-'+width+' transbg coins-'+cols['blocks'][b]['key']+'" data-id="coins.'+cols['blocks'][b]['key']+'"></div>';
                        $(columndiv).append(html);
                        getCoin(cols['blocks'][b]);

                    } else if (cols['blocks'][b].hasOwnProperty('channels')) {
                        if(typeof(addTVGuide)!=='function') $.ajax({url: 'js/tvguide.js', async: false,dataType: "script"});

                        var html ='';
                        if(cols['blocks'][b].hasOwnProperty('title')) html+='<div class="col-xs-'+width+' mh titlegroups transbg"><h3>'+cols['blocks'][b]['title']+'</h3></div>';

                        html+='<div data-id="tvguide.'+key+'" class="col-xs-'+width+' block_tvguide transbg containstvguide containstvguide'+random+'">';
                        if(cols['blocks'][b].hasOwnProperty('icon') && cols['blocks'][b]['icon']!==''){
                            html+='<div class="col-xs-2 col-icon">';
                            html+='<em class="fa '+cols['blocks'][b]['icon']+'"></em>';
                            html+='</div>';
                            html+='<div class="col-xs-10 items">'+language.misc.loading+'</div>';
                        }
                        else if(cols['blocks'][b].hasOwnProperty('image') && cols['blocks'][b]['image']!==''){
                            html+='<div class="col-xs-2 col-icon">';
                            html+='<img src="img/'+cols['blocks'][b]['image']+'" class="icon calendar_icon" />';
                            html+='</div>';
                            html+='<div class="col-xs-10 items">'+language.misc.loading+'</div>';
                        }
                        else {
                            html+='<div class="col-xs-12 items">'+language.misc.loading+'</div>';
                        }

                        html+='</div>';
                        $(columndiv).append(html);
                        addTVGuide($('.containstvguide'+random),cols['blocks'][b]);
                        getBlockClick('tvguide');
                    } else if(cols['blocks'][b].hasOwnProperty('icalurl')
							|| cols['blocks'][b].hasOwnProperty('calendars')) {
                        var html ='';
                        if (cols['blocks'][b].hasOwnProperty('title')) {
                            html += '<div class="col-xs-' + width + ' mh titlegroups transbg"><h3>' + cols['blocks'][b]['title'] + '</h3></div>';
                        }

                        html+='<div data-id="calendars.'+key+'" class="col-xs-'+width+' transbg containsicalendar containsicalendar'+random+'">';
                        if(cols['blocks'][b].hasOwnProperty('icon') && cols['blocks'][b]['icon']!==''){
                            html+='<div class="col-xs-2 col-icon">';
                            html+='<em class="fa '+cols['blocks'][b]['icon']+'"></em>';
                            html+='</div>';
                            html+='<div class="col-xs-10 items">'+language.misc.loading+'</div>';
                        }
                        else if(cols['blocks'][b].hasOwnProperty('image') && cols['blocks'][b]['image']!==''){
                            html+='<div class="col-xs-2 col-icon">';
                            html+='<img src="img/'+cols['blocks'][b]['image']+'" class="icon calendar_icon" />';
                            html+='</div>';
                            html+='<div class="col-xs-10 items">'+language.misc.loading+'</div>';
                        }
                        else {
                            html+='<div class="col-xs-12 items">'+language.misc.loading+'</div>';
                        }

                        html+='</div>';
                        $(columndiv).append(html);

                        if(typeof(addCalendar)!=='function') $.ajax({url: 'js/calendar.js', async: false,dataType: "script"});
                        addCalendar($('.containsicalendar'+random),cols['blocks'][b]);
                    } else {
                        $(columndiv).append(loadButton(b, cols['blocks'][b]));
                    }

                    continue;

				case 'string':
					if (cols['blocks'][b].substring(0,5)=='news_') {
                        if(typeof(getNews)!=='function') $.ajax({url: 'js/news.js', async: false,dataType: "script"});
                        $(columndiv).append('<div class="' + cols['blocks'][b] + '"></div>');
                        getNews(cols['blocks'][b],blocks[cols['blocks'][b]]['feed']);
                        continue;
					}
				// Intended fall through
				default:
                    $(columndiv).append('<div data-id="' + cols['blocks'][b] + '" class="mh transbg block_' + cols['blocks'][b] + '"></div>');
					break;
			}
		}
	}
}

function getStateBlock(id,icon,title,value,device){
	
	if(typeof(blocks[id])!=='undefined' && typeof(blocks[id]['unit'])!=='undefined'){
		var unitArray = blocks[id]['unit'].split(";");
		value = value.replace(unitArray[0], unitArray[1]);
	}
	
	getBlockClick(id,device);
	
	var stateBlock ='<div class="col-xs-4 col-icon">';
		stateBlock += '<em class="fa ' + icon + '"></em>';
	stateBlock+='</div>';
	stateBlock+='<div class="col-xs-8 col-data">';
		
		if(typeof(blocks[id])!=='undefined' && typeof(blocks[id]['switch'])!=='undefined' && blocks[id]['switch']==true){
			stateBlock+='<strong class="title">'+title+'</strong><br />';
			stateBlock+='<span>'+value+'</span>';
		}
		else {
			stateBlock+='<strong class="title">'+value+'</strong><br />';
			stateBlock+='<span>'+title+'</span>';

		}
		if((settings['last_update']==1 && (typeof(blocks[id])=='undefined' || typeof(blocks[id]['hide_lastupdate'])=='undefined' || blocks[id]['hide_lastupdate']===false)) || 
		  (settings['last_update']==0 && (typeof(blocks[id])!=='undefined' && typeof(blocks[id]['show_lastupdate'])!=='undefined' && blocks[id]['show_lastupdate']==true)) 
		  ){
			stateBlock+='<br /><span class="lastupdate">'+moment(device['LastUpdate']).format(settings['timeformat'])+'</span>';
		}
	
	stateBlock+='</div>';
	return stateBlock;
}


function getStatusBlock(idx,device,block,c){
	var value = block.value;
	var title = block.title;
	var elements = [];
	if(typeof(blocks[idx])!=='undefined' && typeof(blocks[idx]['title'])!=='undefined') title=blocks[idx]['title'];

    var tagRegEx = /<[\w\s="/.':;#-\/\?]+>/gi;
    if (matches = (title + value).match(tagRegEx)) {
        matches.map(function (val) {
            elements.push(val.replace(/([<,>])+/g, ''));
        });
    }

	for(d in elements) {
	    deviceValue = device[elements[d]];
	    if (block.hasOwnProperty('format') && block.format) {
	        unit = '';
	        if (isNaN(device[elements[d]])) {
	            unit = ' ' + device[elements[d]].split(' ')[1];
            }
            deviceValue = number_format(deviceValue, block.decimals) + unit;
        }
		value = value.replace('<' + elements[d] + '>', deviceValue);
		title = title.replace('<' + elements[d] + '>', device[elements[d]]);
	}
	
	if(typeof(blocks[idx])!=='undefined' && typeof(blocks[idx]['unit'])!=='undefined'){
		var unitArray = blocks[idx]['unit'].split(";");
		value = value.replace(unitArray[0], unitArray[1]);
	}
					
	getBlockClick(idx,device);
	
	var attr='';
	if(typeof(device['Direction'])!=='undefined' && typeof(device['DirectionStr'])!=='undefined'){
		attr+=' style="-webkit-transform: rotate('+(device['Direction']+180)+'deg);-moz-transform: rotate('+(device['Direction']+180)+'deg);-ms-transform: rotate('+(device['Direction']+180)+'deg);-o-transform: rotate('+(device['Direction']+180)+'deg); transform: rotate('+(device['Direction']+180)+'deg);"';
		if (settings['use_beaufort'] == 1){
			value = Beaufort(device['Speed'])+', '; 
		} else {
			value = device['Speed']+' m/s, '; 
		}
		value+=device['Direction']+'&deg ';
		if (settings['translate_windspeed']==true){
			value+=TranslateDirection(device['DirectionStr'])
		} else {
			value+=device['DirectionStr'];
		}
	}
	
	var stateBlock ='<div class="col-xs-4 col-icon">';
		if(typeof(blocks[idx])!=='undefined' && typeof(blocks[idx]['icon'])!=='undefined'){
			stateBlock+='<em class="fa '+blocks[idx]['icon']+'"'+attr+'></em>';
		}
		else if(typeof(blocks[idx])!=='undefined' && typeof(blocks[idx]['image'])!=='undefined'){
			stateBlock+='<img src="img/'+blocks[idx]['image']+'"'+attr+' class="icon" />';
		}
		else {
			if(typeof(block.image)!=='undefined') stateBlock+='<img src="img/'+block.image+'"'+attr+' class="icon" />';
			else stateBlock+='<em class="'+block.icon+'"'+attr+'></em>';
		}
	stateBlock+='</div>';
	stateBlock+='<div class="col-xs-8 col-data">';
		if(typeof(blocks[idx])!=='undefined' && typeof(blocks[idx]['switch'])!=='undefined' && blocks[idx]['switch']==true){
			stateBlock+='<strong class="title">'+title+'</strong><br />';
			stateBlock+='<span>'+value+'</span>';
		}
		else {
			stateBlock+='<strong class="title">'+value+'</strong><br />';
			stateBlock+='<span>'+title+'</span>';
		}

		if((settings['last_update']==1 && (typeof(blocks[idx])=='undefined' || typeof(blocks[idx]['hide_lastupdate'])=='undefined' || blocks[idx]['hide_lastupdate']===false)) || 
		  (settings['last_update']==0 && (typeof(blocks[idx])!=='undefined' && typeof(blocks[idx]['show_lastupdate'])!=='undefined' && blocks[idx]['show_lastupdate']==true)) 
		  ){
			stateBlock+='<br /><span class="lastupdate">'+moment(device['LastUpdate']).format(settings['timeformat'])+'</span>';
		}
	stateBlock+='</div>';
	return stateBlock;
}

function getBlockClick(idx,device){
	if(typeof(blocks[idx])!=='undefined' && typeof(blocks[idx]['link'])!=='undefined' && blocks[idx]['link']!==""){
		if($('.block_'+idx).length>0){
			$('.block_'+idx).addClass('hover');
			
			if(typeof(blocks[idx]['target'])=='undefined' || blocks[idx]['target']=='_blank'){
				$('.block_'+idx).attr('onclick','window.open(\''+blocks[idx]['link']+'\');');
			}
			else if(typeof(blocks[idx]['target'])!=='undefined' && blocks[idx]['target']=='iframe'){
				$('.block_'+idx).attr('onclick','addBlockClickFrame(\''+idx+'\');');
			}
		}
	}
	else if (typeof(blocks[idx]) !== 'undefined' && typeof(blocks[idx]['graph']) !== 'undefined' && blocks[idx]['graph'] === false) {
		return;
    }
	else if(typeof(device)!=='undefined'){
		if (device['SubType']=='Percentage' || device['SubType']=='Custom Sensor' || device['TypeImg']=='counter'
            || device['Type']=='Temp' || device['Type']=='Wind' || device['Type']=='Rain'
            || device['Type']== 'Temp + Humidity' || device['Type']== 'Temp + Humidity + Baro'
            || device['SubType'] == 'kWh' || device['SubType'] === 'Lux' || device['SubType'] === 'Solar Radiation'
        ){
			getButtonGraphs(device);
			if($('.block_' + idx).length > 0) {
				$('.block_' + idx).addClass('hover');
				$('.block_' + idx).attr('data-toggle','modal');
				$('.block_' + idx).attr('data-target','#opengraph' + device['idx']);
			} else if($('.block_' + device['idx']).length > 0) {
				$('.block_' + device['idx']).addClass('hover');
				$('.block_' + device['idx']).attr('data-toggle','modal');
				$('.block_' + device['idx']).attr('data-target','#opengraph' + device['idx']);
			}
		}
	}
}

function addBlockClickFrame(idx){
	$('#button_'+idx).remove();
	var html = '<div class="modal fade" id="button_'+idx+'" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">';
	  html+='<div class="modal-dialog">';
		html+='<div class="modal-content">';
		  html+='<div class="modal-header">';
			html+='<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>';
		  html+='</div>';
		  html+='<div class="modal-body">';
			  html+='<iframe src="'+blocks[idx]['link']+'" width="100%" height="570" frameborder="0" allowtransparency="true"></iframe> '; 
		  html+='</div>';
		html+='</div>';
	  html+='</div>';
	html+='</div>';
	$('body').append(html);
	$('#button_'+idx).modal('show');
}
function iconORimage(idx,defaulticon,defaultimage,classnames,attr,colwidth,attrcol){
	if(typeof(colwidth)=='undefined') colwidth=4;
	if(typeof(attrcol)=='undefined') attrcol='';
	var icon = '<div class="col-xs-'+colwidth+' col-icon" '+attrcol+'>';
	if(typeof(blocks[idx])!=='undefined' && typeof(blocks[idx]['icon'])!=='undefined'){
		icon+='<em class="fa '+blocks[idx]['icon']+' '+classnames+'" '+attr+'></em>';
	}
	else if(typeof(blocks[idx])!=='undefined' && typeof(blocks[idx]['image'])!=='undefined'){
		icon+='<img src="img/'+blocks[idx]['image']+'" class="'+classnames+'" '+attr+' />';
	}
	else if(defaulticon!=='') icon+='<em class="fa '+defaulticon+' '+classnames+'" '+attr+'></em>';
	else if(defaultimage!=='') icon+='<img src="img/'+defaultimage+'" class="'+classnames+'" '+attr+' />';
	
	icon+='</div>';
	return icon;
}

function getBlockData(device,idx,ontxt,offtxt){
	
	var data='<div class="col-xs-8 col-data">';
	if(typeof(blocks[idx])!=='undefined' && typeof(blocks[idx]['hide_data'])!=='undefined' && blocks[idx]['hide_data']==true){
		data+='<strong class="title">'+device['Name']+'</strong>';
	}
	else if(typeof(blocks[idx])!=='undefined' && typeof(blocks[idx]['switch'])!=='undefined' && blocks[idx]['switch']==true){
		if(device['Status']=='Off' || device['Status']=='Closed' || device['Status']=='Normal') data+='<strong class="title">'+offtxt+'</strong><br />';
		else data+='<strong class="title">'+ontxt+'</strong><br />';
		data+='<span class="state">'+device['Name']+'</span>';
	}
	else {
		data+='<strong class="title">'+device['Name']+'</strong><br />';
		if(device['Status']=='Off' || device['Status']=='Closed' || device['Status']=='Normal') data+='<span class="state">'+offtxt+'</span>';
		else data+='<span class="state">'+ontxt+'</span>';
	}
	if((settings['last_update']==1 && (typeof(blocks[idx])=='undefined' || typeof(blocks[idx]['hide_lastupdate'])=='undefined' || blocks[idx]['hide_lastupdate']===false)) || 
	  (settings['last_update']==0 && (typeof(blocks[idx])!=='undefined' && typeof(blocks[idx]['show_lastupdate'])!=='undefined' && blocks[idx]['show_lastupdate']==true)) 
	  ){
		data+='<br /><span class="lastupdate">'+moment(device['LastUpdate']).format(settings['timeformat'])+'</span>';
	}
	data+='</div>';
	return data;
}
function TranslateDirection(directionstr){
   directionstr='direction_'+directionstr;
   return language['wind'][directionstr];
}

/**
 * Calculate windspeed in meters per second to Beaufort
 * @param windSpeed in m/s
 * @returns string Wind speed in Bft
 */
function Beaufort(windSpeed) {
    windSpeed = Math.abs(windSpeed);
    if (windSpeed <= 0.2) {
        return "0 Bft";
    }
    if (windSpeed <= 1.5) {
        return "1 Bft";
    }
    if (windSpeed <= 3.3) {
        return "2 Bft";
    }
    if (windSpeed <= 5.4) {
        return "3 Bft";
    }
    if (windSpeed <= 7.9) {
        return "4 Bft";
    }
    if (windSpeed <= 10.7) {
        return "5 Bft";
    }
    if (windSpeed <= 13.8) {
        return "6 Bft";
    }
    if (windSpeed <= 17.1) {
        return "7 Bft";
    }
    if (windSpeed <= 20.7) {
        return "8 Bft";
    }
    if (windSpeed <= 24.4) {
        return "9 Bft";
    }
    if (windSpeed <= 28.4) {
        return "10 Bft";
    }
    if (windSpeed <= 32.6) {
        return "11 Bft";
    }
    return "12 Bft";
}
