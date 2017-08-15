/**
 * Created by ravisha on 4/21/17.
 */

import {NameValueVO} from "../../vo/NameValueVO";
/**
 * Use this class for having any common functionality for the converters.
 * Every converter must implement the following abstract class along with its
 * respective interface .
 */
export abstract class CommonConverter{
      test(){
        console.log('test method in common Converte')
    }


    getArrayDataWithOnlyValues(arrayName : string[]): Array<String>{
      var values:string[] = [];
      var i = 0;
      Object.keys(arrayName).forEach(index=> {
        console.log(index)
        var fieldNameValue = arrayName[index];

        Object.keys(fieldNameValue).forEach(fieldName=> {

          console.log(fieldName)
          var fieldValue = fieldNameValue[fieldName];
          console.log('vaue in array '+fieldValue);

          values[i] = fieldValue
        });
        i++;
      });

      return values;

    }


  getArrayDataWithKeyValues(arrayName : string[]): NameValueVO[]{
    var nameValueArrayVO:NameValueVO[] = [];
    var data:Object;
    Object.keys(arrayName).forEach(index=> {
      console.log(index)
      var fieldNameValue = arrayName[index];
      var  nameValueVO = new NameValueVO();
      nameValueVO.keyInfo = fieldNameValue['keyInfo'];
      nameValueVO.valueInfo = fieldNameValue['valueInfo'];
      nameValueArrayVO[index] = nameValueVO;
    });
    return nameValueArrayVO;
  }



}
