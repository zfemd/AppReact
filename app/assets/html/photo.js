const photo = `<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,target-densitydpi=high-dpi,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
    <script src="json2.js" type="application/javascript"></script>
    <script src="fabric.min.js" type="application/javascript"></script>
    <script src="imageFilters.js" type="application/javascript"></script>
    <title></title>
</head>
<body style="margin: 0;padding:0;border:0px solid #f00;background:#000;">
    <div style="overflow:hidden; height:300px;">
        <div style="display:flex;align-items:center;justify-content:center;height:300px;width:100%;">
            <canvas id="c" style="margin:0;padding:0;"></canvas>
        </div>
        <div>
            <image id="image-origin" style="display:none;"/>
        </div>
    </div>
    <script type="application/javascript">

        var intervalId = setInterval(function(){
            if (!window.WebViewBridge) {return;}
            clearInterval(intervalId);

            WebViewBridge.send('{"type":"bridgeReady"}');
            var imageClickable = false;
            var imgElementOrigin = document.getElementById('image-origin');
            var canvas = document.getElementById('c');
            var canvasFab = new fabric.Canvas('c', {isDrawingMode:false, renderOnAddRemove: true, controlsAboveOverlay:false});
            var canvasParent = canvas.parentElement;
            var imgFab = null;
            var scale = 1;

            var tags = {};
            var padding = 10;
            var activeTag = null;
            var tagUID = 0;
            var choseStickers = {};
            var imageFilters = {
                brightness: new fabric.Image.filters.Brightness({brightness: 0}),
                contrast: new fabric.Image.filters.Contrast({contrast: 1}),
                //pixelate: new fabric.Image.filters.Pixelate({blocksize: 4}),
                //invert: new fabric.Image.filters.Invert(),
                sepia: new fabric.Image.filters.Sepia(),
                sepia2: new fabric.Image.filters.Sepia2(),
                tint: new fabric.Image.filters.Tint({color: '#000000', opacity: 0.5}),
                //blur: new fabric.Image.filters.Convolute({matrix: [ 1/9, 1/9, 1/9,
                //    1/9, 1/9, 1/9,
                //    1/9, 1/9, 1/9 ]
                //}),
                sharpen: new fabric.Image.filters.Convolute({matrix: [  0, -1,  0,
                    -1,  5, -1,
                    0, -1,  0 ]
                })
            };

            var getPosSet1 = function(textWidth, textHeight){
                return {
                    textPositions: [
                        {left: padding,                top: - textHeight * 0.5},
                        {left: -(textWidth + padding), top: - textHeight * 0.5},
                        {left: padding,                top: - textHeight * 1.5},
                        {left: -(textWidth + padding), top: - textHeight * 1.5}],
                    polylines : [
                        [{ x: 0, y: 0 }, { x: padding, y: textHeight * 0.5 }, { x: textWidth + padding, y: textHeight * 0.5}],
                        [{ x: 0, y: 0 }, { x: -padding, y: textHeight * 0.5 }, { x: -(textWidth + padding), y: textHeight * 0.5 }],
                        [{ x: 0, y: 0 }, { x: padding, y: -textHeight * 0.5 },{ x: textWidth + padding, y: -textHeight * 0.5}],
                        [{ x: 0, y: 0 }, { x: -padding, y: -textHeight * 0.5 }, { x: -(textWidth + padding), y: -textHeight * 0.5}]],
                    polylinePositions: [
                        {left: 0, top: 0},
                        {left: -(textWidth + padding), top: 0},
                        {left: 0, top:  - textHeight * 0.5},
                        {left: -(textWidth + padding), top: - textHeight * 0.5}]
                };
            };

            var addTagLabel = function(text, e, group, index){
                if (!text || !e) {return}

                var textFab = new fabric.Text(text, {selectable:false, fill:"#fff", fontSize:12 * scale, evented:true});
                var posSet = getPosSet1(textFab.getWidth(), textFab.getHeight());
                textFab.setLeft(e.offsetX + posSet.textPositions[index].left);
                textFab.setTop(e.offsetY + posSet.textPositions[index].top);

                var poly = new fabric.Polyline(posSet.polylines[index], {selectable:false,stroke: 'white',fill:null, strokeWidth:scale});
                poly.setLeft(e.offsetX + posSet.polylinePositions[index].left);
                poly.setTop(e.offsetY + posSet.polylinePositions[index].top);
                group.add(textFab, poly);
            };

            var applyFilters = function(){
                WebViewBridge.send('imageFilters');
                var appliedFilters = Object.keys(imageFilters).filter(function(filterName){
                    return imageFilters[filterName].checked;
                }).map(function(filterName){
                    return imageFilters[filterName];
                });

                imgFab.filters =  appliedFilters;
                imgFab.applyFilters(canvasFab.renderAll.bind(canvasFab));
            }

            var applyBrightness = function(value) {
                var filterBrightness = imageFilters['brightness'];
                var filterTint = imageFilters['tint'];
                if (value > 0.5) {
                    filterTint.checked = !(filterBrightness.checked = true);
                    filterBrightness.setOptions({brightness: (value - 0.5) * 255});
                } else {
                    filterBrightness.checked = !(filterTint.checked = true);
                    filterTint.setOptions({opacity: (0.5 - value), color:'#000000'});
                }
                applyFilters();
            };

            var applyContrast = function(value) {
                var filterContrast = imageFilters['contrast'];
                filterContrast.setOptions({contrast:value});
                filterContrast.checked = true;
                applyFilters();
            };

            WebViewBridge.onMessage = function (message) {
                try {
                    message = JSON.parse(message);
                } catch(e) {
                    WebViewBridge.send(e.message);
                    return;
                }

                if (message.type === 'beautify') {
                    if (message.beautify == 'brightness') {
                        applyBrightness(message.value);
                    } else if (message.beautify == 'contrast') {
                        applyContrast(message.value);
                    }
                } else if (message.type === 'filter') {
                    Object.keys(imageFilters).forEach(function(filterName){
                        imageFilters[filterName].checked = false;
                    });

                    if(message.value != 'none'){
                        var filter = imageFilters[message.value];
                        filter.checked = !filter.checked;
                    }

                    applyFilters();
                } else if (message.type === 'addSticker') {
                    fabric.Image.fromURL(message.data, function(oImage) {
                        canvasFab.add(oImage);
                        choseStickers[message.name] = oImage;
                        canvasFab.renderAll();
                    }, { scaleX:scale, scaleY:scale, hasControls:true, cornerSize:12 * scale, rotatingPointOffset: 40 * scale, transparentCorners: false, cornerColor: "#ccc"});


                    WebViewBridge.send(JSON.stringify({type:"addedSticker"}));

                } else if (message.type === 'removeSticker') {

                    canvasFab.remove(choseStickers[message.name]);
                    WebViewBridge.send(JSON.stringify({type:"removedSticker"}));

                } else if (message.type == 'continue') {

                    // remove controls before export to data url.
                    canvasFab.getActiveObject() && canvasFab.getActiveObject().setOptions({hasControls:false});
                    WebViewBridge.send(JSON.stringify({type:"continue", imageData:canvasFab.toDataURL({format:'jpeg'})}));

                } else if (message.type === 'imageReady') {

                    imgElementOrigin.addEventListener('load', function(){

                        imgFab = new fabric.Image(imgElementOrigin, {left: 0,top: 0,angle: 0,opacity: 1,meetOrSlice: "meet", selectable:false, evented:false});
                        canvasFab.backgroundImage = imgFab;
                        canvasFab.renderAll();

                        canvasFab.on("mouse:up", function(data){
                            if (!imageClickable) {return}

                            var target = data.target, e = data.e, position = {offsetX : e.pageX - canvasParent.offsetLeft, offsetY : e.pageY - canvasParent.offsetTop};

                            if (target == null) {
                                WebViewBridge.send(JSON.stringify({type:"clickImage", x:position.offsetX, y:position.offsetY}));
                            } else {
                                activeTag = null;
                            }
                        });

                        canvasFab.on("mouse:down", function(data){
                            var target = data.target, e = data.e.targetTouches[0];
                            if (target != null && target.type == 'circle' && target.id){
                                var group = tags[target.id].group;
                                activeTag = {tag: target, group: group, downPos: {offsetX: e.pageX, offsetY: e.pageY}, groupOriginPos: {left: group.getLeft(), top: group.getTop()}};
                            } else {
                                activeTag = null;
                            }
                        });

                        canvasFab.on("mouse:move", function(data){
                            if (activeTag != null) {
                                var target = data.target, e = data.e.targetTouches[0], group = activeTag.group, downPos = activeTag.downPos, groupOriginPos = activeTag.groupOriginPos;
                                if (group != null) {
                                    group.setLeft(groupOriginPos.left + (e.pageX - downPos.offsetX) * scale);
                                    group.setTop(groupOriginPos.top + (e.pageY - downPos.offsetY) * scale);
                                }
                            }
                        });

                        WebViewBridge.send(JSON.stringify({type:"imageUpdated"}));
                    });

                    if (message.data) {
                        var maxHeight = 300;
                        var displaySize = {
                            width:message.image.width,
                            height:message.image.height
                        };
                        if (message.image.height > maxHeight) {
                            displaySize.height = maxHeight;
                            displaySize.width = Math.round(maxHeight / message.image.height * message.image.width);
                        }

                        canvasFab.setDimensions(displaySize, {cssOnly:true});
                        canvasFab.setDimensions({width:message.image.width, height:message.image.height}, {backstoreOnly:true});

                        scale = message.image.width / displaySize.width;
                        padding *= scale;

                        imgElementOrigin.src = message.data;

                        WebViewBridge.send(JSON.stringify({canvasFab:{width:canvasFab.width, height:canvasFab.height}}));
                    }

                } else if (message.type === "changeTab") {

                    imageClickable = !!message.imageClickable;

                } else if (message.type === "addTag") {
                    WebViewBridge.send(JSON.stringify(message));
                    var position =  {offsetX:message.data.x, offsetY:message.data.y};
                    var radius = 6 * scale;
                    var circle = new fabric.Circle({radius: radius,fill:"#fff", left:(position.offsetX-radius), top:(position.offsetY-radius), selectable:true, evented:true, hasControls:false});
                    circle.id = ++tagUID;

                    var group = new fabric.Group(null,{subTargetCheck:true, evented:true, selectable:true}, false);

                    //group.setOriginX(e.offsetX);
                    //group.setOriginY(e.offsetY);

                    addTagLabel((message.data.brand || '') + (message.data.name || ''), position, group, 0);
                    addTagLabel(message.data.nation, position, group, 1);
                    addTagLabel((message.data.price || '') + (message.data.currency || ''), position, group, 2);
                    addTagLabel(message.data.address, position, group, 3);

                    canvasFab.add(circle);
                    canvasFab.add(group);

                    tags[circle.id] = {circle: circle, group:group};
                    //var textFab = new fabric.Text(message.data.name, {left: message.data.position.left, top: message.data.position.top, selectable:false});
                    //canvasFab.add(textFab);
                }
            }

            WebViewBridge.send("hello from webview");
        }, 500);
//
//
//        window.location="https://www.baidu.com/s?wd=" + window.WebViewBridge;
//        alert(window.WebViewBridge);
    </script>
</body>
</html>`;

export default photo;