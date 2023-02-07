import React, {Component} from 'react';
import Layout  from '../../../components/Layout';
import { Button, Table } from 'semantic-ui-react';
import {Link} from "../../../routes";
import Campaign from '../../../ethereum/campaign';
import RequestRow from '../../../components/RequestRow';

class RequestsIndex extends Component {
    static async getInitialProps(props) {
        const {address} = props.query;
        const campaign = Campaign(address);
        const requestCount = await campaign.methods.getRequestsCount().call();
        const aprroversCount = await campaign.methods.aprroversCount().call();

        const requests = await Promise.all(
            Array(parseInt(requestCount))
                .fill()
                .map((element, index) => {
                    return campaign.methods.requests(index).call();
                })
        );

        return {address, requests, requestCount, aprroversCount };
    }

    renderRows() {
        return this.props.requests.map((request, index) => {
            return <RequestRow
                key={index}
                id={index}
                request={request}
                address={this.props.address} 
                aprroversCount = {this.props.aprroversCount}
            />;
        });
    }
    render() {
        const { Header, Row, HeaderCell, Body } = Table;
        return (
        <Layout>
            <h3>Requests</h3>
            <Link route={`/campaigns/${this.props.address}/requests/new`}>
                <a>
                   <Button primary floated="right" style={{marginBottom: 10}}>Add Request</Button> 
                </a>
            </Link>
            <Table>
                <Header>
                    <Row>
                        <HeaderCell>ID</HeaderCell>
                        <HeaderCell>Description</HeaderCell>
                        <HeaderCell>Amount</HeaderCell>
                        <HeaderCell>Recipient</HeaderCell>
                        <HeaderCell>Approval count</HeaderCell>
                        <HeaderCell>Approve</HeaderCell>
                        <HeaderCell>Finalize</HeaderCell>
                    </Row>
                </Header>
                <Body>
                    {this.renderRows()}
                </Body>
                <div>Found {this.props.requestCount} requests.</div>
            </Table>

        </Layout>
        );
    }
}

export default RequestsIndex;