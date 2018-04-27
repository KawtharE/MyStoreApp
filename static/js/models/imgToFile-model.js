var app = app || {};

(function(){
	'use strict';

	app.ImgToFile = Backbone.Model.extend({
		fileAttribute: 'attachment',
		initialize: function(){
            var base64StoreImg;
            this.toDataURL('/static/img/store.jpg', function(dataUrl) {
                base64StoreImg = dataUrl;
            });
            var parts = [new Blob([base64StoreImg], {type: 'image/jpg'}), ' Same way as you do with blob', new Uint16Array([33])];
            var fileObj = new File(parts, 'store.png', {lastModified: new Date(0), type: "image/png" });

            this.set('attachment', fileObj);
		},
        toDataURL: function(src, callback, outputFormat) {
            var img = new Image();
            img.crossOrigin = 'Anonymous';
            img.onload = function() {
                var canvas = document.createElement('CANVAS');
                var ctx = canvas.getContext('2d');
                var dataURL;
                canvas.height = this.naturalHeight;
                canvas.width = this.naturalWidth;
                ctx.drawImage(this, 0, 0);
                dataURL = canvas.toDataURL(outputFormat);
                callback(dataURL);
            };
            img.src = src;
            if (img.complete || img.complete === undefined) {
                img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
                img.src = src;
            }
        }
	});
})();