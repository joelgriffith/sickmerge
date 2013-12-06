/*
 *  Config options for setting up the environment
 *  Currnetly just returns a string representing
 *  the environment, however in the future it'll
 *  be useful for expanding.
 */
module.exports = function(){
    switch(process.env.NODE_ENV){
        case 'development':
            return 'dev';

        case 'production':
            return 'production';

        case 'test':
            return 'test';

        default:
            return 'production';
    }
};