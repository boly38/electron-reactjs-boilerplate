
export default class ApplicationProperties {

  constructor() {
    this.buildCommonEnvironment();
    switch(this.nodeEnv) {
      case 'production':
      case 'prod':
        this.buildProdEnvironment();
        break;
      case 'githubaction':
      case 'test':
        this.buildTestEnvironment();
        break;
      case 'development':
      default :
        this.buildDevEnvironment();
        break;
    }
    console.log(`☑ properties ${this.nodeEnv}`);
  }

  buildCommonEnvironment() {
    this.nodeEnv = process.env.NODE_ENV || 'development';
  }

  buildProdEnvironment() {
  }

  buildDevEnvironment() {
    this.nodeEnv = 'development';
  }

  buildTestEnvironment() {
    this.useClientSimulator = true;
  }

}

//~ private
 function _assumeIsSet(expectedValue, name) {
   if (expectedValue === null || expectedValue === undefined || expectedValue === "") {
     throw `application properties expect following value to be set : ${name}`;
   }
   return expectedValue;
 }
 function _warnAssumeIsSet(expectedValue, name) {
   if (expectedValue === null || expectedValue === undefined || expectedValue === "") {
     console.warn(`warn: application properties expect following value to be set : ${name}`);
     return null;
   }
   return expectedValue;
 }
