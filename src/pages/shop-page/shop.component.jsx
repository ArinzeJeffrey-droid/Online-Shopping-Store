import React, { useEffect } from 'react';
import { Route } from "react-router-dom"
import { createStructuredSelector } from "reselect"
import { connect } from "react-redux"
import CollectionsOverview from "../../components/collections-overview/collection-overview.component"
import CollectionPage from '../collection/collection.component';
import { fetchCollectionsStart } from '../../redux/shop/shop.actions';
import { selectIsCollectionFetching, selectIsCollectionsLoaded } from "../../redux/shop/shop.selector"
import withSpinner from '../../components/with-spinner/with-spinner.component';

const CollectionsOverviewWithSpinner = withSpinner(CollectionsOverview)
const CollectionPageWithSpinner = withSpinner(CollectionPage)

const ShopPage = ({ fetchCollectionsStart, match, isCollectionsLoaded }) => {
    useEffect(() => {
        fetchCollectionsStart()
    }, [fetchCollectionsStart])
    return (
        <div className="shop-page">
            <Route exact path={`${match.path}`} render={(props) => <CollectionsOverviewWithSpinner isLoading={!isCollectionsLoaded} {...props} />}/>
            <Route path={`${match.path}/:collectionId`} render={(props) => <CollectionPageWithSpinner isLoading={!isCollectionsLoaded} {...props} />}/>
        </div>
    );
}
const mapStateToProps = createStructuredSelector({
    isCollectionFetching: selectIsCollectionFetching,
    isCollectionsLoaded: selectIsCollectionsLoaded
})

const mapDispatchToProps = dispatch => ({
    fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
})


export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);