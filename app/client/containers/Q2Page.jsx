import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux';
import { Router, Route, IndexRoute, Link, IndexLink, browserHistory } from 'react-router';

import ReactCrop from 'react-image-crop';
import 'isomorphic-fetch'

class Q2Page extends Component {
	constructor(props, context) {
        super(props, context);

        this.state = {
        	imgSrc: "",
        	crop: {}
        }
    }

    _handleImageAdd(event) {
    	let _this = this;
    	let imgURL = $("#imageUrl").val();

    	let img = new Image();
    	img.crossOrigin = 'Anonymous';
		img.src = imgURL;

		img.onload = function(){
  			let canvas = document.createElement("canvas");
	        canvas.width = this.width;
	        canvas.height = this.height;

	        let ctx = canvas.getContext("2d");
	        ctx.drawImage(this, 0, 0);

	        let dataURL = canvas.toDataURL("image/png");

	        _this.setState({
            	imgSrc: dataURL
            });
		};
    }

    _handleFileChange(event) {        
        if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();
            reader.onload = (e) => {
                //$('#imageSource').attr('src', e.target.result);
                $("#imageUpload").attr("disabled", false);
                
                this.setState({
                	imgSrc: e.target.result
                });
            }

            reader.readAsDataURL(event.target.files[0]);
        }
    }

    _onCropComplete(crop) {
      	this.setState({ 
      		crop: crop 
      	});
    }

    _handleImageCrop(event) {
    	let loadedImg = document.getElementsByClassName('ReactCrop__image')[0];
    	let imageWidth = loadedImg.naturalWidth;
		let imageHeight = loadedImg.naturalHeight;

		let cropX = (this.state.crop.x / 100) * imageWidth;
		let cropY = (this.state.crop.y / 100) * imageHeight;

		let cropWidth = (this.state.crop.width / 100) * imageWidth;
		let cropHeight = (this.state.crop.height / 100) * imageHeight;

		let canvas = document.createElement('canvas');
		canvas.width = cropWidth;
		canvas.height = cropHeight;
		
		let ctx = canvas.getContext('2d');
		ctx.drawImage(loadedImg, cropX, cropY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);

		this.setState({
        	imgSrc: canvas.toDataURL('image/jpeg'),
        	crop: {}
        });
    }

    _handleImageMosaic(event) {
    	//console.log("this.state.crop => ", this.state.crop)
    	
    	let loadedImg = document.getElementsByClassName('ReactCrop__image')[0];
    	
    	let canvas = document.createElement('canvas');
    	let imageWidth = loadedImg.naturalWidth;
		let imageHeight = loadedImg.naturalHeight;

		canvas.width = imageWidth;
		canvas.height = imageHeight;

		let ctx = canvas.getContext('2d');
    	ctx.drawImage(loadedImg, 0, 0);

    	let imageDataX = imageWidth * this.state.crop.x * 0.01;
    	let imageDataY = imageHeight * this.state.crop.y * 0.01;
    	let imageDataW = imageWidth * this.state.crop.width * 0.01;
    	let imageDataH = imageHeight * this.state.crop.height * 0.01;

    	//console.log(imageDataX, imageDataY, imageDataW, imageDataH);

    	let imageData = ctx.getImageData(imageDataX, imageDataY, imageDataW, imageDataH);
    	let pixels = imageData.data;

		let tileWidth = imageData.width / 16 + 1;
		let tileHeight = imageData.height / 16 + 1;

		let numTileRows = imageData.width/tileWidth;
		let numTileCols = imageData.height/tileHeight;

    	for (let r = 0; r < numTileRows; r++) {
		    for (let c = 0; c < numTileCols; c++) {

		        for (let tr = 0; tr < tileHeight; tr++) {
		            for (let tc = 0; tc < tileWidth; tc++) {
		                let trueRow = imageDataX + (r*tileHeight)+tr;
		                let trueCol = imageDataY + (c*tileWidth)+tc;

		                let pos = (trueRow*(imageData.width*4))+(trueCol*4);
		                
		                let red = pixels[pos+0];
		                let green = pixels[pos+1];
		                let blue = pixels[pos+2];
		                let pixelAlpha = pixels[pos+3] / 255;

		                ctx.fillStyle = 'rgba(' + red +','+ green +','+ blue +','+ pixelAlpha + ')';
		                ctx.fillRect( trueRow, trueCol, tileWidth, tileHeight )
          				ctx.restore();
		            };
		        };

		    };
		};

    	this.setState({
        	imgSrc: canvas.toDataURL('image/jpeg'),
        	crop: {}
        });
    }

    _handleImageUpload(event) {
    	let dataurl = $('img.ReactCrop__image').first().attr('src');

    	let base64 = dataurl.split("base64,")[1];

	  	fetch('/api/images/upload', {
            method: "POST",
            headers: {
                Authorization: 'Client-ID 06a5e4a47e9d9e7',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'image': base64
            })
        })
        .then(response =>
          response.json()
        )
        .then(function(stories) {

            let link = stories.link;
            alert("link: "+link);
            
        });
        
    }

  	render() {
	    return (
	      	<section className="content">
				<h1>Q2：</h1>

				<div className="container">
					<div className="row">
  						<div className="col-md-offset-2 col-md-8">
  							<input className="form-control" id="fileInput" type='file' accept="image/gif, image/jpeg, image/png" onChange={(event)=>this._handleFileChange(event)} />
                        	<div>or</div>
                        	<div className="input-group">	
                        		<input id="imageUrl" type="text" className="form-control" placeholder="image url"/>
			                  	<span className="input-group-btn">
				                    <button className="btn btn-default" type="button" onClick={(event)=>this._handleImageAdd(event)}>
				                        OK
				                    </button>
				                </span>
				            </div>
  							
  							<br/>
  							
  							<div className="clearfix">
	  							<div className="btn-group pull-right">
	  								<button id="imageUpload" type="button" className="btn btn-default" onClick={(event)=>this._handleImageCrop(event)}>Crop</button>
					            	<button id="imageUpload" type="button" className="btn btn-default" onClick={(event)=>this._handleImageMosaic(event)}>Mosaic</button>
					            	<button id="imageUpload" type="button" className="btn btn-default" onClick={(event)=>this._handleImageUpload(event)}>Upload</button>
						    	</div>
					    	</div>

					    	<br/>

  							<ReactCrop 
  								src={this.state.imgSrc}
  								crop={this.state.crop}
								onComplete={crop => this._onCropComplete(crop)}				            
							/>

							
					    </div>	
				    </div>				  
				</div>
			</section>
	    )
  	}
}

Q2Page.contextTypes = {
	router: React.PropTypes.object.isRequired
}

Q2Page.propTypes = {
  	actions: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
    return {
        
    }
}

export default connect(
    mapStateToProps
)(Q2Page)

