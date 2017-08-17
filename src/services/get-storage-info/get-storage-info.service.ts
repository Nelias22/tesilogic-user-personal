import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';



@Injectable()


export class GetStorageInfoService{

	public storage : Storage;
	getInfo(key: string): any{

		
			this.storage.get(key).then((value) => {

         		if (value != null) {
           				return value;
        			}
        		else { 
        			return "unspecified";
        			}
      			});			
		
	
	}

}

