import React from 'react';
import CollectionsOverview from "../../components/collections-overview/collection-overview.component"

const ShopPage = ({ collections }) => {
        return (
            <div className="shop-page">
                {
                    collections.map(({id, ...otherCollectionProps}) => (
                        <CollectionsOverview key={id} {...otherCollectionProps}/>
                    ))
                }
            </div>
        );

}


export default ShopPage;