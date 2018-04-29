var marker;
var infoWindow;
var contentToDisplay;
var navLocation;
var sourceLocationLat;
var sourceLocationLng;
var sourceLocation;
var directionsDisplay;
var directionsService;
var i = 0;
var business_id = [];
var names = [];
var latitude = [];
var longitude = [];
var address = [];
var stars_y = [];
var city = [];
var is_recommended = [];
var noiseLevel = [];
var open24Hours = [];
var parkingGarage = [];
var parkingValidated = [];
var bikeParking = [];
var parkingValet = [];
var parkingStreet = [];
var mexican = [];
var american = [];
var italian= [];
var japanese = [];
var seafood = [];
var chinese = [];
var thai = [];
var fastfood = [];
var vegan = [];
var vegetarian= [];
var qN;
var markerSet = [];
var qNumber = 1;
var count = 0;
var j = 0;
var cityToDisplay = "Phoenix";

d3.csv('Data/Map_data/map_data.csv',function(err,data){
    data.forEach(function(valueObj){
        business_id[i] = valueObj['business_id'];
        names[i] = valueObj['name'];
        //console.log("name[j]" + names[i]);
        latitude[i] = valueObj['latitude'];
        longitude[i] = valueObj['longitude'];
        address[i] = valueObj['address'];
        stars_y[i] = valueObj['stars_y'];
        city[i] = valueObj['city'];
        is_recommended[i] = valueObj['is_recommended'];

        //console.log(business_id[i] + " " + name[i] + " " + latitude[i] + " " + longitude[i] + " " + address[i] + " " +
        //stars_y[i] + " " + city[i] + " " + is_recommended[i]);
        i = i + 1;
    });

    console.log(i);
});

//setTimeout(function(){initMap(cityToDisplay,qN)}, 2000);


function initMap(cityToDisplay,qN,selectedCuisine,selectedFeature,selectedRating, searchName) {

	if(searchName === "default" || searchName == undefined){
		
		if (qN == undefined || qN == 1){
        console.log(cityToDisplay + " " + qN + " " + selectedCuisine + " " + selectedFeature+ " " + selectedRating);

        if (cityToDisplay == undefined){
            cityToDisplay = "Tempe";
        }
        var location;

        if (cityToDisplay === "Phoenix"){
            location = {lat: 33.4499672, lng: -112.0702225};
        }
        else if (cityToDisplay === "Mesa"){
            location = {lat: 33.4072906,lng: -111.7877321};
        }
        else if (cityToDisplay === "Scottsdale"){
            location = {lat: 33.64053, lng: -111.92477};
        }
        else if (cityToDisplay === "Tempe"){
            location = {lat: 33.424564,lng: -111.928001};
        }
            setTimeout(function(){
        navLocation = location;
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 16,
            center: location,
            //mapTypeId: 'satellite'
        });

        var ic = {
            url : "Data/Images/red-marker.png",
            scaledSize: new google.maps.Size(30,30)
        };

        marker = new google.maps.Marker({
            position: location,
            map: map,
            icon: ic,
            scaledSize: new google.maps.Size(30,30),
            // label: "Restaurant",
            animation: google.maps.Animation.DROP,
        });
        markerSet.push(marker);

        marker.addListener('mouseover',function(){
            var contentToDisplay = cityToDisplay + "       ";
            var infoWindow = new google.maps.InfoWindow({
                content: contentToDisplay,
                size: new google.maps.Size(30,30)
            });
            infoWindow.open(map,marker);
        });

        marker.addListener('mouseout',function () {

            infoWindow.close();

        },false);

        console.log("Started");
          console.log("current is" + i);


        // Multiple Markers

            for(var j = 0; j < i ; j++){
                //        console.log("current is" + j);
                (function(){

                    if (city[j] === cityToDisplay ){
                        var icon;
                        if (stars_y[j] >=1 && stars_y[j] <= 2.5){
                            icon = "Data/Images/red-marker.png";
                        }
                        else if (stars_y[j] >=2.5 && stars_y[j] <= 3.5){
                            icon = "Data/Images/yellow-marker.png";
                        }
                        else {
                            icon = "Data/Images/green-marker.png";
                        }

                        if (is_recommended[j] == 1){
                            icon = "Data/Images/recommended1.png";
                        }
                        var icons = {
                            url : icon,
                            scaledSize: new google.maps.Size(30,30)
                        };

                        var bID = business_id[j];
                        var bName = names[j];
                        var bcity = city[j];
                        var rating = Math.round(stars_y[j] * 100)/100;
                        var contentToDisplay;
                        var infoWindow;
                        var marker2 = new google.maps.Marker({
                            position: new google.maps.LatLng(latitude[j],longitude[j]),
                            map: map,
                            icon: icons,
                            //label: names[j],
                            animation: google.maps.Animation.DROP,
                        });
                        markerSet.push(marker2);

                        marker2.addListener('mouseover',function () {
                            contentToDisplay = bName + ", Ratings: "  + rating  + "  " ;
                            //console.log(markerDisplay);
                            infoWindow = new google.maps.InfoWindow({
                                content: contentToDisplay
                            });
                            infoWindow.open(map,marker2);

                        },false);

                        marker2.addListener('click',function () {
                            /*
                            contentToDisplay = bName;
                            //console.log(markerDisplay);
                             infoWindow = new google.maps.InfoWindow({
                            content: contentToDisplay
                            });
                            infoWindow.open(map,marker2);
                            */
                            // console.log("Hello World!");
							console.log("Hello World!" +bID);
							 changeHeatmap(bID);
							 changeRating(bID);
							 changeImage();
							 document.getElementById('myDiv').scrollIntoView();
                        },false);

                        marker2.addListener('mouseout',function () {

                            infoWindow.close();

                        },false);
                    }

                }());

            }

        },1500);

        console.log("End");
    }
    else {
		
        console.log("Call new CSVs");
        count = 0;
        console.log(cityToDisplay+ " " + qN  + " " + selectedCuisine + " " + selectedFeature+ " " + selectedRating);
        //var fileName =

        //changeInGraph(cityToDisplay,qN);
		var bikeParking = [];
var parkingValet = [];
var parkingStreet = [];
var mexican = [];
var american = [];
var italian= [];
var japanese = [];
var seafood = [];
var chinese = [];
var thai = [];
var fastfood = [];
var vegan = [];
var vegetarian= [];

        d3.csv('Data/Cities_data/' + cityToDisplay.toLowerCase() +'_data.csv',function(err,data){
            data.forEach(function(valueObj){
                business_id[count] = valueObj['business_id'];
                names[count] = valueObj['name'];
                //console.log("name[j]" + names[i]);
                latitude[count] = valueObj['latitude'];
                longitude[count] = valueObj['longitude'];
                address[count] = valueObj['address'];
                stars_y[count] = valueObj['stars_y'];
                city[count] = valueObj['city'];
                is_recommended[count] = valueObj['is_recommended'];
                noiseLevel[count] = valueObj['attributes.NoiseLevel'];
                open24Hours[count] = valueObj['attributes.Open24Hours'];
                parkingGarage[count] = valueObj['attributes.BusinessParking.garage'];
                parkingValidated[count] = valueObj['attributes.BusinessParking.validated'];
                bikeParking[count] = valueObj['attributes.BikeParking'];
                parkingValet[count] = valueObj['attributes.BusinessParking.valet'];
                parkingStreet[count] = valueObj['attributes.BusinessParking.street'];
                mexican[count] = valueObj['categories_mexican'];
                american[count] = valueObj['categories_american'];
                italian[count] = valueObj['categories_italian'];
                japanese[count] = valueObj['categories_japanese'];
                seafood[count] = valueObj['categories_seafood'];
                chinese[count] = valueObj['categories_chinese'];
                thai[count] = valueObj['categories_thai'];
                fastfood[count] = valueObj['categories_fast_food'];
                vegan[count] = valueObj['categories_vegan'];
                vegetarian[count] = valueObj['categories_vegetarian'];

                console.log("Mexican attributes " +mexican[i]);
                //stars_y[i] + " " + city[i] + " " + is_recommended[i]);
                count = count + 1;

            });
            console.log("Count is " +count);
        });

        changeInGraph(cityToDisplay,qN);

            setTimeout(function(){
        if (cityToDisplay === "Phoenix"){
            location = {lat: 33.4499672, lng: -112.0702225};
        }
        else if (cityToDisplay === "Mesa"){
            location = {lat: 33.4072906,lng: -111.7877321};
        }
        else if (cityToDisplay === "Scottsdale"){
            location = {lat: 33.64053, lng: -111.92477};
        }
        else if (cityToDisplay === "Tempe"){
            location = {lat: 33.424564,lng: -111.928001};
        }
        else if (cityToDisplay === "Champaign"){
            location = {lat: 40.109986,lng: -88.233777};
        }
        else if (cityToDisplay === "Charlotte"){
            location = {lat: 35.2216474,lng: -80.8393449};
        }
        else if (cityToDisplay === "Cleveland"){
            location = {lat: 41.447893,lng: -81.564678};
        }
        else if (cityToDisplay === "Henderson"){
            location = {lat: 36.0243234052,lng: -115.062857419};
        }
        else if (cityToDisplay === "Las_Vegas"){
            location = {lat: 36.0669136,lng: -115.17084840000001};
        }
        else if (cityToDisplay === "Pittsburgh"){
            location = {lat: 40.472735,lng: -79.9632647};
        }



        navLocation = location;
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 16,
            center: location,
            //mapTypeId: 'satellite'
        });

        var ic = {
            url : "Data/Images/red-marker.png",
            scaledSize: new google.maps.Size(30,30)
        };

        marker = new google.maps.Marker({
            position: location,
            map: map,
            icon: ic,
            scaledSize: new google.maps.Size(30,30),
            // label: "Restaurant",
            animation: google.maps.Animation.DROP,
        });
        markerSet.push(marker);

        marker.addListener('mouseover',function(){
            var contentToDisplay = cityToDisplay + "    ";
            var infoWindow = new google.maps.InfoWindow({
                content: contentToDisplay,
                size: new google.maps.Size(30,30)
            });
            infoWindow.open(map,marker);
        });

        // console.log(" asdad Started");


            // console.log(count);



            //count = j;
            console.log("count before m" +count);
			var cuisineCriteria = selectedCuisine.toLowerCase();
			var featureCriteria = selectedFeature.toLowerCase();
			var cuisineSearch = 1;
			var featureSearch = 1;
			var americanFood = 0;
			var mexicanFood = 0;
			var italianFood = 0;
			var japaneseFood = 0;
			var seafoodFood = 0;
			var chineseFood = 0;
			var thaiFood = 0;
			var fastfoodFood = 0;
			var veganFood = 0;
			var vegFood = 0;
			var bikeFood = 0;
			var valetFood = 0;
			var streetFood = 0;
			var valet = 0;
			var bike = 0;
			var street = 0;
			var searching = city;
			var featuring = city;
			
			if (cuisineCriteria !== "all"){
				console.log("cuisine selected");
				if (cuisineCriteria === "american"){
					americanFood = 1;
					searching = american;
				}
				else if (cuisineCriteria === "mexican"){
					mexicanFood = 1;
					searching = mexican;
				}
				else if (cuisineCriteria === "italian"){
					italianFood = 1;
					searching = italian;
				}
				else if (cuisineCriteria === "japanese"){
					japaneseFood = 1;
					searching = japanese;
				}
				else if (cuisineCriteria === "seafood"){
					seafoodFood = 1;
					searching = seafood;
				}
				else if (cuisineCriteria === "chinese"){
					chineseFood = 1;
					searching = chinese;
				}
				else if (cuisineCriteria === "thai"){
					thaiFood = 1;
					searching = thai;
				}
				else if (cuisineCriteria === "fastfood"){
					fastfoodFood = 1;
					searching = fastfood;
				}
				else if (cuisineCriteria === "vegan"){
					veganFood = 1;
					searching = vegan;
				}
				else if (cuisineCriteria === "vegetarian"){
					vegetarianFood = 1;
					searching = vegetarian;
				}
				else {
					console.log("Nothing Selected");
				}	
					
			}else{
				console.log("default");
				cuisineSearch = 0;
				console.log(cuisineSearch);
			}
			    
			if(featureCriteria !== "all"){
				console.log("extra selected");
				if (featureCriteria === "bike"){
					bike = 1;
					featuring = bikeParking;
				} else if (featureCriteria === "valet"){
					valet = 1;
					featuring = parkingValet;
				} else if (featureCriteria === "street"){
					street = 1;
					featuring = parkingStreet;
				} else {
					console.log("Nothing is selected");
				}
				
			}else{
				console.log("default");
				featureSearch = 0;
				console.log(featureSearch);
			}
			
			console.log(americanFood + " " +mexicanFood + " " +italianFood + " " + japaneseFood + " " +seafoodFood + " " +chineseFood + " " +thaiFood
			+ " " +fastfoodFood+" " +veganFood+ " " +vegFood + " " + bikeFood + " " + valetFood + " "  +streetFood);
			
			console.log(valet + " " + bike + " " + street);
			
			if (typeof searching === 'undefined' || searching == null){
				console.log("Searching null found" + cuisineSearch);
			}
			
			console.log("Feature Search " + featureSearch + " "  );
			console.log("Count is :" +count);
			//var searching = thai;
            // Multiple Markers
            for(var k = 0; k < count ; k++){
                //console.log(noiseLevel[k]);
                // Add conditions over here
                (function(){

					//console.log("For:" +mexican[k]);
					//console.log(" asd " +featuring[k]);
					if (searching[k] == 1){
			//			console.log(searching[k]);
					} 
					if (((typeof searching === 'undefined' || searching == null) && cuisineSearch == 0 && stars_y[k] >= selectedRating) || (searching[k] == 1 && stars_y[k] >= selectedRating) || (cuisineSearch==0 && stars_y[k] >= selectedRating)) {
						console.log("Ohh Yeah1");
						if((featureSearch == 0 && stars_y[k] >= selectedRating) || (featureSearch == 1 && featuring[k] === "True" && stars_y[k] >= selectedRating)	)
						{	
					//		console.log("Ohh Yeah2");
						
                    var icon;
                    if (stars_y[k] >=1 && stars_y[k] <= 2.5){
                        icon = "Data/Images/red-marker.png";
                    }
                    else if (stars_y[k] >=2.5 && stars_y[k] <= 3.5){
                        icon = "Data/Images/yellow-marker.png";
                    }
                    else {
                        icon = "Data/Images/green-marker.png";
                    }

                    if (is_recommended[k] == 1){
                        icon = "Data/Images/recommended1.png";
                    }
                    var icons = {
                        url : icon,
                        scaledSize: new google.maps.Size(30,30)
                    };

                    var bID = business_id[k];
                    var bName = names[k];
                    var bcity = city[k];
                    var rating = Math.round(stars_y[k] * 100)/100;
                    var contentToDisplay;
                    var infoWindow;
                    var marker2 = new google.maps.Marker({
                        position: new google.maps.LatLng(latitude[k],longitude[k]),
                        map: map,
                        icon: icons,
                        //label: names[j],
                        animation: google.maps.Animation.DROP,
                    });
                    markerSet.push(marker2);

                    marker2.addListener('mouseover',function () {
                        contentToDisplay = bName + ", Ratings: "  + rating  + "  " ;
                        //console.log(markerDisplay);
                        infoWindow = new google.maps.InfoWindow({
                            content: contentToDisplay
                        });
                        infoWindow.open(map,marker2);

                    },false);

                    marker2.addListener('click',function () {

                        contentToDisplay = bName;
                        //console.log(markerDisplay);
                        // infoWindow = new google.maps.InfoWindow({
                        //content: contentToDisplay
                        //});
                        //infoWindow.open(map,marker2);

                        console.log("Hello World!" +bID);
						//console.log("Hello World!" +restID);
						changeHeatmap(bID);
						changeRating(bID);
						changeImage();
						document.getElementById('myDiv').scrollIntoView();
                    },false);

                    marker2.addListener('mouseout',function () {

                        infoWindow.close();

                    },false);
						}
						
					}
						
				


                }());


            }


        },1000);
        console.log("rec");
        var recCount = 0;
        for(var k = 0 ; k < j ; k++ ){
            if (recCount <= 8){
                if(is_recommended[k] == 1){
                    console.log(names[k]);
                    recCount = recCount + 1;
                }
            }


        }

    
	}
	
    }
	else{
		console.log("Restaurant Name Search");
	    console.log(cityToDisplay+ " " + qN  + " " + selectedCuisine + " " + selectedFeature+ " " + selectedRating + " " + searchName);
		var busiId = [];
		var nameRes = [];
		var latRes = [];
		var lngRes = [];
		var starRes = [];
		var cityRes = [];
		var recRes = [];
		
		count = 0;
		var counter = 0;
		 d3.csv('Data/Cities_data/' + cityToDisplay.toLowerCase() +'_data.csv',function(err,data){
            data.forEach(function(valueObj){
                busiId[count] = valueObj['business_id'];
                nameRes[count] = valueObj['name'];
                //console.log("name[j]" + names[i]);
                latRes[count] = valueObj['latitude'];
                lngRes[count] = valueObj['longitude'];
                //address[count] = valueObj['address'];
                starRes[count] = valueObj['stars_y'];
                cityRes[count] = valueObj['city'];
                recRes[count] = valueObj['is_recommended'];
                
                //stars_y[i] + " " + city[i] + " " + is_recommended[i]);
			//	console.log(cityRes[count]);
                count = count + 1;
				counter = counter + 1;
            });
           // console.log("Count is " +count + " " + counter);
			count = i;
        });
		
        //changeInGraph(cityToDisplay,qN);
	
		console.log("SADAS");
		var loopVariable = count;
		
		//await sleep(1000);
		sleep(500).then(() => {
		setTimeout(function(){
			console.log("aksjdha");
        if (cityToDisplay === "Phoenix"){
            location = {lat: 33.4499672, lng: -112.0702225};
        }
        else if (cityToDisplay === "Mesa"){
            location = {lat: 33.4072906,lng: -111.7877321};
        }
        else if (cityToDisplay === "Scottsdale"){
            location = {lat: 33.64053, lng: -111.92477};
        }
        else if (cityToDisplay === "Tempe"){
            location = {lat: 33.3778358,lng: -111.96072439999999};
        }
        else if (cityToDisplay === "Champaign"){
            location = {lat: 40.109986,lng: -88.233777};
        }
        else if (cityToDisplay === "Charlotte"){
            location = {lat: 35.2216474,lng: -80.8393449};
        }
        else if (cityToDisplay === "Cleveland"){
            location = {lat: 41.447893,lng: -81.564678};
        }
        else if (cityToDisplay === "Henderson"){
            location = {lat: 36.0243234052,lng: -115.062857419};
        }
        else if (cityToDisplay === "Las_Vegas"){
            location = {lat: 36.0669136,lng: -115.17084840000001};
        }
        else if (cityToDisplay === "Pittsburgh"){
            location = {lat: 40.472735,lng: -79.9632647};
        }


		
        navLocation = location;
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 12,
            center: location,
            //mapTypeId: 'satellite'
        });

        var ic = {
            url : "Data/Images/red-marker.png",
            scaledSize: new google.maps.Size(30,30)
        };

       // marker = new google.maps.Marker({
       //     position: location,
       //     map: map,
       //     icon: ic,
       //     scaledSize: new google.maps.Size(2,2),
            // label: "Restaurant",
       //     animation: google.maps.Animation.DROP,
        //});
        //markerSet.push(marker);

        //marker.addListener('mouseover',function(){
        //    var contentToDisplay = cityToDisplay + "    ";
        //    var infoWindow = new google.maps.InfoWindow({
        //        content: contentToDisplay,
        //        size: new google.maps.Size(30,30)
       //     });
       //     infoWindow.open(map,marker);
       // });
		
		
			console.log("Loop Variable: " +counter);
            for(var j = 0; j < counter ; j++){
                //        console.log("current is" + j);
                (function(){
				//	console.log("In For loop");
                    if (nameRes[j].toLowerCase() === searchName.toLowerCase() ){
                        var icon;
                        if (starRes[j] >=1 && starRes[j] <= 2.5){
                            icon = "Data/Images/red-marker.png";
                        }
                        else if (starRes[j] >=2.5 && starRes[j] <= 3.5){
                            icon = "Data/Images/yellow-marker.png";
                        }
                        else {
                            icon = "Data/Images/green-marker.png";
                        }

                        if (recRes[j] == 1){
                            icon = "Data/Images/recommended1.png";
                        }
                        var icons = {
                            url : icon,
                            scaledSize: new google.maps.Size(30,30)
                        };

                        var bID = busiId[j];
                        var bName = nameRes[j];
                        var bcity = cityRes[j];
                        var rating = Math.round(starRes[j] * 100)/100;
                        var contentToDisplay;
                        var infoWindow;
                        var marker2 = new google.maps.Marker({
                            position: new google.maps.LatLng(latRes[j],lngRes[j]),
                            map: map,
                            icon: icons,
                            //label: names[j],
                            animation: google.maps.Animation.DROP,
                        });
                        markerSet.push(marker2);

                        marker2.addListener('mouseover',function () {
                            contentToDisplay = bName + ", Ratings: "  + rating  + "  " ;
                            //console.log(markerDisplay);
                            infoWindow = new google.maps.InfoWindow({
                                content: contentToDisplay
                            });
                            infoWindow.open(map,marker2);

                        },false);

                        marker2.addListener('click',function () {
                            /*
                            contentToDisplay = bName;
                            //console.log(markerDisplay);
                             infoWindow = new google.maps.InfoWindow({
                            content: contentToDisplay
                            });
                            infoWindow.open(map,marker2);
                            */
                            // console.log("Hello World!");
							console.log("Hello World!" +bID);
							 changeHeatmap(bID);
							 changeRating(bID);
							 changeImage();
							 document.getElementById('myDiv').scrollIntoView();
                        },false);

                        marker2.addListener('mouseout',function () {

                            infoWindow.close();

                        },false);
                    }

                }());

            }

        },500);
	
			
		});
		

	}

}

function changeInGraph(cityToDisplay, qN){
    console.log("Am I executing first");
}

function toggleBounce(){
    var contentToDisplay = "Hello, This is the restaurant! We can edit this details.";
    //console.log(markerDisplay);
    var infoWindow = new google.maps.InfoWindow({
        content: contentToDisplay
    });
    infoWindow.open(map,marker);
}

function sleep(time){
	return new Promise((resolve) => setTimeout(resolve,time));
}
//
// function formsubmitAction(){
//
//     console.log("pahunch gaye");
//     //alert("You have selected : " + document.getElementById("state").value + " and " + document.getElementById("cuisine").value);
//     selectedCity = document.getElementById("state").value;
//
//     selectedCuisine = document.getElementById("cuisine").value;
//     selectedFeature = document.getElementByID("AdditionalFeatures").value;
//
//     console.log(selectedCuisine);
//     console.log(selectedFeature);
//
//     console.log(selectedCity);
//     qNumber = 2;
//     var isSelected = 0;
//     console.log("isSelected " +isSelected);
//     for (var k = 0; k < markerSet.length;k++){
//         //console.log(markerSet[k]);
//         markerSet[k].setMap(null);
//     }
//
//
//     //secondInit(selectedCity,qNumber);
//     initMap(selectedCity,qNumber);
//     console.log("Here");
//
//
//
// }


