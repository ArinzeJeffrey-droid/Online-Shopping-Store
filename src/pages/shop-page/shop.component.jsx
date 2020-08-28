import React from 'react';
import { Route } from "react-router-dom"
import CollectionsOverview from "../../components/collections-overview/collection-overview.component"
import CollectionPage from '../collection/collection.component';


class ShopPage extends React.Component {
    constructor(){
        super()
    }
    render(){
        const { match } = this.props
        return (
            <div className="shop-page">
                <Route exact path={`${match.path}`} component={CollectionsOverview}/>
                <Route path={`${match.path}/:collectionId`} component={CollectionPage}/>
            </div>
        );
    }

}


export default ShopPage;