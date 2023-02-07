import web3 from './web3';
//As we are accessing the instance of web3 we use
//lower case "w" in web3.
import CampaignFactory from './build/CampaignFatory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0x6e6c22e64F14F54F1C73BD42533cdD57BB9192B1'
);

export default instance;