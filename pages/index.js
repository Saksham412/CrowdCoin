import React, { Component  } from 'react';
import { Card, Button } from 'semantic-ui-react';
import factory from '../ethereum/factory';
import Layout  from '../components/Layout';
import { Link } from "../routes";

class CampaignIndex extends Component {
    // with the help of static word we dont
    // have to make an instance of the method
    // to get access to it outside the class.
    //we can directly access it by CampaignIndex.getInitialProps call.
    
    static async getInitialProps() {
        const campaigns = await factory.methods.getCampaigns().call();

        return { campaigns };
    }

    renderCampaigns() {
        const items = this.props.campaigns.map(address => {
            return {
                header: address,
                description: (
                <Link route={`/campaigns/${address}`}>
                    <a>View Campaign</a>
                </Link>
                ),
                fluid: true
            };
        });
        return <Card.Group items={items} />;
    };
    
    render() {
        return (
            <Layout>
                <div>
                    <h3>Open Campaigns</h3>
                    
                    <Link route="/campaigns/new">
                        <a>
                            <Button
                                floated='right'
                                content="Create Campaign"
                                icon="add circle"
                                primary
                            />
                        </a>
                    </Link>
                    {this.renderCampaigns()}
                </div>
            </Layout>
        );
    }
}

export default CampaignIndex;

//npm run dev for localhost  

 