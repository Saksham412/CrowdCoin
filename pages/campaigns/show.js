import React, { Component } from 'react';
import { Card, Grid, Button, GridColumn } from "semantic-ui-react";
import Layout from "../../components/Layout";
import web3 from "../../ethereum/web3";
import Campaign from "../../ethereum/campaign";
import ContributeForm from '../../components/ContributeForm';
import {Link} from "../../routes";

class CampaignShow extends Component {
    static async getInitialProps(props) {
        const campaign = Campaign(props.query.address);

        const summary = await campaign.methods.getSummary().call();
        
        return {
            address: props.query.address,
            minimumContribution: summary[0],
            balance: summary[1],
            requestsCount: summary[2],
            approversCount: summary[3],
            manager: summary[4]
        };
    }

    renderCards() {
        const {
            balance,
            manager,
            minimumContribution,
            requestsCount,
            approversCount
        } = this.props;

        const items = [
            {
                style: {overflowWrap: 'break-word'},
                header:manager,
                meta: 'Address of the Manager',
                description: 'The manager created this campaign and can create requests to withdraw money.'
            },
            {
                header: minimumContribution,
                meta: 'Minimun Contribution (Wei)',
                description: 'You must contribute at least this much wei to participate.',
                style: {overflowWrap: 'break-word'}
            },
            {
                header: requestsCount,
                meta: 'Number of requests',
                description: 'Total no. of requests made by the manager.',
                style: {overflowWrap: 'break-word'}
            },
            {
                header: approversCount,
                meta: 'Participants',
                description: 'This many peoples have contributed to the Camapign.',
                style: {overflowWrap: 'break-word'}
            },
            {
                header: web3.utils.fromWei(balance, 'ether'),
                meta: 'Campaign Balance (ether)',
                description: "This is the amount left to Spent"
                
            }
        ];

        return <Card.Group items={items} />;
    }

    render() {
        return (
            <Layout>
                <h3>CampaignShow</h3>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width="10">
                            {this.renderCards()}
                        </Grid.Column>
                        
                        <Grid.Column width="6"> 
                            <ContributeForm address={this.props.address}/>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Link route = {`/campaigns/${this.props.address}/requests`}>
                                <a>
                                    <Button  primary>View Requests</Button>
                                </a>
                            </Link>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                
                
            </Layout>
        );
    }
}

export default CampaignShow;