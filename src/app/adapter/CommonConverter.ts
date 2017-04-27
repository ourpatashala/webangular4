/**
 * Created by ravisha on 4/21/17.
 */

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


 // var x :{
  //bother :'raja',
  //father : 'ravi'
//}

  getArrayDataWithKeyValues(arrayName : string[]): Object{

   // var values:string[] = [];
    var data:Object;
    var i = 0;
    data = '{';
    var arraySize = arrayName.length;
    Object.keys(arrayName).forEach(index=> {
      i++;
      console.log(index)
      var fieldNameValue = arrayName[index];
      var type = fieldNameValue['type'];
      var value = fieldNameValue['value'];
      if( i == arraySize ) {
        data = data + type + ':\'' + value + '\'';
      }else {
        data = data + type + ':\'' + value + '\',';

      }

    });
    data  = data + '}';
    console.log('data to be displayed'+data);
    return data;
  }



}
