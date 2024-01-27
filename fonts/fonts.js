import React from "react";
import * as Font from 'expo-font';

export async function loadFonts(setAppIsLoaded) {
      try {
        await Font.loadAsync({
				"Bellota": require("../assets/fonts/Bellota-Regular.ttf"),
				"Aguafina": require("../assets/fonts/AguafinaScript-Regular.ttf"),
				"Barrio": require("../assets/fonts/Barrio-Regular.ttf"),
				"Amatic": require("../assets/fonts/AmaticSC-Regular.ttf"),
				"BlackOps": require("../assets/fonts/BlackOpsOne-Regular.ttf"),
				"Chakra": require("../assets/fonts/ChakraPetch-Regular.ttf"),
				"Croissant": require("../assets/fonts/CroissantOne-Regular.ttf"),
				"Hammer": require("../assets/fonts/HammersmithOne-Regular.ttf"),
				"Itim": require("../assets/fonts/Itim-Regular.ttf"),
				"Lilita": require("../assets/fonts/LilitaOne-Regular.ttf"),
				"Rajdhani": require("../assets/fonts/Rajdhani-Regular.ttf"),
				"SedgwickAve": require("../assets/fonts/SedgwickAve-Regular.ttf"),
				"Shadows": require("../assets/fonts/ShadowsIntoLight-Regular.ttf"),
	  
        });
      } catch (error) {
        if (error.message !== "Font.loadAsync unexpected exception: Font not found /data/user/0/host.exp.exponent/cache/ExponentAsset-9bd9bde59dc816ef93cd18069b65a40e.ttf") 
	{
    	console.log(error);
  	}
      } finally {
        setAppIsLoaded(true);
      }
}

