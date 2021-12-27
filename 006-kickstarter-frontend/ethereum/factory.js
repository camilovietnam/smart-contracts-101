import web3 from './web3'
import CampaignFactory from './build/CampaignFactory.json'

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0x92d43a8C1Cd7cD00A03F177523846f18e98b800f'
)

export default instance
